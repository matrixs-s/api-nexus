import React, { useState } from "react";
import "../css/Login.css"; // Import your CSS file
import axios from "axios";

const LoginPage = ({ authentication, onLoginSuccess, logo }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const response = await axios.post("/doc/login", { user, password });

      if (response.status === 200) {
        onLoginSuccess(true);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button style={{ marginTop: "20px" }} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
