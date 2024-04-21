import React, { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import {
  Box,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ProductsIcon from "@mui/icons-material/ShoppingCart";
import ListProduct from "../components/Product/ListProduct";
import ProductProvider from "../components/Product/ProductContext";

const ProductPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <ProductProvider searchQuery={searchValue}>
      <Dashboard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ProductsIcon />
            <Box>
              <Typography sx={{ fontWeight: "600" }} variant="h5">
                Products
              </Typography>
            </Box>
          </Box>
          <Box>
            <FormControl sx={{ width: "50ch" }} size="small" variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={searchValue}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate("/products-create")}
              sx={{ borderRadius: "10px" }}
            >
              Add New
            </Button>
          </Box>
        </Box>

        <Box mt={3}>
          <ListProduct />
        </Box>
      </Dashboard>
    </ProductProvider>
  );
};

export default ProductPage;
