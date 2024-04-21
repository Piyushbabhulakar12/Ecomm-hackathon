import React, { createContext, useContext, useState, useEffect } from "react";
import { postData, getData, deleteData } from "../../services/api";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children, searchQuery }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await getData(`/products?search=${searchQuery}`);
      setProductList(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteData(`/products/${productId}`);
      setProductList((prevProductList) =>
        prevProductList.filter((product) => product.id !== productId)
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ productList, handleDelete }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
