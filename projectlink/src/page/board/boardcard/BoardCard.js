import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BoardCard.css';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";

const BoardCard = ({ board, onLikeToggle, liked, onViewBoard }) => {
    const navigate = useNavigate();
    const { username } = useParams();

    const handleCardClick = async () => {
        try {
            await onViewBoard(board);
            navigate(`/${username}/boards/${board.id}`);
        } catch (error) {
            console.error('Error viewing board:', error);
        }
    };

    const handleLikeClick = (e) => {
        e.stopPropagation();
        onLikeToggle(board);
    };

    return (
        <div className="board-card" onClick={handleCardClick}>
            <h3>{board.boardName}</h3>
            {board.backgroundThumbnail ? (
                <div className="board-background" style={{ backgroundImage: `url(${board.backgroundThumbnail})` }}>
                    <img src={board.backgroundThumbnail} alt="Background" className="board-background-image" />
                </div>
            ) : (
                <div className="board-background" style={{ backgroundColor: board.background }}></div>
            )}
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                {liked ? <IoMdStar /> : <IoIosStarOutline />}
            </button>
        </div>
    );
};

export default BoardCard;

