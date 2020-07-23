type TSupportedNets = "local" | "ropsten" | "mainnet";
// @ts-ignore
const ethereumNetwork: TSupportedNets = process.env.REACT_APP_ETHEREUM_NETWORK;
export const IS_DEV = process.env.NODE_ENV !== "production";
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

export interface IConfig {
  network: TSupportedNets;
  minimalSubscriptionAmount: number;
  decimals: number;
  v2contractsAddressesOverride: Partial<{
    subscriptionContract: string;
    erc20Contract: string;
  }>;
  ETHEREUM_PROVIDER_WS: string;
  termsOfUseUrl: string;
  privacyPolicyUrl: string;
}

// export const MainnetConfig: IConfig = {
//     erc20Address: "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa",
//     subscriptionAddress: "0x6e79DFB79CD53A2b08bC8c2852DecA7D73cD24fC",
//     network: "mainnet",
//     minimalSubscriptionAmount: 6200,
//     decimals: 18,
// }

// export const RopstenConfig: IConfig = {
//     erc20Address: "0xeD0Aa9A4F9e5ae9092994f4B86F6AAa89944939b",
//     subscriptionAddress: "0xe654ad79a93af035a60c66100aa95dfd2215cc51",
//     network: "ropsten",
//     minimalSubscriptionAmount: 100,
//     decimals: 0,
// }

// TODO : O.L : Move these to a better place + ensure values are correct. (Maybe read it from the contract)
const MAIN_NET_MINIMUM_SUBSCRIPTION_AMOUNT = 6200;
const MAIN_NET_DECIMALS = 18;

const configs: IConfig = {
  network: "mainnet",
  minimalSubscriptionAmount: MAIN_NET_MINIMUM_SUBSCRIPTION_AMOUNT,
  decimals: MAIN_NET_DECIMALS,
  v2contractsAddressesOverride: {},
  ETHEREUM_PROVIDER_WS: `wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`,
  termsOfUseUrl: "",
  privacyPolicyUrl: "",
};

// Webpack will remove this section on production build //
if (process.env.NODE_ENV !== "production") {
  if (ethereumNetwork === "local") {
    const addresses = require("./local/addresses.json");

    configs.network = "local";

    // Override addresses
    configs.v2contractsAddressesOverride.subscriptionContract =
      addresses.guardiansRegistration;
  }
}

export default configs;
