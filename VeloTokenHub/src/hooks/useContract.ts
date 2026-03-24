import { useMemo } from "react";
import { Contract } from "ethers";
import { getAddress } from "ethers";
import useRunners from "./useRunner";
import { VElO_TOkEN_ABI } from "../ABI/VeloToken";

export const useVeloContract = (withSigner = false) => {
  const { readOnlyProvider, signer } = useRunners();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(
        getAddress(import.meta.env.VITE_VELO_HUB_CONTRACT_ADDRESS),
        VElO_TOkEN_ABI,
        signer
      );
    }
    return new Contract(
      getAddress(import.meta.env.   VITE_VELO_HUB_CONTRACT_ADDRESS),
      VElO_TOkEN_ABI,
      readOnlyProvider
    );
  }, [readOnlyProvider, signer, withSigner]);
};
