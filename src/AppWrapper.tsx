import React from "react";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { Provider } from "mobx-react";
import {
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { baseTheme } from "./theme/Theme";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import configs from "./configs";

interface IProps {
  appComponent: React.ReactNode;
}

configureMobx();

const useStyles = makeStyles((theme) => ({
  snackbarInfo: {
    backgroundColor: baseTheme.palette.primary.dark,
    color: theme.palette.getContrastText(baseTheme.palette.primary.dark),
  },
}));

const ethereumProvider = (window as any).ethereum;
const services = buildServices(ethereumProvider);
const stores = getStores(
  services.cryptoWalletIntegrationService,
  services.subscriptionsService,
  services.orbsTokenService,
  services.monthlySubscriptionPlanService
);

export const AppWrapper = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { children, appComponent } = props;
  return (
    <>
      <Router basename={configs.urlBase}>
        <Provider {...stores} {...services}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={baseTheme}>
              <SnackbarProvider
                maxSnack={3}
                classes={{ variantInfo: classes.snackbarInfo }}
              >
                {appComponent}
                <CssBaseline />
              </SnackbarProvider>
            </ThemeProvider>
          </StylesProvider>
        </Provider>
      </Router>
    </>
  );
});
