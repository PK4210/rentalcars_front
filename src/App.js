import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Vehicles from './components/vehicles/Vehicles';
import Login from './components/Login';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/vehicles" element={<Vehicles />} />
    </Routes>
  </Router>
);

export default App;
