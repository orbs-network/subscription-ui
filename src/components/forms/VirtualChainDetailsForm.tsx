import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TVirtualChainSubscriptionPayload } from "../../services/monthlySubscriptionPlanService/IMonthlySubscriptionPlanService";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import CheckIcon from "@material-ui/icons/Check";

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

  return (
    <form
      style={{
        maxWidth: "100%",
        // width: "100%",
        width: "60ch",
      }}
    >
      <Typography
        className={classes.phaseInstructionLabel}
        variant={"body1"}
        color={"secondary"}
      >
        Virtual chain ID
      </Typography>
      {/* Name */}
      <TextField
        autoComplete={"off"}
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"vcId"}
        label={"Virtual chain ID"}
        title={""}
        variant={"outlined"}
        value={vcId}
        fullWidth
        className={classes.textField}
      />
      <br />
      <br />

      <Typography
        className={classes.phaseInstructionLabel}
        variant={"body1"}
        color={"secondary"}
      >
        Virtual chain ID
      </Typography>
      {/* Name */}
      <TextField
        autoComplete={"off"}
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"name"}
        label={"Name"}
        title={""}
        variant={"outlined"}
        value={vcName}
        fullWidth
        className={classes.textField}
      />
      <br />
      <br />
    </form>
  );
});
