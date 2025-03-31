import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="auth-container">
        <h1 className="auth-title">Qeydiyyat</h1>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="username">İstifadəçi adı</label>
            <input
              type="text"
              id="username"
              placeholder="İstifadəçi adınızı daxil edin"
              className="form-input"
            />
          </div>
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
            Qeydiyyatdan keç
          </button>
          <p className="auth-redirect-text">
            Hesabınız var?{" "}
            <a href="/login" className="auth-link">
              Daxil olun
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
