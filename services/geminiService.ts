import { GoogleGenAI, Type } from "@google/genai";
import { WasteStatistics, AIAnalysisItem } from "../types";

const GEMINI_MODEL = 'gemini-1.5-flash';

// ------------------------------------------------------------------
// PENTING: Gantikan teks di dalam tanda petik di bawah dengan API Key anda.
// Contoh: const API_KEY = "AIzaSyDxxxxxxxxxxxxxxxxxxxx";
// ------------------------------------------------------------------
const API_KEY = "AIzaSyAcvdR1cpIA5_PueGUa5YDaEvGMZq24zNI"; 

/**
 * Helper function to retry an async operation
 */
async function retryOperation<T>(operation: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      const isLastAttempt = i === retries - 1;
      if (isLastAttempt) throw error;
      
      console.warn(`Percubaan ${i + 1} gagal, mencuba semula dalam ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1))); // Exponential backoff-ish
    }
  }
  throw new Error("Semua percubaan gagal.");
}

export const generateAIAnalysis = async (stats: WasteStatistics): Promise<AIAnalysisItem[]> => {
  const cleanKey = API_KEY ? API_KEY.trim() : "";

  if (!cleanKey || cleanKey.includes("MASUKKAN_KEY")) {
    console.error("API Key belum ditetapkan. Sila buka services/geminiService.ts dan masukkan key.");
    throw new Error("API Key belum ditetapkan.");
  }

  const ai = new GoogleGenAI({ apiKey: cleanKey });

  const statsSummary = `
    Data Statistik Sisa Pepejal (Malaysia, 2024):
    - Jumlah Fasiliti: ${stats.totalFacilities}
    - Fasiliti Sanitari: ${stats.sanitariCount}
    - Fasiliti Bukan Sanitari: ${stats.nonSanitariCount}
    - Lain-lain (Transfer Station/LTP): ${stats.otherCount}
    - Top 3 Negeri: ${stats.topStates.slice(0, 3).map(s => `${s.name} (${s.value})`).join(', ')}
    - Pemilik Tanah Utama: ${stats.ownerDistribution.slice(0, 2).map(o => `${o.name} (${o.value})`).join(', ')}
    - Purata Kadar Penggunaan: ${stats.averageUtilization}%
    - Fasiliti Kritikal (>100%): ${stats.utilizationStats.filter(s => s.rate > 100).length} fasiliti
  `;

  const systemPrompt = `
    Anda adalah Pakar Analisis Data Sisa Pepejal. Tugas anda adalah menganalisis statistik yang diberikan dan meringkaskannya kepada TIGA penemuan strategik utama. 
    Output mestilah dalam Bahasa Melayu yang profesional.
    Berikan 3 item analisis.
  `;

  try {
    const response = await retryOperation(async () => {
      return await ai.models.generateContent({
        model: GEMINI_MODEL,
        // Wrap contents in the formal structure to ensure compatibility
        contents: {
          parts: [{ text: statsSummary }]
        },
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tajuk: { 
                  type: Type.STRING, 
                  description: "Ringkasan utama dalam 5 perkataan atau kurang." 
                },
                simbol: { 
                  type: Type.STRING, 
                  description: "Satu ikon emoji yang relevan." 
                },
                huraian: { 
                  type: Type.STRING, 
                  description: "Huraian ringkas dan padat (maksimum 2 ayat) tentang implikasi penemuan tersebut." 
                },
                warna: { 
                  type: Type.STRING, 
                  description: "Kod warna Tailwind CSS untuk border (contoh: 'border-green-500', 'border-red-500', 'border-blue-500')." 
                }
              },
              propertyOrdering: ["tajuk", "simbol", "huraian", "warna"]
            }
          }
        }
      });
    });

    let jsonText = response.text;
    
    if (!jsonText) {
      throw new Error("Tiada respons teks diterima daripada Gemini.");
    }

    // Pembersihan data JSON yang lebih agresif
    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(jsonText) as AIAnalysisItem[];

  } catch (error: any) {
    console.error("Gemini API Error selepas retry:", error);
    // Cuba berikan mesej ralat yang lebih mesra pengguna jika ia adalah ralat 500/XHR
    if (error.message && (error.message.includes("xhr error") || error.message.includes("500"))) {
      throw new Error("Masalah sambungan rangkaian ke pelayan Google. Sila periksa internet anda dan cuba lagi.");
    }
    throw error;
  }
};
