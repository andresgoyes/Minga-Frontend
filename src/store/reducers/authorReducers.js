const initialState = {
  loading: false,
  error: null,
  authors: [],
};

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_AUTHOR_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_AUTHOR_SUCCESS':
      return { ...state, loading: false, authors: [...state.authors, action.payload] };
    case 'CREATE_AUTHOR_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT_AUTHOR':      
      return { ...initialState };
    default:
      return state;
  }
};

export default authorReducer;