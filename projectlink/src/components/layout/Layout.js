import React, { useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { FiAlignJustify } from 'react-icons/fi';
import './Layout.css';
import logo from '../../assets/logo.png';

const Header = ({ username, isSidebarOpen, setIsSidebarOpen }) => {
    const [showLogout, setShowLogout] = useState(false);
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
                <a href="/" className="logo-img">
                    <img src={logo} alt="Home" />
                </a>
            </div>
            <div className="profile-container">
                <div onClick={toggleLogout} className="profile-circle">
                    {username.charAt(0).toUpperCase()}
                </div>
                {showLogout && <button onClick={handleLogOut} className="logout-button">로그아웃</button>}
            </div>
        </header>
    );
};

const Sidebar = ({ isOpen, handleShowLikedBoards, handleShowAllBoards, openModal, isDetail }) => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === 'allBoards') {
            handleShowAllBoards();
        } else if (button === 'likedBoards') {
            handleShowLikedBoards();
        } else if (button === 'createBoard') {
            openModal();
        }
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {isDetail ? (
                <div>
                    {/* 디테일 보드 사이드바 내용 */}
                    <button>디테일 보드 내용 1</button>
                    <button>디테일 보드 내용 2</button>
                </div>
            ) : (
                <div>
                    <button
                        className={activeButton === 'allBoards' ? 'active' : ''}
                        onClick={() => handleButtonClick('allBoards')}
                    >
                        모든 보드 보기
                    </button>
                    <button
                        className={activeButton === 'likedBoards' ? 'active' : ''}
                        onClick={() => handleButtonClick('likedBoards')}
                    >
                        북마크한 보드
                    </button>
                    <button
                        className={activeButton === 'createBoard' ? 'active' : ''}
                        onClick={() => handleButtonClick('createBoard')}
                    >
                        보드 생성
                    </button>
                </div>
            )}
        </div>
    );
};

const Layout = ({ isDetail = false }) => {
    const { username } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showLikedBoards, setShowLikedBoards] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`layout-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Header 
                username={username} 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
            />
            <Sidebar 
                isOpen={isSidebarOpen} 
                handleShowLikedBoards={() => setShowLikedBoards(true)} 
                handleShowAllBoards={() => setShowLikedBoards(false)} 
                openModal={() => setIsModalOpen(true)} 
                isDetail={isDetail}
            />
            <div className="layout-content">
                <Outlet context={[showLikedBoards, setShowLikedBoards, isModalOpen, setIsModalOpen]} />
            </div>
        </div>
    );
};

export default Layout;
