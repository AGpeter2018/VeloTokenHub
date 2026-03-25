import { useEffect, useState } from 'react'

import Pulse from '../assets/pulse.jpg'
import Token from '../assets/token.png'
import { useReadVelo } from '../hooks/specific/useReadVelo'

interface TokenInfo1 {
  balance: string | number
  symbol: string
  name: string
  totalSupply?: string
}

const TokenHeader = () => {
  const { getTotalSupply, getSymbol, getName, getBalance } = useReadVelo()
  const [tokenInfo, setTokenInfo] = useState<TokenInfo1[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSupply = async () => {
      setIsLoading(true)
      try {
        const supply = await getTotalSupply()
        const symbol = await getSymbol()
        const name = await getName()
        const balance = await getBalance()
        
        // Always populate token info with fallbacks if undefined
        setTokenInfo([{
          balance: balance || '0',
          symbol: symbol || 'VELO',
          name: name || 'VeloToken',
          totalSupply: supply || '0',
        }])
      } catch (err) {
        console.error("Failed to fetch token supply data:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSupply()
  }, [getTotalSupply, getSymbol, getName, getBalance])

  return (
    <div className='p-6 sm:p-8 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm w-full mx-0 max-w-none transition-all duration-300 hover:bg-slate-800/50'>
      <h1 className='text-xl md:text-2xl text-white font-bold tracking-tight mb-5'>Token Info</h1>
      <div className='border-b border-white/10 mb-2'></div>
      <div>
        {isLoading ? (
          <div className='flex justify-center items-center py-10'>
            <div className='animate-spin rounded-full h-8 w-8 border-4 border-slate-700 border-t-indigo-500'></div>
            <span className='ml-3 text-slate-400 font-medium'>Fetching Data...</span>
          </div>
        ) : tokenInfo && tokenInfo.length > 0 ? (
          <>
            {
              tokenInfo.map
                ((token, index) => (
                  <div key={index} className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 items-center mt-4'>
                    <div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 shadow-sm min-w-0'>
                      <img src={Pulse} alt='balance' className='w-10 h-10 rounded-full' />
                      <div>
                        <div className='font-medium text-xs sm:text-sm text-slate-400'>Your Balance</div>
                        <div className='text-base md:text-lg font-semibold text-white truncate'>{token.balance} {token.symbol}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 shadow-sm min-w-0'>
                      <img src={Token} alt={token.name} className='w-10 h-10 rounded-full' />
                      <div>
                        <div className='font-medium text-xs sm:text-sm text-slate-400'>Token Name</div>
                        <div className='text-base md:text-lg font-semibold text-white truncate'>{token.name}</div>
                      </div>
                    </div>
                  </div>
                ))
            }
            <div className='border-b border-white/10 mt-5 mb-1'></div>
            {
              tokenInfo.map
                ((token, index) => (
                  <div key={index} className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 items-center mt-4'>
                    <div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 shadow-sm min-w-0'>
                      <img src={Pulse} alt='total supply' className='w-10 h-10 rounded-full' />
                      <div>
                        <div className='font-medium text-xs sm:text-sm text-slate-400'>Total Supply</div>
                        <div className='text-base md:text-lg font-semibold text-white truncate'>{token.totalSupply} {token.symbol}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 shadow-sm min-w-0'>
                      <img src={Token} alt={token.name} className='w-10 h-10 rounded-full' />
                      <div>
                        <div className='font-medium text-xs sm:text-sm text-slate-400'>Token Symbol</div>
                        <div className='text-base md:text-lg font-semibold text-white truncate'>{token.symbol}</div>
                      </div>
                    </div>
                  </div>
                ))
            }
          </>
        ) : (
          <div className='py-8 text-center text-slate-400'>
             <p>Please connect your wallet or unlock provider to view Token Info.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenHeader