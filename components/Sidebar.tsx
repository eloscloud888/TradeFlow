import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { id: 'strategies', label: 'My Strategies', icon: 'list_alt', path: '/strategies' },
  { id: 'builder', label: 'Strategy Builder', icon: 'build', path: '/builder' },
  { id: 'import', label: 'Import Data', icon: 'upload_file', path: '/import' },
  { id: 'backtest', label: 'Backtest', icon: 'history', path: '/backtest' },
  { id: 'live', label: 'Live Control', icon: 'show_chart', path: '/live' },
  { id: 'logs', label: 'Trade Logs', icon: 'receipt_long', path: '/logs' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, onLogout }) => {
  return (
    <aside className="w-64 shrink-0 bg-[#0c160f] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-3xl">candlestick_chart</span>
        <h1 className="text-white text-lg font-bold">TradeFlow</h1>
      </div>

      <div className="flex-1 px-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
              currentPath === item.path
                ? 'bg-primary/20 text-primary'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${currentPath === item.path ? 'filled' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 mt-auto">
         <div className="flex items-center gap-3 px-2 mb-4">
          <div className="bg-gray-700 rounded-full size-8 flex items-center justify-center">
             <span className="text-xs font-bold">JD</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-sm font-medium">John Doe</h1>
            <p className="text-white/50 text-xs">Pro Trader</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};