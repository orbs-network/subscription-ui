import {
  IMonthlySubscriptionPlanService,
  TVirtualChainSubscriptionPayload,
} from "./IMonthlySubscriptionPlanService";
import Web3 from "web3";
import { MonthlySubscriptionPlan } from "../../contracts/MonthlySubscriptionPlan";
import MonthlySubscriptionPlanContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/MonthlySubscriptionPlan.json";
import { AbiItem } from "web3-utils";
import { PromiEvent, TransactionReceipt } from "web3-core";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_MONTHLY_SUBSCRIPTION_PLAN_CONTRACT_ADDRESS = "";

export class MonthlySubscriptionPlanService
  implements IMonthlySubscriptionPlanService {
  private monthlySubscriptionContract: MonthlySubscriptionPlan;

  constructor(
    private web3: Web3,
    private monthlySubscriptionPlanContractAddress: string = MAIN_NET_MONTHLY_SUBSCRIPTION_PLAN_CONTRACT_ADDRESS
  ) {
    this.monthlySubscriptionContract = (new this.web3.eth.Contract(
      MonthlySubscriptionPlanContractJson.abi as AbiItem[],
      monthlySubscriptionPlanContractAddress
    ) as any) as MonthlySubscriptionPlan;
  }

  public get contractAddress(): string {
    return this.monthlySubscriptionPlanContractAddress;
  }

  createANewVC(
    vcSubscriptionPayload: TVirtualChainSubscriptionPayload
  ): PromiEvent<TransactionReceipt> {
    const {
      name,
      amount,
      isCertified,
      deploymentSubset,
    } = vcSubscriptionPayload;
    return this.monthlySubscriptionContract.methods
      .createVC(name, amount, isCertified, deploymentSubset)
      .send();
  }

  extendSubscription(
    vcid: number,
    amount: number
  ): PromiEvent<TransactionReceipt> {
    return this.monthlySubscriptionContract.methods
      .extendSubscription(vcid, amount)
      .send();
  }
}
