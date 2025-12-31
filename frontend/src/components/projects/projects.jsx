import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import ProjectCard from "../../cards/projectcard/project-card";
import IconGreen from "../../assets/svg/icon-green.svg";
import IconWhite from "../../assets/svg/icon-white.svg";
import ArrowGreen from "../../assets/svg/arrow-green.svg";
import ArrowWhite from "../../assets/svg/arrow-white.svg";
import VectorGreen from "../../assets/svg/vector-green.svg";
import VectorWhite from "../../assets/svg/vector-white.svg";
import MenuGreen from "../../assets/svg/menu-green.svg";
import MenuWhite from "../../assets/svg/menu-white.svg";
import "./projects.scss";

const Project = () => {
  const navigate = useNavigate();
  const HandleNavigate = () => {
    navigate("/Project-Center");
  }
  const { theme } = useTheme();
  return (
    <div className="main-container-section-I">
      {/* Header Details */}
      <div className="first-container-section-I">
        <img
          src={
            theme === "green"
              ? IconGreen
              : theme === "light"
              ? IconWhite
              : IconGreen
          }
          alt="logo"
        />
        <p className="fs-md fw-600">المشاريع</p>
      </div>
      {/* Content Details */}
      <div className="second-container-section-I">
        <ProjectCard
          title="التحضير"
          image={
            theme === "green"
              ? ArrowGreen
              : theme === "light"
              ? ArrowWhite
              : ArrowGreen
          }
          value="9"
        />
        <ProjectCard 
       onClick={HandleNavigate}
          title="التنفيذ"
          image={
            theme === "green"
              ? VectorGreen
              : theme === "light"
              ? VectorWhite
              : VectorGreen
          }
          value="10"
        />
       <ProjectCard
          title="المغلقة"
          image={
            theme === "green"
              ? MenuGreen
              : theme === "light"
              ? MenuWhite
              : MenuGreen
          }
          value="6"
        />
      </div>
    </div>
  );
};

export default Project;
