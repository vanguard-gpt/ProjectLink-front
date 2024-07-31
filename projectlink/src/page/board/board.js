import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import BoardList from './BoardCardList';
import './Board.css';
import CreateBoardModal from '../../components/modal/CreateBoardModal';
import { userApi, boardApi } from '../../api/Api';

const Board = () => {
    const { username } = useParams();
    const context = useOutletContext();
    const showLikedBoards = context[0];
    const setShowLikedBoards = context[1];
    const isModalOpen = context[2];
    const setIsModalOpen = context[3];
    const [boards, setBoards] = useState([]);
    const [likedBoards, setLikedBoards] = useState([]);
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

        fetchBoards();
        loadLikedBoardsFromStorage();
    }, [username]);

    useEffect(() => {
        localStorage.setItem('likedBoards', JSON.stringify(likedBoards));
    }, [likedBoards]);

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
            const isLiked = likedBoards.includes(board.id);
            if (isLiked) {
                await boardApi.bookmarkBoard(board.id, username);
                setLikedBoards((prevLikedBoards) => prevLikedBoards.filter((id) => id !== board.id));
            } else {
                await boardApi.bookmarkBoard(board.id, username); 
                setLikedBoards((prevLikedBoards) => [...prevLikedBoards, board.id]);
            }
        } catch (error) {
            console.error('보드 좋아요 중 오류 발생:', error);
        }
    };


    const boardsToShow = showLikedBoards ? boards.filter(board => likedBoards.includes(board.id)) : boards;

    return (
        <div className="board-container">
            <div className="board-content">
                <BoardList
                    boards={boardsToShow}
                    onLikeToggle={handleLikeToggle}
                    likedBoards={likedBoards}
                />
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
