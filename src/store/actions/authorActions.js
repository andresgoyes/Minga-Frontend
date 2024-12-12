import axios from "axios";

export const createAuthorRequest = () => ({ type: 'CREATE_AUTHOR_REQUEST' });
export const createAuthorSuccess = (author) => ({ type: 'CREATE_AUTHOR_SUCCESS', payload: author });
export const createAuthorFailure = (error) => ({ type: 'CREATE_AUTHOR_FAILURE', payload: error });
export const logoutAuthor = () => ({ type: 'LOGOUT_AUTHOR' });

export const createAuthor = (authorData) => {
  return async (dispatch) => {
    dispatch(createAuthorRequest());

    try {
      const response = await axios.post('http://localhost:8080/api/authors/create', authorData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch(createAuthorSuccess(response.data));
    } catch (error) {
      dispatch(createAuthorFailure(error.response?.data?.message || 'Something went wrong'));
    }
  };
};