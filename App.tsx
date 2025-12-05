import React, { useEffect, useState } from 'react';
import { WasteStatistics } from './types';
import { processCsvData } from './services/dataService';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [stats, setStats] = useState<WasteStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);

  const loadData = (customCsv?: string) => {
    try {
      setLoading(true);
      const processedStats = processCsvData(customCsv);
      setStats(processedStats);
    } catch (error) {
      console.error("Failed to load data", error);
      alert("Gagal memproses data. Pastikan format CSV adalah betul.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if running in embed mode via URL query param (e.g., ?embed=true)
    const searchParams = new URLSearchParams(window.location.search);
    setIsEmbedded(searchParams.get('embed') === 'true');

    // Initial load with default data
    loadData();
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        loadData(content);
        alert(`Data berjaya dimuat naik! ${content.split('\n').length} baris dikesan.`);
      }
    };
    reader.onerror = () => {
      alert("Ralat semasa membaca fail.");
    };
    reader.readAsText(file);
  };

  // If embedded, remove vertical layout constraints and padding to fit iframe better
  const containerClass = isEmbedded 
    ? "w-full p-2" 
    : "flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl";

  return (
    <div className={`min-h-screen flex flex-col ${isEmbedded ? 'bg-transparent' : ''}`}>
      {!isEmbedded && <Header onFileUpload={handleFileUpload} />}
      
      <main className={containerClass}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : stats ? (
          <Dashboard stats={stats} />
        ) : (
          <div className="text-center text-red-600 p-8 bg-white rounded-lg shadow">
            Gagal memuatkan data. Sila muat semula halaman.
          </div>
        )}
      </main>

      {!isEmbedded && (
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; 2024 Analisis Fasiliti Sisa Pepejal Malaysia. Data daripada JPSPN.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;