import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../styles.css";
import "../login/Login.css";

export default function Signup() {
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
                <h2>회원가입</h2>
                <div className="form-group">
                    <input type="text" placeholder="아이디를 입력하세요" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="이름을 입력하세요" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="이메일을 입력하세요" />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="비밀번호를 입력하세요" />
                </div>
                <button className="btn">회원가입</button>
                <div className="signup-link">
                    <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
                </div>

            </div>
        </>
    )

}