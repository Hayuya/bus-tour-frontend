// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import PlansPage from './pages/plans';
import DetailsPage from './pages/details';
import RegistrationPage from './pages/registration';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PlansPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/registration/:id" element={<RegistrationPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
