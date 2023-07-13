import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChoicePage from "./pages/ChoicePage";
import NavigationBar from "./components/NavigationBar";
import Background from "./components/Background";
import SettingPage from "./pages/SettingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Bookshelf from "./pages/Bookshelf";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/choice" element={<ChoicePage />} />
        <Route path="/background" element={<Background />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </div>
  );
}

export default App;
