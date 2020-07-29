import { PromiEvent, TransactionReceipt } from "web3-core";

export interface IMonthlySubscriptionPlanService {
  contractAddress: string;

  createANewVC(
    vcSubscriptionPayload: TVirtualChainSubscriptionPayload
  ): PromiEvent<TransactionReceipt>;

  extendSubscription(
    vcid: number,
    amount: number
  ): PromiEvent<TransactionReceipt>;
}

export type TVirtualChainSubscriptionPayload = {
  amount: number;
  isCertified: boolean;
  deploymentSubset: string;
};
