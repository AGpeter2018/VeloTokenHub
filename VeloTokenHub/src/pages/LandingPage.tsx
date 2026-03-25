import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Navbar Minimal */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
      >
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 flex items-center gap-2">
          <Layers className="w-8 h-8 sm:w-8 sm:h-8 text-indigo-400" />
          VeloHub
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:scale-105 active:scale-95"
        >
          Launch App
        </button>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-10 pb-20 text-center max-w-5xl mx-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium border rounded-full text-indigo-300 border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md"
        >
          <span className="flex w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Now Live on Network
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
        >
          The Ultimate <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">Token Experience</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mb-10 text-lg text-slate-400 sm:text-xl"
        >
          Manage your Velo tokens dynamically. Claim, transfer, and explore the robust tokenomics behind VeloTokenHub with an ultra-premium interface.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-1"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#"
            className="flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300 border rounded-full text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            View Documentation
          </a>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 px-4 py-24 mx-auto max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="p-8 transition-colors duration-300 border border-slate-800 rounded-2xl bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-sm group">
            <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-indigo-500/20 text-indigo-400 transition-transform group-hover:scale-110">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">Seamless Management</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Interact with smart contracts effortlessly. Our intuitive dashboard acts as your central hub for all Velo operations.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="p-8 transition-colors duration-300 border border-slate-800 rounded-2xl bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-sm group">
            <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-blue-500/20 text-blue-400 transition-transform group-hover:scale-110">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">Lightning Fast</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Powered by optimized smart contract calls and a responsive interface, experience near-instant confirmations.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="p-8 transition-colors duration-300 border border-slate-800 rounded-2xl bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-sm group">
            <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-cyan-500/20 text-cyan-400 transition-transform group-hover:scale-110">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">Secure Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your assets are protected by industry-standard security practices. Connect your wallet with full confidence.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
