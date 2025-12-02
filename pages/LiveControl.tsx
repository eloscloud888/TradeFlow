
import React from 'react';

export const LiveControl: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <header className="flex flex-col gap-2">
        <h1 className="text-white text-3xl font-bold leading-tight tracking-[-0.033em]">Live Trading Control</h1>
        <p className="text-white/60 text-base font-normal leading-normal">Activate and monitor your automated trading strategies in real-time.</p>
      </header>

      {/* Alert Banner */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-red-900/50 border border-red-500 text-red-300">
        <span className="material-symbols-outlined text-red-400 !text-3xl">error</span>
        <div className="flex-grow">
          <h3 className="font-bold text-red-200">Critical Alert: Connection Lost</h3>
          <p className="text-sm">Lost connection to cTrader API at 08:45:12 UTC. Trading is paused. Please check your API key and network status.</p>
        </div>
        <button className="p-2 text-red-300 hover:text-white rounded-md hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          {/* My Strategies List */}
          <div className="bg-[#1c261f] rounded-xl border border-white/10 flex flex-col h-full overflow-hidden">
            <h2 className="text-white text-xl font-bold px-6 pt-6 pb-4 border-b border-white/10">My Strategies</h2>
            <div className="flex-grow p-6 flex flex-col gap-4 overflow-y-auto">
              <div className="flex items-center gap-4 p-4 bg-[#111813] border border-primary/50 rounded-lg">
                <div className="flex-grow">
                  <h3 className="text-white font-semibold">Momentum Scalper v2</h3>
                  <p className="text-sm text-white/60">EURUSD | 5m | RSI/MA Cross</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center gap-4 p-4 bg-transparent border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex-grow">
                  <h3 className="text-white font-semibold">Mean Reversion Bot</h3>
                  <p className="text-sm text-white/60">GBP/JPY | 1h | Bollinger Bands</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center gap-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <div className="flex-grow">
                  <h3 className="text-white font-semibold">VWAP Day Trader</h3>
                  <p className="text-sm text-red-300">XAU/USD | 15m | Large Drawdown</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* API Key Management */}
          <div className="bg-[#1c261f] rounded-xl border border-white/10 flex flex-col">
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-white/10">
              <h2 className="text-white text-xl font-bold">API Key Management</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-background-dark text-xs font-bold rounded-md hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined !text-base">add</span>
                <span>New Key</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-green-400 !text-2xl">verified_user</span>
                  <span className="text-xs text-green-400">Active</span>
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-white">cTrader Live Account</p>
                  <p className="font-mono text-sm text-white/60">Key: ••••••••••••••••a4f8</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-white/40 hover:text-white rounded-md hover:bg-white/10 transition-colors"><span className="material-symbols-outlined !text-xl">visibility</span></button>
                  <button className="p-2 text-white/40 hover:text-white rounded-md hover:bg-white/10 transition-colors"><span className="material-symbols-outlined !text-xl">edit</span></button>
                  <button className="p-2 text-white/40 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors"><span className="material-symbols-outlined !text-xl">delete</span></button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-red-400 !text-2xl">gpp_maybe</span>
                  <span className="text-xs text-red-400">Error</span>
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-white">cTrader Demo Account</p>
                  <p className="font-mono text-sm text-white/60">Key: ••••••••••••••••3b9c</p>
                </div>
                 <div className="flex items-center gap-1">
                  <button className="p-2 text-white/40 hover:text-white rounded-md hover:bg-white/10 transition-colors"><span className="material-symbols-outlined !text-xl">visibility</span></button>
                  <button className="p-2 text-white/40 hover:text-white rounded-md hover:bg-white/10 transition-colors"><span className="material-symbols-outlined !text-xl">edit</span></button>
                  <button className="p-2 text-white/40 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors"><span className="material-symbols-outlined !text-xl">delete</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="xl:col-span-2 bg-[#1c261f] rounded-xl border border-white/10 flex flex-col min-h-[600px]">
          <div className="flex flex-wrap justify-between items-center gap-4 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold text-white">Momentum Scalper v2</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-primary font-medium border border-primary/20">Active</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-white/60 text-xs">P&L</span>
                <span className="font-bold text-green-400">+$1,284.50</span>
              </div>
              <div className="w-px h-6 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-white/60 text-xs">Open Positions</span>
                <span className="font-bold text-white">2</span>
              </div>
              <div className="w-px h-6 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-white/60 text-xs">Active Orders</span>
                <span className="font-bold text-white">4</span>
              </div>
            </div>
          </div>
          {/* Mock Chart Area */}
          <div className="flex-grow p-4 relative flex items-center justify-center bg-[#111813]">
             <span className="text-white/20">Live Chart Visualization Placeholder</span>
             {/* In a real app, integrate Lightweight Charts or Recharts with WebSocket data here */}
          </div>
        </div>
      </div>
    </div>
  );
};
