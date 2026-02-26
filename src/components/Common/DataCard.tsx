import React from 'react';

interface IndexGaugeProps {
  value: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  lowIsGood?: boolean;
  max?: number;
}

export const IndexGauge: React.FC<IndexGaugeProps> = ({ 
  value, 
  label, 
  size = 'md',
  lowIsGood = true,
  max = 120
}) => {
  // Numbeo color logic mapping
  // If low is good (e.g. Cost of Living, Crime): 0-33 Green, 34-66 Yellow/Orange, 67-100 Red
  // If high is good (e.g. Purchasing Power, Quality of Life): 0-33 Red, 34-66 Yellow, 67-100 Green
  
  const getColor = (val: number) => {
    if (lowIsGood) {
      if (val < 40) return '#4ade80'; // V Good (Green)
      if (val < 60) return '#fbbf24'; // Moderate (Yellow)
      if (val < 80) return '#f97316'; // High (Orange)
      return '#ef4444'; // V High (Red)
    } else {
      if (val > 80) return '#4ade80'; // V Good
      if (val > 60) return '#fbbf24'; // Moderate
      if (val > 40) return '#f97316'; // Low
      return '#ef4444'; // V Low
    }
  };

  const getLabelText = (val: number) => {
    const thresholdPercentage = (val / max) * 100;
    if (lowIsGood) {
      if (thresholdPercentage < 33) return 'Very Low';
      if (thresholdPercentage < 50) return 'Low';
      if (thresholdPercentage < 66) return 'Moderate';
      return 'High/Very High';
    } else {
      if (thresholdPercentage > 66) return 'Very High';
      if (thresholdPercentage > 50) return 'High';
      if (thresholdPercentage > 33) return 'Moderate';
      return 'Low/Very Low';
    }
  }

  const normalizedValue = Math.min(Math.max(value, 0), max + (max * 0.1)); // allow slightly over max
  const widthStr = `${Math.min((normalizedValue / max) * 100, 100)}%`;
  const barColor = getColor(value);

  const sizeClasses = {
    sm: { text: 'text-xs', height: 'h-1.5' },
    md: { text: 'text-sm', height: 'h-2.5' },
    lg: { text: 'text-base', height: 'h-3.5' },
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className={`font-medium text-(--color-text) ${sizeClasses[size].text} pb-1`}>{label}</span>
        <div className="text-right pb-1">
          <span className="font-bold text-(--color-text) text-lg mr-2">{value.toFixed(2)}</span>
          <span className="text-xs text-(--color-muted) uppercase font-semibold">{getLabelText(value)}</span>
        </div>
      </div>
      <div className={`w-full bg-(--color-border) rounded-full overflow-hidden ${sizeClasses[size].height}`}>
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: widthStr, 
            backgroundColor: barColor,
            boxShadow: `0 0 10px ${barColor}80` // Glow effect
          }}
        />
      </div>
    </div>
  );
};

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  title, value, subtitle, icon, trend, trendValue
}) => {
  return (
    <div className="glass-panel p-5 rounded-xl glass-panel-hover flex flex-col justify-between h-full border-l-4 border-l-(--color-brand-400)">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-(--color-muted) font-medium text-sm">{title}</h3>
        {icon && <div className="text-(--color-brand-500) opacity-80">{icon}</div>}
      </div>
      
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-(--color-text)">{value}</span>
          {trend && trendValue && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend === 'up' ? 'bg-red-500/20 text-red-500 dark:text-red-400' : 
              trend === 'down' ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 
              'bg-(--color-panel-hover) text-(--color-muted)'
            }`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-(--color-muted) mt-2 leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
};
