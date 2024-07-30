import { useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
                navigate(`/${formState.username}/boards`);
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('로그인 중 오류 발생:', error);
            alert('없는 아이디 또는 비밀번호 입니다. 다시 확인해 주세요.');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card
                placeholders={[
                    { type: "text", text: "아이디", name: "username", onChange: handleInputChange },
                    { type: "password", text: "비밀번호", name: "password", onChange: handleInputChange }
                ]}
                buttonText="로그인"
                linkText="회원이 아니신가요?"
                linkUrl="/signup"
                onChange={handleInputChange}
            />
        </form>
    );
}
