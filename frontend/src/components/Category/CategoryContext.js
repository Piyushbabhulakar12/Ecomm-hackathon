import React, { createContext, useContext, useState, useEffect } from "react";
import { postData, getData, deleteData } from "../../services/api";

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children, searchQuery }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await getData(`/categories?search=${searchQuery}`);
      setCategoryList(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteData(`/categories/${categoryId}`);
      setCategoryList((prevCategoryList) =>
        prevCategoryList.filter((category) => category.id !== categoryId)
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categoryList, handleDelete }}>
      {children}
    </CategoryContext.Provider>
  );
};
