import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScoreProvider } from './context/ScoreContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home/Home';
import GamePage from './pages/GamePage/GamePage';
import './App.css';

function App() {
  return (
    <Router>
      <ScoreProvider>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:gameId" element={<GamePage />} />
            </Routes>
          </main>
        </div>
      </ScoreProvider>
    </Router>
  );
}

export default App;
