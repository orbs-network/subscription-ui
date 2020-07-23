import React from "react";
import { Page } from "../components/structure/Page";
import { PageSection } from "../components/structure/PageSection";
import { Typography } from "@material-ui/core";

interface IProps {}

export const HomePage = React.memo<IProps>((props) => {
  return (
    <Page>
      <PageSection>
        <Typography>Welcome !</Typography>
      </PageSection>
    </Page>
  );
});
