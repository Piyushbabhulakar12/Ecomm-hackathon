import { useEffect, useState } from "react";
import { Grid, MenuItem, Alert, Button, Box, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { getData, postData, putData } from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormikTextField from "../Formik/FormikTextField";
import FormikSelectField from "../Formik/FormikSelectField";
import LoadingButton from "../Button/LoadingButton";
import { useCategory } from "../Category/CategoryContext";
import FormikImageUpload from "../Formik/FormikImageUpload";

const CreateProduct = ({ editData }) => {
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const { categoryList } = useCategory();

  const initialValues = {
    category: editData ? editData?.category?._id : "",
    product_name: editData ? editData?.product_name : "",
    pack_size: editData ? editData?.pack_size : "",
    mrp: editData ? editData?.mrp : "",
    product_image: editData ? editData?.product_image : "",
    status: editData ? editData?.status : "",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category name is required"),
    product_name: Yup.string().required("Description is required"),
    pack_size: Yup.string().required("Status is required"),
    mrp: Yup.string().required("Status is required"),
    status: Yup.boolean().required("Status is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("product_name", values.product_name);
    formData.append("pack_size", values.pack_size);
    formData.append("mrp", values.mrp);
    formData.append("status", values.status);
    formData.append("product_image", values.product_image);

    try {
      if (editData) {
        await putData(`/products/${editData?._id}`, formData);
      } else {
        await postData(`/products`, formData);
      }
      setIsRegistered(true);
      setError("");
      setTimeout(() => {
        navigate("/products");
      }, 2000);
      resetForm();
    } catch (e) {
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
              <FormikSelectField name="category" label="Category" fullWidth>
                {categoryList &&
                  categoryList
                    ?.filter((data) => data.status === true)
                    ?.map((item, index) => (
                      <MenuItem value={item._id} key={index}>
                        {item.category_name}
                      </MenuItem>
                    ))}
              </FormikSelectField>
            </Grid>
            <Grid item xs={4}>
              <FormikTextField
                name="product_name"
                label="Product Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormikTextField name="pack_size" label="Pack Size" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormikTextField name="mrp" label="MRP" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormikImageUpload name="product_image" label="Product Image" />
              <Typography variant="body1" sx={{ fontSize: "12px" }}>
                {editData?.product_image}
              </Typography>
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
              <Box sx={{ height: "58vh" }}>
                {isRegistered && (
                  <Grid item xs={12}>
                    <Alert severity="success">
                      Product created successfully!
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

export default CreateProduct;
