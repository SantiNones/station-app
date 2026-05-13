import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CafeDetailPage from './pages/CafeDetailPage';
import OwnerPage from './pages/OwnerPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cafe/:cafeId" element={<CafeDetailPage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
