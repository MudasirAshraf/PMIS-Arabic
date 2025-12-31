import React from "react";
import { useTheme } from "../../ThemeContext";
import Project from "../../components/projects/projects";
import Service from "../../components/services/services";
import Budget from "../../components/budgets/budgets";
import ProjectStatus from "../../components/projectstatus/projectstatus";
import Performances from "../../components/performances/performaces";
import "./homepage.scss";

const Homepage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`container ${
        theme === "light" ? "light-theme" : "green-theme"
      }`}
    >
      <div className="home-page-grid">
        {/* First Row */}
        <div className="header-details">
          <p className="fs-sm fw-400 text-start">
                        الاستراتيجية و التميز المؤسسي/التخطيط الاستراتيجي والأداء المؤسسي

          </p>
        </div>
        <div className="another-header-scroll-container">
          <div className="container-scroll-bar">
            <div className="scroll-container">
              <p className="fs-sm fw-400">تم تحديث نموذج ميثاق المشروع </p>
              <p className="fs-sm fw-400">
                نرجو التكرم بتحديث مشاريعكم قبل تاريخ 29/8/2024 حيث سيتم سحب
                التقرير من النظام بهذا التاريخ
              </p>
              <p className="fs-sm fw-400">تم تحديث نموذج ميثاق المشروع </p>
              <p className="fs-sm fw-400">
                نرجو التكرم بتحديث مشاريعكم قبل تاريخ 29/8/2024 حيث سيتم سحب
                التقرير من النظام بهذا التاريخ
              </p>
              <p className="fs-sm fw-400">تم تحديث نموذج ميثاق المشروع </p>
              <p className="fs-sm fw-400">
                نرجو التكرم بتحديث مشاريعكم قبل تاريخ 29/8/2024 حيث سيتم سحب
                التقرير من النظام بهذا التاريخ
              </p>
            </div>
          </div>
        </div>
        {/* Second Row */}
        {/* Section-I(Project) */}
        <div className="section-1">
          <Project />
        </div>
        {/* Section-II(Services) */}
        <div className="section-2">
          <Service />
        </div>

        {/* Third Row */}
        {/* Section-III(Budget) */}
        <div className="section-3">
          <Budget />
        </div>
        {/* Section-IV(ProjectStatus) */}
        <div className="section-4">
          <ProjectStatus />
        </div>
        {/* Section-V(Performance) */}
        <div className="section-5">
          <Performances />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
