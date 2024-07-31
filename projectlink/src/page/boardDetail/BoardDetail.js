import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { boardApi } from '../../api/Api';

const BoardDetail = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await boardApi.getBoardById(boardId);
                setBoard(response.data);
            } catch (error) {
                console.error('보드 데이터를 불러오는 중 오류 발생:', error);
            }
        };

        fetchBoard();
    }, [boardId]);

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className="board-detail-container">
            <h1>{board.boardName}</h1>
            <button>삭제하기</button>
        </div>
    );
};

export default BoardDetail;
