import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducer';
import authReducer from './reducers/authReducers';
import authorReducer from './reducers/authorReducers'; // Asegúrate de que el nombre sea correcto
import categoriesReducer from './reducers/categoriesReducers';
import mangasReducer from './reducers/mangasReducers';
import modalReducer from './reducers/modalReducers';
import searchReducer from './reducers/searchReducer';
import chapterIdReducer from './reducers/chapterIdReducers';
import chaptersReducer from './reducers/chaptersReducers';

const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    author: authorReducer,
    categories: categoriesReducer,
    mangas: mangasReducer,
    search: searchReducer,
    chapterId: chapterIdReducer,
    chapters: chaptersReducer,
    modal: modalReducer,  
  },
});

export default store;