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
        {/*<AppBar position="fixed" className={classes.appBar}>*/}
        {/*  <Toolbar>*/}
        {/*    <Typography variant="h6" noWrap>*/}
        {/*      Orbs Virtual Chain Console*/}
        {/*    </Typography>*/}
        {/*  </Toolbar>*/}
        {/*</AppBar>*/}
        <Header />
        {/*<Drawer*/}
        {/*  className={classes.drawer}*/}
        {/*  variant="permanent"*/}
        {/*  classes={{*/}
        {/*    paper: classes.drawerPaper,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Toolbar />*/}
        {/*  <div className={classes.drawerContainer}>*/}
        {/*    <List>*/}
        {/*      <ListItem*/}
        {/*        button*/}
        {/*        selected={this.state.newVirtualChain}*/}
        {/*        onClick={() =>*/}
        {/*          this.setState({*/}
        {/*            newVirtualChain: true,*/}
        {/*            existingVirtualChain: false,*/}
        {/*          })*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <ListItemText primary="New Virtual Chain" />*/}
        {/*      </ListItem>*/}
        {/*      <ListItem*/}
        {/*        button*/}
        {/*        selected={this.state.existingVirtualChain}*/}
        {/*        onClick={() =>*/}
        {/*          this.setState({*/}
        {/*            newVirtualChain: false,*/}
        {/*            existingVirtualChain: true,*/}
        {/*          })*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <ListItemText primary="Existing Virtual Chain" />*/}
        {/*      </ListItem>*/}
        {/*      <ListItem button>*/}
        {/*        <ListItemText primary="Recover Virtual Chain" />*/}
        {/*      </ListItem>*/}
        {/*    </List>*/}
        {/*  </div>*/}
        {/*</Drawer>*/}
        <div className={classes.mainWrapper}>
          <main className={classes.appMain}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/new_vc" component={NewVCPage} />
              <Route exact path="/existing_vc" component={ExistingVCPage} />
              <Route exact path="/recover_vc" component={RecoverVCPage} />
            </Switch>
            {/*<Toolbar />*/}
            {/*{!this.state.connected && (*/}
            {/*  <Connect*/}
            {/*    onEthereumEnabled={(value: boolean) =>*/}
            {/*      this.onEthereumEnabled(value)*/}
            {/*    }*/}
            {/*  />*/}
            {/*)}*/}
            {/*{this.state.connected && this.state.newVirtualChain && (*/}
            {/*  <VirtualChainSubscription*/}
            {/*    web3={this.state.web3!}*/}
            {/*    config={configs}*/}
            {/*    virtualChainId="0x0000000000000000000000000000000000000000000000000000000000000001"*/}
            {/*    buttonLabel="Create"*/}
            {/*    subscriptionLabel="Initial subscription"*/}
            {/*  />*/}
            {/*)}*/}
            {/*{this.state.connected && this.state.existingVirtualChain && (*/}
            {/*  <ExistingVirtualChain web3={this.state.web3!} config={configs} />*/}
            {/*)}*/}
          </main>
        </div>
      </>
    );
  }
}

export default useStyles(App);
