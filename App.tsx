
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { StrategyBuilder } from './pages/StrategyBuilder';
import { ImportData } from './pages/ImportData';
import { MyStrategies } from './pages/MyStrategies';
import { Backtest } from './pages/Backtest';
import { LiveControl } from './pages/LiveControl';
import { TradeLogs } from './pages/TradeLogs';
import { Settings } from './pages/Settings';

const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-[#112116] flex flex-col items-center justify-center p-4">
    <header className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <span className="material-symbols-outlined">candlestick_chart</span> TradeFlow
        </div>
        <button onClick={onLogin} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">Sign In</button>
    </header>
    <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Automate Your <br/> <span className="text-primary">Trading Strategy.</span>
        </h1>
        <p className="text-white/70 text-lg mb-8">
            Connect your cTrader account, map your rules with AI, and let our powerful automation handle the rest.
        </p>
        <button onClick={onLogin} className="px-8 py-4 bg-primary text-[#112116] rounded-xl text-lg font-bold hover:opacity-90 transition-opacity">
            Start Automating Now
        </button>
    </div>
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {[
            {icon: 'link', title: 'Seamless Integration', desc: 'Direct cTrader API connection.'},
            {icon: 'psychology', title: 'AI Powered', desc: 'Extract data from chart images.'},
            {icon: 'bolt', title: 'Instant Execution', desc: 'Cloud-based low latency trades.'}
        ].map((f, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
                <span className="material-symbols-outlined text-primary text-3xl mb-3">{f.icon}</span>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
            </div>
        ))}
    </div>
  </div>
);

const LoginModal = ({ onComplete }: { onComplete: () => void }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1c261f] w-full max-w-md p-8 rounded-2xl border border-white/10 relative">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/20 text-primary mb-4">
                    <span className="material-symbols-outlined text-2xl">candlestick_chart</span>
                </div>
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-white/50">Sign in to access your dashboard</p>
            </div>
            <div className="space-y-4">
                <input type="email" placeholder="Email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none" />
                <input type="password" placeholder="Password" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none" />
                <button onClick={onComplete} className="w-full py-3 bg-primary text-[#112116] font-bold rounded-lg hover:opacity-90">Sign In</button>
            </div>
             <p className="text-center text-white/40 text-sm mt-6">
                Demo Account? <span className="text-primary cursor-pointer" onClick={onComplete}>Skip Login</span>
            </p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  if (!isAuthenticated) {
      return (
          <>
            <LandingPage onLogin={() => setShowLogin(true)} />
            {showLogin && <LoginModal onComplete={() => setIsAuthenticated(true)} />}
          </>
      );
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard': return <Dashboard />;
      case '/builder': return <StrategyBuilder />;
      case '/import': return <ImportData />;
      case '/strategies': return <MyStrategies />;
      case '/backtest': return <Backtest />;
      case '/live': return <LiveControl />;
      case '/logs': return <TradeLogs />;
      case '/settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#111813] text-white">
      <Sidebar 
        currentPath={currentPath} 
        onNavigate={setCurrentPath} 
        onLogout={() => setIsAuthenticated(false)}
      />
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
