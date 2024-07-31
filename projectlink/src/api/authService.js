import axios from 'axios';

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/login', { username, password });
        console.log('Login response:', response); 

        const token = response.data.access_token;

        if (!token) {
            console.error('Token is undefined in response:', response);
            throw new Error('Token is undefined');
        }

        if (token.split('.').length !== 3) {
            throw new Error('Invalid token format');
        }

        localStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        console.error('There was an error logging in!', error);
        throw error;
    }
};

export default login;