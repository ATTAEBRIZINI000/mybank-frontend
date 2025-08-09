import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage?.getItem('token')}`
    }
});



export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

