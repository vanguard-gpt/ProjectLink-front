import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import Sidebar from "./Sidebar";
import logo from "../../assets/logo.png";
import "./Layout.css";

export default function Header({ username }) {
    const [showLogout, setShowLogout] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/home');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="board-header">
            <div className="menu">
                <FiAlignJustify size={30} color="white" onClick={toggleSidebar} />
                <Link to="/" className="logo-img">
                    <img src={logo} alt="Home" />
                </Link>
            </div>
            <div onClick={toggleLogout} className="profile-container">
                <div className="profile-circle">
                    {username.charAt(0).toUpperCase()}
                </div>
                {showLogout && <button onClick={handleLogOut} className="logout-button">로그아웃</button>}
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </header>
    );
}