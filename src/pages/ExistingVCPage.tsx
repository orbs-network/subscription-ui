import React from "react";
import { Page } from "../components/structure/Page";
import ExistingVirtualChain from "../ExistingVirtualChain";
import Web3 from "web3";
import configs from "../configs";

interface IProps {}

export const ExistingVCPage = React.memo<IProps>((props) => {
  return (
    <Page>
      <ExistingVirtualChain web3={{} as Web3} config={configs} />
    </Page>
  );
});
