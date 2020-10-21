import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, ButtonProps } from "@material-ui/core";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  actionButton: {
    transition: "background-color 0.4s linear, color 0.2s linear",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.getContrastText(theme.palette.secondary.light),
    },
  },
}));

export const ActionButton = React.memo<IProps & ButtonProps>((props) => {
  const { children, fullWidth, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      className={classes.actionButton}
      variant={"outlined"}
      fullWidth={fullWidth === undefined ? true : fullWidth}
      type={"submit"}
      {...rest}
    >
      {children}
    </Button>
  );
});
