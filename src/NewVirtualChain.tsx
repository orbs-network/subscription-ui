import React from 'react';
import Button from "@material-ui/core/Button"
import Web3 from 'web3';
import { Typography, InputLabel, TextField, Select } from '@material-ui/core';
import ERC20ABI from "./abi/ERC20.abi.json";
import SubscriptionABI from "./abi/Subscription.abi.json";
import { RopstenConfig } from "./Config";

interface NewVirtualChainProps {
    web3: Web3;
}

interface NewVirtualChainState extends NewVirtualChainProps {
    description: string;
    subscriptionAmount: number;
}

const DEFAULT_SUBSCRIPTION_PRICE = 6200;

class NewVirtualChain extends React.Component<NewVirtualChainProps, NewVirtualChainState> {
    constructor(props: any) {
        super(props);

        this.state = {
            web3: props.web3,
            description: "",
            subscriptionAmount: DEFAULT_SUBSCRIPTION_PRICE,
        }
    }

    render() {
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
    }

    async create() {
        console.log(this.state)

        const { web3 } = this.state;
        const from = (await web3.eth.getAccounts())[0];

        const config = RopstenConfig;
        const erc20 = new web3.eth.Contract(ERC20ABI as any, config.erc20Address);
        const subscription = new web3.eth.Contract(SubscriptionABI as any, config.subscriptionAddress);

        const approveTx = await erc20.methods.approve(config.subscriptionAddress, this.state.subscriptionAmount).send({ from });
        console.log(approveTx);

        const subscribeTx = await subscription.methods.subscribeForCurrentMonth(
            "0x0000000000000000000000000000000000000000000000000000000000000001",
            this.state.description,
            this.state.subscriptionAmount
        ).send({ from });
        console.log(subscribeTx);
    }
}

export default NewVirtualChain;