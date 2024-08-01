import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BoardList.css';
import BoardListModule from './BoardListModule';
import { boardApi } from '../../api/Api';

const BoardList = () => {
    const boardListRef = useRef();
    const [newListTitle, setNewListTitle] = useState('');
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

    const handleCreateList = async () => {
        if (newListTitle.trim()) {
            try {
                await boardListRef.current.createListInBoard({ title: newListTitle });
                setNewListTitle(''); // 입력 필드 초기화
                boardListRef.current.setIsAddingList(false); // 리스트 추가 후 다시 + 버튼으로 돌아가기
            } catch (error) {
                console.error('Error creating list:', error);
            }
        }
    };

    return (
        <div className="board-list-content">
            <div className='board-list-header'>
                <h1>{board.boardName}</h1>
            </div>
            <BoardListModule
                ref={boardListRef}
                boardId={boardId}
                onCreateList={{ newListTitle, setNewListTitle, handleCreateList }}
            />
        </div>
    );
};

export default BoardList;

