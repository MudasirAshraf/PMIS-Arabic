import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import { FaSun, FaMoon } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountVerification = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  //  validation
  const validationSchema = Yup.object({
    code: Yup.string()
      .length(6, "رمز التحقق يجب أن يكون مكونًا من 6 أرقام")
      .required("رمز التحقق مطلوب"),
  });

  // handle Submit
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("OTP entered:", values.code);
    setTimeout(() => {
      toast.success("تم التحقق من الرمز (بدون تكامل مع السيرفر)");
      setSubmitting(false);
      navigate("/");
    }, 1000);
  };

  // Resend-OTP
  const handleResendOtp = () => {
    setIsSendingOtp(true);
    setTimeout(() => {
      toast.success("تم إرسال رمز تحقق جديد (واجهة فقط)");
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

      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src={theme === "green" ? Logo : LogoWhite} alt="logo" />
        </div>

        <hr className="logo-separator" />

        <h2>تأكيد الحساب</h2>

        {/* Form */}
        <Formik
          initialValues={{ code: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <label htmlFor="code">
                أدخل رمز التحقق المرسل إلى بريدك الإلكتروني
              </label>

              <Field
                id="code"
                name="code"
                type="text"
                placeholder="الرمز المكون من 6 أرقام"
                onChange={handleChange}
              />

              {errors.code && touched.code && (
                <div className="error-message">{errors.code}</div>
              )}

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري التحقق..." : "تأكيد الحساب"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Links */}
        <div className="links">
          <Link to="/">تسجيل الدخول</Link>

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

export default AccountVerification;
