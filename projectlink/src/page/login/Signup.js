import { useState, useEffect, useCallback } from "react";
import Card from "../../components/LoginForm";
import { userApi } from "../../api/Api"; 
import { Link } from 'react-router-dom';

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

        userApi.registerUser(formState) // 수정된 부분
            .then(response => {
                console.log("Response status:", response.status);
                if (response.status === 201) {
                    // 회원가입이 성공적으로 완료되면 로그인 시도
                    userApi.login({
                        username: formState.username,
                        password: formState.password
                    })
                    .then(loginResponse => {
                        if (loginResponse.status === 200) {
                            // 로그인 성공 시 보드 페이지로 리디렉션
                            alert('회원가입 및 로그인 성공');
                            window.location.href = `/${formState.username}/boards`;
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
                alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            });
    };

    const placeholders = [
        { type: "text", text: "ID", name: "username", value: formState.username, onChange: handleInputChange },
        { type: "text", text: "FIRST NAME", name: "firstName", value: formState.firstName, onChange: handleInputChange },
        { type: "text", text: "LAST NAME", name: "lastName", value: formState.lastName, onChange: handleInputChange },
        { type: "email", text: "EMAIL ADDRESS", name: "emailAddress", value: formState.emailAddress, onChange: handleInputChange, isValid: isEmailValid, errorMessage: emailErrorMessage },
        { type: "password", text: "PASSWORD", name: "password", value: formState.password, onChange: handleInputChange }
    ];

    return (
        <div className="login-container">
            <div className="signup-link">
                <Link to="/login">Already a Member?</Link>
                <li className="nav-item">
                    <Link to="/login" className="signup-btn">LOGIN</Link>
                </li>
            </div>
            <form onSubmit={handleSubmit}>
                <Card
                    placeholders={placeholders}
                    buttonText="SIGN UP"
                />
            </form>
        </div>
    );
}
