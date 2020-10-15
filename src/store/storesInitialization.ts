import { configure } from "mobx";
import { IStores } from "./stores";

import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { OrbsAccountStore } from "./OrbsAccountStore";

// This import ensures mobx batching
import "mobx-react-lite/batchingForReactDom";
import {
  ICryptoWalletConnectionService,
  IMonthlySubscriptionPlanService,
  IOrbsTokenService,
  ISubscriptionsService,
} from "@orbs-network/contracts-js";

/**
 * Builds and initializes all of the stores
 */
export function getStores(
  cryptoWalletConnectionService: ICryptoWalletConnectionService,
  subscriptionService: ISubscriptionsService,
  orbsTokenService: IOrbsTokenService,
  monthlySubscriptionPlanService: IMonthlySubscriptionPlanService
): IStores {
  // Create stores instances + Hydrate the stores
  const cryptoWalletIntegrationStore = new CryptoWalletConnectionStore(
    cryptoWalletConnectionService
  );
  const orbsAccountStore = new OrbsAccountStore(
    cryptoWalletIntegrationStore,
    orbsTokenService,
    monthlySubscriptionPlanService,
    subscriptionService
  );

  const stores: IStores = {
    cryptoWalletIntegrationStore,
    orbsAccountStore,
  };

  return stores;
}

/**
 * Configures the mobx library. Should get called at App's initialization.
 */
export function configureMobx() {
  configure({
    enforceActions: "observed",
  });
}
