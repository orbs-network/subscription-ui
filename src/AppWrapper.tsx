import React from 'react';
import App from "./App";

interface IProps {

}

export const AppWrapper = React.memo<IProps>(props => {
   const { children } = props;
   return <><App/></>
});