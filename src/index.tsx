import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { AppWrapper } from "./AppWrapper";
import App from "./App";
import { NoEthereumProviderPage } from "./pages/NoEthereumProviderPage";

const hasEthereumProvider = !!(window as any).ethereum;

let AppComponent;

if (hasEthereumProvider) {
  AppComponent = <App />;
} else {
  AppComponent = <NoEthereumProviderPage />;
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper appComponent={AppComponent} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
