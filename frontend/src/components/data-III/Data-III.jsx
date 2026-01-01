import React from "react";
import { useTheme } from "../../ThemeContext";
import IconGreen from "../../assets/svg/icon-green.svg";
import IconWhite from "../../assets/svg/icon-white.svg";
import RadialChart from "../../charts/RadialChart";
import ValueCard from "../../cards/valuecard/value-card";
import Budget from "../../cards/budget/budget";
import "./dataIII.scss";

const DataIII = () => {
  const { theme } = useTheme();
  return (
    <div className="main-container-Data-III">
      {/* Section-I */}
      <div className="section-i-Data-III">
        {/* Header */}
        <div className="header-ist-section-i-data-II">
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
          <p className="fs-md fw-700 lh-1-2">المخطط</p>
        </div>
        {/* Content */}
        <div className="content-section-Data-III">
          <div className="chart-details">
            <p className="fs-md fw-700 lh-1-2">المخطط ١</p>
            <RadialChart />
          </div>
          <div className="chart-details">
            <p className="fs-md fw-700 lh-1-2">المخطط ١</p>
            <RadialChart />
          </div>
          <div class="grid-container-second-content-data-II">
            <ValueCard title="السماء الزرقاء" value="10" />
            <ValueCard title="الشجرة الكبيرة" value="30" />
            <ValueCard title="مكتبة المدينة" value="40" />
            <ValueCard title="الطعام الشهي" value="70" />
          </div>
        </div>
      </div>
      {/* Section-I */}
      <div className="section-ii-Data-III">
        {/* Header */}
        <div className="header-ist-section-i-data-II">
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
          <p className="fs-md fw-700 lh-1-2">المخطط</p>
        </div>
        {/* Content */}
        <div className="content-section-ii-Data-III">
          <Budget
            title="غير مدفوعة"
              value="854,709.80"
            color="#E74C3C" 
            image={
              theme === "green"
                ? IconGreen
                : theme === "light"
                ? IconWhite
                : IconGreen
            }
          />
          <Budget
            title="مدفوعة"
            value="854,709.80"
            color="#00A8E8" 
            image={
              theme === "green"
                ? IconGreen
                : theme === "light"
                ? IconWhite
                : IconGreen
            }
          />
          <Budget
            title="مستحقة"
            value="854,709.80"
            color="#27AE60" 
            image={
              theme === "green"
                ? IconGreen
                : theme === "light"
                ? IconWhite
                : IconGreen
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DataIII;