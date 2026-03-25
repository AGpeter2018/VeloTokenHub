# VeloTokenHub 

VeloTokenHub is a state-of-the-art decentralized web application built with a premium glassmorphic dark-mode aesthetic. It empowers users to seamlessly view on-chain token metadata, request faucet drops, execute token transfers, and grants the contract owner secure administrative minting controls.

This project utilizes cutting-edge web technologies, boasting a flawless transition from an interactive Framer Motion landing page directly into a fully functional Web3 dashboard.

---

##  Core Features

- **Dynamic Landing Page:** A stunning entryway powered by `framer-motion` to welcome users with smooth entrance animations and glowing UI components.
- **Glassmorphic Web3 Dashboard:** The primary interface ditches standard solid blocks in favor of deep `bg-slate-900/50`, `backdrop-blur` UI cards, and responsive ambient light orbs.
- **On-chain Faucet Claiming:** Features a robust Claim component that pulls the user's `lastRequestTime` directly from the blockchain to mathematically enforce a 24-hour smart contract cooldown in the UI.
- **Owner-Restricted Admin Minting:** Access control logic automatically verifies if the connected wallet matches the smart contract owner. Non-owners are safely restricted from interacting with the Minting controls and receive a visual 'Locked' state.
- **Silent & Clean UX:** Passive blockchain reads occur invisibly in the background. Actionable, responsive `react-toastify` popups only trigger upon active user transactions (Mint/Claim/Transfer) or error states.

---

##  Technology Stack

- **Frontend Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Web3 Integration:** Ethers.js (v6) + Reown AppKit / Web3Modal
- **Routing:** React Router DOM (v7)

---

##  Installation & Setup

If you are setting this project up on a Windows environment and encounter PowerShell Execution Policy blocks or dependency conflicts regarding React 19, it is highly recommended to execute these commands through **Git Bash**.

### 1. Clone the repository and enter the directory
```bash
cd VeloTokenHub
```

### 2. Install Dependencies safely
```bash
npm install --legacy-peer-deps
```
> Note: `--legacy-peer-deps` is required to ensure `framer-motion` and `@coinbase/wallet-sdk` resolve correctly alongside Reown AppKit in React 19 context.

### 3. Configure Smart Contract
Ensure your deployed VeloToken contract address is explicitly defined in your `.env` file at the root of the project:
```env
VITE_VELO_HUB_CONTRACT_ADDRESS="0xYourContractAddressHere"
```

### 4. Start the Development Server
```bash
npm run dev
```

The application will globally launch at `http://localhost:5173`. 

---

##  Project Structure Highlights

- `/src/pages/LandingPage.tsx`: The animated portal into the Hub.
- `/src/pages/Dashboard.tsx`: The main application host holding the interactive panels.
- `/src/component/`: Contains the modular UI views (`Mint`, `Transfer`, `Claim`, `TokenHeader`).
- `/src/hooks/specific/useReadVelo.ts`: Custom hook executing passive Ethers.js data reads.
- `/src/hooks/ClaimTimer.ts`: Handles the mathematical countdown enforcement for the faucet.

---

##  Verification & Caching Notes

Vite aggressively caches dependencies in a hidden `node_modules/.vite` folder to speed up boots. If you install new packages and immediately see a `504 (Outdated Optimize Dep)` error in your browser console, simply restart your Vite Server with the forced cache clear command:
```bash
npm run dev -- --force
```
Then perform a **Hard Refresh** (`Ctrl + F5`) in your web browser.
