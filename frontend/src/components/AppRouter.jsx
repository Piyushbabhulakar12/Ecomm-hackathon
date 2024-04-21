import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import Dashboard from "./Dashboard/Dashboard";
import HomePage from "../pages/HomePage";
import { useAuth } from "./Auth/AuthContext";
import CategoryPage from "../pages/CategoryPage";
import CategoryCreatePage from "../pages/CategoryCreatePage";
import ProductPage from "../pages/ProductPage";
import ProductCreatePage from "../pages/ProductCreatePage";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignupPage />}
        />
        <Route
          path="/forgetpassword"
          element={user ? <Navigate to="/" replace /> : <ForgetPasswordPage />}
        />
        <Route
          path="/reset-password"
          element={user ? <Navigate to="/" replace /> : <ResetPasswordPage />}
        />
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/category"
          element={user ? <CategoryPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/category-create"
          element={
            user ? <CategoryCreatePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/products"
          element={user ? <ProductPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/products-create"
          element={
            user ? <ProductCreatePage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
