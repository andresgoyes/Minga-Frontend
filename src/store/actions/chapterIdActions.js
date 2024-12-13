import axios from 'axios';
import apiUrl from '../../utils/apiConfig'; // Importamos apiUrl

export const GET_CHAPTERID_SUCCESS = 'GET_CHAPTERID_SUCCESS';
export const GET_CHAPTERID_FAILURE = 'GET_CHAPTERID_FAILURE';

export const getChapterById = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // Usamos apiUrl para construir la URL
    const response = await axios.get(`${apiUrl}chapters/id/${id}`, { headers });
    dispatch({
      type: GET_CHAPTERID_SUCCESS,
      payload: response.data.response,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAPTERID_FAILURE,
      payload: error.message,
    });
  }
};