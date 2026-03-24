import React from 'react'
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
  
  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!Contract || !signer) {
      toast.error("Contract or signer not available");
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
    } catch (error) {
      toast.error("Transfer failed")
      console.error(error)
    } 
  }

  const { isLocked, countdown } = useFaucetTimer(0)

  return (
    <div className='mt-10 p-4 sm:p-5 bg-neutral-50 shadow-md rounded-lg'>
        <h1 className='text-lg sm:text-xl md:text-2xl text-black mb-4 font-semibold'>Faucet Claim</h1>
        {
          isLocked ? (
            <button disabled className="bg-gray-400 cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 rounded text-white text-sm sm:text-base font-medium">
              Next Claim in {countdown}
            </button>
          ) : (
            <>
              <div className='border border-gray-200 mb-4'></div>
              <button onClick={handleClaim} className="bg-blue-600 text-white text-sm sm:text-base md:text-lg w-full sm:w-auto mt-3 px-6 py-2 sm:py-3 rounded hover:bg-blue-700 transition duration-300 cursor-pointer font-medium">
                Request Tokens
              </button>
            </>
          )
        }
         
      
    </div>
  )
}

export default Claim