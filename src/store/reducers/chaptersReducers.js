// src/redux/reducers/chapterReducer.js
const initialState = {
    chapters: [],  // Aquí debe estar el arreglo de capítulos
    count: 0,      // El total de capítulos
    loading: false,
    error: null
  };
  
  const chapterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CHAPTERS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_CHAPTERS_SUCCESS':
        return { 
          ...state, 
          loading: false, 
          chapters: action.payload.chapters, 
          count: action.payload.count 
        };
      case 'FETCH_CHAPTERS_FAILURE':
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      default:
        return state;
    }
  };
  
  export default chapterReducer;  