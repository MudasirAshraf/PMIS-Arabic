import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../ThemeContext";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Frontend-only validation
  const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("اسم العائلة مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  // Frontend-only submit (mock)
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Signup form values (frontend only):", values);

    setTimeout(() => {
      toast.success("تم إنشاء الحساب بنجاح (واجهة فقط)");
      setSubmitting(false);

      // Mock navigation to OTP page
      navigate("/Account-Verification", {
        state: { email: values.email },
      });
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

      {/* Signup Box */}
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src={theme === "green" ? Logo : LogoWhite} alt="logo" />
        </div>

        <hr className="logo-separator" />

        <h2>إنشاء حساب جديد</h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <label htmlFor="firstName">الاسم الأول</label>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="أدخل اسمك الأول"
                onChange={handleChange}
              />
              {errors.firstName && touched.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}

              <label htmlFor="lastName">اسم العائلة</label>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="أدخل اسم العائلة"
                onChange={handleChange}
              />
              {errors.lastName && touched.lastName && (
                <div className="error-message">{errors.lastName}</div>
              )}

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

              <label htmlFor="password">إنشاء كلمة المرور</label>
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

              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="أعد إدخال كلمة المرور"
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="error-message">
                  {errors.confirmPassword}
                </div>
              )}

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري التسجيل..." : "إنشاء حساب"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Links */}
        <div className="links">
          <Link to="/">تسجيل الدخول</Link>
          <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
        </div>
      </div>

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

export default Signup;
