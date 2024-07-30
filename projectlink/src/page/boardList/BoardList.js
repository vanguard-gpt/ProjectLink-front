// src/page/boardList/BoardList.jsx
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import List from '../../components/List';
import './BoardList.css';
import BoardListModule from './BoardListModule';

const BoardList = () => {
    const boardListRef = useRef();
    const [newListTitle, setNewListTitle] = useState('');
    const boardId = 'kjm996';

    const handleCreateList = async () => {
        if (newListTitle.trim()) {
            try {

                // await boardListRef.current.test();

                await boardListRef.current.createListInBoard({ title: newListTitle });
                setNewListTitle(''); // Clear the input field after adding the list
            } catch (error) {
                console.error('Error creating list:', error);
            }
        }
    };

    return (
        <>
            <div className="app">
                <div className="main-layout">
                    <Sidebar />
                    <div className="content">
                        <Navbar />
                        <div className="board">
                        <input type="text"
                                value={newListTitle}
                                onChange={(e) => setNewListTitle(e.target.value)}
                                placeholder="New list title"
                        />
                        <button onClick={handleCreateList}>Add List</button>
                        <BoardListModule ref={boardListRef} boardId={boardId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardList;