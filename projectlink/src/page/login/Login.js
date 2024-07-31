import { useState } from "react";
import Card from "../../components/LoginForm";
import { useNavigate } from 'react-router-dom';
import login from '../../api/authService'; 

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

        login(formState.username, formState.password)
            .then(() => {
                alert('로그인 성공');
                navigate(`/${formState.username}/boards`);
            })
            .catch(error => {
                console.error('로그인 중 오류 발생:', error);
                alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
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