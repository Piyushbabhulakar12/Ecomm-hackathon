import React, { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import {
  Box,
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ListCategory from "../components/Category/ListCategory";
import { CategoryProvider } from "../components/Category/CategoryContext";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <CategoryProvider searchQuery={searchValue}>
      <Dashboard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <GridViewIcon />
            <Box>
              <Typography sx={{ fontWeight: "600" }} variant="h5">
                Category
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
              onClick={() => navigate("/category-create")}
              sx={{ borderRadius: "10px" }}
            >
              Add New
            </Button>
          </Box>
        </Box>

        <Box mt={3}>
          <ListCategory />
        </Box>
      </Dashboard>
    </CategoryProvider>
  );
};

export default CategoryPage;
