import React, { useState } from 'react'
import { useAppKitAccount } from "@reown/appkit/react"
import { useVeloContract } from '../hooks/useContract'
import useRunners from '../hooks/useRunner'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

const Transfer = () => {

  const { address } = useAppKitAccount()
  const  Contract  = useVeloContract()
  const { signer } = useRunners()

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState("");
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Contract || !signer) {
      toast.error("Contract or signer not available");
      return;
    }

    if (!recipient || !amount) {
      toast.error("Please enter recipient and amount");
      return;
    }

    if (!address) {
      toast.error("Wallet not connected");
      return;
    }
    
    try {
      const parsedAmount = ethers.parseUnits(amount, 18)
       const contractWithSigner = Contract.connect(signer) as ethers.Contract
      const tx = await contractWithSigner.transfer(recipient, parsedAmount)
      toast.info("Transfer pending...")
      await tx.wait()
      toast.success("Transfer successful!")
    } catch (error) {
      toast.error("Transfer failed")
      console.error(error)
    } finally {
      setRecipient("")
      setAmount("")
    }
  };
  return (
    <div className='p-6 sm:p-8 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm h-full transition-all duration-300 hover:bg-slate-800/50 flex flex-col'>
        <h1 className='text-xl md:text-2xl text-white font-bold tracking-tight mb-5'>Token Transfer</h1>
        <div className='border-b border-white/10 mb-4'></div>
        <div className='flex-1 flex flex-col justify-center'>
            <form action="" onSubmit={handleTransfer}>
               <input type="text" value={recipient} onChange={((e) => setRecipient(e.target.value))} placeholder='Recipient Address' className='w-full mb-3 p-3 sm:p-4 text-sm sm:text-base border border-white/10 bg-slate-800/50 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-500 text-white transition-colors duration-300 outline-none' />
               <input type="number" value={amount} onChange={((e) => setAmount(e.target.value))} placeholder='Amount' className='w-full mb-4 p-3 sm:p-4 text-sm sm:text-base border border-white/10 bg-slate-800/50 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-500 text-white transition-colors duration-300 outline-none' />
               <button type='submit' className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-xl hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                  Send Tokens
                </button>
            </form>
        </div>
    </div>
  )
}

export default Transfer