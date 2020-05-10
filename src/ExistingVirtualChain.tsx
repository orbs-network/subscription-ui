import React from "react";
import Web3 from "web3";
import { InputLabel, TextField, Button } from '@material-ui/core';
import { Config } from "./Config";
import VirtualChainMetadata from "./VirtualChainMetadata";
import VirtualChainSubscription from "./VirtualChainSubscription";

interface ExistingVirtualChainProps {
    web3: Web3;
    config: Config;    
}

interface ExistingVirtualChainState {
    virtualChainId: string;
    description: string;
    opened: boolean;
    paymentStarted: boolean;
}

class ExistingVirtualChain extends React.Component<ExistingVirtualChainProps, ExistingVirtualChainState> {
    constructor(props: any) {
        super(props);

        this.state = {
            virtualChainId: "",
            description: "",
            opened: false,
            paymentStarted: false,
        }
    }

    render() {
        if (!this.state.opened) {
            return (<div>
                <form noValidate autoComplete="off">
                    <InputLabel htmlFor="vcid">Virtual Chain Id</InputLabel>
                    <TextField name="vcid" onChange={(event) => this.setState({ virtualChainId: this.parseVirtualChainId(event.target.value) })}></TextField>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={() => this.setState({ opened: true })}>Open</Button>
                </form>
            </div>)
        }

        return (<div>
            { !this.state.paymentStarted &&
                <VirtualChainMetadata web3={this.props.web3} config={this.props.config} virtualChainId={this.state.virtualChainId}
                    onMetadataUpdate={(metadata: any) => this.setState({ description: metadata.description })} />
            }
            { this.state.description && 
                <VirtualChainSubscription web3={this.props.web3} config={this.props.config}
                    virtualChainId={this.state.virtualChainId}
                    buttonLabel="Pay" 
                    subscriptionLabel="Payment"
                    description={this.state.description}
                    onPaymentStarted={() => this.setState({ paymentStarted: true })} />
            }
        </div>)
    }

    parseVirtualChainId(n: string): string {
        const zero32Bits = "0x0000000000000000000000000000000000000000000000000000000000000000";
        const nHex = this.props.web3.utils.numberToHex(Number(n)).slice(2);
        return zero32Bits.slice(0, zero32Bits.length - nHex.length) + nHex
    }
}

export default ExistingVirtualChain;