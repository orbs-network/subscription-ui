import { useCallback, useEffect, useState } from "react";
import { useSubscriptionsService } from "./servicesHooks";

type TVcData = {
  id: string;
  name: string;
  deploymentSubset: string;
  payedUntil: number;
};

type TUseVcDataHookResponse = {
  vcData: TVcData;
  isLoading: boolean;
  errorFindingVc: boolean;
};

export function useVcDataHook(vcId: string): TUseVcDataHookResponse {
  const [isLoading, setIsLoading] = useState(true);
  const [errorFindingVc, setErrorFindingVc] = useState(false);
  const [vcData, setVcData] = useState<TVcData>({
    id: "",
    name: "",
    deploymentSubset: "",
    payedUntil: 0,
  });
  const subscriptionsService = useSubscriptionsService();

  const readVcData = useCallback(
    async (id) => {
      const readVcDataResponse = await subscriptionsService.readVcData(id);
      const vcData: TVcData = {
        id,
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
