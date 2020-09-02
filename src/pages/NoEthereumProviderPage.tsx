import React, { useCallback } from "react";
import { CssBaseline, useTheme } from "@material-ui/core";
import { useBoolean } from "react-hanger";
import { Page } from "../components/structure/Page";
import { NoEthereumProviderSection } from "./NoEthereumProviderSection";
import {
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { baseTheme, HEADER_HEIGHT_REM } from "../theme/Theme";
import { Provider } from "mobx-react";
import { SnackbarProvider } from "notistack";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {}

// DEV_NOTE : The style to make this page looks good is copied from the 'App'
// TODO : O.L : We should encapsulate it better.

const useStyles = makeStyles((theme) => ({
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
    minHeight: `100%`,

    // Center the content
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const NoEthereumProviderPage = React.memo<IProps>((props) => {
  const classes = useStyles();
  const hasPressed = useBoolean(false);

  const installMetaMask = useCallback(() => {
    window.open("https://metamask.io/", "_blank");
    hasPressed.setTrue();
  }, [hasPressed]);

  return (
    <div className={classes.mainWrapper}>
      <main className={classes.appMain}>
        <Page>
          <NoEthereumProviderSection
            actionFunction={installMetaMask}
            pressedOnInstall={hasPressed.value}
            walletConnectionPhase={"install"}
          />
        </Page>
      </main>
    </div>
  );
});
