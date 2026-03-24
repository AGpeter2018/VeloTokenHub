import { useAppKitAccount } from "@reown/appkit/react"
import { useVeloContract } from "../useContract"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { ErrorDecoder } from "ethers-decode-error";

const errorDecoder = ErrorDecoder.create();

export const useWriteVelo = () => {
    const veloContract = useVeloContract()
    const { address } = useAppKitAccount()
    const [createLoading, setCreateLoading] = useState<boolean>(false)

    const createTokens = useCallback(async (amount: string) : Promise<boolean> => {
        if (!address) {
            toast.error("Wallet not connected")
            return false
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return false
        }

        try {
            setCreateLoading(true)
            const tx = await veloContract.requestToken(address, amount)
            toast.success(`Requested ${amount} tokens successfully!`)
            const receipt = await tx.wait()
            console.log(receipt)
            return receipt.status === 1
        } catch (error) {
          const decodedError = await errorDecoder.decode(error);
        toast.error(decodedError.reason);
        } finally {
            setCreateLoading(false)
            return false
        }
    }, [address, veloContract])

    const transferTokens = useCallback(async ( amount: string) : Promise<boolean> => {
        if (!address) {
            toast.error("Wallet not connected")
            return false
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return false
        }

        try {
            setCreateLoading(true)
            const tx = await veloContract.transfer(amount, address)
            toast.success(`Requested ${amount} tokens successfully!`)
            const receipt = await tx.wait()
            console.log(receipt)
            return receipt.status === 1
        } catch (error) {
           const decodedError = await errorDecoder.decode(error);
           toast.error(decodedError.reason);
        } finally {
            setCreateLoading(false)
            return false
        }
    }, [address, veloContract])

    const mintToken = useCallback(async( amount: string): Promise<boolean> => {

          if (!address) {
            toast.error("Wallet not connected")
            return false
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return false
        }

        try {
            setCreateLoading(true)
            const tx = await veloContract.mint(amount, address)
            toast.success(`Requested ${amount} tokens successfully!`)
            const receipt = await tx.wait()
            console.log(receipt)
            return receipt.status === 1
        } catch (error) {
            const decodedError = await errorDecoder.decode(error);
           toast.error(decodedError.reason);
        } finally {
            setCreateLoading(false)
            return false
        }
    }, [])
    return {
        createTokens,
        createLoading,
        transferTokens,
        mintToken
  }
    
}