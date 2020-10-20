import { useCallback, useEffect, useState } from "react";
import { useSubscriptionsService } from "./servicesHooks";

type TVcData = {
  id: string;
  name: string;
  deploymentSubset: string;
  payedUntil: number;
  owner: string;
  isCertified: boolean;
  genRefTime: string;
  rate: string;
  tier: string;
};

type TUseVcDataHookResponse = {
  vcData: TVcData | null;
  isLoading: boolean;
  errorFindingVc: boolean;
};

export function useVcDataHook(vcId: string): TUseVcDataHookResponse {
  const [isLoading, setIsLoading] = useState(true);
  const [errorFindingVc, setErrorFindingVc] = useState(false);
  const [vcData, setVcData] = useState<TVcData | null>(null);
  const subscriptionsService = useSubscriptionsService();

  const readVcData = useCallback(
    async (id) => {
      console.log({ id });
      const readVcDataResponse = await subscriptionsService.readVcData(id);

      // DEV_NOTE : O.L : We will assume that 0 gen ref time means - no such VC
      if (readVcDataResponse.genRefTime === "0") {
        return null;
      }

      const vcData: TVcData = {
        id,
        owner: readVcDataResponse.owner,
        isCertified: readVcDataResponse.isCertified,
        genRefTime: readVcDataResponse.genRefTime,
        rate: readVcDataResponse.rate,
        tier: readVcDataResponse.tier,

        name: readVcDataResponse.name,
        payedUntil: parseInt(readVcDataResponse.expiresAt),
        deploymentSubset: readVcDataResponse.deploymentSubset,
      };

      return vcData;
    },
    [subscriptionsService]
  );

  useEffect(() => {
    setIsLoading(true);
    setErrorFindingVc(false);
    readVcData(vcId)
      .then((vcData) => {
        setIsLoading(false);
        setVcData(vcData);
      })
      .catch(() => {
        setIsLoading(false);
        setErrorFindingVc(true);
      });
  }, [readVcData, vcId]);

  return {
    errorFindingVc,
    isLoading,
    vcData,
  };
}
