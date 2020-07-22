import { configure } from "mobx";
import { IStores } from "./stores";

import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { ICryptoWalletConnectionService } from "../services/cryptoWalletConnectionService/ICryptoWalletConnectionService";
import { OrbsAccountStore } from "./OrbsAccountStore";

// This import ensures mobx batching
import "mobx-react-lite/batchingForReactDom";
import {ISubscriptionService} from "../services/subscriptionService/ISubscriptionService";

/**
 * Configures the mobx library. Should get called at App's initialization.
 */
export function configureMobx() {
  configure({
    enforceActions: "observed",
  });
}

/**
 * Builds and initializes all of the stores
 */
export function getStores(
  cryptoWalletConnectionService: ICryptoWalletConnectionService,
  subscriptionService: ISubscriptionService
): IStores {
  // Create stores instances + Hydrate the stores
  const cryptoWalletIntegrationStore = new CryptoWalletConnectionStore(
    cryptoWalletConnectionService
  );
  const orbsAccountStore = new OrbsAccountStore(
    cryptoWalletIntegrationStore
  );

  const stores: IStores = {
    cryptoWalletIntegrationStore,
    orbsAccountStore,
  };

  return stores;
}
