import React from "react";
import Button from "@material-ui/core/Button"
import Web3 from "web3";
import { Typography, InputLabel, TextField, Select } from '@material-ui/core';
import ERC20ABI from "./abi/ERC20.abi.json";
import SubscriptionABI from "./abi/Subscription.abi.json";
import { RopstenConfig } from "./Config";
import Confirmation from "./Confirmation";

interface NewVirtualChainProps {
    web3: Web3;
}

interface NewVirtualChainState {
    description: string;
    subscriptionAmount: number;

    approveTxHash?: string;
    subscribeTxHash?: string;
}

const DEFAULT_SUBSCRIPTION_PRICE = 6200; // fixme move to config
const config = RopstenConfig; // lift up

class NewVirtualChain extends React.Component<NewVirtualChainProps, NewVirtualChainState> {
    constructor(props: any) {
        super(props);

        this.state = {
            description: "",
            subscriptionAmount: DEFAULT_SUBSCRIPTION_PRICE,
        }
    }

    hasPendingTransactions(): boolean {
        return (this.state.approveTxHash || this.state.subscribeTxHash) !== undefined;
    }

    render() {
        if (!this.hasPendingTransactions()) {
            return (
                <form noValidate autoComplete="off">
                    <Typography variant="h4">New Virtual Chain</Typography>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField name="description" onChange={(event) => this.setState({
                        description: event.target.value,
                    })}/>
                    <br/>
                    <br/>

                    <InputLabel htmlFor="subscription">Initial Subscription</InputLabel>
                    <Select
                        native
                        value={this.state.subscriptionAmount}
                        onChange={(event) => this.setState({
                            subscriptionAmount: Number(event.target.value),
                        })}
                        name="subscription"
                        >
                        <option value={DEFAULT_SUBSCRIPTION_PRICE}>One month - {DEFAULT_SUBSCRIPTION_PRICE} ORBS</option>
                        <option value={DEFAULT_SUBSCRIPTION_PRICE*2}>Two months - {DEFAULT_SUBSCRIPTION_PRICE*2} ORBS</option>
                        <option value={DEFAULT_SUBSCRIPTION_PRICE*3}>Three months - {DEFAULT_SUBSCRIPTION_PRICE*3} ORBS</option>
                    </Select>

                    <br/><br/>
                    <Button variant="contained" color="primary" onClick={() => this.create()}>Create</Button>
                </form>
            )
        } else {
            return (
                <Confirmation 
                    web3={this.props.web3} 
                    config={config}
                    approveTxHash={this.state.approveTxHash!}
                    subscribeTxHash={this.state.subscribeTxHash!}
                />
            )
        }
    }

    async create() {
        console.log(this.state)

        const { web3 } = this.props;
        const from = (await web3.eth.getAccounts())[0];

        const erc20 = new web3.eth.Contract(ERC20ABI as any, config.erc20Address);
        const subscription = new web3.eth.Contract(SubscriptionABI as any, config.subscriptionAddress);

        const approveTx = erc20.methods.approve(
            config.subscriptionAddress, 
            this.state.subscriptionAmount
        ).send.request({ from }, (error: any, approveTxHash: string) => {
            this.setState({ approveTxHash });
        });

        const subscribeTx = subscription.methods.subscribeForCurrentMonth(
            "0x0000000000000000000000000000000000000000000000000000000000000001",
            this.state.description,
            this.state.subscriptionAmount
        ).send.request({ from }, (error: any, subscribeTxHash: string) => {
            this.setState({ subscribeTxHash })
        });

        const batch = new web3.BatchRequest();
        batch.add(approveTx);
        batch.add(subscribeTx);
        batch.execute();
    }
}

export default NewVirtualChain;