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
    countdownInterval?: any;
    confirmationInterval?: any;

    approveTxStatus: string;
    subscribeTxStatus: string;
}

class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            countdown: 0,
            approveTxStatus: "pending",
            subscribeTxStatus: "pending",
        }
    }

    componentDidMount() {
        this.setState({
            countdown: 0,
        });

        const countdownInterval = setInterval(() => {
            this.setState({
                countdown: this.state.countdown + 1,
            });
        }, 1000);

        const confirmationInterval = setInterval(async () => {
            const approveTxReceipt = await this.props.web3.eth.getTransactionReceipt(this.props.approveTxHash);
            const subscribeTxReceipt = await this.props.web3.eth.getTransactionReceipt(this.props.subscribeTxHash);

            console.log("approveTxReceipt", approveTxReceipt);
            console.log("subscribeTxReceipt", subscribeTxReceipt);

            // FIXME stop polling when one of the receipts is not empty
            this.setState({
                approveTxStatus: (approveTxReceipt && approveTxReceipt.status) ? "confirmed" : "pending",
                subscribeTxStatus: (subscribeTxReceipt && subscribeTxReceipt.status) ? "confirmed" : "pending",
            });
        }, 3000);

        this.setState({ countdownInterval, confirmationInterval });
    }

    componentWillUnmount() {
        clearInterval(this.state.countdownInterval);
        clearInterval(this.state.confirmationInterval);
    }

    getEtherscanURL(txHash: string): string {
        const { config } = this.props;
        return `https://${config.network === "mainnet" ? "" : config.network + "."}etherscan.io/tx/${txHash}`;
    }

    render() {
        const { countdown, approveTxStatus, subscribeTxStatus } = this.state;
        const { approveTxHash, subscribeTxHash } = this.props;

        return (
            <div>
                <Typography paragraph>Waiting for transaction confirmation for {countdown} seconds...</Typography>

                <Typography paragraph>ERC20 approval <a href={this.getEtherscanURL(approveTxHash!)} target="_blank" className="App-monospace">{approveTxHash}</a> is {approveTxStatus}
                </Typography>
                <Typography paragraph>Subscription <a href={this.getEtherscanURL(subscribeTxHash!)} target="_blank" className="App-monospace">{subscribeTxHash}</a> is {subscribeTxStatus}
                </Typography>
            </div>
        );
    }

}

export default Confirmation;