import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import HomeIcon from "../../assets/svg/home-icon.svg";
import HomeWhite from "../../assets/svg/home-white.svg";
import DataI from "../../components/data-I/Data-I";
import DataII from "../../components/data-II/Data-II";
import DataIII from "../../components/data-III/Data-III";
import DataIV from "../../components/data-IV/Data-IV";
import { Plus } from "lucide-react";
import { Settings, Activity, Folder } from "lucide-react";
import FloatingCard from "../../cards/floatingcard/floating-card";
import "./projectdash.scss";

const ProjectDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("DataI");
  const [showCards, setShowCards] = useState(false);

  const handleNavigate = () => navigate("/");

  const renderComponent = () => {
    switch (activeComponent) {
      case "DataI":
        return <DataI />;
      case "DataII":
        return <DataII />;
      case "DataIII":
        return <DataIII />;
      case "DataIV":
        return <DataIV />;
      default:
        return <DataI />;
    }
  };

  return (
    <div className="main-container-data-center">
      {/* Header */}
      <div className="header-container-data-center">
        <img
          onClick={handleNavigate}
          src={
            theme === "green"
              ? HomeIcon
              : theme === "light"
              ? HomeWhite
              : HomeIcon
          }
          alt="home"
          className="image-hover"
        />
        <div className="header-details-data-center">
          <p className="para-dc fs-m fw-700 lh-1-2">اسم المشروع لوحة المعلومات</p>
        </div>
      </div>
      {/* Floating Ico here */}
      <div
        className="floating-container"
        onMouseEnter={() => setShowCards(true)}
        onMouseLeave={() => setShowCards(false)}
      >
        <Plus className="floating-icon" />

        {showCards && (
         <div className="floating-card-list">
         <FloatingCard title="الجدول الزمني" Icon={Folder} value={8} link="/Schedule-Center" />
         <FloatingCard title="جدول كميات" Icon={Settings} value={0} link="/BOQ-Center" />
         <FloatingCard title=" المفردات" Icon={Activity} value={10} link="/Deliverables-Center" />
         <FloatingCard title="أعضاء الفريق" Icon={Activity} value={5} link="/Build-Team-Center" />
         <FloatingCard title="المخاطر" Icon={Activity} value={5} link="/Risk-Center" />
         <FloatingCard title="المشاكل " Icon={Settings} value={0} link="/Issue-Center" />
         <FloatingCard title=" طلبات التغيير" Icon={Folder} value={0} link="/Change-Request" />
         <FloatingCard title="مهام سير العمل" Icon={Settings} value={1} link="/Workflow-Center" />
         <FloatingCard title=" سجل الأعمال" Icon={Activity} value={1} link="/Action-Center" />
         <FloatingCard title="  ملاحظات (EPMO)" Icon={Folder} value={6} link="/EPMO-Comment-Center" />
         <FloatingCard title="المستندات" Icon={Settings} value={19} link="/Document-Center" />
         <FloatingCard title="سجل أصحاب المصلحة" Icon={Folder} value={7} link="/StakeHolder-Center" />
         <FloatingCard title="الدروس المستفادة" Icon={Activity} value={4} link="/LessonLearned-Center" />
         <FloatingCard title="لوحة البيانات" Icon={Settings} link="/Project-Center" />
         <FloatingCard title=" النماذج" Icon={Folder} link="/Template-Landing"  />
       </div>
        )}
      </div>

      {/* Links Container */}
      <div className="container-links-data-center">
     <p
  className={`fs-m fw-600 lh-1-2 ${activeComponent === "DataI" ? "fw-700 active" : ""}`}
  onClick={() => setActiveComponent("DataI")}
>
  تفاصيل البيانات 1
</p>
        <p
          className={`fs-m fw-600 lh-1-2 ${activeComponent === "DataII" ? "fw-700 active" : ""}`}
          onClick={() => setActiveComponent("DataII")}
        >
          تفاصيل البيانات 2
        </p>
        <p
 className={`fs-m fw-600 lh-1-2 ${activeComponent === "DataIII" ? "fw-700 active" : ""}`}
          onClick={() => setActiveComponent("DataIII")}
        >
          تفاصيل البيانات 3
        </p>
        <p
        className={`fs-m fw-600 lh-1-2 ${activeComponent === "DataIV" ? "fw-700 active" : ""}`}
          onClick={() => setActiveComponent("DataIV")}
        >
          تفاصيل البيانات 4
        </p>
      </div>
      <div className="data-display-container">{renderComponent()}</div>
    </div>
  );
};

export default ProjectDashboard;