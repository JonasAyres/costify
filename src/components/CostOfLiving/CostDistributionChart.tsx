import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

interface CostDistributionChartProps {
  totalCost: number;
  formatCurrency: (value: number) => string;
}

const COLORS = ['#2dd4bf', '#0ea5e9', '#8b5cf6', '#f43f5e', '#f59e0b', '#10b981'];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-sm font-bold opacity-90">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#9ca3af" className="text-xs">
        {`( ${(percent * 100).toFixed(1)}% )`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        className="opacity-40 shadow-[0_0_15px_currentColor]"
      />
    </g>
  );
};

export const CostDistributionChart: React.FC<CostDistributionChartProps> = ({ totalCost, formatCurrency }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Mock distribution percentages based on common real-world ratios
  const data = [
    { name: 'Rent & Housing', value: totalCost * 0.35 },
    { name: 'Markets', value: totalCost * 0.28 },
    { name: 'Restaurants', value: totalCost * 0.15 },
    { name: 'Transportation', value: totalCost * 0.12 },
    { name: 'Utilities', value: totalCost * 0.07 },
    { name: 'Leisure', value: totalCost * 0.03 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border border-(--color-border) rounded-lg shadow-2xl bg-(--color-panel)/90 backdrop-blur-md">
          <p className="font-semibold text-(--color-text) mb-1">{payload[0].name}</p>
          <p className="text-(--color-brand-400) font-bold text-lg">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[320px] flex flex-col justify-center items-center relative z-10 transition-all duration-300">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* @ts-ignore recharts type definitions may be incomplete */}
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={105}
            paddingAngle={4}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            stroke="none"
            isAnimationActive={true}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
