import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import logo from "../assets/img/logo.png"
import { Box, Typography, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Dashboard>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh", }}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={logo}
              alt={"logo"}
              sx={{ objectFit: "contain" , height: '100px' , width: '300px' }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5">Welcome to Digitalflake Admin</Typography>
          </Box>
        </Container>
      </Box>
    </Dashboard>
  );
};

export default HomePage;
