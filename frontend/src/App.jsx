import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Image from "./image";
import { CarouselEx } from "./assets/Carsoule";
import Intro from "./pages/Hero";
import Login from "./pages/Login";
import CustomButton from "./assets/CustomButton";
import Signup from "./pages/Signup";
import Navbar from "./assets/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import { useAuthStore } from "./store/store";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();

  const handleSignOut = () => {
    logout();
    navigate("/intro");
  };

  // Define public pages
  const publicPaths = ["/intro", "/login", "/signup", "/"];

  return (
    <div className="min-h-screen">
      <Navbar onSignOut={handleSignOut} />
      <Routes>
        {/* Redirect logged-in users away from public pages */}
        {isAuthenticated && publicPaths.includes(location.pathname) ? (
          <Route path="*" element={<Navigate to="/home" replace />} />
        ) : (
          <>
            {/* Public Routes */}
            <Route path="/" element={<Intro />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/images"
              element={
                <ProtectedRoute>
                  <Image />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carousel"
              element={
                <ProtectedRoute>
                  <CarouselEx />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custombutton"
              element={
                <ProtectedRoute>
                  <CustomButton />
                </ProtectedRoute>
              }
            />

            {/* Default redirect for unknown routes */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
