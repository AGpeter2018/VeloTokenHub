import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

const NavBar = () => {
  const { open} = useAppKit()
  const { address } = useAppKitAccount()
  const handleConnectWllet = () => {
    open()
  }
  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-500 p-4 sm:p-5 md:p-7 z-50">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">VeloHub</h1>
            </div>
           <div className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded text-sm sm:text-base hover:bg-blue-700 transition duration-300">
               <button onClick={handleConnectWllet} className="cursor-pointer font-medium">
                 {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
               </button>
           </div>
        </div>
    </nav>
  )
}

export default NavBar