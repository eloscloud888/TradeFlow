
import React, { useState } from 'react';
import { ApiService } from '../services/api';

interface StrategyCondition {
  id: string;
  type: string;
  params?: {
    period?: number;
    source?: string;
    operator?: string;
    value?: number;
    pattern?: string;
    direction?: string;
    indicatorName?: string;
    threshold?: number;
    debounce?: number;
    formula?: string;
  };
}

export const StrategyBuilder: React.FC = () => {
  const [entryConditions, setEntryConditions] = useState<StrategyCondition[]>([]);
  const [exitConditions, setExitConditions] = useState<StrategyCondition[]>([]);
  const [activeSection, setActiveSection] = useState<'entry' | 'exit'>('entry');
  const [actions, setActions] = useState<string[]>([]);
  const [strategyName, setStrategyName] = useState("RSI Overbought/Oversold");
  const [isSaving, setIsSaving] = useState(false);

  const addCondition = (type: string) => {
    let params: any = { debounce: 0 };
    if (type === 'RSI') {
      params = { ...params, period: 14, source: 'Close', operator: '<', value: 30 };
    } else if (type === 'Candle Pattern') {
      params = { ...params, pattern: 'Engulfing', direction: 'Bullish' };
    } else if (type === 'Indicator') {
      params = { ...params, indicatorName: 'SMA', period: 20, source: 'Close', operator: '>', value: 0 };
    } else if (type === 'Volume Spike') {
      params = { ...params, source: 'Volume', operator: '>', threshold: 1000 };
    } else if (type === 'Custom Indicator') {
      params = { ...params, formula: '(High + Low) / 2', operator: '>', value: 0 };
    }

    const newCondition: StrategyCondition = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      params
    };

    if (activeSection === 'entry') {
      setEntryConditions([...entryConditions, newCondition]);
    } else {
      setExitConditions([...exitConditions, newCondition]);
    }
  };

  const addOperator = (section: 'entry' | 'exit') => {
    const list = section === 'entry' ? entryConditions : exitConditions;
    
    // Validation: Don't add operator if list empty or last item is operator
    if (list.length === 0) return;
    if (list[list.length - 1].type === 'Logic Operator') return;

    const newCondition: StrategyCondition = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Logic Operator',
      params: { operator: 'AND' }
    };

    if (section === 'entry') {
      setEntryConditions([...entryConditions, newCondition]);
    } else {
      setExitConditions([...exitConditions, newCondition]);
    }
  };

  const removeCondition = (id: string, section: 'entry' | 'exit') => {
    if (section === 'entry') {
      setEntryConditions(entryConditions.filter(c => c.id !== id));
    } else {
      setExitConditions(exitConditions.filter(c => c.id !== id));
    }
  };

  const updateConditionParams = (id: string, field: string, value: any, section: 'entry' | 'exit') => {
    const updateList = (list: StrategyCondition[]) => list.map(c => {
      if (c.id === id) {
        return { ...c, params: { ...c.params, [field]: value } };
      }
      return c;
    });

    if (section === 'entry') {
      setEntryConditions(updateList(entryConditions));
    } else {
      setExitConditions(updateList(exitConditions));
    }
  };

  const addAction = (type: string) => {
    setActions([...actions, type]);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
        await ApiService.saveStrategy({
            name: strategyName,
            symbol: "EURUSD",
            timeframe: "1h",
        });
        alert("Strategy Saved Successfully!");
    } catch (error) {
        alert("Failed to save strategy.");
    } finally {
        setIsSaving(false);
    }
  };

  const getConditionSummary = (c: StrategyCondition) => {
    if (c.type === 'Logic Operator') {
        return c.params?.operator || 'AND';
    }

    let summary = c.type;
    if (c.type === 'RSI' && c.params) {
      summary = `RSI(${c.params.period}) ${c.params.operator} ${c.params.value}`;
    } else if (c.type === 'Candle Pattern' && c.params) {
      summary = `${c.params.direction} ${c.params.pattern}`;
    } else if (c.type === 'Indicator' && c.params) {
      summary = `${c.params.indicatorName} ${c.params.operator} ${c.params.value}`;
    } else if (c.type === 'Volume Spike' && c.params) {
      summary = `${c.params.source} > ${c.params.threshold}`;
    } else if (c.type === 'Custom Indicator' && c.params) {
      summary = `Custom(${c.params.formula}) ${c.params.operator} ${c.params.value}`;
    }
    return summary;
  };

  const isConfigComplete = entryConditions.length > 0 && exitConditions.length > 0;

  // -- Components --

  const InputField = ({ label, value, onChange, type = "text", className = "", placeholder = "" }: any) => (
      <div className={`flex flex-col gap-1.5 ${className}`}>
          <label className="text-[10px] uppercase text-white/40 font-bold tracking-wider">{label}</label>
          <input 
              type={type} 
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full bg-[#111813] border border-white/5 rounded-md px-3 py-2 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-white transition-all placeholder:text-white/20"
          />
      </div>
  );

  const SelectField = ({ label, value, onChange, options }: any) => (
      <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase text-white/40 font-bold tracking-wider">{label}</label>
          <select 
              value={value}
              onChange={onChange}
              className="w-full bg-[#111813] border border-white/5 rounded-md px-3 py-2 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-white transition-all appearance-none cursor-pointer"
          >
              {options.map((opt: any) => (
                  <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
              ))}
          </select>
      </div>
  );

  const renderConditionCard = (c: StrategyCondition, section: 'entry' | 'exit') => {
    if (c.type === 'Logic Operator') {
        return (
            <div key={c.id} className="flex items-center justify-center py-1 relative">
                 <div className="bg-[#111813] border border-white/10 rounded-full px-3 py-1 flex items-center gap-2 z-10 shadow-sm hover:border-primary/50 transition-colors">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider mr-1">Logic</span>
                    <select 
                        value={c.params?.operator}
                        onChange={(e) => updateConditionParams(c.id, 'operator', e.target.value, section)}
                        className="bg-transparent text-primary font-bold text-xs outline-none cursor-pointer appearance-none text-center hover:text-primary/80 transition-colors"
                    >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                    </select>
                    <div className="w-px h-3 bg-white/10 mx-1"></div>
                    <button onClick={(e) => { e.stopPropagation(); removeCondition(c.id, section); }} className="text-white/20 hover:text-red-400 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
    <div key={c.id} className="group relative bg-[#1c261f] hover:bg-[#232e26] border border-white/5 hover:border-white/10 p-5 rounded-lg transition-all duration-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-lg">
                        {c.type === 'Time Filter' ? 'schedule' : c.type === 'Candle Pattern' ? 'candlestick_chart' : 'timeline'}
                    </span>
                </div>
                <span className="font-semibold text-white/90 text-sm">{c.type} Condition</span>
            </div>
            <button 
                className="opacity-0 group-hover:opacity-100 p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded transition-all" 
                onClick={(e) => { e.stopPropagation(); removeCondition(c.id, section); }}
                title="Remove Condition"
            >
                <span className="material-symbols-outlined text-lg">delete</span>
            </button>
        </div>

        {/* Card Body - Dynamic Params */}
        {c.type === 'RSI' && c.params && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputField label="Period" type="number" value={c.params.period} onChange={(e: any) => updateConditionParams(c.id, 'period', e.target.value, section)} />
                <SelectField label="Source" value={c.params.source} onChange={(e: any) => updateConditionParams(c.id, 'source', e.target.value, section)} options={['Close', 'Open', 'High', 'Low']} />
                <SelectField label="Condition" value={c.params.operator} onChange={(e: any) => updateConditionParams(c.id, 'operator', e.target.value, section)} options={[{label: 'Less Than (<)', value: '<'}, {label: 'Greater Than (>)', value: '>'}]} />
                <InputField label="Threshold" type="number" value={c.params.value} onChange={(e: any) => updateConditionParams(c.id, 'value', e.target.value, section)} />
            </div>
        )}

        {c.type === 'Candle Pattern' && c.params && (
            <div className="grid grid-cols-2 gap-4">
                <SelectField label="Pattern" value={c.params.pattern} onChange={(e: any) => updateConditionParams(c.id, 'pattern', e.target.value, section)} options={['Engulfing', 'Doji', 'Hammer', 'Shooting Star', 'Morning Star']} />
                <SelectField label="Direction" value={c.params.direction} onChange={(e: any) => updateConditionParams(c.id, 'direction', e.target.value, section)} options={['Bullish', 'Bearish']} />
            </div>
        )}

        {c.type === 'Indicator' && c.params && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <SelectField label="Indicator" value={c.params.indicatorName} onChange={(e: any) => updateConditionParams(c.id, 'indicatorName', e.target.value, section)} options={['SMA', 'EMA', 'WMA', 'Bollinger Bands', 'VWAP']} />
                 <InputField label="Period" type="number" value={c.params.period} onChange={(e: any) => updateConditionParams(c.id, 'period', e.target.value, section)} />
                 <SelectField label="Source" value={c.params.source} onChange={(e: any) => updateConditionParams(c.id, 'source', e.target.value, section)} options={['Close', 'Open', 'High', 'Low']} />
                 <SelectField label="Operator" value={c.params.operator} onChange={(e: any) => updateConditionParams(c.id, 'operator', e.target.value, section)} options={['>', '<', '=', 'Crosses Above', 'Crosses Below']} />
                 <InputField label="Value" type="number" value={c.params.value} onChange={(e: any) => updateConditionParams(c.id, 'value', e.target.value, section)} />
            </div>
        )}

        {c.type === 'Volume Spike' && c.params && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField label="Volume Metric" value={c.params.source} onChange={(e: any) => updateConditionParams(c.id, 'source', e.target.value, section)} options={['Volume', 'Tick Volume']} />
                <InputField label="Spike Threshold" type="number" value={c.params.threshold} onChange={(e: any) => updateConditionParams(c.id, 'threshold', e.target.value, section)} />
            </div>
        )}

        {c.type === 'Custom Indicator' && c.params && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                    <InputField label="Formula" placeholder="e.g. (High + Low) / 2" value={c.params.formula} onChange={(e: any) => updateConditionParams(c.id, 'formula', e.target.value, section)} />
                </div>
                <SelectField label="Operator" value={c.params.operator} onChange={(e: any) => updateConditionParams(c.id, 'operator', e.target.value, section)} options={['>', '<', '=', 'Crosses Above', 'Crosses Below']} />
                <InputField label="Value" type="number" value={c.params.value} onChange={(e: any) => updateConditionParams(c.id, 'value', e.target.value, section)} />
            </div>
        )}

        {c.params && (
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-white/20 text-base">hourglass_empty</span>
                     <span className="text-[10px] uppercase font-bold text-white/40">Signal Debounce</span>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        value={c.params.debounce || 0}
                        onChange={(e) => updateConditionParams(c.id, 'debounce', parseInt(e.target.value), section)}
                        className="w-16 bg-[#111813] border border-white/5 rounded px-2 py-1 text-xs text-right focus:border-primary/50 outline-none text-white"
                        min="0"
                    />
                    <span className="text-xs text-white/40">bars</span>
                </div>
            </div>
        )}
    </div>
  )};

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] gap-6">
       {/* Top Bar */}
       <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Strategy Builder</h1>
            <p className="text-white/50 text-sm mt-1">Design, test, and deploy automated strategies.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors border border-white/5">
               Run Simulation
             </button>
             <button 
                onClick={handleSave}
                className={`px-4 py-2 rounded-lg text-sm font-bold text-[#111813] transition-colors flex items-center gap-2 shadow-lg shadow-primary/10 ${isConfigComplete ? 'bg-primary hover:bg-primary/90' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}
                disabled={!isConfigComplete || isSaving}
             >
               {isSaving ? 'Saving...' : 'Save Strategy'}
             </button>
          </div>
       </div>

       <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT: Toolbox */}
          <div className="col-span-2 flex flex-col gap-6 overflow-y-auto pr-2">
             <div className="bg-[#1c261f] rounded-xl border border-white/10 p-4">
                <h3 className="text-xs font-bold text-white/40 mb-4 uppercase tracking-wider px-1">Logic Blocks</h3>
                <div className="flex flex-col gap-2">
                   {[
                       { id: 'RSI', icon: 'timeline', label: 'RSI' },
                       { id: 'Indicator', icon: 'show_chart', label: 'Indicator' },
                       { id: 'Candle Pattern', icon: 'candlestick_chart', label: 'Pattern' },
                       { id: 'Volume Spike', icon: 'bar_chart', label: 'Volume' },
                       { id: 'Time Filter', icon: 'schedule', label: 'Time' },
                       { id: 'Custom Indicator', icon: 'functions', label: 'Custom' }
                   ].map(item => (
                     <button 
                        key={item.id} 
                        onClick={() => addCondition(item.id)} 
                        className="group flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.08] border border-transparent hover:border-white/5 rounded-lg text-left transition-all duration-200 active:scale-95"
                     >
                        <div className="size-8 rounded-full bg-[#111813] flex items-center justify-center text-white/50 group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-white/80 group-hover:text-white">{item.label}</span>
                     </button>
                   ))}
                </div>
             </div>

             <div className="bg-[#1c261f] rounded-xl border border-white/10 p-4">
                <h3 className="text-xs font-bold text-white/40 mb-4 uppercase tracking-wider px-1">Executions</h3>
                <div className="flex flex-col gap-2">
                   {['Enter Long', 'Enter Short', 'Close Position'].map(item => (
                     <button key={item} onClick={() => addAction(item)} className="group flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.08] border border-transparent hover:border-white/5 rounded-lg text-left transition-all duration-200 active:scale-95">
                        <div className="size-8 rounded-full bg-[#111813] flex items-center justify-center text-white/50 group-hover:text-blue-400 transition-colors">
                            <span className="material-symbols-outlined text-lg">bolt</span>
                        </div>
                        <span className="text-sm font-medium text-white/80 group-hover:text-white">{item}</span>
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {/* CENTER: Canvas Flow */}
          <div className="col-span-7 flex flex-col gap-6 overflow-y-auto px-2 pb-6 relative">
            
             {/* Timeline Line */}
             <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-white/5 via-white/10 to-white/5 -z-10"></div>

             {/* Strategy Name Input */}
             <div className="ml-[54px]">
                 <input 
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-xl font-bold text-white focus:border-primary focus:ring-0 placeholder:text-white/20 transition-colors"
                    placeholder="Strategy Name..." 
                    value={strategyName}
                    onChange={(e) => setStrategyName(e.target.value)}
                />
             </div>

             {/* Entry Section */}
             <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2 mt-4">
                    <div className={`size-14 rounded-full border-4 flex items-center justify-center bg-[#111813] z-10 transition-colors ${activeSection === 'entry' ? 'border-primary text-primary shadow-[0_0_15px_rgba(48,232,110,0.2)]' : 'border-[#1c261f] text-white/20'}`}>
                        <span className="material-symbols-outlined text-2xl">login</span>
                    </div>
                </div>
                
                <div 
                    onClick={() => setActiveSection('entry')}
                    className={`flex-1 rounded-xl border p-6 transition-all duration-300 cursor-pointer relative group flex flex-col max-h-[500px] ${
                        activeSection === 'entry' 
                        ? 'bg-[#1c261f] border-primary/50 shadow-lg shadow-black/20' 
                        : 'bg-[#1c261f]/40 border-white/5 hover:border-white/10 hover:bg-[#1c261f]'
                    }`}
                >
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <div>
                            <h2 className={`text-base font-bold uppercase tracking-wider ${activeSection === 'entry' ? 'text-primary' : 'text-white/60'}`}>Entry Logic</h2>
                            <p className="text-xs text-white/40 mt-1">Conditions to open a trade</p>
                        </div>
                        {activeSection === 'entry' && (
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold animate-pulse">
                                Editing
                            </div>
                        )}
                    </div>

                    <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                        {entryConditions.length === 0 ? (
                            <div className="h-32 border-2 border-dashed border-white/5 rounded-lg flex flex-col items-center justify-center text-white/20 gap-3 group-hover:border-white/10 transition-colors">
                                <span className="material-symbols-outlined text-3xl">add_circle_outline</span>
                                <p className="text-sm font-medium">Select to add conditions</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {entryConditions.map(c => renderConditionCard(c, 'entry'))}
                                <div className="h-6 border-l-2 border-dashed border-white/10 ml-8 my-1"></div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); addOperator('entry'); }}
                                    className="self-start ml-8 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/60 transition-colors"
                                >
                                    + Add Logic Operator (AND/OR)
                                </button>
                            </div>
                        )}
                    </div>
                </div>
             </div>

             {/* Exit Section */}
             <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2 mt-4">
                     <div className={`size-14 rounded-full border-4 flex items-center justify-center bg-[#111813] z-10 transition-colors ${activeSection === 'exit' ? 'border-primary text-primary shadow-[0_0_15px_rgba(48,232,110,0.2)]' : 'border-[#1c261f] text-white/20'}`}>
                        <span className="material-symbols-outlined text-2xl">logout</span>
                    </div>
                </div>

                <div 
                    onClick={() => setActiveSection('exit')}
                    className={`flex-1 rounded-xl border p-6 transition-all duration-300 cursor-pointer relative group flex flex-col max-h-[500px] ${
                        activeSection === 'exit' 
                        ? 'bg-[#1c261f] border-primary/50 shadow-lg shadow-black/20' 
                        : 'bg-[#1c261f]/40 border-white/5 hover:border-white/10 hover:bg-[#1c261f]'
                    }`}
                >
                    <div className="flex justify-between items-center mb-6 shrink-0">
                         <div>
                            <h2 className={`text-base font-bold uppercase tracking-wider ${activeSection === 'exit' ? 'text-primary' : 'text-white/60'}`}>Exit Logic</h2>
                            <p className="text-xs text-white/40 mt-1">Conditions to close position</p>
                        </div>
                        {activeSection === 'exit' && (
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold animate-pulse">
                                Editing
                            </div>
                        )}
                    </div>

                    <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                        {exitConditions.length === 0 ? (
                            <div className="h-32 border-2 border-dashed border-white/5 rounded-lg flex flex-col items-center justify-center text-white/20 gap-3 group-hover:border-white/10 transition-colors">
                                <span className="material-symbols-outlined text-3xl">add_circle_outline</span>
                                <p className="text-sm font-medium">Select to add conditions</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {exitConditions.map(c => renderConditionCard(c, 'exit'))}
                                <div className="h-6 border-l-2 border-dashed border-white/10 ml-8 my-1"></div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); addOperator('exit'); }}
                                    className="self-start ml-8 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/60 transition-colors"
                                >
                                    + Add Logic Operator (AND/OR)
                                </button>
                            </div>
                        )}
                    </div>
                </div>
             </div>

             {/* Execution Section */}
             <div className="flex gap-6">
                 <div className="flex flex-col items-center gap-2 mt-4">
                     <div className="size-14 rounded-full border-4 border-[#1c261f] flex items-center justify-center bg-[#111813] z-10 text-blue-400">
                        <span className="material-symbols-outlined text-2xl">bolt</span>
                    </div>
                 </div>

                 <div className="flex-1 bg-[#1c261f]/40 border border-white/5 p-6 rounded-xl flex flex-col max-h-[300px]">
                    <div className="mb-6 shrink-0">
                        <h2 className="text-base font-bold uppercase tracking-wider text-blue-400/80">Execution</h2>
                        <p className="text-xs text-white/40 mt-1">Trade parameters</p>
                    </div>
                    
                    <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                        {actions.length === 0 ? (
                            <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5 text-center text-white/30 text-sm">
                                No actions defined. Drag actions here.
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {actions.map((a, i) => (
                                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-200">
                                        <span>{a}</span>
                                        <button onClick={() => {
                                            const newActions = [...actions];
                                            newActions.splice(i, 1);
                                            setActions(newActions);
                                        }} className="hover:text-white"><span className="material-symbols-outlined text-sm">close</span></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                 </div>
             </div>
          </div>

          {/* RIGHT: Config Summary */}
          <div className="col-span-3 flex flex-col gap-6">
             <div className="bg-[#1c261f] rounded-xl border border-white/10 p-5">
                <h3 className="text-xs font-bold text-white/40 mb-4 uppercase tracking-wider px-1">Risk Settings</h3>
                <div className="flex flex-col gap-4">
                   <InputField label="Stop Loss" type="number" value={-10} placeholder="0" />
                   <InputField label="Take Profit" type="number" value={30} placeholder="0" />
                   <SelectField label="Position Size" options={['Fixed Lot', '% Equity']} />
                </div>
             </div>

             <div className="bg-[#1c261f] rounded-xl border border-white/10 p-5 flex-1 flex flex-col">
                <h3 className="text-xs font-bold text-white/40 mb-4 uppercase tracking-wider px-1">Logic Summary</h3>
                <div className="flex-1 bg-black/20 rounded-lg border border-white/5 p-4 text-xs font-mono text-white/60 overflow-y-auto">
                    {isConfigComplete ? (
                        <>
                            <span className="text-primary block mb-2"># ENTRY</span>
                            {entryConditions.map((c, i) => (
                                <div key={i} className={`mb-1 pl-2 border-l-2 ${c.type === 'Logic Operator' ? 'border-transparent py-1' : 'border-white/10'}`}>
                                    <span className={c.type === 'Logic Operator' ? 'text-primary font-bold text-[10px] bg-primary/10 px-2 py-0.5 rounded' : ''}>
                                        {getConditionSummary(c)}
                                    </span>
                                </div>
                            ))}
                            <div className="my-3 border-b border-white/5"></div>
                            <span className="text-primary block mb-2"># EXIT</span>
                            {exitConditions.map((c, i) => (
                                <div key={i} className={`mb-1 pl-2 border-l-2 ${c.type === 'Logic Operator' ? 'border-transparent py-1' : 'border-white/10'}`}>
                                    <span className={c.type === 'Logic Operator' ? 'text-primary font-bold text-[10px] bg-primary/10 px-2 py-0.5 rounded' : ''}>
                                        {getConditionSummary(c)}
                                    </span>
                                </div>
                            ))}
                        </>
                    ) : (
                        <span className="text-white/30 italic">Incomplete configuration...</span>
                    )}
                </div>
             </div>

             {!isConfigComplete && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-500 text-xl mt-0.5">info</span>
                    <div>
                        <p className="text-amber-200 text-sm font-bold">Draft Mode</p>
                        <p className="text-amber-200/60 text-xs mt-1">Complete both Entry and Exit sections to enable saving.</p>
                    </div>
                </div>
             )}
          </div>

       </div>
    </div>
  );
};
