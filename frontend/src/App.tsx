import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import './App.css';

import ChoicePage from './pages/ChoicePage';
import NavigationBar from './components/NavigationBar';
import Background from './components/Background';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/background" element={<Background />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App
