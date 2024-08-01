import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import BoardList from './BoardCardList'; 
import './Board.css';
import CreateBoardModal from '../../components/modal/CreateBoardModal';
import { userApi, boardApi } from '../../api/api';

const Board = () => {
    const { username } = useParams();
    const context = useOutletContext();
    const isModalOpen = context[2];
    const setIsModalOpen = context[3];
    const showLikedBoards = context[0];
    const showAllBoards = context[4];
    const [boards, setBoards] = useState([]);
    const [likedBoards, setLikedBoards] = useState([]);
    const [recentBoards, setRecentBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [newBoardBackground, setNewBoardBackground] = useState('#ffffff');
    const [newBoardImage, setNewBoardImage] = useState('');
    const [selection, setSelection] = useState('color');

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await userApi.getUserBoards(username);
                if (Array.isArray(response.data)) {
                    setBoards(response.data);
                } else {
                    console.error('응답 데이터가 배열 형식이 아닙니다:', response.data);
                }
            } catch (error) {
                console.error('보드 데이터를 불러오는 중 오류 발생:', error);
            }
        };

        const loadLikedBoardsFromStorage = () => {
            const storedLikedBoards = JSON.parse(localStorage.getItem('likedBoards')) || [];
            setLikedBoards(storedLikedBoards);
        };

        const loadRecentBoardsFromStorage = () => {
            const storedRecentBoards = JSON.parse(localStorage.getItem('recentBoards')) || [];
            setRecentBoards(storedRecentBoards);
        };

        fetchBoards();
        loadLikedBoardsFromStorage();
        loadRecentBoardsFromStorage();
    }, [username]);

    useEffect(() => {
        localStorage.setItem('likedBoards', JSON.stringify(likedBoards));
    }, [likedBoards]);

    useEffect(() => {
        localStorage.setItem('recentBoards', JSON.stringify(recentBoards));
    }, [recentBoards]);

    const handleCreateBoard = async () => {
        let background = '';
        let backgroundThumbnail = '';

        if (selection === 'color') {
            background = newBoardBackground;
            backgroundThumbnail = '';
        } else if (selection === 'image') {
            background = '';
            backgroundThumbnail = newBoardImage;
        }

        const newBoard = {
            boardName: newBoardName,
            background: background,
            backgroundThumbnail: backgroundThumbnail
        };

        try {
            const response = await boardApi.createBoard(newBoard);
            setBoards([...boards, response.data]);
            setNewBoardName('');
            setNewBoardBackground('#ffffff');
            setNewBoardImage('');
            setIsModalOpen(false); 
        } catch (error) {
            console.error('보드 생성 중 오류 발생:', error);
        }
    };

    const handleLikeToggle = async (board) => {
        try {
            const order = Date.now();
            await boardApi.viewStateBoard(board.id, username, order);
            const isLiked = likedBoards.includes(board.id);
            if (isLiked) {
                setLikedBoards((prevLikedBoards) => prevLikedBoards.filter((id) => id !== board.id));
            } else {
                setLikedBoards((prevLikedBoards) => [...prevLikedBoards, board.id]);
            }
        } catch (error) {
            console.error('보드 좋아요 중 오류 발생:', error);
        }
    };

    const handleBoardView = async (board) => {
        try {
            const order = Date.now();
            await boardApi.viewStateBoard(board.id, username, order);
            setBoards(prevBoards => {
                const updatedBoards = prevBoards.map(b => {
                    if (b.id === board.id) {
                        return { ...b, recentlyViewedBy: [username], recent_boards_order: order };
                    }
                    return b;
                });
                return updatedBoards;
            });

            const storedRecentBoards = JSON.parse(localStorage.getItem('recentBoards')) || [];
            const recentBoards = storedRecentBoards.filter(b => b.board_id !== board.id || b.user_id !== username);
            recentBoards.push({ board_id: board.id, user_id: username, recent_boards_order: order });
            localStorage.setItem('recentBoards', JSON.stringify(recentBoards));
        } catch (error) {
            console.error('보드 조회 업데이트 중 오류 발생:', error);
        }
    };

    const getRecentBoards = () => {
        return boards
            .filter(board => recentBoards.some(rb => rb.board_id === board.id && rb.user_id === username))
            .sort((a, b) => {
                const aOrder = recentBoards.find(rb => rb.board_id === a.id && rb.user_id === username)?.recent_boards_order || 0;
                const bOrder = recentBoards.find(rb => rb.board_id === b.id && rb.user_id === username)?.recent_boards_order || 0;
                return bOrder - aOrder;
            })
            .slice(0, 5); 
    };

    const getLikedBoards = () => {
        return boards.filter(board => likedBoards.includes(board.id));
    };

    return (
        <div className="board-container">
            <div className="board-content">
            {showAllBoards && !showLikedBoards && (
                    <>
                        <h2>Recent List</h2>
                        <BoardList
                            boards={getRecentBoards()}
                            onLikeToggle={handleLikeToggle}
                            likedBoards={likedBoards}
                            onViewBoard={handleBoardView}
                        />
                    </>
                )}
                {showAllBoards && (
                    <>
                        <h2>All List</h2>
                        <BoardList
                            boards={boards}
                            onLikeToggle={handleLikeToggle}
                            likedBoards={likedBoards}
                            onViewBoard={handleBoardView}
                        />
                    </>
                )}
                {showLikedBoards && (
                    <>
                        <h2>Bookmark List</h2>
                        <BoardList
                            boards={getLikedBoards()}
                            onLikeToggle={handleLikeToggle}
                            likedBoards={likedBoards}
                            onViewBoard={handleBoardView}
                        />
                    </>
                )}
            </div>
            <CreateBoardModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateBoard}
                newBoardName={newBoardName}
                setNewBoardName={setNewBoardName}
                setNewBoardBackground={setNewBoardBackground}
                selection={selection}
                setSelection={setSelection}
                handleImageSelect={setNewBoardImage}
            />
        </div>
    );
};

export default Board;
