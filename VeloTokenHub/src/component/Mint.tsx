import React, { useEffect, useState } from 'react'
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
  const [owner, setOwner] = useState<boolean>(false)
  const [isChecking, setIsChecking] = useState(true);

useEffect(() => {
  const checkOwnership = async () => {
    if (!Contract || !address) {
      setOwner(false);
      setIsChecking(false);
      return;
    }

    try {
      const ownerAddress = await Contract.owner();

      const match = ownerAddress.toLowerCase() === address.toLowerCase();
      setOwner(match);
    } catch (error) {
      console.error("Owner check failed:", error);
      setOwner(false);
    } finally {
      setIsChecking(false);
    }
  };

  checkOwnership();
}, [address, Contract]); 

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

    if (!owner) {
      toast.error("Access Denied: Only the contract owner can mint.");
      return;
    }

    try {
      const parsedAmount = ethers.parseUnits(amount, 18)
      const contractWithSigner = Contract.connect(signer) as ethers.Contract
      const tx = await contractWithSigner.mint(contractAddress, parsedAmount)
      toast.info("Minting pending...")
      await tx.wait()
      toast.success("Minting successful!")
    } catch (error: any) {
      toast.error(error.reason || "Minting failed. Check console for details.");
      console.error(error);
    } finally {
      setContractAddress("")
      setAmount("")
    }
  }

  if (isChecking) {
    return (
      <div className='p-6 sm:p-8 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm transition-all duration-300'>
        <h1 className='text-xl md:text-2xl text-white font-bold tracking-tight mb-5'>Admin Minting</h1>
        <div className='border-b border-white/10 mb-4'></div>
        <div className='py-4 text-center text-slate-400'>
          <div className='animate-pulse'>Verifying Admin Access...</div>
        </div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className='p-6 sm:p-8 border border-red-900/30 rounded-2xl bg-slate-900/50 backdrop-blur-sm transition-all duration-300 opacity-75'>
        <h1 className='text-xl md:text-2xl text-white font-bold tracking-tight mb-5 flex items-center gap-2'>
          Admin Minting 
          <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full border border-red-500/20">Locked</span>
        </h1>
        <div className='border-b border-white/10 mb-4'></div>
        <div className='py-6 text-center text-slate-400'>
          <p>Access Denied. Only the contract owner can mint new tokens.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 sm:p-8 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] rounded-2xl bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/50'>
        <h1 className='text-xl md:text-2xl text-white font-bold tracking-tight mb-5 flex items-center gap-2'>
          Admin Minting
          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/20">Owner</span>
        </h1>
        <div className='border-b border-white/10 mb-4'></div>
        <div>
            <form  onSubmit={handleMint} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className='flex flex-col sm:flex-row gap-4 flex-1 w-full'>
               <input type="text" value={contractAddress} onChange={((e) => setContractAddress(e.target.value))} placeholder='Recipient Address' className='flex-1 p-3 sm:p-4 text-sm sm:text-base border border-white/10 bg-slate-800/50 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-500 text-white transition-colors duration-300 outline-none' />
               <input type="number" value={amount} onChange={((e) => setAmount(e.target.value))}  placeholder='Amount' className='w-full sm:w-48 p-3 sm:p-4 text-sm sm:text-base border border-white/10 bg-slate-800/50 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-500 text-white transition-colors duration-300 outline-none' />
              </div>
               <button type='submit' className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-semibold px-8 py-3.5 sm:py-4 rounded-xl hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                  Mint Tokens
                </button>
            </form>
        </div>
    </div>
  )
}

export default Mint