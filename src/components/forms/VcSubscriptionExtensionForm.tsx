import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import CheckIcon from "@material-ui/icons/Check";

interface IProps {
  // Form action
  extendVcSubscription: (amount: number) => Promise<void>;
  setMSPContractAllowance: (allowanceInFullOrbs: number) => void;

  // Form parameters
  monthlyRateInFullOrbs: number;

  // Orbs account
  allowanceToMSPContract: number;

  // Activation flags
  disableActionButtons?: boolean;
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

export const VcSubscriptionExtensionForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    extendVcSubscription,
    disableActionButtons,
    allowanceToMSPContract,
    setMSPContractAllowance,
  } = props;

  const { monthlyRateInFullOrbs } = props;

  // TODO : O.L : Move this and provide as prop.
  const { enqueueSnackbar } = useSnackbar();
  // DEV_NOTE : This flag is used to display a message about sufficient/insufficient allowance.
  const [planOptionChanged, setPlanOptionChanged] = useState(false);
  const [name, setName] = useState<string>("");
  const [monthsToPayForInAdvance, setMonthsToPayForInAdvance] = useState<
    number
  >(1);
  const [runOnCertifiedOnly, setRunOnCertifiedOnly] = useState<boolean>(false);
  const [runOnCanary, setRunOnCanary] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const currentCostOfPlan = monthsToPayForInAdvance * monthlyRateInFullOrbs;
  const hasEnoughAllowance = allowanceToMSPContract >= currentCostOfPlan;

  const submit = useCallback(
    (formData: TFormData) => {
      if (!hasEnoughAllowance) {
        enqueueSnackbar(
          "Before extending your VC subscription, please approve usage of your ORBS",
          { variant: "info", preventDuplicate: true }
        );
        return;
      }

      extendVcSubscription(currentCostOfPlan);
    },
    [
      hasEnoughAllowance,
      currentCostOfPlan,
      extendVcSubscription,
      enqueueSnackbar,
    ]
  );

  const setAllowance = useCallback(() => {
    setMSPContractAllowance(currentCostOfPlan);
  }, [currentCostOfPlan, setMSPContractAllowance]);

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
        1) Select how many months to extend by
      </Typography>
      {/* Subscription length */}
      <TextField
        select
        SelectProps={{ native: true }}
        // InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"subscriptionOption"}
        label={"Initial Subscription"}
        title={""}
        variant={"outlined"}
        value={monthsToPayForInAdvance}
        onChange={(e) => {
          setPlanOptionChanged(true);
          setMonthsToPayForInAdvance(parseInt(e.target.value));
        }}
        required
        inputRef={register}
        fullWidth
        className={classes.textField}
      >
        {/* TODO : Add proper dynamic values when dealing with the real contract */}
        <option value={1}>
          1 month extension - {monthlyRateInFullOrbs * 1} ORBS
        </option>
        <option value={3}>
          3 months extension - {monthlyRateInFullOrbs * 3} ORBS
        </option>
        <option value={6}>
          6 months extension - {monthlyRateInFullOrbs * 6} ORBS
        </option>
      </TextField>

      <Typography
        className={classes.phaseInstructionLabel}
        variant={"body1"}
        color={"secondary"}
      >
        2) Allow usage of your ORBS
      </Typography>
      <Typography variant={"caption"}>
        Current allowance : {allowanceToMSPContract}/{currentCostOfPlan}
      </Typography>
      <Button
        className={classes.actionButton}
        variant={"outlined"}
        fullWidth
        onClick={setAllowance}
        disabled={disableActionButtons || hasEnoughAllowance}
        startIcon={hasEnoughAllowance ? <CheckIcon /> : null}
      >
        {hasEnoughAllowance
          ? "Sufficient allowance"
          : "Approve usage of your ORBS"}
      </Button>
      <br />
      <br />

      <Typography
        className={classes.phaseInstructionLabel}
        variant={"body1"}
        color={"secondary"}
      >
        3) Extend your subscription
      </Typography>
      <Button
        className={classes.actionButton}
        variant={"outlined"}
        fullWidth
        type={"submit"}
        disabled={disableActionButtons}
      >
        Extend VC subscription
      </Button>
    </form>
  );
});

const LabelWithIconTooltip = React.memo(
  (props: { text: String; tooltipText: string }) => {
    const { text, tooltipText } = props;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {text}
        <Tooltip title={tooltipText}>
          <HelpOutlineIcon style={{ marginInlineStart: "0.5rem" }} />
        </Tooltip>
      </div>
    );
  }
);
