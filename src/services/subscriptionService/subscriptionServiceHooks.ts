import { useCallback, useEffect, useState } from "react";
import { useSubscriptionsService } from "../servicesHooks";

type TVcData = {
  id: string;
  name: string;
  payedUntil: number;
};

export function useVcDataHook(vcId: string): TVcData | null {
  const [noSuchVc, setNoSuchVc] = useState(false);
  const [vdData, setVcData] = useState<TVcData>({
    id: "",
    name: "",
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
      };

      return vcData;
    },
    [subscriptionsService]
  );

  useEffect(() => {
    readVcData(vcId)
      .then((vcData) => setVcData(vcData))
      .catch(() => setNoSuchVc(true));
  }, [readVcData, vcId]);

  if (noSuchVc) {
    return null;
  } else {
    return vdData;
  }
}
