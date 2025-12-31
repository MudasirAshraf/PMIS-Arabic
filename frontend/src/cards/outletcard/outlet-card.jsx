import React from "react";
import Logo from "../../assets/svg/logo-white.svg";
import "./outletcard.scss";

const OutletCard = ({ title, children, isActive, onClick }) => {
  return (
    <div
      className="main-container-outletcard"
      style={{ opacity: isActive ? 1 : 0.5 }}
      onClick={onClick} 
    >
      <div style={{ paddingTop: "30px" }}>
        <img src={Logo} alt="logo" />
      </div>
      <div>
     <p className="para-outlet-card fw-700 fs-xl lh-1 text-start">
  {title}
</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default OutletCard;
