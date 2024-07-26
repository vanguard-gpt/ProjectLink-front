import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import logo from "../../assets/logo.png"
import "../styles.css";


export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/home')
            .then(res => {
                console.log(res);
                res && res.data && setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
             <header className="header">
                <nav className="navbar">
                    <ul>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <img src={logo} alt="Home" style={{ width: '400px', height: '150px' }} />
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav-right">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link btn">로그인</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link btn">가입하기</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="banner">
                <h1>Welcome to the Home Page</h1>
                <p>This is the banner section</p>
            </div>

            <div className="container">
                <h2>홈 화면</h2>
                {data ? <p>{data}</p> : <p>Loading...</p>}
            </div>
        </>
    )
}