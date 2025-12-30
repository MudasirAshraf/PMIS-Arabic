import React from "react";
import { useTheme } from "../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import { FaSun, FaMoon } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  //  validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Forgot password email:", values.email);

    setTimeout(() => {
      toast.success("تم إرسال رمز التحقق (واجهة فقط)", {
        position: "top-right",
        transition: Slide,
        rtl: true,
      });

      setSubmitting(false);
      navigate("/verify-otp", {
        state: { email: values.email, purpose: "forgot-password" },
      });
    }, 1000);
  };

  return (
    <div className="login-page">
      {/* Theme toggle */}
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

        <h2>استعادة كلمة المرور</h2>

        <Formik
          initialValues={{ email: "" }}
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

              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال رمز التحقق"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Links */}
        <div className="links">
          <Link to="/">تسجيل الدخول</Link>
          <Link to="/signup">إنشاء حساب</Link>
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

export default ForgetPassword;
