import { IEthereumProvider } from "./cryptoWalletConnectionService/IEthereumProvider";
import { CryptoWalletConnectionService } from "./cryptoWalletConnectionService/CryptoWalletConnectionService";
import { ICryptoWalletConnectionService } from "./cryptoWalletConnectionService/ICryptoWalletConnectionService";
// import {
//   GuardiansService,
//   IGuardiansService,
//   IOrbsClientService,
//   OrbsClientService,
// } from "orbs-pos-data";
import Web3 from "web3";
import configs from '../configs';

// import { BuildOrbsClient } from "./OrbsClientFactory";
import {ISubscriptionService} from "./subscriptionService/ISubscriptionService";
import {SubscriptionService} from "./subscriptionService/SubscriptionService";

export interface IServices {
  cryptoWalletIntegrationService: ICryptoWalletConnectionService;
  subscriptionService: ISubscriptionService;
}

// DEV_NOTE : For simplicity of early stage dev, we assume that we have ethereum provider, if not, we will not initialize the services.
export function buildServices(ethereumProvider: IEthereumProvider): IServices {
  let web3: Web3;

  if (ethereumProvider) {
    web3 = new Web3(ethereumProvider as any);
  } else {
    web3 = new Web3(
      new Web3.providers.WebsocketProvider(configs.ETHEREUM_PROVIDER_WS)
    );
  }

  return {
    cryptoWalletIntegrationService: new CryptoWalletConnectionService(
      ethereumProvider
    ),
    subscriptionService: new SubscriptionService(
      web3,
      configs.v2contractsAddressesOverride.subscriptionContract
    ),
  };
}
