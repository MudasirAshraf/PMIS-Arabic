import React, { useState, useEffect } from "react";

const PreviousChange = ({ goToPreviousTab, goToNextTab }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const Documents = [
      {
        code: "A123",
        requestTitle: "تعديل صلاحيات",
        requestDate: "2025-04-30",
        requestType: "صلاحيات",
      },
      {
        code: "B456",
        requestTitle: "طلب وصول",
        requestDate: "2025-04-28",
        requestType: "وصول",
      },
      {
        code: "B456",
        requestTitle: "طلب وصول",
        requestDate: "2025-04-28",
        requestType: "وصول",
      },
    ];
    setDocuments(Documents);
  }, []);

    const renderCell = (value) => (
    <span
      className="cell-text"
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--tooltip-top",
          `${rect.top + rect.height}px`
        );
        e.currentTarget.style.setProperty("--tooltip-left", `${rect.left}px`);
      }}
      data-fulltext={value ?? "_"}
    >
      {value ?? "_"}
    </span>
  );

  return (
    <div className="main-container-previous-change">
      {/* Table-Container */}
      <div className="ui-table-container">
        <table className="ui-table">
          <thead className="fs-md fw-700 lh-1-2">
            <tr>
              <th>الرمز</th>
              <th>عنوان الطلب</th>
              <th>تاريخ الطلب</th>
              <th>نوع الطلب</th>
            </tr>
          </thead>
          <tbody className="fs-m fw-500 lh-1-2">
            {documents.length > 0 ? (
              documents.map((document, idx) => (
                <tr key={idx}>
                  <td>{renderCell(document.code)}</td>
                  <td>{renderCell(document.requestTitle)}</td>
                  <td>{renderCell(document.requestDate)}</td>
                  <td>{renderCell(document.requestType)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "start" }}>
                  لا يوجد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Shuffle-Buttons */}
      <div className="shuffle-btns-container">
        {goToPreviousTab && (
          <button
            className="prev fs-md fw-600 lh-1-2"
            onClick={goToPreviousTab}
          >
            السابق
          </button>
        )}
        {goToNextTab && (
          <button className="next fs-md fw-600 lh-1-2" onClick={goToNextTab}>
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviousChange;
