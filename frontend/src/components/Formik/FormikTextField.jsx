import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

import React from "react";

function FormikTextField({
  name,
  label,
  maxLength,
  convertToUppercase = false,
  type = "text",
  disabled = false,
  ...props
}) {
  const [, { value, error, touched }, { setValue }] = useField({ name, label });
  const { handleBlur } = useFormikContext();

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    if (convertToUppercase) {
      inputValue = inputValue.toUpperCase();
    }
    if (maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    setValue(inputValue);
  };

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value || ""}
      onChange={handleInputChange}
      onBlur={handleBlur}
      error={error && touched}
      disabled={disabled}
      variant="outlined"
      {...props}
      helperText={(error && touched && error) || props.helperText}
    />
  );
}
export default FormikTextField;
