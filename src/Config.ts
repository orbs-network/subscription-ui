export interface Config {
    erc20Address: string;
    subscriptionAddress: string;
}

export const MainnetConfig: Config = {
    erc20Address: "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa",
    subscriptionAddress: "0x6e79DFB79CD53A2b08bC8c2852DecA7D73cD24fC",
}

export const RopstenConfig: Config = {
    erc20Address: "0xeD0Aa9A4F9e5ae9092994f4B86F6AAa89944939b",
    subscriptionAddress: "0xbfa10f63c20a0381a087d13636bb0cdca933183d",
}
