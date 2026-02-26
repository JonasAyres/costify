import { Link } from 'react-router-dom';
import { mockTorontoData } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { Car, Calculator, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const TrafficIndex = () => {
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
          Please select a Country to view Traffic metrics, Commute Times, and CO2 Emission estimations.
        </p>
      </div>
    );
  }

  const trafficData = data.trafficIndices || {
    trafficIndex: 0, timeIndex: 0, co2EmissionIndex: 0, inefficienciesIndex: 0
  };

  const locationTitle = selectedCity ? `Traffic in ${selectedCity}` : `Traffic in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <Car className="text-(--color-brand-400) w-8 h-8" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataCard 
          title="Traffic Index" 
          value={trafficData.trafficIndex.toFixed(2)} 
          subtitle="Composite index of time & emissions" 
          icon={<Car className="w-5 h-5" />} 
          trend="up" 
          trendValue="High"
        />
        <DataCard 
          title="Time Index (mins)" 
          value={trafficData.timeIndex.toFixed(1)} 
          subtitle="Avg one-way commute time" 
        />
        <DataCard 
          title="CO2 Emission Index" 
          value={trafficData.co2EmissionIndex.toLocaleString()} 
          subtitle="Estimated yearly emissions per pass." 
        />
        <DataCard 
          title="Inefficiencies Index" 
          value={trafficData.inefficienciesIndex.toFixed(2)} 
          subtitle="Economic & time losses scaling" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Congestion & Environmental Impact
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Time Index" value={trafficData.timeIndex} lowIsGood={true} max={120} />
            <IndexGauge label="CO2 Emission Index" value={trafficData.co2EmissionIndex} lowIsGood={true} max={15000} />
            <IndexGauge label="Inefficiencies Index" value={trafficData.inefficienciesIndex} lowIsGood={true} max={500} />
          </div>
        </div>

        <div className="flex flex-col p-6 rounded-xl bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover) border border-(--color-border)">
          <div className="flex items-center gap-3 mb-4 border-b border-(--color-border) pb-3">
             <div className="p-2 rounded-lg bg-(--color-brand-400)/10">
                <Info className="w-6 h-6 text-(--color-brand-400)" />
             </div>
             <h3 className="font-semibold text-(--color-text) text-lg">About Traffic Data</h3>
          </div>
          <div className="space-y-4 text-sm text-(--color-muted) leading-relaxed">
            <p>
              <strong className="text-(--color-text)">Traffic Index:</strong> is a composite index of time consumed in traffic due to job commute, estimation of time consumption dissatisfaction, CO2 consumption estimation in traffic and overall inefficiencies in the traffic system.
            </p>
            <p>
              <strong className="text-(--color-text)">Time Index:</strong> is an average one way time needed to transport, in minutes.
            </p>
            <p>
              <strong className="text-(--color-text)">Inefficiencies Index:</strong> is an estimation of inefficiencies in the traffic, with high values generally pointing to cities struggling with heavy traffic jams where people use cars for daily commuting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficIndex;
