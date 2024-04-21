import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import CreateCategory from "../components/Category/CreateCategory";
import { useCategory } from "../components/Category/CategoryContext";
import { getData } from "../services/api";

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");
  const [categoryList, setCategoryList] = useState();

  const fetchData = async () => {
    try {
      const response = await getData(`/categories/${id}`);
      setCategoryList(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Dashboard>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton onClick={() => navigate("/category")}>
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography sx={{ fontWeight: "600" }} variant="h5">
              {id ? "Edit Category" : "Add Category"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>{categoryList && <CreateCategory editData={categoryList} />}</Box>
      <Box>{!id && <CreateCategory />}</Box>
    </Dashboard>
  );
};

export default CategoryCreatePage;
