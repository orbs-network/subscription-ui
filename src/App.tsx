import React from 'react';
import logo from './logo.svg';
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
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Styles } from '@material-ui/core/styles/withStyles';

interface AppState {
  connected: boolean;
  web3?: Web3;
  account?: string;
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
    };
    
  }
  
  async onEthereumEnabled(connected: boolean) {
    const web3 = new Web3((window as any).ethereum);
    const account = (await web3.eth.getAccounts())[0];

    this.setState({
      connected,
      web3,
      account,
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
              {['New Virtual Chain', 'Existing Virtual Chain', 'Recover Virtual CHain'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          < Toolbar />
          {
            this.state.connected && this.state.account &&
            <Typography paragraph>Connected as {this.state.account}</Typography>
          }
          { !this.state.connected &&
            <Typography paragraph>
              <Connect onEthereumEnabled={(value: boolean) => this.onEthereumEnabled(value)}/>
            </Typography>
          }
        </main>
      </div>
    );
  }
}

export default useStyles(App);
