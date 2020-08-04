export interface ISubscriptionsService {
  readVcData(vcid: string): Promise<TReadVcDataResponse>;
}

export type TReadVcDataResponse = {
  name: string;
  tier: string;
  rate: string;
  expiresAt: string;
  genRefTime: string;
  owner: string;
  deploymentSubset: string;
  isCertified: boolean;
};