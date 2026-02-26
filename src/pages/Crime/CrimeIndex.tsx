import { Link } from 'react-router-dom';
import { mockTorontoData } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { ShieldAlert, Calculator, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const CrimeIndex = () => {
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
          Please select a Country from the top navigation bar to view detailed Crime metrics, Safety indexes, and related information.
        </p>
      </div>
    );
  }

  const crimeData = data.crimeIndices || {
    crimeIndex: 0, safetyIndex: 0, levelOfCrime: 0, crimeIncreasing: 0,
    safeWalkingDaylight: 0, safeWalkingNight: 0, worriesBeingMugged: 0,
    problemDrugs: 0, problemViolentCrimes: 0
  };

  const locationTitle = selectedCity ? `Crime and Safety in ${selectedCity}` : `Crime and Safety in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <ShieldAlert className="text-(--color-brand-400) w-8 h-8" />
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
          title="Crime Index" 
          value={crimeData.crimeIndex.toFixed(2)} 
          subtitle="Lower is better" 
          icon={<ShieldAlert className="w-5 h-5" />} 
          trend="up" 
          trendValue="Moderate"
        />
        <DataCard 
          title="Safety Index" 
          value={crimeData.safetyIndex.toFixed(2)} 
          subtitle="Higher is better" 
          trend="up" 
          trendValue="Moderate"
        />
      </div>

      {/* Indices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Crime Rates & Perceptions
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Level of Crime" value={crimeData.levelOfCrime} lowIsGood={true} max={100} />
            <IndexGauge label="Crime Increasing in the past 3 years" value={crimeData.crimeIncreasing} lowIsGood={true} max={100} />
            <IndexGauge label="Worries Being Mugged or Robbed" value={crimeData.worriesBeingMugged} lowIsGood={true} max={100} />
            <IndexGauge label="Problem people using or dealing drugs" value={crimeData.problemDrugs} lowIsGood={true} max={100} />
            <IndexGauge label="Problem violent crimes such as assault and armed robbery" value={crimeData.problemViolentCrimes} lowIsGood={true} max={100} />
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
               Safety Perceptions
             </h2>
             <div className="space-y-5">
               <IndexGauge label="Safety walking alone during daylight" value={crimeData.safeWalkingDaylight} lowIsGood={false} max={100} />
               <IndexGauge label="Safety walking alone during night" value={crimeData.safeWalkingNight} lowIsGood={false} max={100} />
             </div>
          </div>
          
          {/* Info Box */}
          <div className="flex flex-col p-6 rounded-xl bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover) border border-(--color-border)">
            <div className="flex items-center gap-3 mb-4 border-b border-(--color-border) pb-3">
               <div className="p-2 rounded-lg bg-(--color-brand-400)/10">
                  <Info className="w-6 h-6 text-(--color-brand-400)" />
               </div>
               <h3 className="font-semibold text-(--color-text) text-lg">About Data</h3>
            </div>
            <div className="space-y-4 text-sm text-(--color-muted) leading-relaxed">
              <p>
                <strong className="text-(--color-text)">Crime Index</strong> is an estimation of overall level of crime in a given city or a country. We consider crime levels lower than 20 as very low, crime levels between 20 and 40 as being low, crime levels between 40 and 60 as being moderate, crime levels between 60 and 80 as being high and finally crime levels higher than 80 as being very high.
              </p>
              <p>
                <strong className="text-(--color-text)">Safety Index</strong> is, on the other way, quite opposite of crime index. If the city has a high safety index, it is considered very safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeIndex;
