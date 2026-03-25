import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const { open} = useAppKit()
  const { address } = useAppKitAccount()
  const navigate = useNavigate()

  const handleConnectWllet = () => {
    open()
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 bg-slate-900/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div 
              onClick={() => navigate('/')} 
              className="cursor-pointer text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 flex items-center gap-2"
            >
              <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
              VeloHub
            </div>
            <button 
              onClick={handleConnectWllet} 
              className="px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
            </button>
        </div>
    </nav>
  )
}

export default NavBar