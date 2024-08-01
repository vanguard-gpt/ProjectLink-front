import React, { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { FiAlignJustify } from 'react-icons/fi';
import './Layout.css';
import logo from '../../assets/logo.png';
import {boardApi} from '../../api/Api'; 

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
                <Link to={`/${username}/boards`} className="logo-img">
                    <img src={logo} alt="Home" />
                </Link>
            </div>
            <div className="profile-container">
                <div onClick={toggleLogout} className="profile-circle">
                    {username.charAt(0).toUpperCase()}
                </div>
                {showLogout && <button onClick={handleLogOut} className="logout-button">LOGOUT</button>}
            </div>
        </header>
    );
};

const Sidebar = ({ isOpen, handleShowLikedBoards, handleShowAllBoards, openModal, isDetail, handleDeleteBoard, navigateToList, boardId }) => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === 'allBoards') {
            handleShowAllBoards();
        } else if (button === 'likedBoards') {
            handleShowLikedBoards();
        } else if (button === 'createBoard') {
            openModal();
        } else if (button === 'deleteBoard') {
            handleDeleteBoard(boardId);
        } else if (button === 'navigateToList') {
            navigateToList();
        }
    };
    

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {isDetail ? (
                <div>

                    <button onClick={() => handleButtonClick('deleteBoard')}>Delete Board</button>
                    <button onClick={() => handleButtonClick('navigateToList')}>List View</button>
                </div>
            ) : (
                <div>
                    <button
                        className={activeButton === 'allBoards' ? 'active' : ''}
                        onClick={() => handleButtonClick('allBoards')}
                    >
                        All Boards
                    </button>
                    <button
                        className={activeButton === 'likedBoards' ? 'active' : ''}
                        onClick={() => handleButtonClick('likedBoards')}
                    >
                        Bookmark List
                    </button>
                    <button
                        className={activeButton === 'createBoard' ? 'active' : ''}
                        onClick={() => handleButtonClick('createBoard')}
                    >
                        Create Board
                    </button>
                </div>
            )}
        </div>
    );
};

const Layout = ({ isDetail = false }) => {
    const { username, boardId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showLikedBoards, setShowLikedBoards] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAllBoards, setShowAllBoards] = useState(true);
    const navigate = useNavigate();

    const handleDeleteBoard = async (boardId) => {
        const confirmDelete = window.confirm('보드를 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                console.log(`Deleting board with id: ${boardId}`);
                const response = await boardApi.deleteBoard(boardId);
                console.log('Board deleted:', response);
                navigate(`/${username}/boards`); 
            } catch (error) {
                console.error('Failed to delete board:', error);
            }
        }
    };

    const navigateToList = () => {
        navigate(`/${username}/boards`);
    };

    return (
        <div className={`layout-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Header 
                username={username} 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
            />
            <Sidebar 
                isOpen={isSidebarOpen} 
                handleShowLikedBoards={() => {
                    setShowLikedBoards(true);
                    setShowAllBoards(false);
                }} 
                handleShowAllBoards={() => {
                    setShowLikedBoards(false);
                    setShowAllBoards(true);
                }} 
                openModal={() => setIsModalOpen(true)} 
                isDetail={isDetail}
                handleDeleteBoard={handleDeleteBoard}
                navigateToList={navigateToList}
                boardId={boardId}
            />
            <div className="layout-content">
                <Outlet context={[showLikedBoards, setShowLikedBoards, isModalOpen, setIsModalOpen, showAllBoards, setShowAllBoards]} />
            </div>
        </div>
    );
};

export default Layout;
