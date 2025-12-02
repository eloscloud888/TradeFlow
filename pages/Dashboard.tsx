import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 148000 },
  { name: 'Tue', value: 149500 },
  { name: 'Wed', value: 148900 },
  { name: 'Thu', value: 151000 },
  { name: 'Fri', value: 150432 },
  { name: 'Sat', value: 152891 },
  { name: 'Sun', value: 154000 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-white/60">Welcome back, Alex. Here's a summary of your trading activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Balance', value: '$150,432.10', change: null },
          { label: 'Equity', value: '$152,891.55', change: null },
          { label: 'Available Margin', value: '$120,113.80', change: null },
          { label: 'Overall P&L', value: '$2,459.45', change: '+1.63%', isPositive: true },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-[#1c261f]">
            <p className="text-white/80 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            {stat.change && (
              <p className={`text-sm font-medium ${stat.isPositive ? 'text-primary' : 'text-red-400'}`}>
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1c261f] p-6">
        <h3 className="text-lg font-bold mb-6">Equity Curve</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#30e86e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#30e86e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111813', border: '1px solid #ffffff20', borderRadius: '8px' }}
                itemStyle={{ color: '#30e86e' }}
              />
              <Area type="monotone" dataKey="value" stroke="#30e86e" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Active Strategies</h2>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1c261f]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 uppercase text-white/60">
              <tr>
                <th className="px-6 py-3 font-medium">Strategy Name</th>
                <th className="px-6 py-3 font-medium">Symbol</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">P&L</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                { name: 'MA Crossover Bot', symbol: 'EURUSD', status: 'Active', pnl: '+$1,203.50', active: true },
                { name: 'RSI Divergence', symbol: 'GBPUSD', status: 'Active', pnl: '-$250.10', active: true },
                { name: 'VWAP Scalper', symbol: 'US30', status: 'Paused', pnl: '+$50.75', active: false },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-white/70">{row.symbol}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${row.active ? 'bg-primary' : 'bg-yellow-500'}`}></span>
                      <span>{row.status}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-medium ${row.pnl.startsWith('+') ? 'text-primary' : 'text-red-400'}`}>
                    {row.pnl}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white">
                        <span className="material-symbols-outlined text-lg">{row.active ? 'pause' : 'play_arrow'}</span>
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white">
                        <span className="material-symbols-outlined text-lg">settings</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
