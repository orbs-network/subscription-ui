import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect from "./Connect";
import Web3 from "web3";

interface AppState {
  connected: boolean;
  web3?: Web3;
  account?: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      connected: false,
    };
    
  }
  
  async onEthereumEnabled(connected: boolean) {
    const web3 = new Web3((window as any).ethereum);
    const account = (await web3.eth.getAccounts())[0];

    this.setState({
      connected,
      web3,
      account,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Orbs Virtual Chain Console
        </header>
        { !this.state.connected &&
          <Connect onEthereumEnabled={(value: boolean) => this.onEthereumEnabled(value)}/>
        }
        {
          this.state.connected && this.state.account &&
          <p>Connected as {this.state.account}</p>
        }
      </div>
    );
  }
}

export default App;
