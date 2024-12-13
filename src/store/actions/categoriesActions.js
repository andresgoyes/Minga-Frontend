import axios from 'axios';
import apiUrl from '../../utils/apiConfig'; // Importamos apiUrl

export const READ_CATEGORIES_SUCCESS = "READ_CATEGORIES_SUCCESS";
export const READ_CATEGORIES_ERROR = "READ_CATEGORIES_ERROR";

// Construimos la URL usando apiUrl
const apiUrlCategories = `${apiUrl}categories/all`;

export const readCategories = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const response = await axios.get(apiUrlCategories, headers);

    dispatch({
      type: READ_CATEGORIES_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch({
      type: READ_CATEGORIES_ERROR,
      payload: error.message,
    });
  }
};