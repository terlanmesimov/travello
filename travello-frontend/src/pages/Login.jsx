import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/user/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("email", {
        type: "manual",
        message: "E-poçt və ya şifrə yanlışdır.",
      });
    }
  };

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="login">
      <div className="auth-container">
        <h1 className="auth-title">Daxil ol</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">E-poçt</label>
            <input
              type="email"
              id="email"
              placeholder="nümunə@mail.com"
              className="form-input"
              {...register("email", {
                required: "E-poçt tələb olunur",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Düzgün e-poçt formatı daxil edin",
                },
              })}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifrə</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrənizi daxil edin"
              className="form-input"
              {...register("password", {
                required: "Şifrə tələb olunur",
                minLength: {
                  value: 6,
                  message: "Şifrə ən azı 6 simvoldan ibarət olmalıdır",
                },
              })}
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
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
