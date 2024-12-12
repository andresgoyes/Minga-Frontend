import axios from 'axios';
import { logoutAuthor } from './authorActions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

const handleApiRequest = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signin', formData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
    if (Array.isArray(errorMessage)) {
      return errorMessage.join(', ');
    } else {
      return errorMessage;
    }
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const result = await handleApiRequest(formData);

  if (result.token) {
    dispatch({ type: LOGIN_SUCCESS, payload: result });
    setAuthToken(result.token);
  } else {
    dispatch({ type: LOGIN_FAILURE, payload: result });
  }
};

export const setUser = (userData) => {
  setAuthToken(userData.token);
  return { type: SET_USER, payload: userData };
};

export const logout = () => (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post(
        'http://localhost:8080/api/auth/signout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    removeAuthToken();
    removeUserData();    
    dispatch(logoutAuthor());
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Error durante el logout:', error);
  }
};

const setAuthToken = (token) => localStorage.setItem('token', token);
const removeAuthToken = () => localStorage.removeItem('token');
const removeUserData = () => localStorage.removeItem('userId');