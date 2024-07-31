import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardList from './page/boardList/BoardList';
import Home from './page/home/Home';
import Login from './page/login/Login';
import Signup from './page/login/Signup';


const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/boardlist/:boardId" element={<BoardList />} /> 
                {/* URL 파라미터로 boardId 전달예정 */}
                {/* 추가적인 라우트 설정 */}
            </Routes>
    );
};

export default AppRoutes;
