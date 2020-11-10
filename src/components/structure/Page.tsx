import React, { DetailedHTMLProps } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100%",
    // width: "fit-content",
    width: "60rem",
    maxWidth: "100%",
    boxSizing: "border-box",
    paddingBottom: "2em",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const Page = React.memo<
  IProps &
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props) => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <div className={classes.page} {...rest}>
      {children}
    </div>
  );
});
