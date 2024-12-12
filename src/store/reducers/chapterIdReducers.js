import { GET_CHAPTERID_SUCCESS, GET_CHAPTERID_FAILURE } from '../actions/chapterIdActions';

const initialState = {
  chapter: null,
  prev: '',
  next: '',
  loading: false,
  error: null,
};

const chapterIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAPTERID_SUCCESS:
      return {
        ...state,
        chapter: action.payload.chapter,
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false,
      };
    case GET_CHAPTERID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chapterIdReducer;