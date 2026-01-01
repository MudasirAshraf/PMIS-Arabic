import React from "react";
import { useTheme } from "../../ThemeContext";
import IconGreen from "../../assets/svg/icon-green.svg";
import IconWhite from "../../assets/svg/icon-white.svg";
import HeatMapCard from "../../cards/heatmapcard/heatmap-card";
import ValueCard from "../../cards/valuecard/value-card";
import SalesChart from "../../charts/SalesChart";
import "./dataII.scss";

const DataII = () => {
  const { theme } = useTheme();
  const heatMapData = [
    { value: "10", title: "بطاقة 1" },
    { value: "20", title: "بطاقة 2" },
    { value: "30", title: "بطاقة 3" },
    { value: "40", title: "بطاقة 4" },
    { value: "50", title: "بطاقة 5" },
    { value: "60", title: "بطاقة 6" },
    { value: "70", title: "بطاقة 7" },
    { value: "80", title: "بطاقة 8" },
    { value: "90", title: "بطاقة 9" },
  ];
  return (
    <div className="main-container-Data-II">
      {/* Section-I */}
      <div className="section-i-data-II">
        {/* Ist */}
        <div className="sub-section-i-data-II">
          {/* header */}
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
          <div className="content-container-Data-II">
            <div className="sub-content-data-II">
              {/* X & Y Axis Container */}
              <div className="heatmap-wrapper">
                {/* Y-Axis Title */}
                <div className="y-axis-title">
                  <p className="fs-md fw-700">المحور الصادي</p>
                </div>

                {/* Heatmap Grid */}
                <div className="heatmap-grid">
                  {heatMapData.map((data, index) => (
                    <HeatMapCard
                      key={index}
                      value={data.value}
                      title={data.title}
                    />
                  ))}
                </div>

                {/* X-Axis Title */}
                <div className="x-axis-title">
                  <p className="fs-md fw-700">المحور السيني</p>
                </div>
              </div>
              {/* Second-Content */}
              <div class="grid-container-second-content-data-II">
                <ValueCard title="السماء الزرقاء" value="10" />
                <ValueCard title="الشجرة الكبيرة" value="30" />
                <ValueCard title="مكتبة المدينة" value="40" />
                <ValueCard title="الطعام الشهي" value="70" />
              </div>
            </div>
            <hr className="hr-tag" />
            <div className="paragraph-content-grid">
              <p className="para-con-grid fs-sm fw-700 text-start lh-1">أعلى 5 مخاطر</p>
              <div className="paragraph-grid-container">
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                    معين في هذه الفقرة.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الثاني هنا. هذا النص يشرح المزيد حول الموضوع ويعطي بعض
                    التفاصيل المفيدة للمستخدم.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الثالث هنا. مثل الفقرات السابقة، هذا النص يتحدث عن
                    موضوع مختلف قليلاً ولكنه ذو صلة بالمحتوى العام.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الرابع هنا. يمكن أن يكون هذا النص متعلقاً بالتعليمات أو
                    التوجيهات الخاصة بكيفية استخدام الموقع أو التطبيق.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الخامس هنا. في هذه الفقرة، نختتم النصوص بتوجيه المستخدم
                    أو إضافة معلومات إضافية تساعد في توضيح الفكرة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* hello */}
       {/* Section-I */}
       <div className="section-i-data-II">
        {/* Ist */}
        <div className="sub-section-i-data-II">
          {/* header */}
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
          <div className="content-container-Data-II">
            <div className="sub-content-data-II">
              {/* Chart */}
               <div>
               <SalesChart/>
               </div>
              {/* Second-Content */}
              <div class="grid-container-second-content-data-II">
                <ValueCard title="السماء الزرقاء" value="10" />
                <ValueCard title="الشجرة الكبيرة" value="30" />
                <ValueCard title="مكتبة المدينة" value="40" />
                <ValueCard title="الطعام الشهي" value="70" />
              </div>
            </div>
            <hr className="hr-tag" />
            <div className="paragraph-content-grid">
              <p className="para-con-grid fs-sm fw-700 text-start lh-1">أعلى 5 مخاطر</p>
              <div className="paragraph-grid-container">
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الأول هنا. بعض النصوص باللغة العربية التي تعبر عن محتوى
                    معين في هذه الفقرة.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الثاني هنا. هذا النص يشرح المزيد حول الموضوع ويعطي بعض
                    التفاصيل المفيدة للمستخدم.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الثالث هنا. مثل الفقرات السابقة، هذا النص يتحدث عن
                    موضوع مختلف قليلاً ولكنه ذو صلة بالمحتوى العام.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الرابع هنا. يمكن أن يكون هذا النص متعلقاً بالتعليمات أو
                    التوجيهات الخاصة بكيفية استخدام الموقع أو التطبيق.
                  </p>
                </div>
                <div className="paragraph-item">
                  <div className="circle"></div>
                  <p className="fs-xs fw-600 lh-1">
                    النص الخامس هنا. في هذه الفقرة، نختتم النصوص بتوجيه المستخدم
                    أو إضافة معلومات إضافية تساعد في توضيح الفكرة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataII;