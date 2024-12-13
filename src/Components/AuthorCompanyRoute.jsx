import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../utils/apiConfig'; // Importa apiUrl desde el archivo de configuración

const AuthorCompanyRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user, status, token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            if (token && !user) {
                try {
                    // Reemplaza la URL con apiUrl
                    const response = await axios.get(`${apiUrl}users/validateToken`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });                    
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser();
    }, [dispatch, token, user]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (status === 'loading' || !user) {
        return <div>Loading...</div>;
    }

    if (user.role === 0) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AuthorCompanyRoute;