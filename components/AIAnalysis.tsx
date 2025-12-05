import React, { useState } from 'react';
import { WasteStatistics, AIAnalysisItem } from '../types';
import { generateAIAnalysis } from '../services/geminiService';

interface AIAnalysisProps {
  stats: WasteStatistics;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ stats }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateAIAnalysis(stats);
      setAnalysis(result);
      setHasLoaded(true);
    } catch (err) {
      setError("Gagal menjana analisis. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>✨</span> Analisis Pintar AI
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Jana ringkasan eksekutif strategik menggunakan model Gemini 2.5 Flash.
          </p>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`
            px-6 py-2.5 rounded-lg font-semibold text-white shadow-md transition-all flex items-center gap-2
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95'}
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Menganalisis...
            </>
          ) : hasLoaded ? 'Jana Semula Analisis' : 'Jana Analisis'}
        </button>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        {!hasLoaded && !loading && !error && (
          <div className="text-center py-12 text-gray-400">
             <div className="text-4xl mb-3">🤖</div>
             <p>Klik butang di atas untuk memulakan analisis AI.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.map((item, index) => (
            <div 
              key={index} 
              className={`border-l-4 ${item.warna} bg-white p-5 rounded-r-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-t-gray-100 border-r-gray-100 border-b-gray-100`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl filter drop-shadow-sm">{item.simbol}</span>
                <h3 className="font-bold text-gray-800 leading-tight">{item.tajuk}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.huraian}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};