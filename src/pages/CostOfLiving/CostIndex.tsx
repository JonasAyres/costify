import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockTorontoData, getItemsByCategory } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { Calculator, MapPin, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { CostDistributionChart } from '../../components/CostOfLiving/CostDistributionChart';

const CostOfLivingIndex = () => {
  const { selectedCity, selectedCountry, formatCurrency, currency } = useGlobalContext();
  
  // Fake adapting data headers based on global selection for preview
  const data = { ...mockTorontoData, cityName: selectedCity || "National Average", country: selectedCountry };
  const categoriesMap = getItemsByCategory(data.items);
  const categories = Object.keys(categoriesMap);

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  if (!selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 mb-6 rounded-full bg-(--color-brand-500)/10 flex items-center justify-center">
          <Globe2 className="w-10 h-10 text-(--color-brand-500)" />
        </div>
        <h2 className="text-3xl font-bold text-(--color-text) mb-4">Select a Country</h2>
        <p className="text-(--color-muted) max-w-md text-lg">
          Please select a Country from the top navigation bar to view detailed cost of living metrics, rent index, and average prices.
        </p>
      </div>
    );
  }

  const locationTitle = selectedCity ? `Cost of Living in ${selectedCity}` : `Cost of Living in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <MapPin className="text-(--color-brand-400) w-8 h-8" />
            {locationTitle}
          </h1>
          <p className="text-(--color-muted) mt-2 flex items-center gap-2">
            {data.country} <span className="w-1 h-1 rounded-full bg-(--color-border)"></span> 
            Currency: <span className="font-semibold text-(--color-text)">{currency}</span> <span className="w-1 h-1 rounded-full bg-(--color-border)"></span>
            Last Update: {data.lastUpdate} ({data.contributors} contributors)
          </p>
        </div>
        <Link to="/compare" className="glass-panel px-4 py-2 hover:bg-(--color-panel-hover) rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Calculator className="w-4 h-4 text-(--color-brand-500)" /> Compare with another city
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-xl flex items-start gap-4 border border-(--color-brand-400)/20 bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover)">
          <div className="p-3 rounded-lg bg-(--color-brand-400)/10 mt-1">
            <Info className="w-6 h-6 text-(--color-brand-400)" />
          </div>
          <div>
            <h3 className="font-semibold text-(--color-text) text-lg mb-2">Summary</h3>
            <p className="text-(--color-muted) leading-relaxed">
              Family of four estimated monthly costs are <strong className="text-(--color-text)">{formatCurrency(data.summary.familyOfFour)}</strong> without rent.
            </p>
            <p className="text-(--color-muted) leading-relaxed mt-1">
              A single person estimated monthly costs are <strong className="text-(--color-text)">{formatCurrency(data.summary.singlePerson)}</strong> without rent.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-(--color-panel-hover)/30 text-sm border border-(--color-border)">
              {data.summary.description}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <DataCard 
            title="Cost of Living Index" 
            value={data.indices.costOfLiving} 
            subtitle="Excluding rent. New York base = 100" 
            trend="down" 
            trendValue="28.8% vs NY"
          />
        </div>
      </div>

      {/* Indices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Indices Summary
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Cost of Living Index" value={data.indices.costOfLiving} lowIsGood={true} />
            <IndexGauge label="Rent Index" value={data.indices.rent} lowIsGood={true} />
            <IndexGauge label="Cost of Living Plus Rent Index" value={data.indices.costOfLivingPlusRent} lowIsGood={true} />
            <IndexGauge label="Groceries Index" value={data.indices.groceries} lowIsGood={true} />
            <IndexGauge label="Restaurant Price Index" value={data.indices.restaurantPrice} lowIsGood={true} />
            <IndexGauge label="Local Purchasing Power Index" value={data.indices.localPurchasingPower} lowIsGood={false} />
          </div>
        </div>
        
        {/* Interactive PieChart distribution feature */}
        <div className="flex flex-col items-center justify-center p-6 border border-(--color-border) rounded-xl bg-gradient-to-br from-(--color-panel)/30 to-(--color-bg)/50 glass-panel">
          <h3 className="text-lg font-semibold text-(--color-text) self-start border-b border-(--color-border) pb-2 w-full mb-2">Cost Distribution Explorer</h3>
          <CostDistributionChart 
             totalCost={data.summary.familyOfFour} 
             formatCurrency={formatCurrency}
          />
          <p className="mt-2 text-sm text-(--color-muted) text-center">Hover over the slices to see specific cost distributions</p>
        </div>
      </div>

      {/* Prices Table Interface */}
      <div>
        <h2 className="text-2xl font-bold text-(--color-text) mb-6">Prices in {selectedCity ? selectedCity : selectedCountry}</h2>
        
        <div className="glass-panel rounded-xl overflow-hidden border border-(--color-border)">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar border-b border-(--color-border) bg-(--color-panel)">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeCategory === cat 
                    ? 'border-(--color-brand-500) text-(--color-brand-600) dark:text-(--color-brand-400) bg-(--color-brand-500)/5' 
                    : 'border-transparent text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-panel-hover)'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table Content */}
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-(--color-bg) border-b border-(--color-border) text-xs uppercase tracking-wider text-(--color-muted)">
                  <th className="px-6 py-4 font-semibold w-7/12">Item</th>
                  <th className="px-6 py-4 font-semibold text-right">Edit</th>
                  <th className="px-6 py-4 font-semibold text-right w-1/4">Average Price</th>
                  <th className="px-6 py-4 font-semibold text-right hidden md:table-cell">Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--color-border)">
                {categoriesMap[activeCategory]?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-(--color-panel-hover) group transition-colors">
                    <td className="px-6 py-4 text-sm text-(--color-text) flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-muted) group-hover:bg-(--color-brand-500) transition-colors"></span>
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <button className="text-(--color-muted) hover:text-(--color-brand-500) opacity-0 group-hover:opacity-100 transition-opacity">
                         Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-(--color-text) text-right">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-6 py-4 text-xs text-(--color-muted) text-right hidden md:table-cell">
                      {formatCurrency(item.min)} - {formatCurrency(item.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categoriesMap[activeCategory]?.length === 0 && (
              <div className="p-8 text-center text-(--color-muted)">No items found for this category.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CostOfLivingIndex;
