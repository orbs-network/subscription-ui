import React, { useCallback } from "react";
import { Page } from "../components/structure/Page";
import ExistingVirtualChain from "../ExistingVirtualChain";
import Web3 from "web3";
import configs from "../configs";
import { VcIdForm } from "../components/forms/VcIdForm";

interface IProps {}

export const ExistingVCPage = React.memo<IProps>((props) => {
  const onOpenVcClicked = useCallback((vcId: string) => {
    console.log(vcId);
  }, []);

  return (
    <Page>
      <VcIdForm onActionClick={onOpenVcClicked} actionButtonText={"Open"} />
      {/*<ExistingVirtualChain web3={{} as Web3} config={configs} />*/}
    </Page>
  );
});
