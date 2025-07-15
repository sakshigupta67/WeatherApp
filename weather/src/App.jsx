import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherReportPage from './pages/WeatherReportPage';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/weather' element={<WeatherReportPage />} />
    </Routes>
  </Router>
);

export default App;