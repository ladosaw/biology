import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../utils/api/api.js";
import { CircularProgress } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    role: "student",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/register", formData);
      Swal.fire({
        icon: "success",
        title: "Sign Up Successful",
        text: "Your account has been created!",
        confirmButtonColor: "#10B981",
      }).then(() => {
        navigate("/lessons");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: "Please check your details and try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-96 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
          <input
            type="text"
            name="mname"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
          {/* <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white"
            disabled={isLoading}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              disabled={isLoading}
            >
              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </button>
          <button
            type="button"
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
