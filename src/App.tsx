import React, { useMemo } from "react";
import "./App.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Header } from "./components/structure/header/Header";
import { HEADER_HEIGHT_REM } from "./theme/Theme";
import { Route, RouteProps, Switch } from "react-router-dom";
import { NewVCPage } from "./pages/NewVCPage";
import { ExistingVCPage } from "./pages/ExistingVCPage";
import { RecoverVCPage } from "./pages/RecoverVcPage";
import { ROUTES } from "./constants/routes";
import { VcCreationSuccessPage } from "./pages/VcCreationSuccessPage";
import { VcExtensionSuccessPage } from "./pages/VcExtensionSuccessPage";
import { observer } from "mobx-react";
import { useCryptoWalletIntegrationStore } from "./store/storeHooks";
import { Page } from "./components/structure/Page";
import { ContentFitting } from "./components/structure/ContentFitting";
import { NoEthereumProviderSection } from "./pages/NoEthereumProviderSection";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appMain: {
    height: "100%",
    maxWidth: "90%",
    boxSizing: "border-box",
    padding: theme.spacing(2),
  },

  headerSeparator: {
    height: `${HEADER_HEIGHT_REM}rem`,
  },

  mainWrapper: {
    backgroundColor: "#06142e",
    backgroundRepeat: "repeat-y",
    backgroundImage:
      "url(https://www.orbs.com/wp-content/uploads/2019/02/technology-background1.png)",
    backgroundAttachment: "scroll",
    backgroundPosition: "top center",
    // minHeight: `calc(100% - ${HEADER_HEIGHT_REM}rem)`,
    minHeight: `calc(100% - ${HEADER_HEIGHT_REM}rem)`,

    // Center the content
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

const App = observer(() => {
  const classes = useStyles();

  const theme = useTheme();
  console.log(theme.palette.secondary);
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  const isConnected = cryptoWalletIntegrationStore.isConnectedToWallet;
  console.log({ isConnected });

  const appContent = useMemo(() => {
    if (!isConnected) {
      return (
        <Page>
          <NoEthereumProviderSection
            walletConnectionPhase={"connect"}
            actionFunction={() => cryptoWalletIntegrationStore.askToConnect()}
          />
        </Page>
      );
    } else {
      return (
        <Switch>
          <Route exact path={ROUTES.newVc} component={NewVCPage} />
          <Route exact path={ROUTES.existingVc} component={ExistingVCPage} />
          <Route exact path={ROUTES.recoverVc} component={RecoverVCPage} />
          <Route
            path={`${ROUTES.vcCreated}/:vcId`}
            component={VcCreationSuccessPage}
          />
          <Route
            path={`${ROUTES.vcExtended}/:vcId`}
            component={VcExtensionSuccessPage}
          />
          <Route path="/" component={NewVCPage} />
        </Switch>
      );
    }
  }, [cryptoWalletIntegrationStore, isConnected]);

  return (
    <>
      <Header />
      <div className={classes.headerSeparator} />
      <div className={classes.mainWrapper}>
        <main className={classes.appMain}>{appContent}</main>
      </div>
    </>
  );
});

export default App;
