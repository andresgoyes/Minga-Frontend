import {
  READ_MANGAS_SUCCESS,
  READ_MANGAS_ERROR,
  READ_MANGASBYID_SUCCESS,
  READ_MANGASBYID_ERROR,
} from "../actions/mangasActions";

const initialState = {
  mangas: [],
  mangaDetails: null,
  error: null,
  loading: false,
};

const mangaReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_MANGAS_SUCCESS:
      return {
        ...state,
        mangas: action.payload,
      };
    case READ_MANGASBYID_SUCCESS:
      return {
        ...state,
        mangaDetails: action.payload,
        error: null,
      };
    case READ_MANGASBYID_ERROR:
      return {
        ...state,
        mangaDetails: null,
        error: action.payload,
      };
    case READ_MANGAS_ERROR:
      return {
        ...state,
        mangas: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mangaReducer;