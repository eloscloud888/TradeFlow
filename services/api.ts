
import { Strategy, Trade, StrategyStatus } from '../types';

/**
 * Service to communicate with the Backend API.
 * Currently points to localhost:3001 or uses mock data if backend is offline.
 */

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Fallback Mock Data
let localStrategies: Strategy[] = [
    { id: '1', name: 'EURUSD 1H MACD Crossover', symbol: 'EURUSD', timeframe: '1h', status: StrategyStatus.Active, lastModified: 'Oct 26, 2023', pnl: 1203.50, winRate: 65 },
    { id: '2', name: 'BTCUSD RSI Divergence', symbol: 'BTCUSD', timeframe: '4h', status: StrategyStatus.Simulation, lastModified: 'Oct 24, 2023', pnl: -250.10, winRate: 40 },
];

export const ApiService = {
    // --- Auth ---
    connectCTrader: async (apiKey: string, apiSecret: string): Promise<boolean> => {
        return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
    },

    // --- Strategies ---
    getStrategies: async (): Promise<Strategy[]> => {
        try {
            // Attempt to fetch from real backend
            const res = await fetch(`${BASE_URL}/strategies`);
            if (res.ok) {
                return await res.json();
            }
            throw new Error('Backend unavailable');
        } catch (e) {
            console.warn('Using local mock data (Start server/index.js to use real backend)');
            return new Promise((resolve) => setTimeout(() => resolve([...localStrategies]), 500));
        }
    },

    saveStrategy: async (strategy: Partial<Strategy>): Promise<Strategy> => {
        try {
            const res = await fetch(`${BASE_URL}/strategies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(strategy)
            });
            if (res.ok) return await res.json();
        } catch (e) {
            console.warn('Backend unavailable, saving locally');
        }

        return new Promise((resolve) => {
            const newStrat = {
                ...strategy,
                id: Math.random().toString(36).substr(2, 9),
                lastModified: new Date().toLocaleDateString(),
                status: StrategyStatus.Draft,
                pnl: 0,
                winRate: 0
            } as Strategy;
            localStrategies.push(newStrat);
            setTimeout(() => resolve(newStrat), 800);
        });
    },

    toggleStrategy: async (id: string, active: boolean): Promise<void> => {
        try {
             await fetch(`${BASE_URL}/strategies/${id}/toggle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active })
            });
        } catch (e) {
            console.log(`(Mock) Set strategy ${id} to ${active ? 'ON' : 'OFF'}`);
             localStrategies = localStrategies.map(s => 
                s.id === id ? { ...s, status: active ? StrategyStatus.Active : StrategyStatus.Inactive } : s
            );
        }
    },

    // --- Backtest ---
    runBacktest: async (config: any): Promise<any> => {
        console.log("Requesting backtest from backend...", config);
        return new Promise((resolve) => setTimeout(() => resolve({
            totalPnl: 12450.75,
            winRate: 68.2,
            trades: 45
        }), 2000));
    }
};
