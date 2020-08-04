import { PromiEvent, TransactionReceipt } from "web3-core";

export interface IMonthlySubscriptionPlanService {
  contractAddress: string;

  setFromAccount(defaultAccountAddress: string): void;

  createANewVC(
    vcSubscriptionPayload: TVirtualChainSubscriptionPayload
  ): PromiEvent<TransactionReceipt>;

  extendSubscription(
    vcid: number,
    amount: number
  ): PromiEvent<TransactionReceipt>;
}

export type TVirtualChainSubscriptionPayload = {
  name: string;
  amount: number;
  isCertified: boolean;
  deploymentSubset: string;
};