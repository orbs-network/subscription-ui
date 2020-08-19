import React, { useCallback, useEffect, useState } from "react";
import { ContentFitting } from "../components/structure/ContentFitting";
import { Page } from "../components/structure/Page";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainDetailsForm";
import { Typography, useTheme } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useSubscriptionsService } from "../services/servicesHooks";
import { useVcDataHook } from "../services/subscriptionService/subscriptionServiceHooks";

interface IProps {}

type TRouteParams = {
  vcId: string;
};

export const VcExtensionSuccessPage = React.memo<IProps>((props) => {
  const theme = useTheme();

  const { vcId } = useParams<TRouteParams>();
  const { vcData, errorFindingVc, isLoading } = useVcDataHook(vcId);

  if (isLoading) {
    return (
      <Page>
        <ContentFitting
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant={"h3"}
            style={{ color: theme.palette.error.main }}
          >
            Loading...
          </Typography>
        </ContentFitting>
      </Page>
    );
  } else if (errorFindingVc) {
    return (
      <Page>
        <ContentFitting
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant={"h3"}
            style={{ color: theme.palette.error.main }}
          >
            Error finding Virtual chain
          </Typography>
          <Typography variant={"h3"}>{vcId}</Typography>
        </ContentFitting>
      </Page>
    );
  }

  // TODO : O.L : Fix the centering of the elements to be more elegant

  return (
    <Page>
      <ContentFitting>
        <div
          style={{
            padding: "0.5rem",
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant={"h4"}>
            Vc subscription successfully extended !
          </Typography>
        </div>
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <VirtualChainSubscriptionForm
            vcId={vcId}
            vcName={vcData.name}
            paidUntil={vcData.payedUntil}
          />{" "}
        </div>
      </ContentFitting>
    </Page>
  );
});
