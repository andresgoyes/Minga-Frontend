import axios from 'axios';

export const READ_MANGAS_SUCCESS = "READ_MANGAS_SUCCESS";
export const READ_MANGAS_ERROR = "READ_MANGAS_ERROR";
export const READ_MANGASBYID_SUCCESS = "READ_MANGASBYID_SUCCESS";
export const READ_MANGASBYID_ERROR = "READ_MANGASBYID_ERROR";

const apiUrlMangas = "http://localhost:8080/api/mangas/";

export const readMangas = (searchTerm, pageNumber, selectedCategory) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const categoryParam =
      selectedCategory === 'all'
        ? ''
        : selectedCategory;

    const response = await axios.get(
      `${apiUrlMangas}all?page=${pageNumber}&search=${searchTerm}&category_id=${categoryParam}`,
      headers
    );

    dispatch({
      type: READ_MANGAS_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    console.error("Error fetching mangas:", error);
    dispatch({
      type: READ_MANGAS_ERROR,
      payload: error.message,
    });
  }
};

export const readMangasByAuthor = (authorId, pageNumber, searchTerm, selectedCategory) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const categoryParam =
      selectedCategory === 'all'
        ? '' // Enviar vacío si es "all"
        : selectedCategory;

    const response = await axios.get(
      `${apiUrlMangas}all?page=${pageNumber}&search=${searchTerm}&category_id=${categoryParam}&author_id=${authorId}`,
      headers
    );

    dispatch({
      type: READ_MANGAS_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    console.error("Error fetching mangas by author:", error);
    dispatch({
      type: READ_MANGAS_ERROR,
      payload: error.message,
    });
  }
}

export const readMangaById = (mangaId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.get(`${apiUrlMangas}id/${mangaId}`, headers);

    dispatch({
      type: READ_MANGASBYID_SUCCESS,
      payload: response.data.response || {},
    });
  } catch (error) {
    console.error("Error fetching manga by ID:", error);
    dispatch({
      type: READ_MANGASBYID_ERROR,
      payload: error.message,
    });
  }
}