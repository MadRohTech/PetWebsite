import React, { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/store";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Make API call to your backend
      // const response = await axios.post("https://your-api-url/login", {
      //   email: formData.email,
      //   password: formData.password,
      // });

      // const userData = {
      //   user: response.data.user,
      //   token: response.data.token,
      //   isAuthenticated: true,
      // };
      const userData = {
        user: formData,
        token: "AABC",
        isAuthenticated: true,
      };

      // Store user data in local storage
      localStorage.setItem("authData", JSON.stringify(userData));

      // Update Zustand store
      login(userData);

      // Navigate to home page after successful login
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center">
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            {error && (
              <Typography color="red" className="text-center">
                {error}
              </Typography>
            )}
            <Input
              label="Email"
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div className="-ml-2.5">
              <Checkbox
                label="Remember Me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              type="submit"
              disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as={Link}
                to="/signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold">
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;