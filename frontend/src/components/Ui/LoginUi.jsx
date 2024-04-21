import { Box, Card, Grid, Typography } from "@mui/material";
import bg from "../../assets/img/bg_image.png";
import logo from "../../assets/img/logo.png";

const LoginUi = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Box>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "40px",
                paddingTop: "200px",
                paddingLeft: "150px",
                paddingRight: "150px",
              }}
            >
              <Card>
                <Box sx={{ padding: "40px" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={logo}
                      height={100}
                      width={200}
                      alt={"logo"}
                      sx={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      variant="h5"
                      mt={2}
                      sx={{ color: "#717070", textAlign: "center" }}
                    >
                      Welcome to Digitalflake Admin
                    </Typography>
                  </Box>
                  <Box mt={2}>{children}</Box>
                </Box>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginUi;
