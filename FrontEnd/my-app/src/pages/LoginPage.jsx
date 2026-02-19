import React, { useState } from "react";
import { loginApi } from "../api/authApi";
import "./LoginPage.css";

import eyeIcon from "../Picture/eye.png";
import hiddenIcon from "../Picture/hidden.png";
import userIcon from "../Picture/user.png";
import girlImage from "../Picture/Login_icon_pepole.png";
import logoAbhi from "../Picture/Logofixone.png";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await loginApi(login, password);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/";
    } catch (err) {
      alert("Login gagal");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT */}
      <div className="login-card">
        <h2 className="login-title">
          <span className="typing-line">Welcome to IT Support</span>
          <br />
          <strong className="typing-company">PT Abhimata Persada</strong>
        </h2>

        {/* USER INPUT */}
        <div className="input-wrapper">
          <input
            className="login-input"
            placeholder="User ID"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <img src={userIcon} className="input-icon" alt="user" />
        </div>

        {/* PASSWORD INPUT */}
        <div className="input-wrapper">
          <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <img
            src={showPassword ? eyeIcon : hiddenIcon}
            alt="toggle"
            className="input-icon clickable"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </div>

      {/* RIGHT BACKGROUND */}
      <div className="login-bg">
        <div className="bg-gradient"></div>

        <img src={girlImage} alt="customer service" className="girl-img" />

        <img src={logoAbhi} alt="logo" className="logo-overlay" />
      </div>
    </div>
  );
};

export default LoginPage;
