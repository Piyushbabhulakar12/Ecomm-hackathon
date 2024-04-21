import { Alert, Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import FormikTextField from "../Formik/FormikTextField";
import * as Yup from "yup";
import FormikPasswordField from "../Formik/FormikPasswordField";
import LoadingButton from "../Button/LoadingButton";
import { postData } from "../../services/api";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginAuth = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .label("Email ID")
      .required("Email is required"),
    password: Yup.string()
      .label("Password")
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      setError('');
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setError(error?.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12}>
                <FormikTextField name="email" label="Email ID" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormikPasswordField
                  name="password"
                  label="Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display:"flex" , justifyContent: 'right' }}>
              <Typography><Link to="/forgetpassword">Forget Password</Link></Typography>
              </Box>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  btnText={"Log in"}
                  loadingText={"Log In"}
                  fullWidth
                  size="large"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Don't have an Account ? <Link to="/signup">Sign Up</Link></Typography>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};
export default LoginAuth;
