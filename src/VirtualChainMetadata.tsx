import React from "react";
import Web3 from "web3";
import { InputLabel, TextField } from '@material-ui/core';
import SubscriptionABI from "./abi/Subscription.abi.json";
import { Config } from "./Config";

interface VirtualChainMetadataProps {
    web3: Web3;
    config: Config;
    virtualChainId: string;
}

interface VirtualChainMetadataState {
    description: string;
    paidTill: number;
}

const SECONDS_IN_MONTH = 2592000;

class VirtualChainMetadata extends React.Component<VirtualChainMetadataProps, VirtualChainMetadataState> {
    constructor(props: any) {
        super(props);

        this.state = {
            description: "",
            paidTill: 0,
        }
    }

    async componentDidMount() {
        const { web3, config, virtualChainId } = this.props;
        const subscription = new web3.eth.Contract(SubscriptionABI as any, config.subscriptionAddress);

        const data = await subscription.methods.getSubscriptionData(virtualChainId).call();
        const profile = data[1];
        const startTime = (Number(data[2]) + SECONDS_IN_MONTH) * 1000;

        this.setState({
            description: profile,
            paidTill: startTime,
        });
    }

    render() {
        const { virtualChainId } = this.props;
        const { description, paidTill } = this.state;

        if (!description || !paidTill) {
            return (<div>Virtual Chain ID not found</div>);
        }

        return (
            <form noValidate autoComplete="off">
                <InputLabel htmlFor="vcid">Virtual Chain Id</InputLabel>
                <TextField name="vcid" value={BigInt(virtualChainId).toString()} disabled></TextField>
                <br/>
                <br/>
                <InputLabel htmlFor="description">Description</InputLabel>
                <TextField name="description" value={description} disabled></TextField>
                <br/>
                <br/>
                <InputLabel htmlFor="paid-till">Paid Untill</InputLabel>
                <TextField name="paid-till" value={new Date(paidTill)} disabled></TextField>
            </form>
        )        
    }

}

export default VirtualChainMetadata;