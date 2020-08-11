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

export const VcCreationSuccessPage = React.memo<IProps>((props) => {
  const theme = useTheme();

  const { vcId } = useParams<TRouteParams>();
  const vcData = useVcDataHook(vcId);

  if (!vcData) {
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

  return (
    <Page>
      <ContentFitting>
        <VirtualChainSubscriptionForm
          vcId={vcId}
          vcName={vcData.name}
          paidUntil={vcData.payedUntil}
        />
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
          <Typography
            variant={"h4"}
            color={"secondary"}
            style={{ fontWeight: "bold" }}
          >
            Important:
          </Typography>
          <Typography variant={"h4"}>
            Please keep the virtual Chain ID for future use.
          </Typography>
        </div>
      </ContentFitting>
    </Page>
  );
});
