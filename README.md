# VeloToken Ecosystem 

Welcome to the **VeloToken Ecosystem**, a full-stack decentralized application (dApp) featuring a high-performance smart contract suite and a premium, glassmorphic user interface.

This repository is a monorepo containing both the blockchain logic and the frontend hub.

---

##  Repository Structure

The project is divided into two main components:

### 1. [VeloTokenHub](./VeloTokenHub) (Frontend Hub) 
A high-end React-based dashboard for interacting with the VeloToken contract.
- **Visuals**: Premium glassmorphic design with dark mode and smooth animations.
- **Features**: Faucet claims with real-time cooldown timers, token transfers, and admin minting controls.
- **Tech**: React 19, Vite, Tailwind CSS, Framer Motion, Ethers.js.

### 2. [veloDapps](./veloDapps) (Smart Contracts) 
The core decentralised logic powered by Foundry.
- **Contracts**: VeloToken (ERC20) with minting and faucet logic.
- **Framework**: Foundry (Forge, Cast, Anvil).
- **Features**: Time-locked faucet requests, ownership-based minting, and robust unit tests.

---

##  Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (for contract development)
- [Git Bash](https://gitforwindows.org/) (Recommended for Windows users to avoid shell-specific lock issues)

### Local Development Flow

1. **Smart Contracts**:
   Navigate to `veloDapps/` to build, test, or deploy your contracts.
   ```bash
   cd veloDapps
   forge build
   forge test
   ```

2. **Frontend Hub**:
   Navigate to `VeloTokenHub/` to start the dashboard.
   ```bash
   cd VeloTokenHub
   npm install --legacy-peer-deps
   npm run dev
   ```

---

##  Design Philosophy

The VeloToken ecosystem is designed with a **"Zero-to-One" premium aesthetic**. We prioritize:
- **Immersive UX**: Smooth transitions and blur-based glassmorphism.
- **On-chain Transparency**: Real-time feedback from the blockchain with clear error handling and notifications via React Toastify.
- **Access Control**: Clearly defined admin/owner roles with visual UI feedback for restricted features.

---

##  License
This project is open-source and governed by the MIT License.
