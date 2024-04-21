import React, { useRef, useState } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

function FormikImageUpload({
  name,
  label,
  maxLength,
  convertToUppercase = false,
  disabled = false,
  ...props
}) {
  const [, { error, touched }, { setValue }] = useField({ name, label });
  const { handleBlur, setFieldValue } = useFormikContext();
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file.name);
    setFieldValue(name, file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <FormControl fullWidth error={error && touched}>
      <TextField
        id={name}
        name={name}
        label={label}
        type="text"
        onClick={handleButtonClick}
        onBlur={handleBlur}
        value={selectedFileName || ""}
        error={error && touched}
        disabled={disabled}
        variant="outlined"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <input
                id={`${name}-file-input`}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleInputChange}
              />
            </InputAdornment>
          ),
        }}
        {...props}
      />
      {error && touched && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default FormikImageUpload;
