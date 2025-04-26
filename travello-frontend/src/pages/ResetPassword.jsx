import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utils/GlobalProvider";

const ResetPassword = () => {
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [isVerifiedOtp, setIsVerifiedOtp] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const { hasToken, userData } = useContext(GlobalContext);

  const sendEmail = useCallback(async () => {
    if (!userData.email) return;
    try {
      await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/user/send-otp?emailTo=${userData.email}`
      );
      setEmailTo(userData.email);
      setIsSentOtp(true);
    } catch (error) {
      console.log(error);
    }
  }, [userData.email]);

  const hasSentRef = useRef(false);
  useEffect(() => {
    if (hasToken && !hasSentRef.current) {
      hasSentRef.current = true;
      sendEmail();
    }
  }, [hasToken, sendEmail]);

  return (
    <div className="reset-password">
      <div className="auth-container">
        {hasToken && !isSentOtp && (
          <h1 className="auth-title">Otp göndərilir...</h1>
        )}
        {!isSentOtp && !hasToken && (
          <EmailSender setIsSentOtp={setIsSentOtp} setEmailTo={setEmailTo} />
        )}
        {isSentOtp && !isVerifiedOtp && (
          <OtpVerifier
            isSentOtp={isSentOtp}
            setIsVerifiedOtp={setIsVerifiedOtp}
            emailTo={emailTo}
          />
        )}
        {isSentOtp && isVerifiedOtp && (
          <UpdatePassword
            isVerifiedOtp={isVerifiedOtp}
            emailTo={emailTo}
            hasToken={hasToken}
          />
        )}
      </div>
    </div>
  );
};

const EmailSender = ({ setIsSentOtp, setEmailTo }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const sendEmail = async (formData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/user/send-otp?emailTo=${formData.email}`
      );
      setEmailTo(formData.email);
      setIsSentOtp(true);
    } catch (error) {
      if (error.response.status === 500) {
        setError("email", {
          type: "manual",
          message: "Otp göndərilməsi ilə bağlı xəta baş verdi",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Daxil etdiyiniz e-poçt ünvanı ilə qeydiyyat yoxdur",
        });
      }
    }
  };

  const onSubmit = (data) => {
    sendEmail(data);
  };

  return (
    <>
      <h1 className="auth-title">E-poçt</h1>
      <form noValidate className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <button type="submit" className="form-button">
          Otp Göndər
        </button>
      </form>
    </>
  );
};

const OtpVerifier = ({ isSentOtp, setIsVerifiedOtp, emailTo }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const verifyOtp = async (formData) => {
    if (isSentOtp) {
      try {
        await axios.post(
          `${process.env.REACT_APP_REST_API_URL}/user/verify-otp`,
          {
            email: emailTo,
            inputOtp: formData.otp,
          }
        );
        setIsVerifiedOtp(true);
      } catch (error) {
        setError("otp", {
          type: "manual",
          message: "Daxil etdiyiniz otp kodu səhvdir",
        });
      }
    }
  };

  const onSubmit = (data) => {
    verifyOtp(data);
  };

  return (
    <>
      <h1 className="auth-title">Otp kodu</h1>
      <form noValidate className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="otp">Otp Kodu</label>
          <input
            type="text"
            id="otp"
            placeholder="Otp kodunu daxil edin"
            className="form-input"
            {...register("otp", {
              required: "Otp tələb olunur",
              pattern: {
                value: /^\d{6}$/,
                message: "Otp 6 rəqəmdən ibarət olmalıdır",
              },
            })}
          />
          {errors.otp && <p className="form-error">{errors.otp.message}</p>}
        </div>
        <button type="submit" className="form-button">
          Təsdiqlə
        </button>
      </form>
    </>
  );
};

const UpdatePassword = ({ hasToken, isVerifiedOtp, emailTo }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const newPassword = watch("newPassword");

  const navigate = useNavigate();

  const updatePassword = async (formData) => {
    if (isVerifiedOtp && formData.newPassword === formData.newPasswordAgain) {
      try {
        await axios.put(
          `${process.env.REACT_APP_REST_API_URL}/user/update-pass`,
          {
            email: emailTo,
            newPassword: formData.newPassword,
          }
        );
        hasToken ? navigate("/account") : navigate("/login");
      } catch (error) {
        setError("newPassword", {
          type: "manual",
          message: "Şifrə yeniləməsi zamanı xəta baş verdi",
        });
      }
    }
  };

  const onSubmit = (data) => {
    updatePassword(data);
  };
  return (
    <>
      <h1 className="auth-title">Şifrəni Yenilə</h1>
      <form noValidate className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="newPassword">Yeni Şifrə</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Yeni şifrənizi daxil edin"
            className="form-input"
            {...register("newPassword", {
              required: "Yeni şifrə tələb olunur",
              minLength: {
                value: 6,
                message: "Şifrə ən azı 6 simvoldan ibarət olmalıdır",
              },
            })}
          />
          {errors.newPassword && (
            <p className="form-error">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="newPasswordAgain">Təkrar Şifrə</label>
          <input
            type="password"
            id="newPasswordAgain"
            placeholder="Şifrənizi təkrar daxil edin"
            className="form-input"
            {...register("newPasswordAgain", {
              required: "Təkrar şifrə tələb olunur",
              validate: (value) =>
                value === newPassword || "Şifrələr uyğun deyil",
            })}
          />
          {errors.newPasswordAgain && (
            <p className="form-error">{errors.newPasswordAgain.message}</p>
          )}
        </div>
        <button type="submit" className="form-button">
          Şifrəni Yenilə
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
