import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Outlet /> 
      </main>

      {/* Footer */}
      <div className="footer-hp">
        <p>تحت اشراف مكتب ادارة المشاريع</p>
      </div>
    </div>
  );
};

export default Layout;
