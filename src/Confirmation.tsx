import React from "react";
import Web3 from "web3";
import Typography from "@material-ui/core/Typography";
import { IConfig } from "./configs";

const TX_CONFIRMED = "confirmed";
const TX_PENDING = "pending";
const TX_FAILED = "failed";

interface ConfirmationProps {
  web3: Web3;
  config: IConfig;

  approveTxHash: string;
  subscribeTxHash: string;
  distributeTxHash: string; // FIXME remove for v2

  virtualChainId: string;

  onSuccess: (ok: boolean) => void;
}

interface ConfirmationState {
  countdown: number;
  countdownInterval?: any;
  confirmationInterval?: any;

  approveTxStatus: string;
  subscribeTxStatus: string;
  distributeTxStatus: string; // FIXME remove for v2
}

class Confirmation extends React.Component<
  ConfirmationProps,
  ConfirmationState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      countdown: 0,
      approveTxStatus: TX_PENDING,
      subscribeTxStatus: TX_PENDING,
      distributeTxStatus: TX_PENDING,
    };
  }

  getTxStatus(txReceipt: { status: boolean }): string {
    if (txReceipt) {
      return txReceipt.status ? TX_CONFIRMED : TX_FAILED;
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
      const approveTxReceipt = await web3.eth.getTransactionReceipt(
        this.props.approveTxHash
      );
      const subscribeTxReceipt = await web3.eth.getTransactionReceipt(
        this.props.subscribeTxHash
      );
      const distributeTxReceipt = await web3.eth.getTransactionReceipt(
        this.props.distributeTxHash
      );

      this.setState({
        approveTxStatus: this.getTxStatus(approveTxReceipt),
        subscribeTxStatus: this.getTxStatus(subscribeTxReceipt),
        distributeTxStatus: this.getTxStatus(distributeTxReceipt),
      });

      if (approveTxReceipt && subscribeTxReceipt && distributeTxReceipt) {
        clearInterval(confirmationInterval);
        clearInterval(countdownInterval);

        this.setState({
          confirmationInterval: undefined,
          countdownInterval: undefined,
        });

        this.props.onSuccess(this.verifySuccess());
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
    return `https://${
      config.network === "mainnet" ? "" : config.network + "."
    }etherscan.io/tx/${txHash}`;
    return `https://${
      config.network === "mainnet" ? "" : config.network + "."
    }etherscan.io/tx/${txHash}`;
  }

  verifySuccess() {
    const {
      approveTxStatus,
      subscribeTxStatus,
      distributeTxStatus,
    } = this.state;
    return (
      approveTxStatus === TX_CONFIRMED &&
      subscribeTxStatus === TX_CONFIRMED &&
      distributeTxStatus === TX_CONFIRMED
    );
  }

  render() {
    const {
      countdown,
      approveTxStatus,
      subscribeTxStatus,
      distributeTxStatus,
    } = this.state;
    const { approveTxHash, subscribeTxHash, distributeTxHash } = this.props;

    return (
      <div>
        {this.state.countdownInterval && (
          <Typography paragraph>
            Waiting for transaction confirmation for {countdown} seconds...
          </Typography>
        )}

        <Typography paragraph>
          ERC20 approval{" "}
          <a
            href={this.getEtherscanURL(approveTxHash!)}
            target="_blank"
            className="App-monospace"
          >
            {approveTxHash}
          </a>{" "}
          {approveTxStatus}
        </Typography>
        <Typography paragraph>
          Subscription{" "}
          <a
            href={this.getEtherscanURL(subscribeTxHash!)}
            target="_blank"
            className="App-monospace"
          >
            {subscribeTxHash}
          </a>{" "}
          {subscribeTxStatus}
        </Typography>
        <Typography paragraph>
          Fee distribution{" "}
          <a
            href={this.getEtherscanURL(distributeTxHash!)}
            target="_blank"
            className="App-monospace"
          >
            {distributeTxHash}
          </a>{" "}
          {distributeTxStatus}
        </Typography>
      </div>
    );
  }
}

export default Confirmation;
