import React, { useState } from "react";
import { loginApi } from "../api/authApi";
import "./LoginPage.css";

import eyeIcon from "../Picture/eye.png";
import hiddenIcon from "../Picture/hidden.png";
import userIcon from "../Picture/user.png"; 

const LoginPage = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await loginApi(login, password);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/";
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT */}
      <div className="login-card">
        <h2>Hi, Welcome!</h2>

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

        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>

      </div>

      {/* RIGHT BACKGROUND */}
      <div className="login-bg"></div>

    </div>
  );
};

export default LoginPage;
