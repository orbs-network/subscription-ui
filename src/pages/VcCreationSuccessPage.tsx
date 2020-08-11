import React from "react";
import { ContentFitting } from "../components/structure/ContentFitting";
import { Page } from "../components/structure/Page";
import { VirtualChainSubscriptionForm } from "../components/forms/VirtualChainDetailsForm";

interface IProps {}

export const VcCreationSuccessPage = React.memo<IProps>((props) => {
  return (
    <Page>
      <ContentFitting>
        <VirtualChainSubscriptionForm
          vcId={"143524"}
          vcName={"my dev VC"}
          paidUntil={121212}
        />
      </ContentFitting>{" "}
    </Page>
  );
});
