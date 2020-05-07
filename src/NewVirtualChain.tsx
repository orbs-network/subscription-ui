import React from 'react';
import Button from "@material-ui/core/Button"
import Web3 from 'web3';
import { Typography, InputLabel, TextField, Select } from '@material-ui/core';

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

    create() {
        console.log(this.state)
    }
}

export default NewVirtualChain;