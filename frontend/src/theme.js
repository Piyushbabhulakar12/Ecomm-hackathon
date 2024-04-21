import { createTheme } from "@mui/material";

// Define your base theme
const baseTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 13,
  },
  palette: {
    type: "light",
    background: {
      default: "#fffff",
    },
    primary: {
      main: "#662671",
      thin: "#662671",
    },
    secondary: {
      main: "#000",
    },
    danger: {
      main: "red",
    },
    darkText: {
      main: "#101010",
    },
    light: {
      main: "#000",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "red",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: '"Poppins", sans-serif',
        boxShadow: "none",
        
      },
    },
    MuiCardActionArea: {
      root: {
        fontFamily: '"Poppins", sans-serif',
      },
    },
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "red", // Define your desired border color
        },
        "&:hover $notchedOutline": {
          borderColor: "red", // Define your desired hover border color
        },
      },
    },
  },
});



export { baseTheme };
