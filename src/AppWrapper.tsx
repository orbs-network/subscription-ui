import React from "react";
import App from "./App";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { Provider } from "mobx-react";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { baseTheme } from "./theme/Theme";

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
      <Provider {...stores} {...services}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={baseTheme}>
            <App />
          </ThemeProvider>
        </StylesProvider>
      </Provider>
    </>
  );
});
