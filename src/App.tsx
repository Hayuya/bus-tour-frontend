// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlansPage from './pages/plans';
import DetailsPage from './pages/details';
import RegistrationPage from './pages/registration';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PlansPage />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/registration/:id" element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
