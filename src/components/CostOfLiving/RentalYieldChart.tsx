import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGlobalContext } from '../../contexts/GlobalContext';

interface RentalYieldChartProps {
  cityCenterRent: number;
  outsideCenterRent: number;
  cityCenterBuy: number;
  outsideCenterBuy: number;
}

export const RentalYieldChart: React.FC<RentalYieldChartProps> = ({ 
  cityCenterRent, 
  outsideCenterRent, 
  cityCenterBuy, 
  outsideCenterBuy 
}) => {
  const { formatCurrency } = useGlobalContext();

  // Mocking mortgage logic: Assume 15y mortgage at 5% for 90 sqm apt (using the buy price as sqm price * 90)
  const calculateMonthlyMortgage = (sqmPrice: number) => {
    const principal = sqmPrice * 90;
    const monthlyRate = 0.05 / 12;
    const payments = 15 * 12;
    const mortgage = principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
    return Number(mortgage.toFixed(2));
  };

  const data = [
    {
      location: 'City Centre',
      Rent: cityCenterRent,
      'Buy (Mortgage)': calculateMonthlyMortgage(cityCenterBuy),
    },
    {
      location: 'Outside Centre',
      Rent: outsideCenterRent,
      'Buy (Mortgage)': calculateMonthlyMortgage(outsideCenterBuy),
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 border border-(--color-border) rounded-lg shadow-2xl bg-(--color-panel)/95 backdrop-blur-md">
          <p className="font-bold text-(--color-text) mb-3 border-b border-(--color-border) pb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-(--color-text) text-sm">{entry.name}:</span>
              <span className="text-(--color-text) font-bold ml-auto">{formatCurrency(entry.value)} /mo</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[350px] mt-4">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.5} />
          <XAxis 
            dataKey="location" 
            stroke="var(--color-muted)" 
            tick={{ fill: 'var(--color-muted)' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--color-muted)" 
            tick={{ fill: 'var(--color-muted)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip cursor={{ fill: 'var(--color-panel-hover)', opacity: 0.4 }} content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="Rent" fill="#2dd4bf" radius={[4, 4, 0, 0]} maxBarSize={60} />
          <Bar dataKey="Buy (Mortgage)" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
