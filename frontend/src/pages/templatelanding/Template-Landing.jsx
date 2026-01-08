import React from "react";
import { LuClipboardCopy } from "react-icons/lu";
import TemplateCard from "../../cards/templatecard/template-card";
import "./templanding.scss";

const Templates = () => {
  return (
    <div className="main-container-templates">
      {/* Header */}
      <p className="header-para-templates fs-md lh-1-2 fw-700">
        بوابة المقاول / المشاريع / المشاريع / التفاصيل المشروع
      </p>

      {/* Content */}
      <div className="content-templates">
        <LuClipboardCopy className="temp-icon" />
        <p className="fs-lg fw-700 lh-1-3">النماذج</p>
      </div>

      {/* Grid - Templates */}
      <div className="grid-templates">
        <TemplateCard title="ميثاق المشروع" link="/Project-Charter" />
        <TemplateCard title="تعيين مدير المشروع" link="/Project-Manager" />
        <TemplateCard title="خطة إدارة المشروع" link="/Project-Plan" />
        <TemplateCard title="إغلاق المشروع" link="/Project-Closure" />
      </div>
    </div>
  );
};

export default Templates;
