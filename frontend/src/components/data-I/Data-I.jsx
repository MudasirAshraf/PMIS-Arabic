import React from "react";
import { useTheme } from "../../ThemeContext";
import RadialChart from "../../charts/RadialChart";
import IconGreen from "../../assets/svg/icon-green.svg";
import IconWhite from "../../assets/svg/icon-white.svg";
import DataCard from "../../cards/datacard/data-card";
import "./dataI.scss";

const DataI = () => {
  const { theme } = useTheme();
  return (
    <div className="main-container-Data-I">
      {/* Content-I */}
      <div className="content-grid">
        {/* Section-I */}
        <div className="section-one">
          {/* Ist */}
          <div className="ist-section-i">
            {/* Header */}
            <div className="header-ist-section-i">
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
            {/* Details */}
            <div className="details-ist-section-i">
              <div className="chart-details">
                <p className="fs-md fw-700 lh-1-2">المخطط ١</p>
                <RadialChart />
              </div>
              <div className="chart-details">
                <p className="fs-md fw-700 lh-1-2">المخطط ٢</p>
                <RadialChart />
              </div>
            </div>
          </div>
        </div>

        {/* Section-II */}
        <div className="section-two">
          <div className="ist-section-ii">
            {/* Header */}
            <div className="header-ist-section-i">
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
            {/* Details */}
            <div className="details-ist-section-ii">
              {/* Ist */}
              <div className="content-i-section-ii">
                {/* Image Div */}
                <div className="budget-image">
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
                </div>
                {/* details */}
                <div className="details-content-i">
                  <p className="details-content-i-pI fs-lg fw-700 lh-1-2">حاوية الميزانية</p>
                  <p className="details-content-i-pII fs-md fw-700 lh-1-2">9,999,720.00</p>
                </div>
              </div>
              {/* Second */}
              <div className="content-i-section-ii">
                {/* Image Div */}
                <div className="budget-image">
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
                </div>
                {/* details */}
                <div className="details-content-i">
                  <p className="details-content-i-pI fs-lg fw-700 lh-1-2">حاوية الميزانية</p>
                  <p className="details-content-i-pII fs-md fw-700 lh-1-2">9,999,720.00</p>
                </div>
              </div>
              <hr className="hr" />
              {/* Third */}
              <div className="content-ii-section-ii">
                <p className="content-ii-section-ii-para">إجمالي الميزانية</p>
                <div className="button-container-c-ii">
                  <button className="content-ii-section-ii-button fs-lg fw-700 lh-1-2">
                    الانتقال إلى إجمالي
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content-II */}
      <div className="content-two">
        {/* Header */}
        <div className="header-ist-section-i">
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
        {/* Card  Details */}
        <div className="card-container-section-ii">
          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />

          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />
          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />
          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />
          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />
          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />
          <DataCard
            title="إجمالي الميزانية"
            details="تفاصيل الميزانية لهذا الشهر حتى تتمكن من العمل"
          />
        </div>
      </div>
    </div>
  );
};

export default DataI;