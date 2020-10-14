import Web3 from "web3";
import configs from "../configs";
import {
  CryptoWalletConnectionService,
  ICryptoWalletConnectionService,
  IEthereumProvider,
  IMonthlySubscriptionPlanService,
  IOrbsTokenService,
  ISubscriptionsService,
  MonthlySubscriptionPlanService,
  OrbsTokenService,
  SubscriptionsService,
} from "@orbs-network/contracts-js";

export interface IServices {
  cryptoWalletIntegrationService: ICryptoWalletConnectionService;
  subscriptionsService: ISubscriptionsService;
  orbsTokenService: IOrbsTokenService;
  monthlySubscriptionPlanService: IMonthlySubscriptionPlanService;
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
    subscriptionsService: new SubscriptionsService(
      web3,
      configs.v2contractsAddressesOverride.subscriptionContract
    ),
    orbsTokenService: new OrbsTokenService(
      web3,
      configs.v2contractsAddressesOverride.erc20Contract
    ),
    monthlySubscriptionPlanService: new MonthlySubscriptionPlanService(
      web3,
      configs.v2contractsAddressesOverride.monthlySubscriptionPlanDeployedInstance
    ),
  };
}
