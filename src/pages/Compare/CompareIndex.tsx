import { useState } from 'react';
import { mockTorontoData, getItemsByCategory } from '../../data/mockData';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Scale, TrendingDown, TrendingUp, Minus } from 'lucide-react';

export default function CompareIndex() {
  const { selectedCity, selectedCountry, formatCurrency } = useGlobalContext();
  
  // Independent local state for comparison
  const [countryA, setCountryA] = useState(selectedCountry || '');
  const [cityA, setCityA] = useState(selectedCity || '');
  
  const [countryB, setCountryB] = useState('');
  const [cityB, setCityB] = useState('');

  const countries = ['Canada', 'United States', 'United Kingdom', 'Australia', 'Brazil'];
  const citiesByCountry: Record<string, string[]> = {
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'San Francisco'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Curitiba']
  };

  const currentCitiesA = citiesByCountry[countryA] || [];
  const currentCitiesB = citiesByCountry[countryB] || [];

  // Simulate remote data fetching returning slightly different mocked values for B
  const dataA = { ...mockTorontoData, cityName: cityA || countryA || "Location A", country: countryA };
  const dataB = { 
    ...mockTorontoData, 
    cityName: cityB || countryB || "Location B", 
    country: countryB,
    indices: {
        ...mockTorontoData.indices,
        costOfLiving: mockTorontoData.indices.costOfLiving * 1.35,
        rent: mockTorontoData.indices.rent * 1.8,
        restaurantPrice: mockTorontoData.indices.restaurantPrice * 1.4
    },
    items: mockTorontoData.items.map(i => ({ ...i, price: i.price * 1.3 })) // Mock making B 30% more expensive
  };

  const categoriesMapA = getItemsByCategory(dataA.items);
  const categoriesMapB = getItemsByCategory(dataB.items);
  const categories = Object.keys(categoriesMapA);

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const renderComparisonValue = (valA: number, valB: number, isCurrency: boolean = true) => {
    const diff = valB - valA;
    const diffPercent = (diff / valA) * 100;
    
    let colorClass = "text-(--color-muted)";
    let Icon = Minus;

    if (diff > 0) {
      colorClass = "text-[#fca5a5]"; // Red-ish for more expensive
      Icon = TrendingUp;
    } else if (diff < 0) {
      colorClass = "text-(--color-brand-400)"; // Green for cheaper
      Icon = TrendingDown;
    }

    return (
      <div className="flex flex-col items-end">
        <span className="font-bold text-(--color-text)">
          {isCurrency ? formatCurrency(valB) : valB.toFixed(2)}
        </span>
        <span className={`text-xs flex items-center gap-1 mt-1 ${colorClass}`}>
          {diff !== 0 && <Icon className="w-3 h-3" />}
          {diff !== 0 ? `${Math.abs(diffPercent).toFixed(1)}%` : 'Equal'}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col border-b border-(--color-border) pb-6">
        <h1 className="text-3xl font-bold text-(--color-text) flex items-center gap-3">
          <Scale className="text-(--color-brand-400) w-8 h-8" />
          Compare Locations Side-by-Side
        </h1>
        <p className="text-(--color-muted) mt-2 max-w-2xl">
          Select two different locations to compare their cost of living, property prices, crime rates, and other Numbeo metrics simultaneously.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Location A */}
        <div className="glass-panel p-6 rounded-xl border-t-4 border-t-(--color-brand-500)">
          <h2 className="text-xl font-bold text-(--color-text) mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-(--color-brand-500)/20 text-(--color-brand-400) flex items-center justify-center text-xs font-bold">A</div>
            Location A
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-(--color-muted) mb-1">Country</label>
              <select 
                value={countryA}
                onChange={(e) => { setCountryA(e.target.value); setCityA(''); }}
                className="w-full bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-text) py-2 px-3 focus:ring-1 focus:ring-(--color-brand-500) focus:outline-none"
              >
                <option value="">Choose Country...</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-muted) mb-1">City</label>
              <select 
                value={cityA}
                onChange={(e) => setCityA(e.target.value)}
                disabled={!countryA}
                className="w-full bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-text) py-2 px-3 focus:ring-1 focus:ring-(--color-brand-500) focus:outline-none disabled:opacity-50"
              >
                <option value="">National Average</option>
                {currentCitiesA.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Location B */}
        <div className="glass-panel p-6 rounded-xl border-t-4 border-t-indigo-500">
          <h2 className="text-xl font-bold text-(--color-text) mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">B</div>
            Location B
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-(--color-muted) mb-1">Country</label>
              <select 
                value={countryB}
                onChange={(e) => { setCountryB(e.target.value); setCityB(''); }}
                className="w-full bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-text) py-2 px-3 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Choose Country...</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-muted) mb-1">City</label>
              <select 
                value={cityB}
                onChange={(e) => setCityB(e.target.value)}
                disabled={!countryB}
                className="w-full bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-text) py-2 px-3 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              >
                <option value="">National Average</option>
                {currentCitiesB.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* Comparison Tables */}
      {countryA && countryB && (
        <div className="glass-panel rounded-xl overflow-hidden border border-(--color-border)">
          <div className="bg-(--color-panel) p-6 border-b border-(--color-border) flex items-center justify-between">
            <h3 className="text-xl font-bold text-(--color-text)">
              Cost of Living Comparison
            </h3>
            <div className="text-sm text-(--color-muted)">
              Comparing <span className="text-(--color-brand-400) font-bold">{dataA.cityName}</span> vs <span className="text-indigo-400 font-bold">{dataB.cityName}</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar border-b border-(--color-border) bg-(--color-panel)/50">
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

          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-(--color-bg) border-b border-(--color-border) text-xs uppercase tracking-wider text-(--color-muted)">
                  <th className="px-6 py-4 font-semibold w-1/2">Item</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    <span className="text-(--color-brand-400)">[A]</span> {dataA.cityName}
                  </th>
                  <th className="px-6 py-4 font-semibold text-right">
                    <span className="text-indigo-400)">[B]</span> {dataB.cityName}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--color-border)">
                {categoriesMapA[activeCategory]?.map((itemA, idx) => {
                  const itemB = categoriesMapB[activeCategory]?.find(i => i.name === itemA.name);
                  if (!itemB) return null;

                  return (
                    <tr key={idx} className="hover:bg-(--color-panel-hover) transition-colors">
                      <td className="px-6 py-4 text-sm text-(--color-text)">
                        {itemA.name}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-(--color-text) text-right">
                        {formatCurrency(itemA.price)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {renderComparisonValue(itemA.price, itemB.price)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
