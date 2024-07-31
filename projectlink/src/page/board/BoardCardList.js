import React from 'react';
import BoardCard from './boardcard/BoardCard';

const BoardList = ({ boards, onLikeToggle, likedBoards }) => {
    return (
        <div className="board-list">
            {boards.map((board) => (
                <BoardCard
                    key={board.id}
                    board={board}
                    onLikeToggle={onLikeToggle}
                    liked={likedBoards.includes(board.id)}
                />
            ))}
        </div>
    );
};

export default BoardList;
