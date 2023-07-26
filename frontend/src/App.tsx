import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import ChoicePage from "./pages/ChoicePage";
import NavigationBar from "./components/NavigationBar";
import Background from "./components/Background";
import SettingPage from "./pages/SettingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Bookshelf from "./pages/Bookshelf";
import ResultPage from "./pages/ResultPage";
import SettingPageFirst from "./pages/SettingPageFirst";
import Logout from "./pages/Logout";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Background>
          <Routes>
            <Route path="" element={<MainPage />} />
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/settingfirst" element={<SettingPageFirst />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Background>
      </div>
      <NavigationBar />
    </Provider>
  );
}

export default App;
