import React from "react";
import App from "./App";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { Provider } from "mobx-react";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { baseTheme } from "./theme/Theme";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

interface IProps {}

configureMobx();

const ethereumProvider = (window as any).ethereum;
const services = buildServices(ethereumProvider);
const stores = getStores(
  services.cryptoWalletIntegrationService,
  services.subscriptionService
);

export const AppWrapper = React.memo<IProps>((props) => {
  const { children } = props;
  return (
    <>
      <Router>
        <Provider {...stores} {...services}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={baseTheme}>
              <SnackbarProvider maxSnack={3}>
                <App />
                <CssBaseline />
              </SnackbarProvider>
            </ThemeProvider>
          </StylesProvider>
        </Provider>
      </Router>
    </>
  );
});
