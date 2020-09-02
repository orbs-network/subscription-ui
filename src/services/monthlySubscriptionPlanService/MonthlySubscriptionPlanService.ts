import {
  IMonthlySubscriptionPlanService,
  TVirtualChainSubscriptionExtensionPayload,
  TVirtualChainSubscriptionPayload,
} from "./IMonthlySubscriptionPlanService";
import Web3 from "web3";
import { MonthlySubscriptionPlan } from "../../contracts/MonthlySubscriptionPlan";
import MonthlySubscriptionPlanContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/MonthlySubscriptionPlan.json";
import { AbiItem } from "web3-utils";
import { PromiEvent, TransactionReceipt } from "web3-core";

const MAIN_NET_MONTHLY_SUBSCRIPTION_PLAN_CONTRACT_ADDRESS =
  "0xb2e3e952ba99a3eab76eddf85a2d387e3d9d335b";

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
    virtualChainSubscriptionExtensionPayload: TVirtualChainSubscriptionExtensionPayload
  ): PromiEvent<TransactionReceipt> {
    const { amount, vcId } = virtualChainSubscriptionExtensionPayload;
    console.log("Extending by amount", amount);
    return this.monthlySubscriptionContract.methods
      .extendSubscription(vcId, amount)
      .send();
  }

  setFromAccount(defaultAccountAddress: string): void {
    this.monthlySubscriptionContract.options.from = defaultAccountAddress;
  }

  async readMonthlyRate(): Promise<number> {
    const rateAsString = await this.monthlySubscriptionContract.methods
      .monthlyRate()
      .call();
    return parseInt(rateAsString);
  }

  async readTier(): Promise<string> {
    return this.monthlySubscriptionContract.methods.tier().call();
  }
}
