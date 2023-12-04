import React, { useState, useEffect } from "react";
import "../css/Login.css"; // Import your CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = ({ authentication, onLoginSuccess, logo, basePath }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(basePath ? basePath : "/");
  }, [navigate]);

  const handleLogin = async () => {
    try {
      // Basic validation with HTML5 form validation
      if (!user || !password) {
        setError("Both Username and Password are required.");
        return;
      }

      // You might want to use a more secure way to compare passwords
      if (user !== authentication?.documentUser) {
        setError("Invalid Username");
        return;
      }

      if (password.toString() !== authentication?.documentPassword.toString()) {
        setError("Password authentication failed");
        return;
      }

      // Simulate login with a POST request
      const response = await axios.post(`${basePath ? `${basePath}/login` : '/login'}`, { user, password });

      if (response.status === 200) {
        onLoginSuccess(true);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Login"
            className="logo"
            style={{ width: "164px", height: "auto" }}
          />
        </h1>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button style={{ marginTop: "20px" }} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
