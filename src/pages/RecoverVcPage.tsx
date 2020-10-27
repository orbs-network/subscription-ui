import React, { useCallback, useEffect, useState } from "react";
import { Page } from "../components/structure/Page";
import { useSubscriptionsService } from "../services/servicesHooks";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../store/storeHooks";
import { observer } from "mobx-react";
import { ActionButton } from "../components/ActionButton/ActionButton";
import { InTextLink } from "../components/InTextLink";
import { ROUTES } from "../constants/routes";
import { Typography } from "@material-ui/core";
import {
  VC_GIST_CARD_WIDTH_REM,
  VcGistCard,
} from "../components/VcGistCard/VcGistCard";
import { TReadVcDataResponse } from "@orbs-network/contracts-js";
import { useHistory } from "react-router-dom";

interface IProps {}

const NO_DATA_VC_RESPONSE: TReadVcDataResponse = {
  tier: "",
  rate: "",
  genRefTime: "",
  isCertified: false,
  owner: "",
  deploymentSubset: "",
  expiresAt: "",
  name: "",
};

export const RecoverVCPage = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const subscriptionsService = useSubscriptionsService();
    const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
    const orbsAccountStore = useOrbsAccountStore();

    const [hasError, setHasErrors] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const hasAnyVcs = orbsAccountStore.vcCreationEvents.length > 0;

    const history = useHistory();

    const onOpenPageClick = useCallback(
      (vcId: string) => {
        history.push(`${ROUTES.existingVc}?vcId=${vcId}`);
      },
      [history]
    );

    const readAndSetVcs = useCallback(
      async (address: string) => {
        console.log(`Looking for vcs for ${address}`);

        const createdVcs = await subscriptionsService.readVcCreatedEvents(
          address
        );

        console.log({ createdVcs });

        orbsAccountStore.setVcCreationEventsAndUpdateVcsData(createdVcs);
      },
      [orbsAccountStore, subscriptionsService]
    );

    const readAndSetVcsAndState = useCallback(
      async (address: string) => {
        if (!address) {
          return;
        }

        setIsReading(true);

        try {
          await readAndSetVcs(cryptoWalletIntegrationStore.mainAddress);
        } catch (e) {
          console.error(`Error while set-n-read vcs " ${e}`);
          setHasErrors(true);
        } finally {
          setIsReading(false);
        }
      },
      [cryptoWalletIntegrationStore.mainAddress, readAndSetVcs]
    );

    useEffect(() => {
      // DEV_NOTE : Prevent re-seraching after already has data.
      if (orbsAccountStore.vcCreationEvents.length) {
        return;
      }

      console.log(
        `Runn effect for ${cryptoWalletIntegrationStore.mainAddress}`
      );

      readAndSetVcsAndState(cryptoWalletIntegrationStore.mainAddress);
    }, [
      cryptoWalletIntegrationStore.mainAddress,
      orbsAccountStore.vcCreationEvents.length,
      readAndSetVcsAndState,
    ]);

    if (isReading) {
      return (
        <Page>
          <Typography variant={"h4"}>Looking for VCs...</Typography>
        </Page>
      );
    } else if (hasError) {
      return (
        <Page>
          <Typography variant={"h4"} color={"error"}>
            Error while looking for created VCs
          </Typography>
          <br />
          <br />
          <ActionButton
            onClick={() => {
              console.log("Re reading");
              readAndSetVcsAndState(cryptoWalletIntegrationStore.mainAddress);
            }}
          >
            Reload VC's
          </ActionButton>
        </Page>
      );
    }

    return (
      <Page style={{}}>
        <Typography variant={"h2"}>Recover VC Page</Typography>
        <br />
        <Typography variant={"h4"}>
          Found {orbsAccountStore.vcCreationEvents.length} vcs created by you
        </Typography>
        <br />
        <br />
        <ActionButton
          fullWidth={false}
          onClick={() => {
            console.log("Re reading");
            readAndSetVcsAndState(cryptoWalletIntegrationStore.mainAddress);
          }}
        >
          Reload VC's
        </ActionButton>
        <br />

        <div
          style={{
            display: "grid",
            width: `${VC_GIST_CARD_WIDTH_REM * 2 + 2}rem`,
            maxWidth: "100%",
            gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
            gridGap: "1rem",
            justifyItems: "center",
          }}
        >
          {orbsAccountStore.vcCreationEvents.map((vcCreationEvent) => {
            const vcData = orbsAccountStore.vcIdToData.get(
              vcCreationEvent.vcId
            );

            return (
              // <div
              //   key={vcCreationEvent.vcId}
              //   style={{
              //     alignItems: "center",
              //     display: "flex",
              //     flexDirection: "column",
              //   }}
              // >
              <VcGistCard
                key={vcCreationEvent.vcId}
                vcId={vcCreationEvent.vcId}
                vcData={vcData || NO_DATA_VC_RESPONSE}
                onOpenPageClick={onOpenPageClick}
              />
              // </div>
            );
          })}
        </div>
        <br />
        <br />
      </Page>
    );
  }
);
