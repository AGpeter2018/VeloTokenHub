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
        if (!supply) return
        setTokenInfo([{
          balance: balance || 0,
          symbol: symbol || 'VELO',
          name: name || 'VeloToken',
          totalSupply: supply,
        }])
      } finally {
        setIsLoading(false)
      }
    }
    fetchSupply()
  }, [getTotalSupply, getSymbol])

  return (
    <div className='mt-20 p-4 sm:p-5 bg-neutral-50 shadow-md rounded-lg w-full mx-0 max-w-none'>
      <h1 className='text-2xl md:text-3xl text-black mb-4'>Token Info</h1>
      <div className='border border-gray-200'></div>
      <div>
        {isLoading ? (
          <div className='flex justify-center items-center py-10'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-black'></div>
            <span className='ml-3 text-neutral-600 font-medium'>Loading Token Info...</span>
          </div>
        ) : (
          <>
            {
              tokenInfo?.map
                ((token, index) => (
                  <div key={index} className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 items-center mt-4'>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm min-w-0'>
                      <img src={Pulse} alt='balance' className='w-10 h-10' />
                      <div>
                        <div className='font-medium text-sm sm:text-base'>Your Balance:</div>
                        <div className='text-base md:text-lg font-semibold truncate'>{token.balance} {token.symbol}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm min-w-0'>
                      <img src={Token} alt={token.name} className='w-10 h-10' />
                      <div>
                        <div className='font-medium text-sm sm:text-base'>Token Name:</div>
                        <div className='text-base md:text-lg font-semibold truncate'>{token.name}</div>
                      </div>
                    </div>
                  </div>
                ))
            }
            <div className='border border-gray-200 mt-3'></div>
            {
              tokenInfo?.map
                ((token, index) => (
                  <div key={index} className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 items-center mt-4'>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm min-w-0'>
                      <img src={Pulse} alt='total supply' className='w-10 h-10' />
                      <div>
                        <div className='font-medium text-sm sm:text-base'>Total Supply:</div>
                        <div className='text-base md:text-lg font-semibold truncate'>{token.totalSupply} {token.symbol}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm min-w-0'>
                      <img src={Token} alt={token.name} className='w-10 h-10' />
                      <div>
                        <div className='font-medium text-sm sm:text-base'>Token Symbol:</div>
                        <div className='text-base md:text-lg font-semibold truncate'>{token.symbol}</div>
                      </div>
                    </div>
                  </div>
                ))
            }
          </>
        )}
      </div>
    </div>
  )
}

export default TokenHeader