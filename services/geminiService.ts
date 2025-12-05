import { GoogleGenAI, Type } from "@google/genai";
import { WasteStatistics, AIAnalysisItem } from "../types";

const GEMINI_MODEL = 'gemini-2.5-flash';

export const generateAIAnalysis = async (stats: WasteStatistics): Promise<AIAnalysisItem[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

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
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: statsSummary,
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

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No text returned from Gemini");
    }

    return JSON.parse(jsonText) as AIAnalysisItem[];

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};