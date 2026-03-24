import React, { useState } from 'react'
import { useAppKitAccount } from "@reown/appkit/react"
import { useVeloContract } from '../hooks/useContract'
import useRunners from '../hooks/useRunner'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

const Mint = () => {
  const { address } = useAppKitAccount()
  const  Contract  = useVeloContract()
  const { signer } = useRunners()

  const [amount, setAmount] = useState<string>("");
  const [contractAddress, setContractAddress] = useState("")

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!Contract || !signer) {
      toast.error("Contract or signer not available");
      return;
    }
    
    if (!contractAddress || !amount) {
      toast.error("Please enter contractAddress and amount");
      return;
    }
    
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const parsedAmount = ethers.parseUnits(amount, 18)
      const contractWithSigner = Contract.connect(signer) as ethers.Contract
      const tx = await contractWithSigner.mint(contractAddress, parsedAmount)
      toast.info("Minting pending...")
      await tx.wait()
      toast.success("Minting successful!")
    } catch (error) {
      toast.error("Transfer failed")
      console.error(error)
    } finally {
      setContractAddress("")
      setAmount("")
    }
  }
  return (
    <div className='mt-10 p-4 sm:p-5 bg-neutral-50 shadow-md rounded-lg'>
        <h1 className='text-lg sm:text-xl md:text-2xl text-black mb-4 font-semibold'>Admin Minting</h1>
        <div className='border border-gray-200 mb-4'></div>
        <div>
            <form action="" onSubmit={handleMint}>
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
               <input type="text" value={contractAddress} onChange={((e) => setContractAddress(e.target.value))} placeholder='Recipient Address' className='flex-1 mt-3 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded hover:border-gray-400' />
               <input type="number" value={amount} onChange={((e) => setAmount(e.target.value))}  placeholder='Amount' className='flex-1 mt-3 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded hover:border-gray-400' />
              </div>
               <button type='submit' className="bg-blue-600 text-white text-sm sm:text-base md:text-lg mt-4 w-full sm:w-auto px-6 py-2 sm:py-3 rounded hover:bg-blue-700 transition duration-300 cursor-pointer font-medium">
                  Mint Tokens
                </button>
            </form>
        </div>
    </div>
  )
}

export default Mint