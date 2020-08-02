import {
  ISubscriptionsService,
  TReadVcDataResponse,
} from "./ISubscriptionsService";
import Web3 from "web3";
import SubscriptionContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/Subscriptions.json";
import { AbiItem } from "web3-utils";
import { Subscriptions } from "../../contracts/Subscriptions";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_SUBSCRIPTION_CONTRACT_ADDRESS = "";

export class SubscriptionsService implements ISubscriptionsService {
  private subscriptionsContract: Subscriptions;

  constructor(
    private web3: Web3,
    subscriptionsContractAddress: string = MAIN_NET_SUBSCRIPTION_CONTRACT_ADDRESS
  ) {
    this.subscriptionsContract = (new this.web3.eth.Contract(
      SubscriptionContractJson.abi as AbiItem[],
      subscriptionsContractAddress
    ) as any) as Subscriptions;
  }

  public async readVcData(vcid: string): Promise<TReadVcDataResponse> {
    const rawResponse = await this.subscriptionsContract.methods
      .getVcData(vcid)
      .call();

    const response: TReadVcDataResponse = rawResponse;

    return response;
  }
}
