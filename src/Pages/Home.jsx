import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/actions/authActions";
import Hero from "../Components/Hero";
import Carousel from "../Components/Carousel";
import apiUrl from "../utils/apiConfig"; // Importa apiUrl

// Función para validar el token con la API
const loginWithToken = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}users/validateToken`, { // Usa apiUrl aquí
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.response; // Retorna los datos del usuario si el token es válido
  } catch (error) {
    console.log("Error", error);
    // Si la respuesta es 401, significa que el token no es válido
    if (error.message === "Request failed with status code 401") {
      localStorage.removeItem("token"); // Elimina el token del localStorage
      return null; // Retorna null si el token es inválido
    }
  }
};

export default function Home() {
  const dispatch = useDispatch(); // Para despachar acciones
  const navigate = useNavigate(); // Para redirigir al usuario

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token"); // Obtiene el token de la URL (si existe)

    if (token) {
      localStorage.setItem("token", token); // Guarda el token en localStorage
      loginWithToken(token).then((user) => {
        if (user) {
          dispatch(setUser({ user, token })); // Despacha la acción para guardar el usuario en Redux
          navigate("/home"); // Redirige a la página de inicio si el token es válido
        } else {
          navigate("/login"); // Redirige a la página de login si el token es inválido
        }
      });
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Hero /> {/* Componente Hero */}
      <Carousel /> {/* Componente Carousel */}
    </>
  );
}
