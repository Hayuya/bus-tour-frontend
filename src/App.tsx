import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlansPage from './pages/plans';
import DatePage from './pages/date';
import ItineraryPage from './pages/itinerary';
import ConditionsPage from './pages/conditions';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PlansPage />} />
      <Route path="/plans/:id" element={<DatePage />} />
      <Route path="/itinerary/:id" element={<ItineraryPage />} />
      <Route path="/conditions/:id" element={<ConditionsPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
