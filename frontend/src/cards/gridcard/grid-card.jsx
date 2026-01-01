import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../ThemeContext";
import Slider from "../../assets/svg/slider.svg";
import RedLine from "../../assets/svg/redline.svg";
import Arrow from "../../assets/svg/curve-arrow.svg";
import ArrowWhite from "../../assets/svg/curve-arrow-white.svg";
import "./gridcard.scss";

const GridCard = ({
  bg,
  id,
  department,
  startDate,
  endDate,
  phase,
  managerName,
  projectTitle,
  description,
  ownerName,
  sponsorName,
  budget,
  spent,
  multiSelectMode,
  selectedCards,
  setSelectedCards,
  onNavigate,
  onEdit,
  onDelete,
}) => {
  const { theme } = useTheme();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Timeline Calculation
  const parseYMD = (val) => {
    if (!val) return null;
    if (val instanceof Date && !isNaN(val)) return val;

    // Handle YYYY-MM-DD explicitly
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split("-").map(Number);
      return new Date(y, m - 1, d);
    }

    const dObj = new Date(val);
    return isNaN(dObj.getTime()) ? null : dObj;
  };

  const start = parseYMD(startDate);
  const end = parseYMD(endDate);
  const today = new Date();

  let percentage = 0;
  if (start && end && end.getTime() > start.getTime()) {
    const totalDuration = end.getTime() - start.getTime();
    const passedDuration = Math.min(
      Math.max(today.getTime() - start.getTime(), 0),
      totalDuration
    );
    percentage = (passedDuration / totalDuration) * 100;
    percentage = Math.round(percentage * 10) / 10;
  }
  const leftPosition = `${percentage}%`;

  const handleCheckboxChange = (checked) => {
    if (checked) setSelectedCards([...selectedCards, id]);
    else setSelectedCards(selectedCards.filter((i) => i !== id));
  };

  return (
    <div className="main-container-grid-card">
      {multiSelectMode && (
        <input
          type="checkbox"
          checked={selectedCards.includes(id)}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          className="multi-select-checkbox"
        />
      )}

      <div className="header-container-grid-card">
        <p className="fw-700 lh-1 fs-sm" onClick={() => onNavigate(id)}>
          {projectTitle}
        </p>

        <div className="menu-container" ref={menuRef}>
          <button
            className="menu-btn"
            disabled={multiSelectMode}
            onClick={() => !multiSelectMode && setMenuOpen((p) => !p)}
          >
            ⋮
          </button>

          {menuOpen && !multiSelectMode && (
            <div className="menu-dropdown">
              <p
                onClick={() => {
                  setMenuOpen(false);
                  onEdit({
                    id,
                    projectTitle,
                    description,
                    department,
                    phase,
                    managerName,
                    ownerName,
                    sponsorName,
                    budget,
                    spent,
                    startDate,
                    endDate,
                  });
                }}
              >
                تعديل
              </p>

              <p
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(id);
                }}
              >
                حذف
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="slider-container">
        <div className="dates">
          <p className="fs-s fw-700">
            {start ? start.toLocaleDateString("ar-EG") : "-"}
          </p>
          <p className="fs-s fw-700">
            {end ? end.toLocaleDateString("ar-EG") : "-"}
          </p>
        </div>
        <div>
          <img src={Slider} alt="slider" className="slider" />
          {start && end && end.getTime() > start.getTime() && (
            <div
              className="timeline-marker fs-s"
              style={{ left: leftPosition }}
            >
              <p className="p-timeline">اليوم</p>
              <img src={RedLine} alt="red-line" />
              <p className="para-timeline">{`${percentage.toFixed(1)}%`}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cards info */}
      <div className="cards-grid">
        <div className="cards-grid-i">
          <p className="p-card-grid fs-xs fw-500">المخطط</p>
          <p className="p-card-grid fs-xs fw-600">20%</p>
        </div>
        <div className="cards-grid-ii">
          <p className="p-card-grid fs-xs fw-500">الفعلي</p>
          <p className="p-card-grid fs-xs fw-600">5%</p>
        </div>
        <div className="cards-grid-iii" style={{ background: bg }}>
          <p className="p-card-grid-gradient fs-xs fw-500">الانحراف</p>
          <p className="p-card-grid-gradient fs-xs fw-600">15%</p>
        </div>
        <div className="cards-grid-iv">
          <img src={theme === "green" ? Arrow : ArrowWhite} alt="arrow" />
          <p className="p-card-grid fs-xs fw-600">5%</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-grid-card">
        <div className="footer-gc-div fs-s fw-700">{phase}</div>
        <p className="fs-s fw-700">{managerName}</p>
      </div>
    </div>
  );
};

export default GridCard;
