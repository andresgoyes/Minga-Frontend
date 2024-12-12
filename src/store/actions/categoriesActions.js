import axios from 'axios';

export const READ_CATEGORIES_SUCCESS = "READ_CATEGORIES_SUCCESS";
export const READ_CATEGORIES_ERROR = "READ_CATEGORIES_ERROR";

const apiUrlCategories = "http://localhost:8080/api/categories/all";

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