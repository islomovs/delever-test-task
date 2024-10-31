import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { FaRegFontAwesomeLogoFull } from "react-icons/fa";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: data.username,
        password: data.password,
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <div className="top-bar">
          <FaRegFontAwesomeLogoFull className="logo" />
          <button className="back-button">
            Back to website
            <FiArrowRight className="arrow-icon" />
          </button>
        </div>
        <img src="/landscape.jfif" alt="Landscape" />
        <h2>Welcome Back! Log in to your account</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-section">
        <h2>Log in</h2>
        <p>
          Already have an account?
          <a href="/signup"> Sign up</a>
        </p>

        <div className="form-group">
          <div>
            <input
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </div>

          <div className="password-group">
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="show-hide-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          <div className="checkbox-group">
            <div className="checkbox-group-inner">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
              />
              <label>
                I agree to the <a href="/terms">Terms & Conditions</a>
              </label>
            </div>
            {errors.terms && (
              <span className="error">{errors.terms.message}</span>
            )}
          </div>
        </div>

        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

export default RegisterForm;
