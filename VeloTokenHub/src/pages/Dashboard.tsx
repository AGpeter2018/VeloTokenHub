import NavBar from '../component/NavBar'
import TokenHeader from '../component/TokenHeader'
import Claim from '../component/Claim'
import Transfer from '../component/Transfer'
import Mint from '../component/Mint'

const Dashboard = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white selection:bg-indigo-500/30 overflow-hidden relative pb-10">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      <div className="relative z-10">
        <NavBar />
        <main className='pt-28 px-4 sm:px-7 max-w-7xl mx-auto'>
          <TokenHeader/>
        </main>
        <div className='flex flex-wrap md:flex-nowrap items-stretch space-y-5 md:space-y-0 md:space-x-5 mt-5 px-4 sm:px-7 max-w-7xl mx-auto'>
          <aside className='w-full md:w-1/2'>
            <Claim/>
          </aside>
          <aside className='w-full md:w-1/2'>
            <Transfer/>
          </aside>
        </div>
        <footer className='px-4 sm:px-7 mt-5 max-w-7xl mx-auto'>
          <Mint/>
        </footer>
      </div>
    </div>
  )
}

export default Dashboard
