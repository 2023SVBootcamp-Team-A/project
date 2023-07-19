import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import ChoicePage from './pages/ChoicePage';
import ResultPage from './pages/ResultPage';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/choice" element={<ChoicePage />} />
          <Route path='/result' element={<ResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
