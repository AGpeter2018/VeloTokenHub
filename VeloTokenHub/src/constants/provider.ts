import { JsonRpcProvider } from "ethers";

const RPC_URL = import.meta.env.VITE_VELO_HUB_TESTNET_RPC_URL;

export const jsonRpcProvider = new JsonRpcProvider(RPC_URL);

