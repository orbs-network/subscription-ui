import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect from "./Connect";

interface AppState {
  connected: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      connected: false,
    };
    
  }
  
  async onEthereumEnabled(enabled: boolean) {
    this.setState({
      connected: enabled,
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
          this.state.connected &&
          <p>Connected!</p>
        }
      </div>
    );
  }
}

export default App;
