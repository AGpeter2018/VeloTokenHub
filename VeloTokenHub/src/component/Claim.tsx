import React, { useEffect, useState } from 'react'
import { useAppKitAccount } from "@reown/appkit/react"
import { useVeloContract } from '../hooks/useContract'
import useRunners from '../hooks/useRunner'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

import { useFaucetTimer } from "../hooks/ClaimTimer"

const Claim = () => {
  const { address } = useAppKitAccount()
  const Contract = useVeloContract()
  const { signer } = useRunners()
  
  const [lastClaimTime, setLastClaimTime] = useState<number>(0);

  const fetchLastClaimTime = async () => {
    if (Contract && address) {
      try {
        const time = await Contract.lastRequestTime(address);
        setLastClaimTime(Number(time));
      } catch (error) {
        console.error("Error fetching last claim time:", error);
      }
    }
  };

  useEffect(() => {
    fetchLastClaimTime();
  }, [Contract, address]);

  const { isLocked, countdown } = useFaucetTimer(lastClaimTime)

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!Contract || !signer) {
      toast.error("Contract not available");
      return;
    }
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }
    try {
      const contractWithSigner = Contract.connect(signer) as ethers.Contract
      const tx = await contractWithSigner.requestToken(address, ethers.parseUnits("100", 18))
      console.log(tx)
      toast.info("Claim pending...")
      await tx.wait()
      toast.success("Claim successful!")
      // Refresh the lock timer instantly after successful claim
      fetchLastClaimTime();
    } catch (error: any) {
      toast.error(error.reason || "Claim failed.")
      console.error(error)
    } 
  }

  return (
    <div className='p-6 sm:p-8 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm h-full transition-all duration-300 hover:bg-slate-800/50 flex flex-col'>
        <h1 className='text-xl md:text-2xl text-white font-bold tracking-tight mb-5'>Faucet Claim</h1>
        <div className='border-b border-white/10 mb-4'></div>
        <div className='flex-1 flex flex-col justify-center'>
        {
          isLocked ? (
            <button disabled className="w-full bg-slate-800/80 cursor-not-allowed px-6 py-3.5 rounded-xl text-slate-400 text-sm sm:text-base font-medium border border-white/5">
              Next Claim in {countdown}
            </button>
          ) : (
            <button onClick={handleClaim} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-xl hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0">
              Request Tokens
            </button>
          )
        }
        </div>
    </div>
  )
}

export default Claim