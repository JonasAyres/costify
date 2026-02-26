import { Link } from 'react-router-dom';
import { mockTorontoData } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { HeartPulse, Calculator, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const HealthIndex = () => {
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
          Please select a Country to view Health Care metrics, hospital capacities, and overall medical indices.
        </p>
      </div>
    );
  }

  const healthData = data.healthCareIndices || {
    healthCareIndex: 0, healthCareExpIndex: 0, skillAndCompetency: 0,
    speedOfExamination: 0, equipmentForModernDiagnosis: 0, accuracyAndCompleteness: 0,
    friendlinessAndCourtesy: 0, responsivenessWaitings: 0, costSatisfaction: 0
  };

  const locationTitle = selectedCity ? `Health Care in ${selectedCity}` : `Health Care in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <HeartPulse className="text-(--color-brand-400) w-8 h-8" />
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
          title="Health Care Index" 
          value={healthData.healthCareIndex.toFixed(2)} 
          subtitle="Higher is better" 
          icon={<HeartPulse className="w-5 h-5" />} 
          trend="up" 
          trendValue="Good"
        />
        <DataCard 
          title="Health Care Exp. Index" 
          value={healthData.healthCareExpIndex.toFixed(2)} 
          subtitle="Measures quality combining satisfaction and expectations" 
          trend="up" 
          trendValue="Very Good"
        />
      </div>

      {/* Indices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Detailed Metrics
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Skill and competency of medical staff" value={healthData.skillAndCompetency} lowIsGood={false} max={100} />
            <IndexGauge label="Speed in completing examination and reports" value={healthData.speedOfExamination} lowIsGood={false} max={100} />
            <IndexGauge label="Equipment for modern diagnosis and treatment" value={healthData.equipmentForModernDiagnosis} lowIsGood={false} max={100} />
            <IndexGauge label="Accuracy and completeness in filling out reports" value={healthData.accuracyAndCompleteness} lowIsGood={false} max={100} />
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
               Patient Experience
             </h2>
             <div className="space-y-5">
               <IndexGauge label="Friendliness and courtesy of the staff" value={healthData.friendlinessAndCourtesy} lowIsGood={false} max={100} />
               <IndexGauge label="Responsiveness (waitings) in medical institutions" value={healthData.responsivenessWaitings} lowIsGood={false} max={100} />
               <IndexGauge label="Satisfaction with Cost to you" value={healthData.costSatisfaction} lowIsGood={false} max={100} />
             </div>
          </div>
          
          {/* Info Box */}
          <div className="flex flex-col p-6 rounded-xl bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover) border border-(--color-border)">
            <div className="flex items-center gap-3 mb-4 border-b border-(--color-border) pb-3">
               <div className="p-2 rounded-lg bg-(--color-brand-400)/10">
                  <Info className="w-6 h-6 text-(--color-brand-400)" />
               </div>
               <h3 className="font-semibold text-(--color-text) text-lg">About Health Care Data</h3>
            </div>
            <div className="space-y-4 text-sm text-(--color-muted) leading-relaxed">
              <p>
                <strong className="text-(--color-text)">Health Care Index:</strong> is an estimation of the overall quality of the health care system, health care professionals, equipment, staff, doctors, cost, etc.
              </p>
              <p>
                <strong className="text-(--color-text)">Scores:</strong> All metrics mapped on this page operate on a scale from 0 to 100. Lower scores indicate poor performance or dissatisfaction, whereas higher percentages reveal excellence and high patient reliability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthIndex;
