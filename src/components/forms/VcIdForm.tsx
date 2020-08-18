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
  // Form action
  onActionClick: (vcId: string) => void;

  // Texts
  actionButtonText?: string;
}

type TFormData = {
  vcId: string;
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

export const VcIdForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { actionButtonText, onActionClick } = props;

  // DEV_NOTE : This flag is used to display a message about sufficient/insufficient allowance.
  const [planOptionChanged, setPlanOptionChanged] = useState(false);
  const [name, setName] = useState<string>("");
  const [monthsToPayForInAdvance, setMonthsToPayForInAdvance] = useState<
    number
  >(1);
  const [runOnCertifiedOnly, setRunOnCertifiedOnly] = useState<boolean>(false);
  const [runOnCanary, setRunOnCanary] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const submit = useCallback((formData: TFormData) => {
    console.log(formData);
  }, []);

  return (
    <form
      onSubmit={handleSubmit((formData) => submit(formData))}
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
        Please enter your VC Id
      </Typography>
      {/* Name */}
      <TextField
        autoComplete={"off"}
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"vcId"}
        label={"Virtual chain ID"}
        title={""}
        variant={"outlined"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        inputRef={register}
        fullWidth
        className={classes.textField}
      />
      <br />
      <br />

      <Button
        className={classes.actionButton}
        variant={"outlined"}
        fullWidth
        type={"submit"}
      >
        {actionButtonText}
      </Button>
    </form>
  );
});
