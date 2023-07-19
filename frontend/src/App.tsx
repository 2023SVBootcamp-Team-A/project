

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChoicePage from "./pages/ChoicePage";
import NavigationBar from "./components/NavigationBar";
import Background from "./components/Background";
import SettingPage from "./pages/SettingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Bookshelf from "./pages/Bookshelf";
import ResultPage from './pages/ResultPage';

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
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Background>
        <NavigationBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
