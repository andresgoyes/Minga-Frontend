// src/components/ChapterList.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters } from '../store/actions/chaptersActions';  // Asegúrate de importar la acción

import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CommentIcon from '@mui/icons-material/Comment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ChapterList = () => {
  const { id, newIndex } = useParams();  // Obtener el ID y la página desde la URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { chapters, count, loading, error } = useSelector(state => state.chapters);  // Asegúrate de obtener el estado correctamente

  // Obtener el token desde localStorage
  const token = localStorage.getItem('token');

  // Obtener capítulos de la API usando Redux
  useEffect(() => {
    dispatch(fetchChapters(id, newIndex, token));  // Llamar a la acción cuando el componente se monte
  }, [dispatch, id, newIndex, token]);

  const handleClickPrev = () => {
    if (newIndex > 1) {
      navigate(`/manga-details/${id}/${parseInt(newIndex) - 1}`);  // Cambiar la ruta a manga-details
    }
  };

  const handleClickNext = () => {
    if (chapters.length > 0 && count !== chapters[chapters.length - 1].order) {
      navigate(`/manga-details/${id}/${parseInt(newIndex) + 1}`);  // Cambiar la ruta a manga-details
    }
  };

  return (
    <div className="chapters-list p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        Array.isArray(chapters) && chapters.length > 0 ? (
          chapters.map((chapter) => (
            <div key={chapter._id} className="chapter-component flex items-center justify-between mb-6 max-w-full">
              <img
                src={chapter.cover_photo}
                alt={chapter.title}
                className="w-[83px] h-[73.78px] rounded-lg object-cover object-top"
              />
              <div className="chapter-info flex flex-col justify-between min-h-[82px] w-[200px] mx-[26px] mr-[11px]">
                <p className="text-black font-normal text-[20px] leading-[30px]">{chapter.title}</p>
                <div className="chapter-comments flex items-center gap-[15px]">
                  <CommentIcon sx={{ fontSize: '24px', color: '#000' }} />
                  <p>{Math.floor(Math.random() * 200)}</p>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/chapter/${chapter._id}/1`)}
                variant="contained"
                color="primary"
                sx={{
                  height: '54px',
                  width: 'auto',
                  padding: '0 16px',
                  backgroundColor: '#4436cb',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#5d51f2',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <LibraryBooksIcon sx={{ fontSize: '24px', marginRight: '8px' }} />
                Read
              </Button>
            </div>
          ))
        ) : (
          <div>No chapters available</div>  // Mensaje si no hay capítulos
        )
      )}

      <div className="pagination-buttons-details flex justify-center mt-4 space-x-4">
        <Button
          onClick={handleClickPrev}
          disabled={newIndex <= 1}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '50%',
            padding: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#4436cb',
            '&:hover': {
              backgroundColor: '#5d51f2',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            opacity: newIndex <= 1 ? 0.5 : 1,
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </Button>

        <Button
          onClick={handleClickNext}
          disabled={chapters.length > 0 && count === chapters[chapters.length - 1].order}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '50%',
            padding: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#4436cb',
            '&:hover': {
              backgroundColor: '#5d51f2',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            opacity: chapters.length > 0 && count === chapters[chapters.length - 1].order ? 0.5 : 1,
          }}
        >
          <ArrowForwardIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default ChapterList;