import { IMonthlySubscriptionPlanService } from "./IMonthlySubscriptionPlanService";
import Web3 from "web3";
import { MonthlySubscriptionPlan } from "../../contracts/MonthlySubscriptionPlan";
import MonthlySubscriptionPlanContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/MonthlySubscriptionPlan.json";
import { AbiItem } from "web3-utils";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_MONTHLY_SUBSCRIPTION_PLAN_CONTRACT_ADDRESS = "";

export class MonthlySubscriptionPlanService
  implements IMonthlySubscriptionPlanService {
  private monthlySubscriptionContract: MonthlySubscriptionPlan;

  constructor(
    private web3: Web3,
    monthlySubscriptionPlanContractAddress: string = MAIN_NET_MONTHLY_SUBSCRIPTION_PLAN_CONTRACT_ADDRESS
  ) {
    this.monthlySubscriptionContract = (new this.web3.eth.Contract(
      MonthlySubscriptionPlanContractJson.abi as AbiItem[],
      monthlySubscriptionPlanContractAddress
    ) as any) as MonthlySubscriptionPlan;
  }

  createANewVC(
    amount: number,
    isCertified: boolean,
    deploymentSubset: string
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  extendSubscription(vcid: number, amount: number): Promise<boolean> {
    return Promise.resolve(false);
  }
}
