// src/data/mockData.ts

export interface CostItem {
  name: string;
  price: number;
  min: number;
  max: number;
  category: 'Restaurants' | 'Markets' | 'Transportation' | 'Utilities' | 'Rent' | 'Buy Apartment' | 'Salaries';
}

export interface CityData {
  cityName: string;
  country: string;
  currency: string;
  lastUpdate: string;
  contributors: number;
  indices: {
    costOfLiving: number;
    rent: number;
    costOfLivingPlusRent: number;
    groceries: number;
    restaurantPrice: number;
    localPurchasingPower: number;
  };
  propertyIndices?: {
    priceToIncomeRatio: number;
    grossRentalYieldCityCentre: number;
    grossRentalYieldOutsideCentre: number;
    priceToRentRatioCityCentre: number;
    priceToRentRatioOutsideCentre: number;
    mortgageAsPercentageOfIncome: number;
    affordabilityIndex: number;
  };
  crimeIndices?: {
    crimeIndex: number;
    safetyIndex: number;
    levelOfCrime: number;
    crimeIncreasing: number;
    safeWalkingDaylight: number;
    safeWalkingNight: number;
    worriesBeingMugged: number;
    problemDrugs: number;
    problemViolentCrimes: number;
  };
  healthCareIndices?: {
    healthCareIndex: number;
    healthCareExpIndex: number;
    skillAndCompetency: number;
    speedOfExamination: number;
    equipmentForModernDiagnosis: number;
    accuracyAndCompleteness: number;
    friendlinessAndCourtesy: number;
    responsivenessWaitings: number;
    costSatisfaction: number;
  };
  pollutionIndices?: {
    pollutionIndex: number;
    expPollutionIndex: number;
    airQuality: number;
    drinkingWaterQuality: number;
    waterPollution: number;
    noiseAndLightPollution: number;
    greenAndParks: number;
    garbageDisposal: number;
  };
  trafficIndices?: {
    trafficIndex: number;
    timeIndex: number; // in avg minutes
    co2EmissionIndex: number;
    inefficienciesIndex: number;
  };
  qualityOfLifeIndices?: {
    qualityOfLifeIndex: number;
    purchasingPowerIndex: number;
    safetyIndex: number;
    healthCareIndex: number;
    climateIndex: number;
    costOfLivingIndex: number;
    propertyPriceToIncomeRatio: number;
    trafficCommuteTimeIndex: number;
    pollutionIndex: number;
  };
  summary: {
    familyOfFour: number;
    singlePerson: number;
    description: string;
  };
  items: CostItem[];
}

// Mocking Toronto, Canada
export const mockTorontoData: CityData = {
  cityName: 'Toronto',
  country: 'Canada',
  currency: 'C$',
  lastUpdate: 'October 2026',
  contributors: 1450,
  indices: {
    costOfLiving: 71.2,
    rent: 65.4,
    costOfLivingPlusRent: 68.4,
    groceries: 70.1,
    restaurantPrice: 65.2,
    localPurchasingPower: 88.5,
  },
  propertyIndices: {
    priceToIncomeRatio: 12.4, // Years of income needed to buy an apartment
    grossRentalYieldCityCentre: 4.8, // Percentage
    grossRentalYieldOutsideCentre: 5.2, // Percentage
    priceToRentRatioCityCentre: 20.8, // Years of rent to buy
    priceToRentRatioOutsideCentre: 19.2, // Years of rent to buy
    mortgageAsPercentageOfIncome: 85.5, // Percent
    affordabilityIndex: 1.16, // Index
  },
  crimeIndices: {
    crimeIndex: 43.2,
    safetyIndex: 56.8,
    levelOfCrime: 45.1,
    crimeIncreasing: 62.4,
    safeWalkingDaylight: 74.5,
    safeWalkingNight: 48.2,
    worriesBeingMugged: 38.6,
    problemDrugs: 55.3,
    problemViolentCrimes: 35.8,
  },
  healthCareIndices: {
    healthCareIndex: 75.3,
    healthCareExpIndex: 82.1,
    skillAndCompetency: 78.4,
    speedOfExamination: 62.5,
    equipmentForModernDiagnosis: 85.2,
    accuracyAndCompleteness: 74.8,
    friendlinessAndCourtesy: 71.5,
    responsivenessWaitings: 54.3,
    costSatisfaction: 68.9,
  },
  pollutionIndices: {
    pollutionIndex: 37.8,
    expPollutionIndex: 58.4,
    airQuality: 68.2,
    drinkingWaterQuality: 71.5,
    waterPollution: 33.4,
    noiseAndLightPollution: 48.2,
    greenAndParks: 75.6,
    garbageDisposal: 80.1,
  },
  trafficIndices: {
    trafficIndex: 185.3,
    timeIndex: 42.5,
    co2EmissionIndex: 7850.5,
    inefficienciesIndex: 215.4,
  },
  qualityOfLifeIndices: {
    qualityOfLifeIndex: 168.2,
    purchasingPowerIndex: 88.5,
    safetyIndex: 56.8,
    healthCareIndex: 75.3,
    climateIndex: 68.4,
    costOfLivingIndex: 71.2,
    propertyPriceToIncomeRatio: 12.4,
    trafficCommuteTimeIndex: 42.5,
    pollutionIndex: 37.8,
  },
  summary: {
    familyOfFour: 5800.50,
    singlePerson: 1600.25,
    description: 'Estimated monthly costs are 1,600.25 C$ for a single person without rent. Toronto is 28.8% less expensive than New York (without rent). Rent in Toronto is, on average, 34.6% lower than in New York.',
  },
  items: [
    { name: 'Meal, Inexpensive Restaurant', price: 25.0, min: 20.0, max: 35.0, category: 'Restaurants' },
    { name: 'Meal for 2 People, Mid-range', price: 100.0, min: 80.0, max: 150.0, category: 'Restaurants' },
    { name: 'McMeal at McDonalds', price: 14.0, min: 12.0, max: 16.0, category: 'Restaurants' },
    { name: 'Milk (regular), (1 liter)', price: 4.10, min: 3.50, max: 5.00, category: 'Markets' },
    { name: 'Loaf of Fresh White Bread', price: 3.50, min: 2.50, max: 5.00, category: 'Markets' },
    { name: 'Rice (white), (1kg)', price: 4.50, min: 3.00, max: 6.00, category: 'Markets' },
    { name: 'Eggs (regular) (12)', price: 4.50, min: 3.50, max: 6.00, category: 'Markets' },
    { name: 'Chicken Fillets (1kg)', price: 16.00, min: 12.00, max: 22.00, category: 'Markets' },
    { name: 'One-way Ticket (Local Transport)', price: 3.35, min: 3.30, max: 3.50, category: 'Transportation' },
    { name: 'Monthly Pass (Regular Price)', price: 156.00, min: 150.00, max: 160.00, category: 'Transportation' },
    { name: 'Taxi Start (Normal Tariff)', price: 4.25, min: 4.00, max: 5.00, category: 'Transportation' },
    { name: 'Basic (Electricity, Heating, Cooling, Water) for 85m2', price: 190.00, min: 120.00, max: 300.00, category: 'Utilities' },
    { name: 'Internet (60 Mbps or More)', price: 75.00, min: 50.00, max: 110.00, category: 'Utilities' },
    { name: 'Apartment (1 bedroom) in City Centre', price: 2500.00, min: 2000.00, max: 3000.00, category: 'Rent' },
    { name: 'Apartment (1 bedroom) Outside of Centre', price: 2000.00, min: 1800.00, max: 2400.00, category: 'Rent' },
    { name: 'Apartment (3 bedrooms) in City Centre', price: 4200.00, min: 3500.00, max: 5500.00, category: 'Rent' },
    { name: 'Price per Square Meter to Buy Apartment in City Centre', price: 13500.00, min: 10000.00, max: 18000.00, category: 'Buy Apartment' },
    { name: 'Average Monthly Net Salary (After Tax)', price: 4200.00, min: 3000.00, max: 6000.00, category: 'Salaries' },
  ]
};

// Function to group items by category
export const getItemsByCategory = (items: CostItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CostItem[]>);
};
