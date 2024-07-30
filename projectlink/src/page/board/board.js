import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import BoardCard from '../../components/boardcard/BoardCard';

const Board = () => {
    const { username } = useParams();
    const [boards, setBoards] = useState([
        {
            id: 0,
            boardName: 'Example Board',
            background: 'default_background',
            backgroundThumbnail: 'default_thumbnail'
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newBoardName, setNewBoardName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBoards();
    }, [username]);

    const fetchBoards = () => {
        axios.get(`http://localhost:8080/api/v1/${username}/boards`)
            .then(response => {
                setBoards(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching boards:', error);
                setError('Failed to fetch boards.');
                setLoading(false);
            });
    };

    const handleCreateBoard = () => {
        const newBoard = {
            boardName: newBoardName,
            background: 'default_background',
            backgroundThumbnail: 'default_thumbnail'
        };

        axios.post(`http://localhost:8080/api/v1/boards`, newBoard)
            .then(response => {
                setNewBoardName('');  
                fetchBoards();  
            })
            .catch(error => {
                console.error('Error creating board:', error);
                alert('Failed to create board.'); 
            });
    };

    const handleHome = () => {
        navigate('/home');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header username={username} />
            <button onClick={handleHome}>홈</button>
            <div className="board-creation">
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="보드 이름"
                />
                <button onClick={handleCreateBoard}>Create New Board</button>
            </div>
            {boards.length === 0 ? (
                <div>No boards available</div>
            ) : (
                <div className="board-list">
                    {boards.map(board => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Board;
