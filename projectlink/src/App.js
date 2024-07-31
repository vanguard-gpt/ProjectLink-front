import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './page/home/Home';
import Login from './page/login/Login';
import Signup from './page/login/Signup';
import Board from './page/board/Board';
import Layout from './components/layout/Layout';
import BoardList from './page/boardList/BoardList'
import BoardDetail from './page/boardDetail/BoardDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:username/boards" element={<Layout />}>
        <Route index element={<Board />} />
      </Route>
      <Route path="/:username/boards/:boardId" element={<Layout isDetail={true} />}>
        <Route index element={<BoardList />} />
      </Route>
      <Route path="/boardlist" element={<BoardList/>} />
   </Routes>
  );
}

export default App;
