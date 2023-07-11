import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import ChoicePage from './pages/ChoicePage';
import NavigationBar from './components/NavigationBar';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
      <NavigationBar />
    </BrowserRouter>
  );
}

export default App
