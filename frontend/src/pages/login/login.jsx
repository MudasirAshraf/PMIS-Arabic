import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import { FaSun, FaMoon } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./login.scss";

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  // Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Login form values:", values);
    setTimeout(() => {
      toast.success("تم إرسال البيانات (بدون تكامل مع السيرفر)");
      setSubmitting(false);
      navigate("/Landing-Page");
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

      {/* Login Box */}
      <div className="login-box">
        <div className="logo">
          <img src={theme === "green" ? Logo : LogoWhite} alt="logo" />
        </div>

        <hr className="logo-separator" />

        <h2>تسجيل الدخول</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <label htmlFor="email">البريد الإلكتروني</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}

              <label htmlFor="password">كلمة المرور</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                onChange={handleChange}
              />
              {errors.password && touched.password && (
                <div className="error-message">{errors.password}</div>
              )}

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                تسجيل الدخول
              </button>
            </Form>
          )}
        </Formik>

        <div className="links">
          <Link to="/signup">إنشاء حساب</Link>
          <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
        </div>
      </div>

      {/* Toast Container */}
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

export default Login;
