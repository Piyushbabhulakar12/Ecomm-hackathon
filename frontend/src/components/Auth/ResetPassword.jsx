import { Alert, Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import FormikPasswordField from "../Formik/FormikPasswordField";
import * as Yup from "yup";
import LoadingButton from "../Button/LoadingButton";
import { postData } from "../../services/api";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await postData(`/auth/reset-password`, {
        resetToken: token,
        newPassword: values.newPassword,
      });
      console.log("Response:", response.data);
      setError("");
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
          Reset Your Password
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
                <FormikPasswordField
                  name="newPassword"
                  label="New Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormikPasswordField
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  btnText={"Reset Password"}
                  loadingText={"Resetting Password"}
                  fullWidth
                  size="large"
                />
              </Grid>
              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">Password reset successfully!</Alert>
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
export default ResetPassword;
