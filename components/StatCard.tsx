import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colorClass: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, colorClass, icon }) => {
  return (
    <div className={`${colorClass} rounded-xl p-6 text-white shadow-lg transform transition-all hover:scale-[1.02] duration-300 relative overflow-hidden`}>
      <div className="relative z-10">
        <p className="text-sm font-medium opacity-90 mb-1 uppercase tracking-wide">{title}</p>
        <h3 className="text-4xl font-extrabold mb-1">{value}</h3>
        {subtitle && <p className="text-xs opacity-75">{subtitle}</p>}
      </div>
      {icon && (
        <div className="absolute right-[-10px] bottom-[-10px] opacity-20 transform rotate-12">
          {icon}
        </div>
      )}
    </div>
  );
};