import { useAppKitAccount } from "@reown/appkit/react"
import { useVeloContract } from "../useContract"
import { useCallback, useState } from "react"
import { formatUnits} from "ethers"

export const useReadVelo =  () => {
    const veloContract = useVeloContract()
    const { address } = useAppKitAccount()
    const [loading, setLoading] = useState<boolean>(false)
    
    const getTotalSupply = useCallback(async (): Promise<string | null> => {
        if (!address || !veloContract) return null
        
        try {
            setLoading(true)
            const totalSupply = await veloContract.totalSupply()
            const formatted = formatUnits(totalSupply, 18)
            const cleanDisplay = Number(formatted).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            });
            return cleanDisplay
        } catch (error) {
            console.error("Error fetching total supply:", error)
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])
    
    const getSymbol = useCallback(async(): Promise<string | null> => {
        if (!address || !veloContract) return null

        try {
            setLoading(true)
            const symbol = await veloContract.symbol()
            return symbol
        } catch (error) {
            console.error("Error fetching symbol:", error)
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])

    const getName = useCallback(async(): Promise<string | null> => {
        if (!address || !veloContract) return null

        try {
            setLoading(true)
            const name = await veloContract.name()
            return name
        } catch (error) {
            console.error("Error fetching name:", error)
            return null
        } finally {
            setLoading(false)
        }
    }, [address, veloContract])

    const getBalance = useCallback(async (): Promise<string | null> => {
        if (!address || !veloContract) return null

        try {
            setLoading(true)
            const balance = await veloContract.balanceOf(address)
            const formatted = formatUnits(balance, 18)
            const cleanDisplay = Number(formatted).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            });
            return cleanDisplay
        } catch (error) {
            console.error("Error fetching balance:", error)
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
