import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { sepolia as rawSepolia, type AppKitNetwork } from "@reown/appkit/networks";


// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

export const sepolia:AppKitNetwork = {
  ...rawSepolia,
  id: 11155111,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:11155111",
};

// 2. Set the networks
const networks:[AppKitNetwork, ...AppKitNetwork[]] = [
  sepolia,
];

// 3. Create a metadata object - optional
const metadata = {
  name: "Velo Token Hub",
  description: "An onchain version of a token faucet built with AppKit",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
export const appkit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  allowUnsupportedChain: false,
  allWallets: "SHOW",
  defaultNetwork: sepolia,
  enableEIP6963: true,
  features: {
    analytics: true,
    allWallets: true,
    email: false,
    socials: [],
  },
});

appkit.switchNetwork(sepolia);