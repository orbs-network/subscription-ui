import React, { useRef } from "react";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ActionButton } from "../ActionButton/ActionButton";
import { TReadVcDataResponse } from "@orbs-network/contracts-js/src/ethereumContractsServices/subscriptionService/ISubscriptionsService";
import useHover from "@react-hook/hover";
import useTheme from "@material-ui/core/styles/useTheme";
import Color from "color";

export const VC_GIST_CARD_WIDTH_REM = 15;

interface IProps {
  vcId: string;
  vcData: TReadVcDataResponse;
  onOpenPageClick: (vcId: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    width: `${VC_GIST_CARD_WIDTH_REM}rem`,
    maxWidth: "100%",

    transition: "0.5s",

    "&:hover": {
      backgroundColor: Color(theme.palette.background.paper).lighten(0.3).hex(),
    },
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
}));

export const VcGistCard = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { vcId, vcData, onOpenPageClick } = props;

  const hoverTargetRef = useRef<HTMLElement>();
  // @ts-ignore
  const isHovering = useHover(hoverTargetRef);
  const theme = useTheme();

  const bull = <span className={classes.bullet}>•</span>;
  const text = `${vcId} - ${vcData?.name} - ${vcData?.expiresAt}`;

  // const textSecondaryOrSecondary = isHovering ? "secondary" : "textSecondary";
  const secondaryDarkOrTextSecondary = isHovering
    ? theme.palette.secondary.dark
    : theme.palette.text.secondary;
  const textMainOrInherit = isHovering
    ? theme.palette.secondary.main
    : "inherit";

  const inheritOrBlack = isHovering ? theme.palette.secondary.dark : "inherit";

  return (
    <Card className={classes.root} ref={hoverTargetRef}>
      <CardContent>
        <Typography
          className={classes.title}
          gutterBottom
          style={{ color: secondaryDarkOrTextSecondary }}
        >
          {vcId}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          style={{ color: textMainOrInherit }}
        >
          {vcData.name}
        </Typography>
        <Typography
          className={classes.pos}
          style={{ color: secondaryDarkOrTextSecondary }}
        >
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
