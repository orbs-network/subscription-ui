import React from "react";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ActionButton } from "../ActionButton/ActionButton";
import { TReadVcDataResponse } from "@orbs-network/contracts-js/src/ethereumContractsServices/subscriptionService/ISubscriptionsService";
import { ROUTES } from "../../constants/routes";

interface IProps {
  vcId: string;
  vcData: TReadVcDataResponse;
  onOpenPageClick: (vcId: string) => void;
}

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    width: "15rem",
    maxWidth: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const VcGistCard = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { vcId, vcData, onOpenPageClick } = props;

  const bull = <span className={classes.bullet}>•</span>;
  const text = `${vcId} - ${vcData?.name} - ${vcData?.expiresAt}`;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {vcId}
        </Typography>
        <Typography variant="h5" component="h2">
          {vcData.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {vcData.expiresAt}
        </Typography>
        {/*<Typography variant="body2" component="p">*/}
        {/*  well meaning and kindly.*/}
        {/*  <br />*/}
        {/*  {'"a benevolent smile"'}*/}
        {/*</Typography>*/}
      </CardContent>
      <CardActions>
        <ActionButton size="small" onClick={() => onOpenPageClick(vcId)}>
          Open VC page
        </ActionButton>
      </CardActions>
    </Card>
  );
});
