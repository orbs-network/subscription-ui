import React from "react";
import Web3 from "web3";
import Typography from "@material-ui/core/Typography";
import { Config } from "./Config";

interface ConfirmationProps {
    web3: Web3;
    config: Config;

    approveTxHash: string;
    subscribeTxHash: string;
}

interface ConfirmationState {
    countdown: number;
    interval?: any;
}

class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            countdown: 0,
        }
    }

    componentDidMount() {
        this.setState({
            countdown: 0,
        });

        const interval = setInterval(() => {
            this.setState({
                countdown: this.state.countdown + 1,
            });
        }, 1000);

        this.setState({ interval });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    getEtherscanURL(txHash: string): string {
        const { config } = this.props;
        return `https://${config.network === "mainnet" ? "" : config.network + "."}etherscan.io/tx/${txHash}`;
    }

    render() {
        const { countdown } = this.state;
        const { approveTxHash, subscribeTxHash } = this.props;

        return (
            <div>
                <Typography paragraph>Waiting for transaction confirmation for {countdown} seconds...</Typography>

                <Typography paragraph>ERC20 approval transaction: 
                    <a href={this.getEtherscanURL(approveTxHash!)}>{approveTxHash}</a>
                </Typography>
                <Typography paragraph>Subscription transaction: 
                    <a href={this.getEtherscanURL(subscribeTxHash!)}>{subscribeTxHash}</a>
                </Typography>
            </div>
        );
    }

}

export default Confirmation;