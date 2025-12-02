export enum StrategyStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Draft = 'Draft',
  Error = 'Error',
  Simulation = 'Simulation'
}

export interface Strategy {
  id: string;
  name: string;
  symbol: string;
  timeframe: string;
  status: StrategyStatus;
  lastModified: string;
  pnl?: number;
  winRate?: number;
}

export interface Trade {
  id: string;
  strategy: string;
  symbol: string;
  entryTime: string;
  exitTime: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  size: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
