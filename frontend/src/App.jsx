import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.scss";
import { useTheme } from "./ThemeContext.jsx";
import CurtainReveal from "./components/curtainReveal/CurtainReveal";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import AccountVerification from "./pages/accountverification/Account-Verification.jsx";
import ForgetPassword from "./pages/forgotpassword/forgot-password.jsx";
import VerifyOTP from "./pages/verifyotp/verify-otp.jsx";
import ResetPassword from "./pages/resetpassword/reset-password.jsx";
import Layout from "./components/layout/Layout.jsx";
import LandingPage from "./pages/landingpage/Landing-Page.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import ProjectCenter from "./pages/projectcenter/Project-Center.jsx";
import ProjectDashboard from "./pages/projectdashboard/Project-Dashboard.jsx";

function App() {
   const { theme } = useTheme();
  return (
    <div className={`App ${theme}-theme`}>
      <Router>
        <Routes>
          {/* Login route  */}
          <Route path="/" element={ <CurtainReveal>  {" "} <Login />{" "}  </CurtainReveal> }  />
           <Route path="/signup" element={<Signup />} />
          <Route path="/Account-Verification" element={<AccountVerification />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          {/* All other routes with Layout */}
          <Route element={<Layout />}>
             <Route path="/Landing-Page" element={<LandingPage />} />
             <Route path="/Homepage" element={<Homepage />} />
             <Route path="/Project-Center" element={<ProjectCenter />} />
            <Route path="/Project-Dashboard" element={<ProjectDashboard />} />   
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
