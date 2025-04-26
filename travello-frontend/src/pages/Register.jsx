import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const saveUser = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/user/register`,
        {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        navigate("/login");
        alert("Qeydiyyat prosesi uğurla başa çatdı");
      } else {
        if (response.data.hunterEmailVerifierStatus !== "valid") {
          setError("email", {
            type: "manual",
            message:
              "E-poçt doğrulama uğursuz oldu. Daxil etdiyiniz e-poçt mövcud deyil",
          });
        }
        if (response.data.isExistsUsername === true) {
          setError("username", {
            type: "manual",
            message: "Daxil etdiyiniz istifadəçi adı artıq mövcuddur",
          });
        }
        if (response.data.isExistsEmail === true) {
          setError("email", {
            type: "manual",
            message: "Daxil etdiyiniz e-poçt artıq istifadə olunub",
          });
        }
      }
    } catch (error) {
      console.error("Data fetch error: " + error);
    }
  };

  const onSubmit = (data) => {
    saveUser(data);
  };

  return (
    <div className="register">
      <div className="auth-container">
        <h1 className="auth-title">Qeydiyyat</h1>
        <form
          noValidate
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="username">İstifadəçi adı</label>
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
