import { PromiEvent, TransactionReceipt } from "web3-core";

export interface IMonthlySubscriptionPlanService {
  createANewVC(
    amount: number,
    isCertified: boolean,
    deploymentSubset: string
  ): PromiEvent<TransactionReceipt>;

  extendSubscription(
    vcid: number,
    amount: number
  ): PromiEvent<TransactionReceipt>;
}
