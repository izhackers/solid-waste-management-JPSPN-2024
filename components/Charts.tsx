import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { ChartData, FacilityUtilization } from '../types';

interface ChartProps {
  data: ChartData[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
        <p className="font-bold text-gray-800 text-sm">{label || payload[0].name}</p>
        <p className="text-blue-600 text-sm">Jumlah: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const StateBarChart: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} interval={0} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || '#3B82F6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const CategoryPieChart: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <div className="h-[300px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const OwnerList: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item.fill }} 
              />
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface UtilizationChartProps {
  data: FacilityUtilization[];
  title: string;
}

export const UtilizationChart: React.FC<UtilizationChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 'auto']} unit="%" />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={180} 
              tick={{ fontSize: 11 }} 
              interval={0} 
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as FacilityUtilization;
                  return (
                    <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                      <p className="font-bold text-gray-800 text-sm max-w-[200px] truncate">{data.name}</p>
                      <p className="text-gray-600 text-xs mb-2">{data.state}</p>
                      <div className="space-y-1">
                        <p className="text-blue-600 text-sm font-semibold">Kadar: {data.rate}%</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                           <span>Kap: {data.capacity}</span>
                           <span>Guna: {data.usage}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="rate" name="Kadar Penggunaan (%)" radius={[0, 4, 4, 0]}>
               {
                 data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.rate > 100 ? '#EF4444' : entry.rate > 80 ? '#F59E0B' : '#10B981'} />
                 ))
               }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};