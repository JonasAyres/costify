import { Link } from 'react-router-dom';
import { mockTorontoData, getItemsByCategory } from '../../data/mockData';
import { IndexGauge, DataCard } from '../../components/Common/DataCard';
import { Building2, Calculator, Info, Globe2 } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { RentalYieldChart } from '../../components/CostOfLiving/RentalYieldChart';

const PropertyIndex = () => {
  const { selectedCity, selectedCountry, formatCurrency, currency } = useGlobalContext();
  
  const data = { ...mockTorontoData, cityName: selectedCity, country: selectedCountry };
  const categoriesMap = getItemsByCategory(data.items);
  
  // Extracting only Property related items
  const propertyItems = [
    ...(categoriesMap['Buy Apartment'] || []),
    ...(categoriesMap['Rent'] || []),
    ...(categoriesMap['Salaries'] || [])
  ];

  if (!selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 mb-6 rounded-full bg-(--color-brand-500)/10 flex items-center justify-center">
          <Globe2 className="w-10 h-10 text-(--color-brand-500)" />
        </div>
        <h2 className="text-3xl font-bold text-(--color-text) mb-4">Select a Country</h2>
        <p className="text-(--color-muted) max-w-md text-lg">
          Please select a Country from the top navigation bar to view detailed Property Prices, Rent Yields, and Affordability metrics.
        </p>
      </div>
    );
  }

  // Fallback if property indices are missing in mock (we added them, but typescript likes safety)
  const propIndices = data.propertyIndices || {
    priceToIncomeRatio: 0, grossRentalYieldCityCentre: 0, grossRentalYieldOutsideCentre: 0,
    priceToRentRatioCityCentre: 0, priceToRentRatioOutsideCentre: 0, mortgageAsPercentageOfIncome: 0, affordabilityIndex: 0
  };

  const locationTitle = selectedCity ? `Property Prices in ${selectedCity}` : `Property Prices in ${selectedCountry}`;

  return (
    <div className="space-y-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-(--color-border) pb-6">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
            <Building2 className="text-(--color-brand-400) w-8 h-8" />
            {locationTitle}
          </h1>
          <p className="text-(--color-muted) mt-2 flex items-center gap-2">
            {data.country} <span className="w-1 h-1 rounded-full bg-(--color-border)"></span> 
            Currency: <span className="font-semibold text-(--color-text)">{currency}</span> <span className="w-1 h-1 rounded-full bg-(--color-border)"></span>
            Last Update: {data.lastUpdate} 
          </p>
        </div>
        <Link to="/compare" className="glass-panel px-4 py-2 hover:bg-(--color-panel-hover) rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Calculator className="w-4 h-4 text-(--color-brand-500)" /> Compare Cities
        </Link>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataCard 
          title="Price to Income Ratio" 
          value={propIndices.priceToIncomeRatio.toFixed(2)} 
          subtitle="Years of income to buy apt" 
          icon={<Building2 className="w-5 h-5" />} 
          trend="up" 
          trendValue="High"
        />
        <DataCard 
          title="Mortgage as % of Income" 
          value={`${propIndices.mortgageAsPercentageOfIncome.toFixed(2)}%`} 
          subtitle="Monthly mortgage payment relative to avg income" 
          trend="up" 
          trendValue="Critical"
        />
        <DataCard 
          title="Gross Rental Yield (City Centre)" 
          value={`${propIndices.grossRentalYieldCityCentre.toFixed(2)}%`} 
          subtitle="Rental ROI before expenses" 
        />
        <DataCard 
          title="Affordability Index" 
          value={propIndices.affordabilityIndex.toFixed(2)} 
          subtitle="Higher is better" 
        />
      </div>

      {/* Ratios & Index Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-6 rounded-xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-(--color-text) flex items-center gap-2 border-b border-(--color-border) pb-2">
            Investment & Affordability Indices
          </h2>
          <div className="space-y-5">
            <IndexGauge label="Price to Income Ratio" value={propIndices.priceToIncomeRatio} max={25} lowIsGood={true} />
            <IndexGauge label="Mortgage as Percentage of Income" value={propIndices.mortgageAsPercentageOfIncome} max={150} lowIsGood={true} />
            <IndexGauge label="Affordability Index" value={propIndices.affordabilityIndex} max={5} lowIsGood={false} />
            <IndexGauge label="Price to Rent Ratio - City Centre" value={propIndices.priceToRentRatioCityCentre} max={40} lowIsGood={true} />
            <IndexGauge label="Price to Rent Ratio - Outside of Centre" value={propIndices.priceToRentRatioOutsideCentre} max={40} lowIsGood={true} />
          </div>
        </div>
        
        {/* Info Box */}
        <div className="flex flex-col p-6 rounded-xl bg-gradient-to-br from-(--color-panel) to-(--color-panel-hover) border border-(--color-border)">
          <div className="flex items-center gap-3 mb-4 border-b border-(--color-border) pb-3">
             <div className="p-2 rounded-lg bg-(--color-brand-400)/10">
                <Info className="w-6 h-6 text-(--color-brand-400)" />
             </div>
             <h3 className="font-semibold text-(--color-text) text-lg">About these Indices</h3>
          </div>
          <div className="space-y-4 text-sm text-(--color-muted) leading-relaxed">
            <p>
              <strong className="text-(--color-text)">Price to Income Ratio:</strong> is the basic measure for apartment purchase affordability. It is the ratio of median apartment prices to median familial disposable income.
            </p>
            <p>
              <strong className="text-(--color-text)">Price to Rent Ratio:</strong> is the average cost of ownership divided by the received rent income (if buying to let) or the estimated rent that would be paid if renting (if buying to reside).
            </p>
            <p>
              <strong className="text-(--color-text)">Mortgage as Percentage of Income:</strong> is a ratio of the actual monthly cost of the mortgage to take-home family income. Average monthly salary is used to estimate family income. It assumes 100% mortgage is taken on 20 years for the house (or apt) of 90 square meters.
            </p>
          </div>
        </div>

        {/* 3rd Column (Spanning) - Interactive Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-(--color-border) bg-gradient-to-tr from-(--color-panel)/40 to-transparent">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-(--color-border) pb-4 mb-2 gap-4">
             <h3 className="font-bold text-xl text-(--color-text)">Buy vs Rent Simulator</h3>
             <span className="text-xs px-3 py-1 rounded-full bg-(--color-brand-400)/10 text-(--color-brand-400) border border-(--color-brand-400)/20">Estimated Monthly Cost (15y Mortgage)</span>
          </div>
          <RentalYieldChart 
            cityCenterRent={propertyItems.find(i => i.name.includes("Apartment (1 bedroom) in City Centre"))?.price || 2000}
            outsideCenterRent={propertyItems.find(i => i.name.includes("Apartment (1 bedroom) Outside of Centre"))?.price || 1500}
            cityCenterBuy={propertyItems.find(i => i.name.includes("Price per Square Meter to Buy Apartment in City Centre"))?.price || 10000}
            outsideCenterBuy={propertyItems.find(i => i.name.includes("Price per Square Meter to Buy Apartment Outside of Centre"))?.price || 6000}
          />
        </div>
      </div>

      {/* Prices Table Interface for Property */}
      <div>
        <h2 className="text-2xl font-bold text-(--color-text) mb-6 flex items-center gap-2">
          Detailed Property Market Values
        </h2>
        
        <div className="glass-panel rounded-xl overflow-hidden border border-(--color-border)">
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-(--color-bg) border-b border-(--color-border) text-xs uppercase tracking-wider text-(--color-muted)">
                  <th className="px-6 py-4 font-semibold w-7/12">Market Item</th>
                  <th className="px-6 py-4 font-semibold text-right">Edit</th>
                  <th className="px-6 py-4 font-semibold text-right w-1/4">Average Price</th>
                  <th className="px-6 py-4 font-semibold text-right hidden md:table-cell">Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--color-border)">
                {propertyItems?.map((item, idx) => (
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
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyIndex;
