import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { BsUiRadiosGrid } from "react-icons/bs";
import { useTheme } from "../../ThemeContext";
import { AiOutlineSearch, AiFillDelete } from "react-icons/ai";
import { PiSquaresFour } from "react-icons/pi";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./buildteam.scss";

const BuildTeamCenter = () => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Zain Aladwani | زين العدواني" },
  ]);

  const handleDelete = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="main-container-build-center">
      {/* Header */}
      <div className="header-build-center">
        {/* I */}
        <div className="first-header-build-center">
          <BsUiRadiosGrid
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            أعضاء الفريق - مشروع تطوير و تصميم منظومة منصة الحساب الوقفي الرقمي
            'أوقاف PAY
          </p>
        </div>
        {/* II */}
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="add-modal-button fs-md fw-600 lh-1-2"
          >
            <MdEdit
              size={17}
              color={
                theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
              }
            />
            <p>إضافة أعضاء الفريق</p>
          </button>
        </div>
      </div>

      {/* Search-Bar && Document-Length */}
      <div className="container-search-length">
        <p className="search-para fs-md fw-700 lh-1-2">
          جميع الموارد
          <span className="search-span fs-sm fw-700 lh-1">
            {teamMembers.length}
          </span>
        </p>
        <div className="search-box">
          <input type="text" placeholder="ابحث..." className="search-input" />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>

      {/* Table Section */}
      <div className="build-team-table-container">
        <table className="build-team-table">
          <thead className="fs-m fw-700 lh-1">
            <tr>
              <th>الاسم</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1-2">
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <span className="team-member-name">{member.name}</span>
                  <AiFillDelete
                    className="delete-icon"
                    onClick={() => handleDelete(member.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Builder-Modal */}
      {showModal && (
        <div className="builder-modal-overlay">
          <div className="builder-modal-content">
            <div className="builder-modal-header">
              <div className="second-header-builder-modal">
                <PiSquaresFour className="project-icon" />
                <h3>إضافة أعضاء الفريق</h3>
              </div>
              <button
                className="builder-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="builder-modal-container">
              <label className="fs-md fw-700 lh-1-2">اختر أعضاء الفريق</label>
              <select
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="builder-modal-select fs-md fw-500 lh-1-2"
              >
                <option value="">-- اختر عضواً --</option>
                <option value="Asaad Amir | a.amir@awqaf.gov.sa">
                  Asaad Amir | a.amir@awqaf.gov.sa
                </option>
                <option value="Laila Hussein | l.hussein@awqaf.gov.sa">
                  Laila Hussein | l.hussein@awqaf.gov.sa
                </option>
                <option value="Khalid Saeed | k.saeed@awqaf.gov.sa">
                  Khalid Saeed | k.saeed@awqaf.gov.sa
                </option>
              </select>
            </div>
            <div className="builder-modal-buttons">
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button fs-md fw-600 lh-1-2"
              >
                إلغاء
              </button>
              <button
                className="save-button fs-md fw-600 lh-1-2"
                onClick={() => {
                  if (newMember.trim()) {
                    setTeamMembers((prev) => [
                      ...prev,
                      { id: Date.now(), name: newMember },
                    ]);
                    setNewMember("");
                    setShowModal(false);
                    toast.success("تمت الإضافة بنجاح!");
                  } else {
                    toast.error("يرجى اختيار عضو قبل الحفظ");
                  }
                }}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toast-Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
        toastStyle={{
          backgroundColor: "rgba(1,113,98,1)",
          boxShadow: "none",
          color: "#FFF",
          fontSize: "14px",
          padding: "8px 12px",
        }}
      />
    </div>
  );
};

export default BuildTeamCenter;
