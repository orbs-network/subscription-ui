import React from 'react';
import Button from '@material-ui/core/Button';

interface ConnectProps {
    onEthereumEnabled: (value: boolean) => Promise<void>;
}

interface ConnectState extends ConnectProps {
    ethereumAvailable: boolean;
    ethereumEnabled: boolean;
    ethereum: any;
}

class Connect extends React.Component<ConnectProps, ConnectState> {
    constructor(props: any) {
        super(props);
        const ethereum = (window as any).ethereum as any;

        this.state = {
            ethereum: ethereum,
            ethereumAvailable: ethereum !== undefined,
            ethereumEnabled: false,
            onEthereumEnabled: props.onEthereumEnabled,
        }
    }

    render() {
        if (!this.state.ethereumAvailable) {
            return (
                <div>
                    <p>An Ethereum wallet is required.</p>
                    <p>On desktop, use a web3 browser extension like Metamask.</p>
                    <p>On mobile, use a mobile app wallet that supports web3 like status.im, imToken or TrustWallet.</p>
                </div>
            );
        }

        return (
            <div>
                <p>An Ethereum wallet is required.</p>
                <Button variant="contained" color="primary" onClick={() => this.connect()}>Connect wallet</Button>
            </div>
        )
    }

    async connect() {
        try {
            await this.state.ethereum.enable();
            this.state.onEthereumEnabled(true);
        } catch (e) {
            console.log(e);
        }
        
    }
}

export default Connect;