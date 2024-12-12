import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/actions/authActions";
import Hero from "../Components/Hero";
import Carousel from "../Components/Carousel";

const loginWithToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/validateToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.response;
  } catch (error) {
    console.log("Error", error);
    if (error.message === "Request failed with status code 401") {
      localStorage.removeItem("token");
      return null;
    }
  }
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      loginWithToken(token).then((user) => {
        if (user) {
          dispatch(setUser({ user, token }));
          navigate("/home");
        } else {
          navigate("/login");
        }
      });
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Hero />
      <Carousel />
    </>
  );
}