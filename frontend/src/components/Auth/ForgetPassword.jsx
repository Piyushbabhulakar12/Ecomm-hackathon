import { Alert, Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import FormikTextField from "../Formik/FormikTextField";
import * as Yup from "yup";
import FormikPasswordField from "../Formik/FormikPasswordField";
import LoadingButton from "../Button/LoadingButton";
import { postData } from "../../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .label("Email ID")
      .required("Email is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await postData(`/auth/forgot-password`, {
        email: values.email,
      });
      console.log("Response:", response.data);
      setError('');
      setSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      setError(error?.response?.data);
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: "700" }}
          mt={2}
          color="primary"
          align="center"
        >
          Did you forget your password?
        </Typography>
        <Typography variant="body1" mt={2} align="center">
          Enter your email address and we'll send you a link to restore password
        </Typography>
      </Box>
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
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  btnText={"Request reset link"}
                  loadingText={"Requesting reset link"}
                  fullWidth
                  size="large"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  <Link to="/login">Back to Log in</Link>
                </Typography>
              </Grid>
              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">Reset link sent successfully!</Alert>
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
export default ForgetPassword;
