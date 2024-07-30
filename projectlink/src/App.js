import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Login from './page/login/Login';
import Signup from './page/login/Signup';
import Board from './page/board/Board';

function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:username/boards" element={<Board />} />
   </Routes>
   </>
  );
}

export default App;