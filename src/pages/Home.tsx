import React from 'react';
import { Link } from 'react-router-dom';
import { Globe as GlobeIcon, Building2, ShieldAlert, HeartPulse, Wind, Car, Activity, ArrowRight, MapPin } from 'lucide-react';
import { useGlobalContext } from '../contexts/GlobalContext';

const Home: React.FC = () => {
  const { selectedCountry, setSelectedCountry, selectedCity, setSelectedCity } = useGlobalContext();

  const countries = ['Canada', 'United States', 'United Kingdom', 'Australia', 'Brazil'];
  const citiesByCountry: Record<string, string[]> = {
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'San Francisco'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Curitiba']
  };

  const currentCities = citiesByCountry[selectedCountry] || [];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedCity('');
  };
  const categories = [
    { name: 'Cost of Living', href: '/cost-of-living', icon: GlobeIcon, desc: 'Prices of restaurants, food, transportation, utilities and housing.', color: 'from-[#5eead4] to-[#0f766e]' },
    { name: 'Property Prices', href: '/property-investment', icon: Building2, desc: 'Price to income ratio, mortgage as percentage of income.', color: 'from-[#93c5fd] to-[#1d4ed8]' },
    { name: 'Crime', href: '/crime', icon: ShieldAlert, desc: 'Crime rates, safety walking during daylight and night.', color: 'from-[#fca5a5] to-[#b91c1c]' },
    { name: 'Health Care', href: '/health-care', icon: HeartPulse, desc: 'Skill and competency of medical staff, equipment for modern diagnosis.', color: 'from-[#f9a8d4] to-[#be185d]' },
    { name: 'Pollution', href: '/pollution', icon: Wind, desc: 'Air quality, drinking water quality and accessibility.', color: 'from-[#d8b4fe] to-[#7e22ce]' },
    { name: 'Traffic', href: '/traffic', icon: Car, desc: 'Time consumed in traffic, CO2 emission estimation.', color: 'from-[#fdba74] to-[#c2410c]' },
    { name: 'Quality of Life', href: '/quality-of-life', icon: Activity, desc: 'Purchasing power, safety, health care, cost of living index.', color: 'from-[#86efac] to-[#15803d]' },
  ];

  return (
    <div className="relative w-full h-full min-h-[85vh]">
      <div className="space-y-12 py-8 relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pointer-events-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-(--color-text)">
          World Living <span className="text-gradient">Conditions</span>
        </h1>
        <p className="text-xl text-(--color-muted) leading-relaxed">
          The ultimate platform delivering insights about the cost of living, property indicators, health care, pollution, and traffic globally.
        </p>

        {/* Big Location Selector */}
        <div className="max-w-2xl mx-auto glass-panel p-6 rounded-2xl border border-(--color-border) flex flex-col sm:flex-row gap-4 items-center shadow-lg relative mt-8 z-20">
          <div className="flex-1 w-full text-left">
            <label className="block text-sm font-medium text-(--color-muted) mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Select Country
            </label>
            <select 
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-text) py-3 px-4 focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none transition-shadow cursor-pointer"
            >
              <option value="">Choose a Country...</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full text-left">
            <label className="block text-sm font-medium text-(--color-muted) mb-1">
              Select City <span className="text-xs opacity-70">(Optional)</span>
            </label>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedCountry}
              className="w-full bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-text) py-3 px-4 focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none transition-shadow cursor-pointer disabled:opacity-50"
            >
              <option value="">All Cities (National Average)</option>
              {currentCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link to="/cost-of-living" className="px-6 py-3 rounded-lg bg-(--color-brand-500) text-white font-bold hover:bg-(--color-brand-600) dark:hover:bg-(--color-brand-400) transition-colors flex items-center gap-2 shadow-lg shadow-(--color-brand-500)/30">
            Explore Data <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/compare" className="px-6 py-3 rounded-lg bg-(--color-panel) border border-(--color-border) text-(--color-text) font-medium hover:bg-(--color-panel-hover) hover:border-(--color-brand-500)/50 transition-colors shadow-sm">
            Compare Cities
          </Link>
        </div>
      </section>

      {/* Categories Grid Area */}
      <section className="pt-8 relative z-10 pointer-events-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-(--color-border) pb-4 text-(--color-text)">
          <Activity className="text-(--color-brand-500)" /> Explore by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={cat.href}
              className="glass-panel rounded-xl p-6 relative overflow-hidden group glass-panel-hover flex flex-col h-full"
            >
              {/* Subtle gradient background decoration */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${cat.color} blur-2xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full`} />
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} p-[1px] mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <div className="w-full h-full bg-(--color-panel) dark:bg-[#18181b] rounded-lg flex items-center justify-center">
                  <cat.icon className="w-6 h-6 text-(--color-text) dark:text-white opacity-90" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-(--color-text) group-hover:text-(--color-brand-600) dark:group-hover:text-(--color-brand-400) transition-colors">
                {cat.name}
              </h3>
              
              <p className="text-(--color-muted) text-sm flex-grow">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;
