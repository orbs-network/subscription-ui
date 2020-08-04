import React, { useCallback } from "react";
import { Page } from "../components/structure/Page";
import configs from "../configs";
import VirtualChainSubscription from "../VirtualChainSubscription";
import Web3 from "web3";
import { ContentFitting } from "../components/structure/ContentFitting";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainSubscriptionForm";
import { TVirtualChainSubscriptionPayload } from "../services/monthlySubscriptionPlanService/IMonthlySubscriptionPlanService";
import { useMonthlySubscriptionPlanService } from "../services/servicesHooks";
import { Typography } from "@material-ui/core";
import { useOrbsAccountStore } from "../store/storeHooks";

interface IProps {}

export const NewVCPage = React.memo<IProps>((props) => {
  const orbsAccountStore = useOrbsAccountStore();
  const monthlySubscriptionPlanService = useMonthlySubscriptionPlanService();
  const createVC = useCallback(
    async (
      virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload
    ) => {
      try {
        console.log(virtualChainSubscriptionPayload);
        // const res = await monthlySubscriptionPlanService.createANewVC(
        //   virtualChainSubscriptionPayload
        // );
        // console.log(res);
      } catch (e) {
        debugger;
      }
    },
    []
  );

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
          subscribeNewVC={async (virtualChainSubscriptionPayload) => {
            console.log(virtualChainSubscriptionPayload);
            createVC(virtualChainSubscriptionPayload);
          }}
        />
      </ContentFitting>
    </Page>
  );
});
