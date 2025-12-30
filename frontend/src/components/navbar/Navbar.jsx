import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import Logo from "../../assets/svg/logo.svg";
import Line from "../../assets/svg/line.svg";
import Profile from "../../assets/svg/profile-icon.svg";
import Group from "../../assets/svg/group.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import LineWhite from "../../assets/svg/line-white.svg";
import ProfileWhite from "../../assets/svg/profile-white.svg";
import GroupWhite from "../../assets/svg/group-white.svg";
import "./navbar.scss";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const hnadleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="main-container-navbar">
      <div className="logo-navbar">
        <img
          src={theme === "green" ? Logo : theme === "light" ? LogoWhite : Logo}
          alt="logo"
          onClick={hnadleNavigate}
        />
      </div>
      <div className="center-container-navbar">
        <img
          src={
            theme === "green" ? Group : theme === "light" ? GroupWhite : Group
          }
          alt="logo"
        />
        <img
          src={theme === "green" ? Line : theme === "light" ? LineWhite : Line}
          alt="logo"
        />
        <span className="fw-500 fs-2xl lh-1-5">اتقان</span>
      </div>
      <div className="first-container-navbar">
        <div className="profile-container-navbar">
          <img
            src={
              theme === "green"
                ? Profile
                : theme === "light"
                ? ProfileWhite
                : Profile
            }
            alt="logo"
          />
        </div>
        <span className="fw-400 fs-sm lh-1-5">مدثر أشرف</span>
        <span className="fw-400 fs-sm lh-1-5 name-span">Mudasir Ashraf</span>
        {/* Theme Toggle Button */}
        <div onClick={toggleTheme} className="theme-toggle-button">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
