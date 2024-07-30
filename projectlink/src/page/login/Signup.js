import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import axios from "axios";

export default function Signup() {
    const [formState, setFormState] = useState({
        username: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
        setEmailErrorMessage(isValid ? "" : "올바른 이메일 형식을 입력하세요.");
    };

    const validateForm = useCallback(() => {
        const isFormValid = Object.values(formState).every(value => value.trim() !== '');
        setIsButtonDisabled(!isFormValid || !isEmailValid);
    }, [formState, isEmailValid]);

    useEffect(() => {
        validateForm();
    }, [formState, validateForm]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });

        if (name === 'emailAddress') {
            validateEmail(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", formState);

        axios.post('http://localhost:8080/api/v1/register', formState, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log("Response status:", response.status);
            if (response.status === 201) {
                // 회원가입이 성공적으로 완료되면 로그인 시도
                axios.post('http://localhost:8080/api/v1/login', {
                    username: formState.username,
                    password: formState.password
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(loginResponse => {
                    if (loginResponse.status === 200) {
                        alert('회원가입에 성공하셨습니다.');
                        navigate(`/${formState.username}/boards`);
                    } else {
                        alert('로그인에 실패했습니다. 다시 시도해주세요.');
                    }
                })
                .catch(loginError => {
                    console.error('로그인 중 오류 발생:', loginError);
                    alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
                });
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('회원가입 중 오류 발생:', error);
            alert('이미 있는 아이디 또는 이메일 입니다. 다시 시도해주세요.');
        });
    };

    const placeholders = [
        { type: "text", text: "아이디", name: "username", value: formState.username, onChange: handleInputChange },
        { type: "text", text: "이름을 입력하세요", name: "firstName", value: formState.firstName, onChange: handleInputChange },
        { type: "text", text: "성을 입력하세요", name: "lastName", value: formState.lastName, onChange: handleInputChange },
        { type: "email", text: "이메일을 입력하세요", name: "emailAddress", value: formState.emailAddress, onChange: handleInputChange, isValid: isEmailValid, errorMessage: emailErrorMessage },
        { type: "password", text: "비밀번호", name: "password", value: formState.password, onChange: handleInputChange }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Card
                placeholders={placeholders}
                buttonText="회원가입"
                linkText="이미 계정이 있으신가요? 로그인"
                linkUrl="/login"
                isButtonDisabled={isButtonDisabled}
            />
        </form>
    );
}
