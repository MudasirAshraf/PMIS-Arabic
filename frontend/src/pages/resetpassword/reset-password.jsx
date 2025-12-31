import React from "react";
import { useTheme } from "../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import { FaSun, FaMoon } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // validation
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل")
      .required("كلمة المرور الجديدة مطلوبة"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Reset password values:", values);

    setTimeout(() => {
      toast.success("تمت إعادة تعيين كلمة المرور بنجاح (واجهة فقط)");
      setSubmitting(false);
      navigate("/");
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

      {/* Reset Password Box */}
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src={theme === "green" ? Logo : LogoWhite} alt="logo" />
        </div>

        <hr className="logo-separator" />

        <h2>إعادة تعيين كلمة المرور</h2>

        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <label htmlFor="newPassword">كلمة المرور الجديدة</label>
              <Field
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="أدخل كلمة المرور الجديدة"
                onChange={handleChange}
              />
              {errors.newPassword && touched.newPassword && (
                <div className="error-message">{errors.newPassword}</div>
              )}

              <label htmlFor="confirmNewPassword">
                تأكيد كلمة المرور الجديدة
              </label>
              <Field
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="أعد إدخال كلمة المرور الجديدة"
                onChange={handleChange}
              />
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <div className="error-message">{errors.confirmNewPassword}</div>
              )}

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "جاري إعادة التعيين..."
                  : "إعادة تعيين كلمة المرور"}
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

export default ResetPassword;
