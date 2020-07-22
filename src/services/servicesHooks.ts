import React from "react";
import { IServices } from "./Services";
import { ICryptoWalletConnectionService } from "./cryptoWalletConnectionService/ICryptoWalletConnectionService";
import { MobXProviderContext } from "mobx-react";
import { ISubscriptionService } from "./subscriptionService/ISubscriptionService";

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

export function useSubscriptionsService(): ISubscriptionService {
  return useServices().subscriptionService;
}
