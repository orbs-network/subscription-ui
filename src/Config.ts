export interface Config {
    erc20Address: string;
    subscriptionAddress: string;
    network: string;
    minimalSubscriptionAmount: number;
    decimals: number;
}

export const MainnetConfig: Config = {
    erc20Address: "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa",
    subscriptionAddress: "0x6e79DFB79CD53A2b08bC8c2852DecA7D73cD24fC",
    network: "mainnet",
    minimalSubscriptionAmount: 6200,
    decimals: 18,
}

export const RopstenConfig: Config = {
    erc20Address: "0xeD0Aa9A4F9e5ae9092994f4B86F6AAa89944939b",
    subscriptionAddress: "0xe654ad79a93af035a60c66100aa95dfd2215cc51",
    network: "ropsten",
    minimalSubscriptionAmount: 100,
    decimals: 0,
}
