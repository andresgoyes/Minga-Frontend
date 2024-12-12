import { READ_CATEGORIES_SUCCESS, READ_CATEGORIES_ERROR } from '../actions/categoriesActions';

const initialState = {
  categories: [],
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, error: null };
    case READ_CATEGORIES_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;