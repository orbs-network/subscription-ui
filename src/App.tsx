import React from 'react';
import './App.css';
import Connect from "./Connect";
import Web3 from "web3";

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NewVirtualChain from './NewVirtualChain';
import { Config, RopstenConfig } from './Config';

interface AppState {
  connected: boolean;
  web3?: Web3;
  config: Config;

  newVirtualChain: boolean;
}

const drawerWidth = 240;

const useStyles = withStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      connected: false,
      newVirtualChain: false,

      config: RopstenConfig
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
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
            Orbs Virtual Chain Console
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button>
                <ListItemText primary="New Virtual Chain" onClick={() => this.setState({
                  newVirtualChain: true,
                })} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Existing Virtual Chain" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Recover Virtual CHain" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          < Toolbar />
          { !this.state.connected &&
            <Connect onEthereumEnabled={(value: boolean) => this.onEthereumEnabled(value)}/>
          }
          { this.state.connected && this.state.newVirtualChain &&
            <NewVirtualChain web3={this.state.web3!} config={this.state.config} />
          }
        </main>
      </div>
    );
  }
}

export default useStyles(App);
