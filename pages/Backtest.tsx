
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = Array.from({ length: 50 }, (_, i) => ({
  name: i.toString(),
  value: 10000 + Math.random() * 2000 + (i * 100),
}));

export const Backtest: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-white text-3xl font-bold leading-tight tracking-[-0.033em]">Strategy Backtest & Simulation</p>
          <p className="text-white/60 text-base font-normal leading-normal">Test your defined strategies against historical or live market data.</p>
        </div>
        <button className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-bold text-black hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">play_arrow</span>
          Run Backtest
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex h-10 w-full max-w-sm items-center justify-center rounded-lg bg-[#1c261f] p-1 border border-white/10">
        <label className="flex h-full flex-1 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium leading-normal text-white/60 has-[:checked]:bg-[#111813] has-[:checked]:text-white transition-all">
          <span>Backtest</span>
          <input defaultChecked className="hidden" name="mode" type="radio" value="Backtest"/>
        </label>
        <label className="flex h-full flex-1 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium leading-normal text-white/60 has-[:checked]:bg-[#111813] has-[:checked]:text-white transition-all">
          <span>Simulation</span>
          <input className="hidden" name="mode" type="radio" value="Simulation"/>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Configuration Panel */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="rounded-xl border border-white/10 bg-[#1c261f] p-6">
            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white mb-6">Configuration</h3>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-normal text-white/80">Strategy</p>
                <select className="form-select h-12 w-full rounded-lg border border-white/10 bg-[#111813] p-3 text-sm font-normal text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option>RSI Momentum Cross</option>
                  <option>MACD Crossover V2</option>
                  <option>VWAP Bounce Strategy</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-normal text-white/80">Chart Data</p>
                <select className="form-select h-12 w-full rounded-lg border border-white/10 bg-[#111813] p-3 text-sm font-normal text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option>EURUSD (cTrader)</option>
                  <option>BTCUSD (Binance)</option>
                  <option>AAPL (NASDAQ)</option>
                </select>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <p className="text-sm font-medium leading-normal text-white/80">Start Date</p>
                  <input className="form-input h-12 w-full rounded-lg border border-white/10 bg-[#111813] p-3 text-sm font-normal text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" type="date" defaultValue="2023-01-01"/>
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-sm font-medium leading-normal text-white/80">End Date</p>
                  <input className="form-input h-12 w-full rounded-lg border border-white/10 bg-[#111813] p-3 text-sm font-normal text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" type="date" defaultValue="2023-12-31"/>
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-normal text-white/80">Timeframes</p>
                <div className="grid grid-cols-4 gap-2">
                  {['5m', '15m', '1h', '4h'].map(tf => (
                    <label key={tf} className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-sm text-white/60 bg-[#111813] border border-white/10 has-[:checked]:bg-primary has-[:checked]:text-black transition-colors">
                      <input defaultChecked={['5m', '15m', '1h'].includes(tf)} className="hidden" name="timeframe" type="checkbox" value={tf}/>{tf}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance & Chart Panel */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-[#1c261f] p-4">
              <p className="text-sm text-white/60">Total P&L</p>
              <p className="mt-1 text-2xl font-bold text-green-400">+$12,450.75</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1c261f] p-4">
              <p className="text-sm text-white/60">Win Rate</p>
              <p className="mt-1 text-2xl font-bold text-white">68.2%</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1c261f] p-4">
              <p className="text-sm text-white/60">Profit Factor</p>
              <p className="mt-1 text-2xl font-bold text-white">2.15</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1c261f] p-4">
              <p className="text-sm text-white/60">Max Drawdown</p>
              <p className="mt-1 text-2xl font-bold text-red-400">-5.3%</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[400px] w-full rounded-xl border border-white/10 bg-[#1c261f] p-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyData}>
                    <defs>
                        <linearGradient id="colorValueBacktest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#30e86e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#30e86e" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="name" hide />
                    <YAxis stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#111813', border: '1px solid #ffffff20', borderRadius: '8px' }}
                        itemStyle={{ color: '#30e86e' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#30e86e" fillOpacity={1} fill="url(#colorValueBacktest)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trade Log */}
      <div>
        <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white mb-4">Trade Log</h3>
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#1c261f]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="border-b border-white/10 text-xs uppercase text-white/60 bg-white/5">
                <tr>
                  <th className="px-6 py-3 font-medium">Entry Time</th>
                  <th className="px-6 py-3 font-medium">Exit Time</th>
                  <th className="px-6 py-3 font-medium">Direction</th>
                  <th className="px-6 py-3 font-medium">Entry Price</th>
                  <th className="px-6 py-3 font-medium">Exit Price</th>
                  <th className="px-6 py-3 font-medium">P&L ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/80">2023-11-05 10:15:00</td>
                  <td className="px-6 py-4 text-white/80">2023-11-05 14:30:00</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">Long</span></td>
                  <td className="px-6 py-4 text-white/80">1.07250</td>
                  <td className="px-6 py-4 text-white/80">1.07580</td>
                  <td className="px-6 py-4 text-green-400 font-medium">+$330.00</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/80">2023-11-06 08:00:00</td>
                  <td className="px-6 py-4 text-white/80">2023-11-06 09:45:00</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-bold text-red-400">Short</span></td>
                  <td className="px-6 py-4 text-white/80">1.07620</td>
                  <td className="px-6 py-4 text-white/80">1.07710</td>
                  <td className="px-6 py-4 text-red-400 font-medium">-$90.00</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/80">2023-11-07 15:20:00</td>
                  <td className="px-6 py-4 text-white/80">2023-11-07 18:00:00</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">Long</span></td>
                  <td className="px-6 py-4 text-white/80">1.06950</td>
                  <td className="px-6 py-4 text-white/80">1.07400</td>
                  <td className="px-6 py-4 text-green-400 font-medium">+$450.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
