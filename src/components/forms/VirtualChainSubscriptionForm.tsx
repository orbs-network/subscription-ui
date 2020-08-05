import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TVirtualChainSubscriptionPayload } from "../../services/monthlySubscriptionPlanService/IMonthlySubscriptionPlanService";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import configs from "../../configs";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import CheckIcon from "@material-ui/icons/Check";

interface IProps {
  // Form action
  subscribeNewVC: (
    virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload
  ) => Promise<void>;
  setMSPContractAllowance: (allowanceInFullOrbs: number) => void;

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

export const VirtualChainSubscriptionForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    subscribeNewVC,
    disableActionButtons,
    allowanceToMSPContract,
    setMSPContractAllowance,
  } = props;
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

  const currentCostOfPlan =
    monthsToPayForInAdvance * configs.minimalSubscriptionAmount;
  const hasEnoughAllowance = allowanceToMSPContract >= currentCostOfPlan;

  const submit = useCallback(
    (formData: TFormData) => {
      if (!hasEnoughAllowance) {
        enqueueSnackbar(
          "Before creating a new vc, please approve usage of your ORBS (to ensure payment for the subscription)"
        );
      }

      const virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload = {
        name: formData.name,
        amount: 0,
        // TODO : O.L : Change these texts to proper values once decided.
        deploymentSubset: formData.runOnCanary ? "Canary" : "All",
        isCertified: formData.runOnlyOnCertifiedValidators,
      };

      subscribeNewVC(virtualChainSubscriptionPayload);
    },
    [enqueueSnackbar, hasEnoughAllowance, subscribeNewVC]
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
        1) Fill in your VC details
      </Typography>
      {/* Name */}
      <TextField
        autoComplete={"off"}
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"name"}
        label={"VC name"}
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
      {/* Subscription length */}
      <TextField
        select
        SelectProps={{ native: true }}
        // InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"name"}
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
          1 month - {configs.minimalSubscriptionAmount * 1} ORBS
        </option>
        <option value={3}>
          3 months - {configs.minimalSubscriptionAmount * 3} ORBS
        </option>
        <option value={6}>
          6 months - {configs.minimalSubscriptionAmount * 6} ORBS
        </option>
      </TextField>
      <br />
      <br />

      <FormControlLabel
        className={classes.forControlLabel}
        control={
          <>
            <Checkbox
              className={classes.checkBoxes}
              checked={runOnCertifiedOnly}
              onChange={(e) => setRunOnCertifiedOnly(e.target.checked)}
              name="runOnlyOnCertifiedValidators"
              // color="primary"
              inputRef={register}
            />
          </>
        }
        label={
          <LabelWithIconTooltip
            text={"Run only on identified validators"}
            tooltipText={"Add content"}
          />
        }
      />
      <br />

      <FormControlLabel
        className={classes.forControlLabel}
        control={
          <Checkbox
            className={classes.checkBoxes}
            checked={runOnCanary}
            onChange={(e) => setRunOnCanary(e.target.checked)}
            name="runOnCanary"
            // color="primary"
            inputRef={register}
          />
        }
        label={
          <LabelWithIconTooltip
            text={"Run unstable early releases"}
            tooltipText={"add here as well"}
          />
        }
      />
      <br />
      <br />

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
        3) Create your new Virtual chain
      </Typography>
      <Button
        className={classes.actionButton}
        variant={"outlined"}
        fullWidth
        type={"submit"}
        disabled={disableActionButtons}
      >
        Create new VC
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
