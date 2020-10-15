import React, { useCallback, useMemo, useState } from "react";
import { Page } from "../components/structure/Page";
import { VcIdForm } from "../components/forms/VcIdForm";
import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainDetailsForm";
import { useOrbsAccountStore } from "../store/storeHooks";
import { useSnackbar } from "notistack";
import { VcSubscriptionExtensionForm } from "../components/forms/VcSubscriptionExtensionForm";
import { ActionConfirmationModal } from "../components/modals/ActionConfirmationModal";
import { weiOrbsFromFullOrbs } from "../cryptoUtils/unitConverter";
import { ROUTES } from "../constants/routes";
import { useHistory } from "react-router-dom";
import { useVcDataHook } from "../services/subscriptionsServiceHooks";
import { TVirtualChainSubscriptionExtensionPayload } from "@orbs-network/contracts-js";

interface IProps {}

export const ExistingVCPage = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const orbsAccountStore = useOrbsAccountStore();
    const [vcId, setVcId] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const { vcData, errorFindingVc, isLoading } = useVcDataHook(vcId);
    const history = useHistory();

    // TODO : ORL : The whole modal logic is duplicated from 'NewVcPage' - Unite them properly
    const [showModal, setShowModal] = useState(false);
    const [onDialogAccept, setOnDialogAccept] = useState(() => () =>
      console.log("Accepted")
    );
    const [dialogTexts, setDialogTexts] = useState<{
      title: string;
      content: string;
      acceptText?: string;
      cancelText?: string;
      onCancelMessage?: string;
    }>({ title: "", content: "" });

    const onOpenVcClicked = useCallback((vcId: string) => {
      setVcId(vcId);
    }, []);

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

    const extendVcSubscription = useCallback(
      async (amountInFullOrbs: number) => {
        const virtualChainSubscriptionExtensionPayload: TVirtualChainSubscriptionExtensionPayload = {
          amountInFullOrbs,
          vcId,
        };

        try {
          await orbsAccountStore.extendExistingVcSubscription(
            virtualChainSubscriptionExtensionPayload
          );
          enqueueSnackbar("Subscription extended !", { variant: "success" });
          history.push(`${ROUTES.vcExtended}/${vcId}`);
        } catch (e) {
          console.error(e);
          enqueueSnackbar(`TX Error !`, { variant: "error" });
        }
      },
      [enqueueSnackbar, history, orbsAccountStore, vcId]
    );

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
            <VcSubscriptionExtensionForm
              monthlyRateInFullOrbs={
                orbsAccountStore.mspContractParameters.monthlyRateInFullOrbs
              }
              setMSPContractAllowance={showSetMSPContractAllowanceDialog}
              allowanceToMSPContract={orbsAccountStore.allowanceToMSPContract}
              extendVcSubscription={extendVcSubscription}
            />
          </>
        );
      }
    }, [
      errorFindingVc,
      extendVcSubscription,
      isLoading,
      orbsAccountStore.allowanceToMSPContract,
      orbsAccountStore.mspContractParameters.monthlyRateInFullOrbs,
      showSelectVcForm,
      showSetMSPContractAllowanceDialog,
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
      </Page>
    );
  }
);
