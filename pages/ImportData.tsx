import React, { useState } from 'react';
import { analyzeChartImage } from '../services/geminiService';

export const ImportData: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnalyzing(true);
      // Simulate reading file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64 = (reader.result as string).split(',')[1];
         try {
             const data = await analyzeChartImage(base64);
             setResult(data);
         } catch (err) {
             console.error(err);
         } finally {
             setAnalyzing(false);
         }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Import Chart Data</h1>
        <p className="text-white/60">Choose a method to import cTrader chart data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OCR Card */}
        <div className="bg-[#1c261f] p-6 rounded-xl border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="bg-primary/20 p-2 rounded-lg text-primary">
               <span className="material-symbols-outlined">image_search</span>
             </div>
             <h3 className="font-bold text-lg">OCR Chart Scanner</h3>
          </div>
          <p className="text-white/60 text-sm">Upload a screenshot. Our AI will extract OHLC data automatically.</p>
          
          <div className="mt-4 border-2 border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors relative">
             <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
             <span className="material-symbols-outlined text-4xl text-white/40 mb-2">cloud_upload</span>
             <p className="text-sm font-medium">Drag & drop or click to upload</p>
          </div>

          {analyzing && (
              <div className="flex items-center gap-2 text-primary text-sm justify-center">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Analyzing with Gemini...
              </div>
          )}

          {result && (
              <div className="bg-black/20 p-4 rounded-lg text-sm font-mono mt-2">
                  <div className="flex justify-between"><span>Open:</span> <span className="text-white">{result.open}</span></div>
                  <div className="flex justify-between"><span>High:</span> <span className="text-white">{result.high}</span></div>
                  <div className="flex justify-between"><span>Low:</span> <span className="text-white">{result.low}</span></div>
                  <div className="flex justify-between"><span>Close:</span> <span className="text-white">{result.close}</span></div>
              </div>
          )}
        </div>

        {/* CSV Card */}
        <div className="bg-[#1c261f] p-6 rounded-xl border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
               <span className="material-symbols-outlined">description</span>
             </div>
             <h3 className="font-bold text-lg">CSV Upload</h3>
          </div>
          <p className="text-white/60 text-sm">Import historical data via CSV. Auto-maps cTrader export format.</p>
          <div className="mt-auto">
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold border border-white/10 transition-colors">Select File</button>
          </div>
        </div>
      </div>
    </div>
  );
};
