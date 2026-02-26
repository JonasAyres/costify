import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface GlobalContextData {
  theme: Theme;
  toggleTheme: () => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (value: number) => string;
}

const GlobalContext = createContext<GlobalContextData | undefined>(undefined);

// Mock Fixed Exchange Rates from USD
const EXCHANGE_RATES: Record<string, number> = {
  'USD': 1.0,
  'EUR': 0.92,
  'CAD': 1.35,
  'BRL': 4.95,
  'GBP': 0.79
};



export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('costify-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    return localStorage.getItem('costify-country') || '';
  });

  const [selectedCity, setSelectedCity] = useState<string>(() => {
    return localStorage.getItem('costify-city') || '';
  });

  const [currency, setCurrency] = useState<string>(() => {
    return localStorage.getItem('costify-currency') || 'USD';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('costify-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('costify-country', selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    localStorage.setItem('costify-city', selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem('costify-currency', currency);
  }, [currency]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const formatCurrency = (value: number) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    
    // Converte valor e formata com 2 casas decimais usando Intl (de modo agnóstico a locale para evitar bugar simulação)
    const converted = value * rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(converted);
  };

  return (
    <GlobalContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        selectedCountry, 
        setSelectedCountry, 
        selectedCity, 
        setSelectedCity,
        currency,
        setCurrency,
        formatCurrency
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
