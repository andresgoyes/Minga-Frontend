import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChapterById } from '../store/actions/chapterIdActions';

import { Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const Chapter = () => {
  let navigate = useNavigate();
  const { id, page } = useParams();
  const dispatch = useDispatch();

  const { chapter, prev, next, loading, error } = useSelector((state) => state.chapterId);

  const [index, setIndex] = useState(parseInt(page) || 0);

  useEffect(() => {
    dispatch(getChapterById(id));
  }, [dispatch, id]);

  const handlePrev = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0 && chapter?.order === 1) {
        navigate(`/manga-details/${chapter.manga_id}/1`);
        return newIndex;
      } else if (newIndex < 0) {
        navigate(`/chapter/${prev}/0`);
        window.location.reload(true);
        return newIndex;
      }
      navigate(`/chapter/${id}/${newIndex}`);
      return newIndex;

    });
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      if (newIndex >= chapter?.pages?.length) {
        navigate(`/manga-details/${chapter.manga_id}/1`);
        return newIndex;
      }
      navigate(`/chapter/${id}/${newIndex}`);
      return newIndex;
    });
  };


  const handlePageSelect = (e) => {
    const selectedPage = parseInt(e.target.value);
    setIndex(selectedPage);
    navigate(`/chapter/${id}/${selectedPage}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pages = chapter?.pages || [];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gradient-to-r from-[#4436cb] to-[#5d51f2] text-white h-[6%] w-full flex justify-center items-center py-2">
        <h4>Cap N° {chapter?.order} - {chapter?.title}</h4>
      </div>

      <motion.div
        className="w-full flex justify-center items-center py-6"
        style={{ height: '80vh' }}
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="object-contain h-[65vh] w-full lg:h-[80vh]"
          src={pages[index]}
          alt=""
        />
      </motion.div>

      {/* Selector de página con Material-UI */}
      <div className="-mt-10 py-6 w-30 absolute bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-4 md:right-16 md:left-auto md:transform-none md:w-auto z-20">
        <FormControl fullWidth>
          <InputLabel>Pages</InputLabel>
          <Select
            value={pages.length > 0 ? index : ""}
            onChange={handlePageSelect}
            label="Selecciona la Página"
            variant="outlined"
            disabled={pages.length === 0} // Deshabilitar si no hay páginas
          >
            {pages.map((_, idx) => (
              <MenuItem key={idx} value={idx}>
                Page {idx + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Botones de navegación */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-between px-4 md:px-20 md:bottom-1/2 md:transform md:translate-y-8">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePrev}
          sx={{
            borderRadius: '50%',
            padding: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#4436cb',
            '&:hover': {
              backgroundColor: '#5d51f2',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleNext}
          sx={{
            borderRadius: '50%',
            padding: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#4436cb',
            '&:hover': {
              backgroundColor: '#5d51f2',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <ArrowForwardIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default Chapter;