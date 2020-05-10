import React from "react";
import Web3 from "web3";
import Typography from "@material-ui/core/Typography";
import { Config } from "./Config";

const TX_CONFIRMED = "confirmed";
const TX_PENDING = "pending";
const TX_FAILED = "failed";

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
            approveTxStatus: TX_PENDING,
            subscribeTxStatus: TX_PENDING,
        }
    }

    getTxStatus(txReceipt: {status: boolean}): string {
        if (txReceipt) {
            return txReceipt.status ? TX_CONFIRMED: TX_FAILED;
        }

        return TX_PENDING;
    }

    componentDidMount() {
        const { web3 } = this.props;

        this.setState({
            countdown: 0,
        });

        const countdownInterval = setInterval(() => {
            this.setState({
                countdown: this.state.countdown + 1,
            });
        }, 1000);

        const confirmationInterval = setInterval(async () => {
            const approveTxReceipt = await web3.eth.getTransactionReceipt(this.props.approveTxHash);
            const subscribeTxReceipt = await web3.eth.getTransactionReceipt(this.props.subscribeTxHash);

            this.setState({
                approveTxStatus: this.getTxStatus(approveTxReceipt),
                subscribeTxStatus: this.getTxStatus(subscribeTxReceipt),
            });

            if (approveTxReceipt && subscribeTxReceipt) {
                clearInterval(confirmationInterval);
                clearInterval(countdownInterval);

                this.setState({
                    confirmationInterval: undefined,
                    countdownInterval: undefined,
                })
            }
        }, 3000);

        this.setState({ 
            countdownInterval,
            confirmationInterval,
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.countdownInterval);
        clearInterval(this.state.confirmationInterval);
    }

    getEtherscanURL(txHash: string): string {
        const { config } = this.props;
        return `https://${config.network === "mainnet" ? "" : config.network + "."}etherscan.io/tx/${txHash}`;
    }

    verifySuccess() {
        const { approveTxStatus, subscribeTxStatus } = this.state;
        return approveTxStatus === TX_CONFIRMED && subscribeTxStatus === TX_CONFIRMED;
    }

    render() {
        const { countdown, approveTxStatus, subscribeTxStatus } = this.state;
        const { approveTxHash, subscribeTxHash } = this.props;

        return (
            <div>
                { this.state.countdownInterval &&
                    <Typography paragraph>Waiting for transaction confirmation for {countdown} seconds...</Typography>
                }

                <Typography paragraph>ERC20 approval <a href={this.getEtherscanURL(approveTxHash!)} target="_blank" className="App-monospace">{approveTxHash}</a> {approveTxStatus}
                </Typography>
                <Typography paragraph>Subscription <a href={this.getEtherscanURL(subscribeTxHash!)} target="_blank" className="App-monospace">{subscribeTxHash}</a> {subscribeTxStatus}
                </Typography>
                {
                    this.verifySuccess() &&
                    <Typography paragraph>Success!</Typography>
                }
            </div>
        );
    }

}

export default Confirmation;