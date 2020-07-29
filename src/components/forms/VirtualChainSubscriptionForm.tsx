import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TVirtualChainSubscriptionPayload } from "../../services/monthlySubscriptionPlanService/IMonthlySubscriptionPlanService";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  subscribeNewVC: (
    virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload
  ) => void;
}

type TFormData = {
  description: string;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
  },
}));

export const VirtualChainSubscriptionForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { subscribeNewVC } = props;
  const [description, setDescription] = useState<string>("");

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const submit = useCallback((formData: TFormData) => {
    const virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload = {
      amount: 0,
      deploymentSubset: "",
      isCertified: false,
    };

    subscribeNewVC(virtualChainSubscriptionPayload);
  }, []);

  return (
    <form
      onSubmit={handleSubmit((formData) => submit(formData))}
      style={{
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <TextField
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"Description"}
        label={"VC description"}
        title={""}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        inputRef={register}
        fullWidth
        className={classes.textField}
      />
      <br />
    </form>
  );
});
