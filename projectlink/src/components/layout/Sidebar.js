import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

export default function Sidebar({ isOpen }) {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}