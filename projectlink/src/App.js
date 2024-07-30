import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Login from './page/login/Login';
import Signup from './page/login/Signup';
import BoardList from './page/boardList/BoardList'

function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/boardlist" element={<BoardList/>} />
   </Routes>
   </>
  );
}

export default App;