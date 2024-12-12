import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { readMangaById } from "../store/actions/mangasActions"; 

import reaction1 from "../assets/manitoArriba.png"; 
import reaction2 from "../assets/manitoAbajo.png"; 
import reaction3 from "../assets/caraSorprendida.png"; 
import reaction4 from "../assets/caraEnamorada.png"; 
import ChapterList from "../Components/ChapterList";

const MangaDetails = () => {
  const [activeTab, setActiveTab] = useState("manga");
  const { id, newIndex } = useParams();
  const dispatch = useDispatch();

  const { mangaDetails, loading, error } = useSelector((state) => state.mangas);

  useEffect(() => {
    if (id) {
      dispatch(readMangaById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!mangaDetails || !mangaDetails.cover_photo) {
    return <div className="text-center mt-10 text-red-500"></div>;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Imagen como fondo en pantallas móviles */}
      <div
        className="absolute inset-0 bg-cover lg:h-[60vh] lg:w-[100vw] object-top lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:block hidden"
        style={{
          backgroundImage: `url(${mangaDetails.cover_photo})`,
          backgroundPosition: 'center 70%',
        }}
      ></div>

      <div className="w-full bg-white/90 rounded-3xl overflow-hidden flex flex-col relative z-10 lg:absolute lg:bottom-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:w-[50%] backdrop-blur shadow-xl p-4">
        {/* Imagen en pantallas móviles */}
        <div className="relative lg:hidden h-1/2 w-full">
          <img src={mangaDetails.cover_photo} alt="Manga Cover" className="w-full h-full object-cover" />
        </div>

        {activeTab === "manga" && (
          <div className="p-10 flex-1 overflow-auto">
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{mangaDetails.title}</h3>

            <div className="flex justify-between items-center">
              <button className="px-4 py-1 bg-[#FFE0DF] text-[#EF8481] rounded-full text-sm">
                {mangaDetails.category_id?.name || "No category available"}
              </button>
              <p className="text-md text-gray-500 py-2">By: {mangaDetails.author_id?.name || "No category available"}</p>
            </div>

            {/* Reacciones */}
            <div className="flex justify-evenly items-center py-4">
              <button className="flex flex-col items-center justify-center text-yellow-500">
                <img src={reaction1} alt="Like" className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12" />
              </button>
              <button className="flex flex-col items-center justify-center text-red-500">
                <img src={reaction2} alt="Dislike" className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12" />
              </button>
              <button className="flex flex-col items-center justify-center text-yellow-500">
                <img src={reaction3} alt="Surprised" className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12" />
              </button>
              <button className="flex flex-col items-center justify-center text-pink-500">
                <img src={reaction4} alt="Love" className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12" />
              </button>
            </div>

            {/* Sección de información */}
            <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
              <div className="text-center border-r-2 w-1/3">
                <p className="font-semibold">4.5/5</p>
                <p className="text-gray-500 text-sm">Rating</p>
              </div>
              <div className="text-center border-r-2 w-1/3">
                <p className="font-semibold">265</p>
                <p className="text-gray-500 text-sm">Chapters</p>
              </div>
              <div className="text-center w-1/3">
                <p className="font-semibold">Eng</p>
                <p className="text-gray-500 text-sm">Language</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "chapters" && (
          <div className="p-4 flex-1 overflow-auto">
            <div className="mb-8 flex items-center justify-center">
              <h2 className="font-bold text-2xl">Chapters</h2>
            </div>            
            <ChapterList id={id} newIndex={newIndex} />
          </div>
        )}

        {/* Navegación */}
        <div className="flex items-center justify-center">
          <div className="flex justify-between items-center border-t border-gray-200 shadow-sm rounded-full w-[98%]">
            <button
              className={`rounded-full w-1/2 font-medium py-2 ${activeTab === "manga" ? "bg-gradient-to-r from-[#4338CA] to-[#5E52F3] text-white" : "hover:bg-gray-200"}`}
              onClick={() => setActiveTab("manga")}
            >
              Manga
            </button>

            <button
              className={`rounded-full w-1/2 font-medium py-2 ${activeTab === "chapters" ? "bg-gradient-to-r from-[#4338CA] to-[#5E52F3] text-white" : "hover:bg-gray-200"}`}
              onClick={() => setActiveTab("chapters")}
            >
              Chapters
            </button>
          </div>
        </div>

        {activeTab === "manga" && (
          <p className="p-3 font-light text-sm text-gray-600 whitespace-normal break-words">
            {mangaDetails.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MangaDetails;