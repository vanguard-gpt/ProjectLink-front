import { useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import '../login/Login.css';

export default function Login() {
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", formState);

        axios.post('http://localhost:8080/api/v1/login', formState, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                alert('로그인 성공');
                navigate(`/${formState.username}/boards`);
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('로그인 중 오류 발생:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        });
    };

    return (
        <div className="login-container">
            <div className="signup-link">
                <Link to="/signup">No Account yet?</Link>
                <li className="nav-item">
                    <Link to="/signup" className="signup-btn">SIGN UP</Link>
                </li>
            </div>
            <form onSubmit={handleSubmit}>
                <Card
                    placeholders={[
                        { type: "text", text: "ID", name: "username", onChange: handleInputChange },
                        { type: "password", text: "PASSWORD", name: "password", onChange: handleInputChange }
                    ]}
                    buttonText="LOGIN"
                />
            </form>
        </div>
    );
}