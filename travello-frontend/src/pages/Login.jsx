import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  return (
    <div className="login">
      <div className="auth-container">
        <h1 className="auth-title">Daxil ol</h1>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-poçt</label>
            <input
              type="email"
              id="email"
              placeholder="nümunə@mail.com"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifrə</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrənizi daxil edin"
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Daxil ol
          </button>
          <p className="auth-redirect-text">
            Hesabınız yoxdur?{" "}
            <a href="/register" className="auth-link">
              Qeydiyyatdan keçin
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
