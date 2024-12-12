import axios from 'axios';

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
      const response = await axios.get(`http://localhost:8080/api/chapters/byManga/${id}`, {
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