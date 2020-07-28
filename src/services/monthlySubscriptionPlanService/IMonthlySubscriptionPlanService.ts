export interface IMonthlySubscriptionPlanService {
  createANewVC(
    amount: number,
    isCertified: boolean,
    deploymentSubset: string
  ): Promise<boolean>;

  extendSubscription(vcid: number, amount: number): Promise<boolean>;
}
