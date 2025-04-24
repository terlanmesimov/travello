import React, { useContext } from "react";
import { GlobalContext } from "../utils/GlobalProvider";
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

  const { setHasToken } = useContext(GlobalContext);

  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/user/login`,
        {
          username: formData.username,
          password: formData.password,
        }
      );
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        setHasToken(true);
        navigate("/");
      }
      if (response.data.status === 404) {
        setError("username", {
          type: "manual",
          message: "İstifadəçi mövcud deyil",
        });
      }
      if (response.data.status === 401) {
        setError("password", {
          type: "manual",
          message: "Şifrə yanlışdır",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="İstifadəçi adınızı daxil edin"
              className="form-input"
              {...register("username", {
                required: "İstifadəçi adı tələb olunur",
                pattern: {
                  value: /^[a-zA-Z0-9]{4,16}$/,
                  message:
                    "İstifadəçi adı yalnız hərf və rəqəmlərdən ibarət olmalıdır və 4-16 simvol arasında olmalıdır.",
                },
              })}
            />
            {errors.username && (
              <p className="form-error">{errors.username.message}</p>
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
