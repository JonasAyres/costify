import { Link } from 'react-router-dom';
import { mockTorontoData } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { Wind, Calculator, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const PollutionIndex = () => {
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
          Please select a Country to view Pollution metrics, Air Quality, and environmental data.
        </p>
      </div>
    );
  }

  const polData = data.pollutionIndices || {
    pollutionIndex: 0, expPollutionIndex: 0, airQuality: 0, drinkingWaterQuality: 0,
    waterPollution: 0, noiseAndLightPollution: 0, greenAndParks: 0, garbageDisposal: 0
  };

  const locationTitle = selectedCity ? `Pollution in ${selectedCity}` : `Pollution in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <Wind className="text-(--color-brand-400) w-8 h-8" />
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

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataCard 
          title="Pollution Index" 
          value={polData.pollutionIndex.toFixed(2)} 
          subtitle="Lower is better" 
          icon={<Wind className="w-5 h-5" />} 
          trend="down" 
          trendValue="Low"
        />
        <DataCard 
          title="Exp. Pollution Index" 
          value={polData.expPollutionIndex.toFixed(2)} 
          subtitle="Exponential function considering extremes" 
        />
      </div>

      {/* Indices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Purity & Cleanliness
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Air Quality" value={polData.airQuality} lowIsGood={false} max={100} />
            <IndexGauge label="Drinking Water Quality and Accessibility" value={polData.drinkingWaterQuality} lowIsGood={false} max={100} />
            <IndexGauge label="Garbage Disposal Satisfaction" value={polData.garbageDisposal} lowIsGood={false} max={100} />
            <IndexGauge label="Green and Parks in the City" value={polData.greenAndParks} lowIsGood={false} max={100} />
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
               Pollutant Indicators
             </h2>
             <div className="space-y-5">
               <IndexGauge label="Water Pollution" value={polData.waterPollution} lowIsGood={true} max={100} />
               <IndexGauge label="Noise and Light Pollution" value={polData.noiseAndLightPollution} lowIsGood={true} max={100} />
             </div>
          </div>
          
          <div className="flex flex-col p-6 rounded-xl bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover) border border-(--color-border)">
            <div className="flex items-center gap-3 mb-4 border-b border-(--color-border) pb-3">
               <div className="p-2 rounded-lg bg-(--color-brand-400)/10">
                  <Info className="w-6 h-6 text-(--color-brand-400)" />
               </div>
               <h3 className="font-semibold text-(--color-text) text-lg">About Pollution Data</h3>
            </div>
            <div className="space-y-4 text-sm text-(--color-muted) leading-relaxed">
              <p>
                <strong className="text-(--color-text)">Pollution Index</strong> is an estimation of the overall pollution in the city. The biggest weight is given to air pollution, followed by water pollution.
              </p>
              <p>
                A high score on "Purity & Cleanliness" indicates a clean ecosystem, while high scores on "Pollutant Indicators" mean heavy levels of pollution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollutionIndex;
