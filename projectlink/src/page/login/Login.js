import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Login.css";
import "../styles.css";

export default function Login() {
    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    return (
        <>
            <div className="login-card">
                <div className="login-navbar">
                    <Link to="/" className="nav-link">
                        <img src={logo} alt="Home" style={{ width: '400px', height: '150px' }} />
                    </Link>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="아이디" />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="비밀번호" />
                </div>
                <button className="btn">로그인</button>
                <div className="signup-link">
                    <Link to="/signup">회원이 아니신가요?</Link>
                </div>

            </div>
        </>
    );
}