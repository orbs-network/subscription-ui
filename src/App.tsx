import React from "react";
import "./App.css";
import Connect from "./Connect";
import Web3 from "web3";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import VirtualChainSubscription from "./VirtualChainSubscription";
import ExistingVirtualChain from "./ExistingVirtualChain";
import configs from "./configs";
import { config } from "react-spring";
import { Header } from "./components/structure/header/Header";
import { HEADER_HEIGHT_REM } from "./theme/Theme";
import { Route, RouteProps, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewVCPage } from "./pages/NewVCPage";
import { ExistingVCPage } from "./pages/ExistingVCPage";
import { RecoverVCPage } from "./pages/RecoverVcPage";
import { ROUTES } from "./constants/routes";
import { VcCreationSuccessPage } from "./pages/VcCreationSuccessPage";

interface AppState {
  connected: boolean;
  web3?: Web3;

  newVirtualChain: boolean;
  existingVirtualChain: boolean;
}

const drawerWidth = 240;

const useStyles = withStyles((theme) => ({
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

// TODO : O.L : Make this a function.

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      connected: false,
      newVirtualChain: false,
      existingVirtualChain: false,
    };
  }

  async onEthereumEnabled(connected: boolean) {
    const web3 = new Web3((window as any).ethereum);

    this.setState({
      connected,
      web3,
    });
  }

  render() {
    const { classes } = this.props as any;

    return (
      <>
        <Header />
        <div className={classes.headerSeparator} />
        <div className={classes.mainWrapper}>
          <main className={classes.appMain}>
            <Switch>
              <Route exact path={ROUTES.newVc} component={NewVCPage} />
              <Route
                exact
                path={ROUTES.existingVc}
                component={ExistingVCPage}
              />
              <Route exact path={ROUTES.recoverVc} component={RecoverVCPage} />
              <Route
                path={`${ROUTES.vcCreated}/:vcId`}
                component={VcCreationSuccessPage}
              />
              <Route path="/" component={NewVCPage} />
            </Switch>
            {/*)}*/}
          </main>
        </div>
      </>
    );
  }
}

export default useStyles(App);
