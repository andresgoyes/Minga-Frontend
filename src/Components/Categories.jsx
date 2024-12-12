import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCategories } from "../store/actions/categoriesActions";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(readCategories());
  }, [dispatch]);

  useEffect(() => {
    // Ver el arreglo de categorías en la consola cuando cambia
    console.log("Arreglo de categorías:", categories);
  }, [categories]);

  return (
    <>
      {/* Aquí no hay necesidad de renderizar nada, solo mostrar en consola */}
    </>
  );
};

export default Categories;