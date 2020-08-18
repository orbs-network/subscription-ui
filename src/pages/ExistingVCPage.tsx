import React, { useCallback, useMemo, useState } from "react";
import { Page } from "../components/structure/Page";
import ExistingVirtualChain from "../ExistingVirtualChain";
import Web3 from "web3";
import configs from "../configs";
import { VcIdForm } from "../components/forms/VcIdForm";
import { useVcDataHook } from "../services/subscriptionService/subscriptionServiceHooks";
import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainDetailsForm";

interface IProps {}

export const ExistingVCPage = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const [vcId, setVcId] = useState("");
    const { vcData, errorFindingVc, isLoading } = useVcDataHook(vcId);

    const onOpenVcClicked = useCallback((vcId: string) => {
      setVcId(vcId);
    }, []);

    const showSelectVcForm = vcId.length === 0;

    const vcContent = useMemo(() => {
      if (showSelectVcForm) {
        return null;
      } else if (isLoading) {
        return <Typography>Loading...</Typography>;
      } else if (errorFindingVc) {
        return (
          <Typography color={"error"}>
            Error finding Virtual Chain {vcId}
          </Typography>
        );
      } else {
        return (
          <>
            <br />
            <VirtualChainSubscriptionForm
              paidUntil={vcData.payedUntil}
              vcName={vcData.name}
              vcId={vcData.id}
            />
          </>
        );
      }
    }, [
      errorFindingVc,
      isLoading,
      showSelectVcForm,
      vcData.id,
      vcData.name,
      vcData.payedUntil,
      vcId,
    ]);

    return (
      <Page>
        {showSelectVcForm && (
          <VcIdForm onActionClick={onOpenVcClicked} actionButtonText={"Open"} />
        )}
        {/*<ExistingVirtualChain web3={{} as Web3} config={configs} />*/}
        {vcContent}
      </Page>
    );
  }
);
