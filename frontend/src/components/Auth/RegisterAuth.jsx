import { Alert, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import FormikTextField from "../Formik/FormikTextField";
import * as Yup from "yup";
import FormikPasswordField from "../Formik/FormikPasswordField";
import LoadingButton from "../Button/LoadingButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../services/api";

const RegisterAuth = () => {
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
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
    confirmPassword: Yup.string()
      .label("Confirm Password")
      .required("Please confirm your password")
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await postData(`/auth/register`, {
        email: values.email,
        password: values.password,
      });
      console.log("Response:", response.data);
      setIsRegistered(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000); 
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
                  fullWidth6              
                />
              </Grid>
              <Grid item xs={12}>
                <FormikPasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  btnText={"Register"}
                  loadingText={"Registering"}
                  fullWidth
                  size="large"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Already Have a Account ? <Link to="/login">Log IN</Link></Typography>
              </Grid>
              {isRegistered && (
                <Grid item xs={12}>
                  <Alert severity="success">Registration successful!</Alert>
                </Grid>
              )}
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
export default RegisterAuth;
