import React, { useCallback, useState } from "react";
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
import { weiOrbsFromFullOrbs } from "../cryptoUtils/unitConverter";
import { ActionConfirmationModal } from "../components/modals/ActionConfirmationModal";
import { useSnackbar } from "notistack";
import { observer } from "mobx-react";

interface IProps {}

export const NewVCPage = observer<React.FunctionComponent<IProps>>((props) => {
  const orbsAccountStore = useOrbsAccountStore();
  const [runningTx, setRunningTx] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dialogTexts, setDialogTexts] = useState<{
    title: string;
    content: string;
    acceptText?: string;
    cancelText?: string;
    onCancelMessage?: string;
  }>({ title: "", content: "" });
  const [onDialogAccept, setOnDialogAccept] = useState(() => () =>
    console.log("Accepted")
  );

  const monthlySubscriptionPlanService = useMonthlySubscriptionPlanService();

  const { enqueueSnackbar } = useSnackbar();

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

  const setMSPContractAllowance = useCallback(
    (allowanceInFullOrbs: number) => {
      orbsAccountStore.setAllowanceForStakingContract(
        weiOrbsFromFullOrbs(allowanceInFullOrbs)
      );
    },
    [orbsAccountStore]
  );
  const showSetMSPContractAllowanceDialog = useCallback(
    (allowanceInFullOrbs: number) => {
      setDialogTexts({
        title: `Set allowance of ${allowanceInFullOrbs} ORBS`,
        content: 'Please click "Allow" and accept the transaction.',
        acceptText: "Allow",
        onCancelMessage: "Action canceled",
      });
      setShowModal(true);
      setOnDialogAccept(() => () =>
        setMSPContractAllowance(allowanceInFullOrbs)
      );
    },
    [setMSPContractAllowance]
  );

  console.log("contract allowance", orbsAccountStore.allowanceToMSPContract);

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
          allowanceToMSPContract={orbsAccountStore.allowanceToMSPContract}
          setMSPContractAllowance={showSetMSPContractAllowanceDialog}
        />
        <ActionConfirmationModal
          open={showModal}
          // handleClose={() => setShowModal(false)}
          onAccept={() => {
            setShowModal(false);
            onDialogAccept();
          }}
          onCancel={() => {
            setShowModal(false);
            if (dialogTexts.onCancelMessage) {
              enqueueSnackbar(dialogTexts.onCancelMessage, {
                variant: "info",
                preventDuplicate: true,
              });
            }
          }}
          title={dialogTexts.title}
          contentText={dialogTexts.content}
        />
      </ContentFitting>
    </Page>
  );
});
