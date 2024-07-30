import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardCard.css';

const BoardCard = ({ board }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/boards/${board.id}`);
    };

    return (
        <div className="board-card" onClick={handleCardClick}>
            <h3>{board.boardName}</h3>
            <div className="board-background" style={{ backgroundImage: `url(${board.backgroundThumbnail})` }}></div>
        </div>
    );
};

export default BoardCard;