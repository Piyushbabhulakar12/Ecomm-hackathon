import { useEffect, useState } from "react";
import { Grid, MenuItem, Alert, Button, Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { getData, postData, putData } from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormikTextField from "../Formik/FormikTextField";
import FormikSelectField from "../Formik/FormikSelectField";
import LoadingButton from "../Button/LoadingButton";
import { useCategory } from "./CategoryContext";

const CreateCategory = ({ editData }) => {
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    category_name: editData ? editData?.category_name : "",
    description: editData ? editData?.description : "",
    status: editData ? editData?.status : "",
  };

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required("Category name is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.boolean().required("Status is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (editData) {
        putData(`/categories/${editData._id}`, values);
      } else {
        await postData(`/categories`, values);
      }
      setIsRegistered(true);
      setError("");
      setTimeout(() => {
        navigate("/category");
      }, 2000);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      setError(error?.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  const status = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={4}>
              <FormikTextField
                name="category_name"
                label="Category Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormikTextField
                name="description"
                label="Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormikSelectField name="status" label="Status" fullWidth>
                {status.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </FormikSelectField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ height: "66vh" }}>
                {isRegistered && (
                  <Grid item xs={12}>
                    <Alert severity="success">
                      Category created successfully!
                    </Alert>
                  </Grid>
                )}
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "50px", px: "50px" }}
                  onClick={() => navigate("/category")}
                >
                  Cancel
                </Button>

                <LoadingButton
                  sx={{ borderRadius: "50px", px: "60px" }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  btnText="Save"
                  loadingText="Saving"
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateCategory;
