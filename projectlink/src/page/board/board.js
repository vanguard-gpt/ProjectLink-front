import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Board = () => {
    const { username } = useParams();
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/${username}/boards`, {
            headers: {
        
            }
        })
        .then(response => {
            setBoards(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching boards:', error);
            setError('Failed to fetch boards.');
            setLoading(false);
        });
    }, [username]);

    const handleCreateBoard = () => {
        navigate('/create-board');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{username}'s Boards</h1>
            {boards.length === 0 ? (
                <div>
                    <button onClick={handleCreateBoard}>Create New Board</button>
                </div>
            ) : (
                <ul>
                    {boards.map(board => (
                        <li key={board.id}>{board.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Board;
