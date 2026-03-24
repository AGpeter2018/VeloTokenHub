import { useAppKitAccount } from "@reown/appkit/react"
import { useVeloContract } from "../useContract"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { formatUnits} from "ethers"

export const useReadVelo =  () => {
    const veloContract = useVeloContract()
    const { address } = useAppKitAccount()
    const [loading, setLoading] = useState<boolean>(false)
    const getTotalSupply = useCallback(async (): Promise<string | null> => {
        if (!address) {
            toast.error("Wallet not connected")
            return null
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return null
        }

        try {
            setLoading(true)
            const totalSupply = await veloContract.totalSupply()
            const formatted = formatUnits(totalSupply, 18)
            const cleanDisplay = Number(formatted).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
            });
            toast.success(`Total supply is ${cleanDisplay}`)
            console.log("Total supply:", cleanDisplay)
            return cleanDisplay
        } catch (error) {
            toast.error("Error fetching total supply")
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])
    
    const getSymbol = useCallback(async(): Promise<string | null> => {
        if (!address) {
            toast.error("Wallet not connected")
            return null
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return null
        }

        try {
            setLoading(true)
            const symbol = await veloContract.symbol()
            toast.success(`Token symbol is ${symbol}`)
            console.log("Token symbol:", symbol)
            return symbol
        } catch (error) {
            toast.error("Error fetching symbol")
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])

    const getName = useCallback(async(): Promise<string | null> => {
        if (!address) {
            toast.error("Wallet not connected")
            return null
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return null
        }

        try {
            setLoading(true)
            const name = await veloContract.name()
            toast.success(`Token name is ${name}`)
            console.log("Token name:", name)
            return name
        } catch (error) {
            toast.error("Error fetching name")
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])

    const getBalance = useCallback(async (): Promise<string | null> => {
        if (!address) {
            toast.error("Wallet not connected")
            return null
        }

        if (!veloContract) {
            toast.error("Velo contract not found")
            return null
        }

        try {
            setLoading(true)
            const balance = await veloContract.balanceOf(address)
            // const balanceString = balance.toString()
            const formatted = formatUnits(balance, 18)
            const cleanDisplay = Number(formatted). toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
            });
            toast.success(`Your balance is ${cleanDisplay}`)
            console.log("Your balance:", cleanDisplay)
            return cleanDisplay
        } catch (error) {
            toast.error("Error fetching balance")
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])

  return {
    loading,
    getTotalSupply,
    getSymbol,
    getName,
    getBalance
  }
}

