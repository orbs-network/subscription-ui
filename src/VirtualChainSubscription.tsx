import React from "react";
import Button from "@material-ui/core/Button"
import Web3 from "web3";
import { InputLabel, TextField, Select } from '@material-ui/core';
import ERC20ABI from "./abi/ERC20.abi.json";
import SubscriptionABI from "./abi/Subscription.abi.json";
import { Config } from "./Config";
import Confirmation from "./Confirmation";
import VirtualChainMetadata from "./VirtualChainMetadata";

interface VirtualChainSubscriptionProps {
    web3: Web3;
    config: Config;

    virtualChainId: string;
    description?: string;

    buttonLabel: string;
    subscriptionLabel: string;

    onPaymentStarted?: () => void;
}

interface VirtualChainSubscriptionState {
    description: string;
    subscriptionAmount: number;

    approveTxHash?: string;
    subscribeTxHash?: string;
    distributeTxHash?: string; // FIXME remove for v2

    validationError?: string;
    success: boolean;
}

class VirtualChainSubscription extends React.Component<VirtualChainSubscriptionProps, VirtualChainSubscriptionState> {
    constructor(props: any) {
        super(props);

        this.state = {
            description: "",
            subscriptionAmount: props.config.minimalSubscriptionAmount,
            success: false,
        }
    }

    hasPendingTransactions(): boolean {
        return (this.state.approveTxHash || this.state.subscribeTxHash) !== undefined;
    }

    render() {
        const { config } = this.props;

        if (this.state.validationError) {
            return (
                <div>
                    Error: {this.state.validationError}
                </div>
            )
        }

        if (!this.hasPendingTransactions()) {
            return (
                <form noValidate autoComplete="off">
                    { !this.props.description &&
                        <div>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <TextField name="description" onChange={(event) => this.setState({
                                description: event.target.value,
                            })}/>
                            <br/>
                            <br/>
                        </div>
                    }

                <InputLabel htmlFor="subscription">{this.props.subscriptionLabel}</InputLabel>
                    <Select
                        native
                        value={this.state.subscriptionAmount}
                        onChange={(event) => this.setState({
                            subscriptionAmount: Number(event.target.value),
                        })}
                        name="subscription"
                        >
                        <option value={config.minimalSubscriptionAmount}>One month - {config.minimalSubscriptionAmount} ORBS</option>
                        <option value={config.minimalSubscriptionAmount*2}>Two months - {config.minimalSubscriptionAmount*2} ORBS</option>
                        <option value={config.minimalSubscriptionAmount*3}>Three months - {config.minimalSubscriptionAmount*3} ORBS</option>
                    </Select>

                    <br/><br/>
                    <Button variant="contained" color="primary" onClick={() => this.subscribe()}>{this.props.buttonLabel}</Button>
                </form>
            )
        } else {
            const { web3, virtualChainId } = this.props;
            return (
                <div>
                    <Confirmation 
                        web3={web3} 
                        config={config}
                        approveTxHash={this.state.approveTxHash!}
                        subscribeTxHash={this.state.subscribeTxHash!}
                        distributeTxHash={this.state.distributeTxHash!}
                        virtualChainId={virtualChainId}
                        onSuccess={(success) => this.setState({ success })}
                    />
                    { this.state.success &&
                        <VirtualChainMetadata virtualChainId={virtualChainId} config={config} web3={web3} />
                    }
                </div>
            )
        }
    }

    async subscribe() {
        const { web3, config } = this.props;
        const from = (await web3.eth.getAccounts())[0];

        const erc20 = new web3.eth.Contract(ERC20ABI as any, config.erc20Address);
        const subscription = new web3.eth.Contract(SubscriptionABI as any, config.subscriptionAddress);

        // @ts-ignore
        const amount = (web3.utils.toBN(this.state.subscriptionAmount) * web3.utils.toBN(Math.pow(10, config.decimals))) as bigint;
        console.log("amount to pay", amount);
        const orbsBalance = await erc20.methods.balanceOf(from).call();
        if (orbsBalance < amount) {
            this.setState({
                validationError: "insufficient funds",
            })
            return;
        }

        const approveTx = erc20.methods.approve(
            config.subscriptionAddress, 
            amount
        ).send.request({ from }, (error: any, approveTxHash: string) => {
            this.setState({ approveTxHash });
        });

        const subscribeTx = subscription.methods.subscribeForCurrentMonth(
            this.props.virtualChainId,
            (this.state.description || this.props.description),
            amount
        ).send.request({ from }, (error: any, subscribeTxHash: string) => {
            this.setState({ subscribeTxHash })
        });

        const distributeTx = subscription.methods.distributeFees()
            .send.request({ from }, (error: any, distributeTxHash: string) => {
                this.setState({ distributeTxHash })
            });

        const batch = new web3.BatchRequest();
        batch.add(approveTx);
        batch.add(subscribeTx);
        batch.add(distributeTx);
        batch.execute();

        if (this.props.onPaymentStarted) {
            this.props.onPaymentStarted();
        }
    }
}

export default VirtualChainSubscription;