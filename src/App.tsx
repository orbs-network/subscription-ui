import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect from "./Connect";

const state = {
  connected: false,
};

async function onEthereumEnabled(enabled: boolean) {
  state.connected = enabled;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Orbs Virtual Chain Console
      </header>
      { !state.connected &&
        <Connect onEthereumEnabled={onEthereumEnabled}/>
      }
      {
        state.connected &&
        <p>Connected!</p>
      }
    </div>
  );
}

export default App;
