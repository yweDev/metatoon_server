import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import MainPage from "./page/MainPage.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
