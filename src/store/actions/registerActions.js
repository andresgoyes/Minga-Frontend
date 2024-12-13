import axios from 'axios';
import apiUrl from '../../utils/apiConfig'; // Importa apiUrl

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SET_USER = 'SET_USER';

const handleApiRequest = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}users/register`, formData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al registrar el usuario';
    return { error: errorMessage };
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const result = await handleApiRequest(formData);

  if (result && result.token) {
    const { token, user } = result;
    setAuthToken(token);
    dispatch(setUser({ user, token }));
    return true;
  }

  if (result && result.error) { 
    dispatch({
      type: REGISTER_FAILURE,
      payload: result.error,
    });
  }

  return false;
};

export const setUser = ({ user, token }) => {
  setAuthToken(token);
  return { type: SET_USER, payload: { user, token } };
};

const setAuthToken = (token) => localStorage.setItem('token', token);