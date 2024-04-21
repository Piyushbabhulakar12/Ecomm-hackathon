import { Box, Card, Grid, Typography } from "@mui/material";
import bg from "../assets/img/bg_image.png";
import logo from "../assets/img/logo.png";
import LoginAuth from "../components/Auth/LoginAuth";
import LoginUi from "../components/Ui/LoginUi";

const LoginPage = () => {
  return (
    <LoginUi>
      <LoginAuth />
    </LoginUi>
  );
};

export default LoginPage;
