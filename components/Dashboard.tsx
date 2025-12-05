import React from 'react';
import { WasteStatistics } from '../types';
import { StatCard } from './StatCard';
import { StateBarChart, CategoryPieChart, OwnerList, UtilizationChart } from './Charts';
import { AIAnalysis } from './AIAnalysis';

interface DashboardProps {
  stats: WasteStatistics;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Jumlah Fasiliti"
          value={stats.totalFacilities}
          subtitle="Termasuk Tapak Pelupusan & Loji Rawatan"
          colorClass="bg-gradient-to-br from-blue-600 to-blue-800"
          icon={
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatCard
          title="Fasiliti Sanitari"
          value={stats.sanitariCount}
          subtitle="Tahap 1 hingga Tahap 4"
          colorClass="bg-gradient-to-br from-emerald-500 to-emerald-700"
          icon={
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatCard
          title="Bukan Sanitari"
          value={stats.nonSanitariCount}
          subtitle="Termasuk tapak terbuka"
          colorClass="bg-gradient-to-br from-red-500 to-red-700"
          icon={
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
          }
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart 
          data={stats.categoryBreakdown} 
          title="Perbandingan Kategori Fasiliti" 
        />
        <StateBarChart 
          data={stats.topStates} 
          title="Top 5 Negeri dengan Fasiliti Terbanyak" 
        />
      </div>

      {/* Utilization Section (NEW) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <UtilizationChart 
                data={stats.utilizationStats.slice(0, 10)} 
                title="Top 10 Fasiliti Mengikut Kadar Penggunaan (%)" 
            />
        </div>
        <div className="lg:col-span-1 space-y-6">
            <StatCard
                title="Purata Penggunaan"
                value={`${stats.averageUtilization}%`}
                subtitle="Kadar purata fasiliti yang mempunyai data"
                colorClass="bg-gradient-to-br from-indigo-500 to-indigo-700"
                icon={
                   <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                   </svg>
                }
            />
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100%-150px)]">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Fasiliti Kritikal (&gt;100%)</h3>
                <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
                    {stats.utilizationStats.filter(s => s.rate > 100).map((s, i) => (
                        <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                            <div className="truncate pr-2">
                                <p className="font-medium text-gray-700 truncate" title={s.name}>{s.name}</p>
                                <p className="text-xs text-gray-400">{s.state}</p>
                            </div>
                            <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                                {s.rate}%
                            </span>
                        </div>
                    ))}
                    {stats.utilizationStats.filter(s => s.rate > 100).length === 0 && (
                        <p className="text-gray-500 text-sm italic">Tiada fasiliti kritikal direkodkan.</p>
                    )}
                </div>
             </div>
        </div>
      </div>

      {/* Secondary Data Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <AIAnalysis stats={stats} />
        </div>
        <div className="lg:col-span-1">
          <OwnerList 
            data={stats.ownerDistribution.slice(0, 5)} 
            title="Struktur Pemilikan Tanah" 
          />
        </div>
      </div>
    </div>
  );
};