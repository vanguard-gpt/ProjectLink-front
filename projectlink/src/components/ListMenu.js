// src/components/EllipsisMenu.js
import React, { useState } from 'react';
import './ListMenu.css';

const ListMenu = ({ onRename, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="ellipsis-menu-container">
            <button onClick={toggleMenu} className="ellipsis-button">•••</button>
            {isOpen && (
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={onRename}>이름 수정</button>
                    <button className="dropdown-item" onClick={onDelete}>삭제</button>
                </div>
            )}
        </div>
    );
};

export default ListMenu;
