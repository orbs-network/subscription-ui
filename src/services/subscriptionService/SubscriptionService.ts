import {ISubscriptionService} from "./ISubscriptionService";
import Web3 from "web3";
import SubscriptionContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/Subscriptions.json";
import {AbiItem} from "web3-utils";
import { Subscriptions } from '../../contracts/Subscriptions';

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_SUBSCRIPTION_CONTRACT_ADDRESS = "";

export class SubscriptionService implements  ISubscriptionService {
    private subscriptionContract: Subscriptions;

    constructor(
        private web3: Web3,
        guardiansRegistrationAddress: string = MAIN_NET_SUBSCRIPTION_CONTRACT_ADDRESS
    ) {
        this.subscriptionContract = (new this.web3.eth.Contract(
            SubscriptionContractJson.abi as AbiItem[],
            guardiansRegistrationAddress
        ) as any) as Subscriptions;
    }
}