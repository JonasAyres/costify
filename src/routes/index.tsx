import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from '../components/Layout/GlobalLayout';
import Home from '../pages/Home';
import CostOfLivingIndex from '../pages/CostOfLiving/CostIndex';
import PropertyIndex from '../pages/PropertyPrices/PropertyIndex';
import CrimeIndex from '../pages/Crime/CrimeIndex';
import HealthIndex from '../pages/HealthCare/HealthIndex';
import PollutionIndex from '../pages/Pollution/PollutionIndex';
import TrafficIndex from '../pages/Traffic/TrafficIndex';
import QualityOfLifeIndex from '../pages/QualityOfLife/QualityOfLifeIndex';
import CompareIndex from '../pages/Compare/CompareIndex';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cost-of-living',
        element: <CostOfLivingIndex />,
      },
      {
        path: 'property-investment',
        element: <PropertyIndex />,
      },
      {
        path: 'crime',
        element: <CrimeIndex />,
      },
      {
        path: 'health-care',
        element: <HealthIndex />,
      },
      {
        path: 'pollution',
        element: <PollutionIndex />,
      },
      {
        path: 'traffic',
        element: <TrafficIndex />,
      },
      {
        path: 'quality-of-life',
        element: <QualityOfLifeIndex />,
      },
      {
        path: 'compare',
        element: <CompareIndex />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL
});
