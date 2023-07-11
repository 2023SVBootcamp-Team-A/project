import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import './App.css';

import ChoicePage from './pages/ChoicePage';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App
