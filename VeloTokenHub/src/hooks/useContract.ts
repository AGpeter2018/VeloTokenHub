import { useMemo } from "react";
import { Contract } from "ethers";
import { getAddress } from "ethers";
import useRunners from "./useRunner";
import { VElO_TOkEN_ABI } from "../ABI/VeloToken";

export const useVeloContract = (withSigner = false) => {
  const { readOnlyProvider, signer } = useRunners();

  return useMemo(() => {
    const address = import.meta.env.VITE_VELO_HUB_CONTRACT_ADDRESS;
    
    if (!address) {
      console.error("VITE_VELO_HUB_CONTRACT_ADDRESS is not defined in .env");
      return null;
    }

    try {
      const validatedAddress = getAddress(address.trim());
      
      if (withSigner) {
        if (!signer) return null;
        return new Contract(validatedAddress, VElO_TOkEN_ABI, signer);
      }

      return new Contract(validatedAddress, VElO_TOkEN_ABI, readOnlyProvider);
    } catch (error) {
      console.error("Invalid contract address format:", address);
      return null;
    }
  }, [readOnlyProvider, signer, withSigner]);
};
