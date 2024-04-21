import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import CreateCategory from "../components/Category/CreateCategory";
import { CategoryProvider } from "../components/Category/CategoryContext";
import { getData } from "../services/api";
import CreateProduct from "../components/Product/CreateProduct";

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");
  const [productList, setProductList] = useState();

  const fetchData = async () => {
    try {
      const response = await getData(`/products/${id}`);
      setProductList(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  console.log(productList);

  return (
    <CategoryProvider searchQuery={""}>
      <Dashboard>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton onClick={() => navigate("/products")}>
              <ArrowBackIcon />
            </IconButton>

            <Box>
              <Typography sx={{ fontWeight: "600" }} variant="h5">
                {id ? "Edit Products" : "Add Products"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>{productList && <CreateProduct editData={productList} />}</Box>
        <Box>{!id && <CreateProduct />}</Box>
      </Dashboard>
    </CategoryProvider>
  );
};

export default ProductCreatePage;
