import React from "react";
import { IServices } from "./Services";
import { MobXProviderContext } from "mobx-react";
import {
  ICryptoWalletConnectionService,
  IMonthlySubscriptionPlanService,
  ISubscriptionsService,
} from "@orbs-network/contracts-js";

export function useServices(): IServices {
  const services = React.useContext(MobXProviderContext) as IServices;

  if (!services) {
    throw new Error("Tried to use services before initialising them");
  }

  return services;
}

export function useCryptoWalletConnectionService(): ICryptoWalletConnectionService {
  return useServices().cryptoWalletIntegrationService;
}

export function useSubscriptionsService(): ISubscriptionsService {
  return useServices().subscriptionsService;
}

export function useMonthlySubscriptionPlanService(): IMonthlySubscriptionPlanService {
  return useServices().monthlySubscriptionPlanService;
}
