import { Link } from 'react-router-dom';
import { mockTorontoData } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { Activity, Calculator, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const QualityOfLifeIndex = () => {
  const { selectedCity, selectedCountry } = useGlobalContext();
  
  const data = { ...mockTorontoData, cityName: selectedCity || "National Average", country: selectedCountry };

  if (!selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 mb-6 rounded-full bg-(--color-brand-500)/10 flex items-center justify-center">
          <Globe2 className="w-10 h-10 text-(--color-brand-500)" />
        </div>
        <h2 className="text-3xl font-bold text-(--color-text) mb-4">Select a Country</h2>
        <p className="text-(--color-muted) max-w-md text-lg">
          Please select a Country to view the consolidated Quality of Life index.
        </p>
      </div>
    );
  }

  const qolData = data.qualityOfLifeIndices || {
    qualityOfLifeIndex: 0, purchasingPowerIndex: 0, safetyIndex: 0,
    healthCareIndex: 0, climateIndex: 0, costOfLivingIndex: 0,
    propertyPriceToIncomeRatio: 0, trafficCommuteTimeIndex: 0, pollutionIndex: 0
  };

  const locationTitle = selectedCity ? `Quality of Life in ${selectedCity}` : `Quality of Life in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <Activity className="text-(--color-brand-400) w-8 h-8" />
            {locationTitle}
          </h1>
          <p className="text-(--color-muted) mt-2 flex items-center gap-2">
            {data.country} <span className="w-1 h-1 rounded-full bg-(--color-border)"></span> 
            Contributors: <span className="font-semibold text-(--color-text)">{data.contributors}</span>
          </p>
        </div>
        <Link to="/compare" className="glass-panel px-4 py-2 hover:bg-(--color-panel-hover) rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Calculator className="w-4 h-4 text-(--color-brand-500)" /> Compare Cities
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <DataCard 
          title="Overall Quality of Life Index" 
          value={qolData.qualityOfLifeIndex.toFixed(2)} 
          subtitle="Higher is better" 
          icon={<Activity className="w-6 h-6" />} 
          trend="up" 
          trendValue="Very High"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Index Components
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Purchasing Power Index" value={qolData.purchasingPowerIndex} lowIsGood={false} max={150} />
            <IndexGauge label="Safety Index" value={qolData.safetyIndex} lowIsGood={false} max={100} />
            <IndexGauge label="Health Care Index" value={qolData.healthCareIndex} lowIsGood={false} max={100} />
            <IndexGauge label="Climate Index" value={qolData.climateIndex} lowIsGood={false} max={100} />
            <IndexGauge label="Cost of Living Index" value={qolData.costOfLivingIndex} lowIsGood={true} max={150} />
            <IndexGauge label="Property Price to Income Ratio" value={qolData.propertyPriceToIncomeRatio} lowIsGood={true} max={30} />
            <IndexGauge label="Traffic Commute Time Index" value={qolData.trafficCommuteTimeIndex} lowIsGood={true} max={100} />
            <IndexGauge label="Pollution Index" value={qolData.pollutionIndex} lowIsGood={true} max={100} />
          </div>
        </div>

        <div className="flex flex-col p-6 rounded-xl bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover) border border-(--color-border)">
          <div className="flex items-center gap-3 mb-4 border-b border-(--color-border) pb-3">
             <div className="p-2 rounded-lg bg-(--color-brand-400)/10">
                <Info className="w-6 h-6 text-(--color-brand-400)" />
             </div>
             <h3 className="font-semibold text-(--color-text) text-lg">About Quality of Life</h3>
          </div>
          <div className="space-y-4 text-sm text-(--color-muted) leading-relaxed">
            <p>
              <strong className="text-(--color-text)">Quality of Life Index</strong> is an estimation of overall quality of life by using an empirical formula which takes into account purchasing power index (higher is better), pollution index (lower is better), house price to income ratio (lower is better), cost of living index (lower is better), safety index (higher is better), health care index (higher is better), traffic commute time index (lower is better) and climate index (higher is better).
            </p>
            <p>
              It is important to note that the index is relative, creating a comparative mechanism rather than displaying an absolute "score" with a strict mathematical significance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityOfLifeIndex;
