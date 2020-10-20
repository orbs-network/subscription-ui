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

interface IProps {}

export const RecoverVCPage = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const subscriptionsService = useSubscriptionsService();
    const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
    const orbsAccountStore = useOrbsAccountStore();

    const [hasError, setHasErrors] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const hasAnyVcs = orbsAccountStore.vcCreationEvents.length > 0;

    const readAndSetVcs = useCallback(
      async (address: string) => {
        console.log(`Looking for vcs for ${address}`);

        const createdVcs = await subscriptionsService.readVcCreatedEvents(
          address
        );

        console.log({ createdVcs });

        orbsAccountStore.setVcCreationEvents(createdVcs);
      },
      [orbsAccountStore, subscriptionsService]
    );

    useEffect(() => {
      if (!cryptoWalletIntegrationStore.mainAddress) {
        return;
      }

      console.log(
        `Runn effect for ${cryptoWalletIntegrationStore.mainAddress}`
      );

      const readNSet = async () => {
        await readAndSetVcs(cryptoWalletIntegrationStore.mainAddress);
      };

      setIsReading(true);

      readNSet()
        .then()
        .catch((e) => {
          console.error(`Error while set-n-read vcs " ${e}`);
          setHasErrors(true);
        })
        .finally(() => setIsReading(false));
    }, [cryptoWalletIntegrationStore.mainAddress, readAndSetVcs]);

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
              readAndSetVcs(cryptoWalletIntegrationStore.mainAddress);
            }}
          >
            Reload VC's
          </ActionButton>
        </Page>
      );
    }

    return (
      <Page>
        Recover VC Page
        <br />
        Found {orbsAccountStore.vcCreationEvents.length} vcs created by you
        <br />
        <br />
        {orbsAccountStore.vcCreationEvents.map((vcCreationEvent) => (
          <React.Fragment key={vcCreationEvent.vcId}>
            <br />
            <InTextLink
              target={"default"}
              text={vcCreationEvent.vcId}
              href={`${ROUTES.existingVc}?vcId=${vcCreationEvent.vcId}`}
            />
            <br />
          </React.Fragment>
        ))}
        <br />
        <br />
        <ActionButton
          onClick={() => {
            console.log("Re reading");
            readAndSetVcs(cryptoWalletIntegrationStore.mainAddress);
          }}
        >
          Reload VC's
        </ActionButton>
      </Page>
    );
  }
);
