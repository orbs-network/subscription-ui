import React, { useCallback } from "react";
import { CssBaseline, useTheme } from "@material-ui/core";
import { useBoolean } from "react-hanger";
import { Page } from "../components/structure/Page";
import { NoEthereumProviderSection } from "./NoEthereumProviderSection";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {}

export const NoEthereumProviderPage = React.memo<IProps>((props) => {
  const hasPressed = useBoolean(false);

  const installMetaMask = useCallback(() => {
    window.open("https://metamask.io/", "_blank");
    hasPressed.setTrue();
  }, [hasPressed]);

  return (
    <Page>
      <NoEthereumProviderSection
        actionFunction={installMetaMask}
        pressedOnInstall={hasPressed.value}
        walletConnectionPhase={"install"}
      />
    </Page>
  );
});
