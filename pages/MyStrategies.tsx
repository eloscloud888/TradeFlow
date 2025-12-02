
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { Strategy, StrategyStatus } from '../types';

export const MyStrategies: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getStrategies();
      setStrategies(data);
    } catch (e) {
      console.error("Failed to load strategies", e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: StrategyStatus) => {
    switch (status) {
      case StrategyStatus.Active:
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400">
            <span className="size-1.5 rounded-full bg-green-400"></span> Active - Live
          </div>
        );
      case StrategyStatus.Simulation:
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400">
            <span className="size-1.5 rounded-full bg-blue-400"></span> Simulation
          </div>
        );
      case StrategyStatus.Inactive:
        return (
           <div className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400">
            <span className="size-1.5 rounded-full bg-gray-400"></span> Inactive
          </div>
        );
      case StrategyStatus.Draft:
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-400">
             <span className="size-1.5 rounded-full bg-yellow-400"></span> Draft
          </div>
        );
      default:
        return <span className="text-white/50">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-white text-3xl font-bold tracking-tight">My Trading Strategies</h1>
        <button className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span className="truncate">Create New Strategy</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-grow">
          <label className="flex flex-col min-w-40 h-10 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white/5">
              <div className="text-white/50 flex items-center justify-center pl-3">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white/90 focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-white/50 px-2 text-sm font-normal" 
                placeholder="Search by name, symbol..." 
              />
            </div>
          </label>
        </div>
        
        {/* Filter Chips */}
        <div className="flex gap-3 items-center overflow-x-auto pb-2 md:pb-0">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/5 pl-4 pr-3 hover:bg-white/10 transition-colors">
            <p className="text-white/90 text-sm font-medium">Status: All</p>
            <span className="material-symbols-outlined text-lg text-white/50">expand_more</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/5 pl-4 pr-3 hover:bg-white/10 transition-colors">
            <p className="text-white/90 text-sm font-medium">Symbol: All</p>
            <span className="material-symbols-outlined text-lg text-white/50">expand_more</span>
          </button>
        </div>
      </div>

      {/* Strategies Table */}
      <div className="w-full">
        <div className="flex overflow-hidden rounded-lg border border-white/10 bg-[#1c261f] min-h-[300px]">
          {loading ? (
             <div className="w-full flex items-center justify-center h-full text-white/50 flex-col gap-2 p-12">
                 <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                 <p>Loading strategies...</p>
             </div>
          ) : strategies.length === 0 ? (
             <div className="w-full flex items-center justify-center h-full text-white/50 flex-col gap-2 p-12">
                 <span className="material-symbols-outlined text-4xl">folder_off</span>
                 <p>No strategies found. Create one to get started.</p>
             </div>
          ) : (
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-white/70 text-xs font-medium uppercase tracking-wider w-1/3">Strategy Name</th>
                  <th className="px-6 py-4 text-left text-white/70 text-xs font-medium uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-4 text-left text-white/70 text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-white/70 text-xs font-medium uppercase tracking-wider">Last Modified</th>
                  <th className="px-6 py-4 text-right text-white/70 text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {strategies.map((strategy) => (
                  <tr key={strategy.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 w-1/3 text-white text-sm font-medium">{strategy.name}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{strategy.symbol}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(strategy.status)}
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">{strategy.lastModified}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-white/50">
                        <button className="p-1 rounded-md hover:bg-white/10 hover:text-white transition-colors" title="Edit"><span className="material-symbols-outlined text-lg">edit</span></button>
                        <button className="p-1 rounded-md hover:bg-white/10 hover:text-white transition-colors" title="Duplicate"><span className="material-symbols-outlined text-lg">content_copy</span></button>
                        <button className="p-1 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors" title="Delete"><span className="material-symbols-outlined text-lg">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
