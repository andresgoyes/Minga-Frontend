import axios from 'axios';
import apiUrl from '../../utils/apiConfig'; // Importamos apiUrl

export const fetchChaptersRequest = () => ({
  type: 'FETCH_CHAPTERS_REQUEST',
});

export const fetchChaptersSuccess = (chapters, count) => ({
  type: 'FETCH_CHAPTERS_SUCCESS',
  payload: { chapters, count },
});

export const fetchChaptersFailure = (error) => ({
  type: 'FETCH_CHAPTERS_FAILURE',
  payload: error,
});

export const fetchChapters = (id, newIndex, token) => {
  return async (dispatch) => {
    dispatch(fetchChaptersRequest());
    try {
      // Usamos apiUrl para construir la URL
      const response = await axios.get(`${apiUrl}chapters/byManga/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: newIndex,
        },
      });
      if (response.data.success) {
        dispatch(fetchChaptersSuccess(response.data.response.chapters, response.data.response.count));
      } else {
        dispatch(fetchChaptersFailure(response.data.message));
      }
    } catch (error) {
      dispatch(fetchChaptersFailure(error.message));
    }
  };
};