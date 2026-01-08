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
                  <td>{document.code}</td>
                  <td>{document.requestTitle}</td>
                  <td>{document.requestDate}</td>
                  <td>{document.requestType}</td>
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
