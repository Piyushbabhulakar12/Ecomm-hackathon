import AppRouter from "./components/AppRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { baseTheme } from "./theme";
import { AuthProvider } from "./components/Auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={baseTheme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
