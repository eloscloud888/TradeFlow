
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory Database (Replace with PostgreSQL/MongoDB in production)
let strategies = [
  { 
    id: '1', 
    name: 'EURUSD 1H MACD Crossover', 
    symbol: 'EURUSD', 
    timeframe: '1h', 
    status: 'Active', 
    lastModified: 'Oct 26, 2023', 
    pnl: 1203.50, 
    winRate: 65 
  }
];

// --- cTrader Integration Placeholder ---
// const CTrader = require('ctrader-layer-2');
// const cTrader = new CTrader({ clientId: process.env.CT_ID, clientSecret: process.env.CT_SECRET });

// --- API Endpoints ---

// Get all strategies
app.get('/api/strategies', (req, res) => {
  res.json(strategies);
});

// Create/Save a new strategy
app.post('/api/strategies', (req, res) => {
  const newStrategy = {
    id: Math.random().toString(36).substr(2, 9),
    lastModified: new Date().toLocaleDateString(),
    status: 'Draft',
    pnl: 0,
    winRate: 0,
    ...req.body
  };
  strategies.push(newStrategy);
  console.log('Strategy Saved:', newStrategy.name);
  res.status(201).json(newStrategy);
});

// Toggle Strategy Status (Start/Stop Robot)
app.post('/api/strategies/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  
  const strategy = strategies.find(s => s.id === id);
  if (strategy) {
    strategy.status = active ? 'Active' : 'Inactive';
    // TODO: Send command to cTrader execution engine
    res.json({ success: true, status: strategy.status });
  } else {
    res.status(404).json({ error: "Strategy not found" });
  }
});

app.listen(PORT, () => {
  console.log(`TradeFlow Backend running on http://localhost:${PORT}`);
  console.log(`- Ready to connect to cTrader Open API`);
});
