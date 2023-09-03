import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import MainPage from "./page/MainPage"
import ImageEditor from "./page/ImageEditor"
import Login from "./page/Login"
import Logout from "./page/Logout"
import Register from "./page/Register"
import UserInfo from "./page/UserInfo"
import WebGL from "./page/WebGL"
import WebtoonMain from "./page/WebtoonMain"
import WebtoonTest from "./page/WebtoonTest"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/user-info" element={<UserInfo/>}></Route>
          <Route path="/production" element={<WebGL/>}></Route>
          <Route path="/imageEditor" element={<ImageEditor/>}></Route>
          <Route path="/viewer" element={<WebtoonTest/>}></Route>
          {/* <Route path="/" element={<MainPage/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
