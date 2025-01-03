import React, { useState } from "react";
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"

const slidesData = [
  {
    id: 1,
    personaje: hero1,
    comic: hero2,
    titulo: "Shonen",
    descripcion:
      "Is the manga that is aimed at adolescent boys. They are series with large amounts of action, in which humorous situations often occur. The camaraderie between members of a collective or a combat team stands out.",
  },
  {
    id: 2,
    personaje: "https://static.wikia.nocookie.net/bokunoheroacademia/images/a/a4/Eijiro_MHUR_Icon.png",
    comic: "https://media.themoviedb.org/t/p/w220_and_h330_face/9LjBVBcRM0VW2yywXu5p6bqX965.jpg",
    titulo: "Naruto",
    descripcion:
      "A young ninja dreams of becoming the strongest Hokage while dealing with challenges, friendships, and battles.",
  },
  {
    id: 3,
    personaje: "https://static.wikia.nocookie.net/bokunoheroacademia/images/f/fd/Tomura_MHUR_Icon.png",
    comic: "https://playmax.xyz/img/c/400/454/1730387486/226902.jpg",
    titulo: "Dragon Ball",
    descripcion:
      "Join Goku on his adventures to find the Dragon Balls, battle strong opponents, and save the universe.",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length
    );
  };

  return (
    <div className="hidden lg:block relative my-11 bg-gradient-to-r from-[#4436cb] to-[#5d51f2] rounded-md container mx-auto py-8 shadow-xl lg:h-[32vh] h-[32vh]">
      {/* Botón anterior */}
      <button
        onClick={goToPreviousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#ffffffa6] text-black rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
  
      {/* Contenido de la diapositiva actual */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:h-[19vh]">
        {/* Imagen del personaje */}
        <div className="w-full flex items-center justify-center mb-4 lg:mb-0">
          <img
            src={slidesData[currentSlide].personaje}
            alt={`Personaje ${slidesData[currentSlide].titulo}`}
            className="w-auto h-auto object-contain"
          />
        </div>
  
        {/* Imagen del cómic */}
        <div className="w-full flex items-center justify-center mb-4 lg:mb-0 lg:-translate-y-3">
          <img
            src={slidesData[currentSlide].comic}
            alt={`Cómic ${slidesData[currentSlide].titulo}`}
            className="w-auto h-[30vh] object-fit"
          />
        </div>
  
        {/* Texto de la diapositiva */}
        <div className="w-full translate-y-[40px] lg:translate-y-5 lg:-translate-x-10">
          <div className="text-white px-6 sm:px-12">
            <h3 className="text-2xl font-bold mb-4">{slidesData[currentSlide].titulo}</h3>
            <p className="text-sm leading-relaxed">{slidesData[currentSlide].descripcion}</p>
          </div>
        </div>
      </div>
  
      {/* Botón siguiente */}
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#ffffffa6] text-black rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
  

};

export default Carousel;