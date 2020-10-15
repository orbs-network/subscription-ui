import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";

interface IProps {
  vcId: string;
  vcName: string;
  paidUntil: number;
}

type TFormData = {
  name: string;
  runOnlyOnCertifiedValidators: boolean;
  runOnCanary: boolean;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
  },

  phaseInstructionLabel: {
    width: "max-content",
    marginBottom: "0.5rem",
    paddingBottom: "0.1rem",
    // textDecoration: "underline",
    // borderBottom: "1px solid",
  },

  // DEV_NOTE : O.L : For now, we give 100% to enusre united width labels with texts and icons,
  //                  If this breaks, fix this.
  forControlLabel: {
    width: "100%",
    "& .MuiFormControlLabel-label": {
      width: "100%",
    },
  },

  checkBoxes: {},

  typographyAnimated: {
    transition: "height 5s, visibility 5s linear, background-color 2s",
    height: 0,
    visibility: "hidden",
  },

  typographyAnimatedShow: {
    transition: "height 5s, visibility 5s linear, background-color 2s",
    height: "100%",
    visibility: "visible",
  },

  actionButton: {
    transition: "background-color 0.4s linear, color 0.2s linear",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.getContrastText(theme.palette.secondary.light),
    },
  },
}));

export const VirtualChainSubscriptionForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { paidUntil, vcId, vcName } = props;

  console.log({ paidUntil });
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        // width: "100%",
        width: "60ch",
        textAlign: "center",
      }}
    >
      <Typography
        className={classes.phaseInstructionLabel}
        variant={"h5"}
        color={"secondary"}
      >
        Virtual chain ID
      </Typography>
      <Typography className={classes.phaseInstructionLabel} variant={"h6"}>
        {vcId}
      </Typography>

      <Typography
        className={classes.phaseInstructionLabel}
        variant={"h5"}
        color={"secondary"}
      >
        Virtual chain Name
      </Typography>
      <Typography className={classes.phaseInstructionLabel} variant={"h6"}>
        {vcName}
      </Typography>
      <Typography
        className={classes.phaseInstructionLabel}
        variant={"h5"}
        color={"secondary"}
      >
        Paid Until
      </Typography>
      <Typography className={classes.phaseInstructionLabel} variant={"h6"}>
        {Moment.unix(paidUntil).format("MMM DD, YYYY")}
      </Typography>
    </form>
  );
});
