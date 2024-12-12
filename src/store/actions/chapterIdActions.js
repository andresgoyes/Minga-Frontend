import axios from 'axios';

export const GET_CHAPTERID_SUCCESS = 'GET_CHAPTERID_SUCCESS';
export const GET_CHAPTERID_FAILURE = 'GET_CHAPTERID_FAILURE';

export const getChapterById = (id) => async (dispatch) => {

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`http://localhost:8080/api/chapters/id/${id}`, { headers });
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

