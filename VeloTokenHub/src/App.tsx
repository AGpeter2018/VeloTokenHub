import NavBar from './component/NavBar'
import './App.css'
import TokenHeader from './component/TokenHeader'
import Claim from './component/Claim'
import Transfer from './component/Transfer'
import Mint from './component/Mint'

import "./connection.ts"

function App() {

  return (
    <div className="bg-gray-200 min-h-screen">
      <NavBar />
      <main className='pt-10 px-7'>
        <TokenHeader/>
      </main>
      <div className='flex items-center space-x-5'>
      <aside className='px-7 right-0 top-0 w-full md:w-1/3 lg:w-1/3'>
        <Claim/>
      </aside>
      <aside className='px-7 right-0 top-0 w-full md:w-1/3 lg:w-1/3'>
        <Transfer/>
      </aside>
      </div>
      <footer className=' px-7'>
        <Mint/>
      </footer>
    </div>
  )
}

export default App
