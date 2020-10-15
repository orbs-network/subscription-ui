import React, { useCallback, useState } from "react";
import { Page } from "../components/structure/Page";
import { ContentFitting } from "../components/structure/ContentFitting";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainSubscriptionForm";
import { useMonthlySubscriptionPlanService } from "../services/servicesHooks";
import { useOrbsAccountStore } from "../store/storeHooks";
import { weiOrbsFromFullOrbs } from "../cryptoUtils/unitConverter";
import { ActionConfirmationModal } from "../components/modals/ActionConfirmationModal";
import { useSnackbar } from "notistack";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { TVirtualChainSubscriptionPayload } from "@orbs-network/contracts-js";

interface IProps {}

export const NewVCPage = observer<React.FunctionComponent<IProps>>((props) => {
  const orbsAccountStore = useOrbsAccountStore();
  const history = useHistory();
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

  const setMSPContractAllowance = useCallback(
    (allowanceInFullOrbs: number) => {
      orbsAccountStore.setAllowanceForStakingContract(
        weiOrbsFromFullOrbs(allowanceInFullOrbs)
      );
    },
    [orbsAccountStore]
  );

  const createNewVc = useCallback(
    async (
      virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload
    ) => {
      try {
        const vcId = await orbsAccountStore.createNewVc(
          virtualChainSubscriptionPayload
        );
        enqueueSnackbar("VC Created !", { variant: "success" });

        history.push(`${ROUTES.vcCreated}/${vcId}`);
      } catch (e) {
        console.log(e);
        enqueueSnackbar(`TX Error !`, { variant: "error" });
      }
    },
    [enqueueSnackbar, history, orbsAccountStore]
  );

  const showCreateVcDialog = useCallback(
    async (
      virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload
    ) => {
      console.log(virtualChainSubscriptionPayload);
      setDialogTexts({
        title: `Create new virtual chain ${virtualChainSubscriptionPayload.name}`,
        content: 'Please click "Create" and accept the transaction.',
        acceptText: "Create",
        onCancelMessage: "VC creation canceled",
      });
      setShowModal(true);
      setOnDialogAccept(() => () =>
        createNewVc(virtualChainSubscriptionPayload)
      );

      try {
        // const res = await monthlySubscriptionPlanService.createANewVC(
        //   virtualChainSubscriptionPayload
        // );
        // console.log(res);
      } catch (e) {
        console.error(e);
      }
    },
    [createNewVc]
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
          subscribeNewVC={showCreateVcDialog}
          allowanceToMSPContract={orbsAccountStore.allowanceToMSPContract}
          setMSPContractAllowance={showSetMSPContractAllowanceDialog}
          monthlyRateInFullOrbs={
            orbsAccountStore.mspContractParameters.monthlyRateInFullOrbs
          }
        />
        <ActionConfirmationModal
          open={showModal}
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
