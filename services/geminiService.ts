import { GoogleGenAI } from "@google/genai";

// Access the API key from the environment.
// In a Vite/React app, this usually comes from import.meta.env.VITE_API_KEY or process.env depending on config.
// For this environment, we use process.env.API_KEY as per standard instructions.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI client:", e);
  }
} else {
  console.warn("Gemini API Key is missing. OCR features will return mock data.");
}

export interface OCRExtractionResult {
  open: number;
  high: number;
  low: number;
  close: number;
  confidence: number;
}

/**
 * Analyzes a chart image to extract OHLC data.
 * Uses the real Gemini API if a key is present, otherwise falls back to a mock for UI testing.
 */
export const analyzeChartImage = async (base64Image: string): Promise<OCRExtractionResult> => {
  // 1. Real API Path
  if (ai) {
    try {
      const model = 'gemini-2.5-flash-image'; 
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/png', // Ensure the frontend sends png or convert accordingly
                data: base64Image
              }
            },
            {
              text: `Analyze this financial chart image. 
                     Identify the last fully completed candlestick. 
                     Extract the precise Open, High, Low, and Close prices for that specific candle.
                     Return ONLY a raw JSON object with keys: open, high, low, close, confidence (0-1).
                     Do not include markdown formatting.`
            }
          ]
        },
        config: {
            responseMimeType: "application/json"
        }
      });
      
      const text = response.text;
      if (text) {
          // Clean potential markdown blocks just in case
          const cleanText = text.replace(/```json|```/g, '').trim();
          return JSON.parse(cleanText) as OCRExtractionResult;
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to analyze image with AI service.");
    }
  }

  // 2. Mock Fallback (Only if no API key is configured)
  console.log("Using Mock OCR Data (No API Key found)");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        open: 1.0750,
        high: 1.0795,
        low: 1.0730,
        close: 1.0782,
        confidence: 0.95
      });
    }, 2000);
  });
};

/**
 * Generates a trading strategy logic based on a natural language description.
 */
export const generateStrategyIdea = async (prompt: string): Promise<string> => {
    if(ai) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Create a pseudocode trading strategy based on this idea: "${prompt}". 
                           Format it clearly with Entry Rules, Exit Rules, and Risk Management.`
            });
            return response.text || "Could not generate strategy.";
        } catch (e) {
            console.error(e);
            return "Error generating strategy with AI.";
        }
    }
    
    return "Mock Strategy generated (No API Key):\n1. IF RSI(14) < 30 AND Close > EMA(200) THEN BUY\n2. IF RSI(14) > 70 THEN SELL\n3. Risk 1% per trade.";
}