
import React from 'react';

export const TradeLogs: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page Heading */}
      <div>
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">Historical Trade Log</h1>
        <p className="text-white/60">Review and analyze all your past trading activity.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="flex-grow w-full md:w-auto">
          <label className="flex flex-col h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-white/50 flex bg-[#1c261f] items-center justify-center pl-4 rounded-l-lg border-y border-l border-white/10">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-0 focus:ring-0 border-y border-r border-l-0 border-white/10 bg-[#1c261f] h-full placeholder:text-white/50 px-4 pl-2 text-base font-normal leading-normal" 
                placeholder="Search trades by symbol, strategy, or notes..." 
              />
            </div>
          </label>
        </div>
        
        {/* Chips */}
        <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['Date Range', 'Strategy', 'Symbol', 'Direction'].map(filter => (
            <button key={filter} className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1c261f] px-4 border border-white/10 hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-base text-white/70">
                {filter === 'Date Range' ? 'calendar_month' : filter === 'Strategy' ? 'psychology' : filter === 'Symbol' ? 'sell' : 'swap_vert'}
              </span>
              <p className="text-white text-sm font-medium leading-normal">{filter}</p>
              <span className="material-symbols-outlined text-base text-white/50">expand_more</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar and Data Table */}
      <div className="bg-[#1c261f] border border-white/10 rounded-xl overflow-hidden flex-grow flex flex-col">
        {/* ToolBar */}
        <div className="flex justify-between items-center gap-2 p-4 border-b border-white/10 bg-[#1c261f]">
          <div className="flex gap-2">
            <button className="p-2 text-white/60 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <span className="material-symbols-outlined">tune</span>
            </button>
            <button className="p-2 text-white/60 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 bg-primary text-[#111813] text-sm font-bold px-4 hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            <span className="truncate">Export</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-auto flex-grow">
          <table className="w-full text-sm text-left text-white/70">
            <thead className="text-xs text-white uppercase bg-[#111813] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-medium">Strategy</th>
                <th className="px-6 py-4 font-medium">Symbol</th>
                <th className="px-6 py-4 font-medium">Entry Time</th>
                <th className="px-6 py-4 font-medium">Exit Time</th>
                <th className="px-6 py-4 font-medium">Direction</th>
                <th className="px-6 py-4 text-right font-medium">Entry Price</th>
                <th className="px-6 py-4 text-right font-medium">Exit Price</th>
                <th className="px-6 py-4 text-right font-medium">P&L ($)</th>
                <th className="px-6 py-4 text-right font-medium">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                { strat: 'MA Crossover', sym: 'EURUSD', entryT: '2023-10-26 08:05:12', exitT: '2023-10-26 14:30:45', dir: 'BUY', entryP: '1.0550', exitP: '1.0620', pnl: '+$700.00', size: '1.00', pnlColor: 'text-green-400', badgeColor: 'bg-green-900 text-green-300' },
                { strat: 'RSI Divergence', sym: 'GBPUSD', entryT: '2023-10-25 11:20:01', exitT: '2023-10-25 12:45:15', dir: 'SELL', entryP: '1.2155', exitP: '1.2185', pnl: '-$300.00', size: '1.00', pnlColor: 'text-red-400', badgeColor: 'bg-red-900 text-red-300' },
                { strat: 'VWAP Bounce', sym: 'TSLA', entryT: '2023-10-24 10:00:30', exitT: '2023-10-24 15:50:00', dir: 'BUY', entryP: '212.50', exitP: '220.75', pnl: '+$825.00', size: '100', pnlColor: 'text-green-400', badgeColor: 'bg-green-900 text-green-300' },
                { strat: 'MACD Signal', sym: 'BTCUSD', entryT: '2023-10-23 03:15:00', exitT: '2023-10-23 22:00:00', dir: 'BUY', entryP: '33500.00', exitP: '34800.00', pnl: '+$1300.00', size: '0.10', pnlColor: 'text-green-400', badgeColor: 'bg-green-900 text-green-300' },
                { strat: 'MA Crossover', sym: 'USDJPY', entryT: '2023-10-22 18:00:00', exitT: '2023-10-23 09:30:00', dir: 'SELL', entryP: '150.10', exitP: '150.00', pnl: '+$100.00', size: '1.00', pnlColor: 'text-green-400', badgeColor: 'bg-red-900 text-red-300' },
                 { strat: 'VWAP Bounce', sym: 'AAPL', entryT: '2023-10-21 09:45:10', exitT: '2023-10-21 11:30:25', dir: 'SELL', entryP: '175.50', exitP: '176.10', pnl: '-$60.00', size: '100', pnlColor: 'text-red-400', badgeColor: 'bg-red-900 text-red-300' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{row.strat}</td>
                  <td className="px-6 py-4">{row.sym}</td>
                  <td className="px-6 py-4">{row.entryT}</td>
                  <td className="px-6 py-4">{row.exitT}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md ${row.badgeColor}`}>
                      {row.dir}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-white/90">{row.entryP}</td>
                  <td className="px-6 py-4 text-right font-mono text-white/90">{row.exitP}</td>
                  <td className={`px-6 py-4 text-right font-bold ${row.pnlColor}`}>{row.pnl}</td>
                  <td className="px-6 py-4 text-right">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
