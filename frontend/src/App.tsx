import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import './App.css';

import ChoicePage from './pages/ChoicePage';
import NavigationBar from './components/NavigationBar';
import Background from './components/Background';
import SettingPage from './pages/SettingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Background>
          <Routes>
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Background>
      </div>
      <NavigationBar />
    </BrowserRouter>
  );
}

export default App
