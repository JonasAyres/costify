import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Globe, Building2, ShieldAlert, HeartPulse, 
  Wind, Car, Activity, ChevronRight, Sun, Moon, MapPin
} from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import InteractiveGlobe from '../Common/InteractiveGlobe';

const GlobalLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, currency, setCurrency } = useGlobalContext();

  const navigation = [
    { name: 'Cost of Living', href: '/cost-of-living', icon: Globe },
    { name: 'Property Prices', href: '/property-investment', icon: Building2 },
    { name: 'Crime', href: '/crime', icon: ShieldAlert },
    { name: 'Health Care', href: '/health-care', icon: HeartPulse },
    { name: 'Pollution', href: '/pollution', icon: Wind },
    { name: 'Traffic', href: '/traffic', icon: Car },
    { name: 'Quality of Life', href: '/quality-of-life', icon: Activity },
  ];

  const isActivePath = (path: string) => location.pathname.startsWith(path);

  // Mocked simple lists for selectors
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

  return (
    <div className="min-h-screen bg-transparent text-(--color-text) overflow-x-hidden selection:bg-(--color-brand-500) selection:text-white transition-colors duration-300 relative">
      <InteractiveGlobe />
      {/* Top Banner for Global Selectors & Theme */}
      <div className="bg-(--color-panel) border-b border-(--color-border) py-1.5 px-4 sm:px-6 lg:px-8 text-sm flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            <MapPin className="w-4 h-4 text-(--color-brand-500) hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-(--color-muted) hidden md:inline">Viewing data for:</span>
              
              <select 
                value={selectedCountry}
                onChange={handleCountryChange}
                className="bg-transparent border border-(--color-border) rounded-md text-(--color-text) py-1 px-2 focus:ring-1 focus:ring-(--color-brand-500) focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-(--color-panel)">Select Country...</option>
                {countries.map(c => <option key={c} value={c} className="bg-(--color-panel)">{c}</option>)}
              </select>
              
              <span className="text-(--color-muted)">/</span>
              
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedCountry}
                className="bg-transparent border border-(--color-border) rounded-md text-(--color-text) py-1 px-2 focus:ring-1 focus:ring-(--color-brand-500) focus:outline-none cursor-pointer font-medium disabled:opacity-50"
              >
                <option value="" className="bg-(--color-panel)">All Cities (National Average)</option>
                {currentCities.map(c => <option key={c} value={c} className="bg-(--color-panel)">{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent border border-(--color-border) rounded-md text-(--color-text) py-1 px-2 focus:ring-1 focus:ring-(--color-brand-500) focus:outline-none cursor-pointer font-medium"
            >
              <option value="USD" className="bg-(--color-panel)">USD ($)</option>
              <option value="EUR" className="bg-(--color-panel)">EUR (€)</option>
              <option value="CAD" className="bg-(--color-panel)">CAD (C$)</option>
              <option value="BRL" className="bg-(--color-panel)">BRL (R$)</option>
              <option value="GBP" className="bg-(--color-panel)">GBP (£)</option>
            </select>

            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-panel-hover) transition-colors flex items-center justify-center border border-transparent hover:border-(--color-border)"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Navbar with Glassmorphism */}
      <header className="sticky top-0 left-0 right-0 z-40 glass-panel border-b border-(--glass-border)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo area */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5eead4] to-[#14b8a6] flex items-center justify-center transform group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                  <Globe className="w-5 h-5 text-[#042f2e]" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl tracking-tight text-(--color-text)">
                  Costify<span className="text-[#2dd4bf]">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(item.href) && item.href !== '/';
                const isHome = item.href === '/' && location.pathname === '/';
                const isActive = active || isHome;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-(--color-brand-400) bg-(--color-panel-hover)' 
                        : 'text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-panel-hover)'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-(--color-brand-400)' : 'text-current'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-(--color-muted) hover:text-(--color-text) focus:outline-none p-2 rounded-md"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed top-[115px] left-0 right-0 z-40 glass-panel border-b border-(--glass-border) shadow-2xl h-[calc(100vh-115px)] overflow-y-auto">
          <div className="px-2 pt-2 pb-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    active 
                      ? 'bg-(--color-panel) text-(--color-brand-400) border border-(--color-border)' 
                      : 'text-(--color-text) hover:bg-(--color-panel-hover)'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${active ? 'bg-(--color-brand-500)/20' : 'bg-(--color-panel)'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {item.name}
                  </div>
                  <ChevronRight className={`w-5 h-5 ${active ? 'text-(--color-brand-400)' : 'text-(--color-muted)'}`} />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="py-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-(--color-border) py-8 bg-(--color-bg)/50 backdrop-blur-md mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-(--color-muted)">
          <p>© 2026 Costify Analytics. Data mimicking Numbeo's architecture for premium visualization concepts.</p>
        </div>
      </footer>
    </div>
  );
};

export default GlobalLayout;
