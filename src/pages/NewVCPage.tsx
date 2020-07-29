import React from "react";
import { Page } from "../components/structure/Page";
import configs from "../configs";
import VirtualChainSubscription from "../VirtualChainSubscription";
import Web3 from "web3";
import { ContentFitting } from "../components/structure/ContentFitting";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainSubscriptionForm";

interface IProps {}

export const NewVCPage = React.memo<IProps>((props) => {
  return (
    <Page>
      <ContentFitting>
        {/*<VirtualChainSubscription*/}
        {/*  web3={{} as Web3}*/}
        {/*  config={configs}*/}
        {/*  virtualChainId="0x0000000000000000000000000000000000000000000000000000000000000001"*/}
        {/*  buttonLabel="Create"*/}
        {/*  subscriptionLabel="Initial subscription"*/}
        {/*/>*/}
        <VirtualChainSubscriptionForm
          subscribeNewVC={(virtualChainSubscriptionPayload) =>
            console.log(virtualChainSubscriptionPayload)
          }
        />
      </ContentFitting>
    </Page>
  );
});
