import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import { FaSun, FaMoon } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Validation
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "الرمز يجب أن يكون مكونًا من 6 أرقام")
      .required("الرمز مطلوب"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("OTP entered:", values.otp);

    setTimeout(() => {
      toast.success("تم التحقق من الرمز بنجاح (واجهة فقط)");
      setSubmitting(false);
      navigate("/reset-password", { state: { email } });
    }, 1000);
  };

  // resend OTP
  const handleResendOtp = () => {
    setIsSendingOtp(true);
    setTimeout(() => {
      toast.success("تم إعادة إرسال الرمز (واجهة فقط)");
      setIsSendingOtp(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="theme-toggle-btn-login">
        <FaSun
          size={14}
          color={theme === "green" ? "#FFFFFF" : "#CCCCCC"}
          style={{ opacity: theme === "green" ? 1 : 0.5 }}
        />
        <FaMoon
          size={14}
          color={theme === "light" ? "#000000" : "#CCCCCC"}
          style={{ opacity: theme === "light" ? 1 : 0.5 }}
        />
      </button>

      {/* OTP Box */}
      <div className="login-box">
        <div className="logo">
          <img src={theme === "green" ? Logo : LogoWhite} alt="logo" />
        </div>

        <hr className="logo-separator" />

        <h2>التحقق من الرمز</h2>

        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <label htmlFor="otp">الرمز المرسل إلى بريدك الإلكتروني</label>

              <Field
                id="otp"
                name="otp"
                type="text"
                placeholder="أدخل الرمز المكون من 6 أرقام"
                onChange={handleChange}
              />

              {errors.otp && touched.otp && (
                <div className="error-message">{errors.otp}</div>
              )}

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري التحقق..." : "التحقق"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Links */}
        <div className="links">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleResendOtp();
            }}
            className="resend-otp-link"
          >
            {isSendingOtp ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
          </Link>

          <Link to="/">تسجيل الدخول</Link>
        </div>
      </div>
      {/* Toast-Conatiner */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        rtl={true}
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default VerifyOTP;
