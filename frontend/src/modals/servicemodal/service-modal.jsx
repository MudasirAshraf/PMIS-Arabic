import React, { useState, useEffect } from "react";
import { FaBolt } from "react-icons/fa";
import "./servicemodal.scss";

const ServiceModal = ({
  isOpen,
  onClose,
  title,
  data,
  columns,
  dropdownOptions,
  filterColumn,
  subFilterColumn,
  subFilterOptions = [],
  dataCounts,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSubFilter, setSelectedSubFilter] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const firstFilteredData =
    searchTerm.trim() !== ""
      ? filteredData
      : selectedFilter
      ? data.filter((row) => row[filterColumn] === selectedFilter)
      : [];

  const secondFilteredData =
    selectedSubFilter && subFilterColumn
      ? firstFilteredData.filter(
          (row) =>
            row[subFilterColumn]?.toString().trim() ===
            selectedSubFilter.toString().trim()
        )
      : firstFilteredData;

  // Calculation of average quantity
  const averageQuantity =
    title === "مشاريع" &&
    dropdownOptions.includes(selectedFilter) &&
    (selectedSubFilter
      ? secondFilteredData.length > 0
      : firstFilteredData.length > 0)
      ? (
          (selectedSubFilter ? secondFilteredData : firstFilteredData).reduce(
            (sum, row) => {
              const quantity = parseFloat(row["الكمية"]);
              return sum + (isNaN(quantity) ? 0 : quantity);
            },
            0
          ) /
          (selectedSubFilter
            ? secondFilteredData.length
            : firstFilteredData.length)
        ).toFixed(2)
      : null;

      // Table-Cell-Hover
         const renderCell = (value) => (
  <span
    className="cell-text"
    data-fulltext={value ?? "_"}
  >
    {value ?? "_"}
  </span>
);

  return (
    <div className="service-modal-overlay">
      <div className="service-modal-container">
        <div className="service-modal-header">
          <h2 className="fs-xl lh-1-2 fw-700">{title}</h2>
          <button onClick={onClose} className="service-modal-close">
            &times;
          </button>
        </div>

        <div className="service-modal-content">
          {/* First Level Filter */}
          <div className="service-modal-content-container">
            <div
              className={
                showTable
                  ? "service-modal-buttons-top"
                  : "service-modal-buttons"
              }
            >
              <button
                onClick={() => {
                  setSelectedFilter("");
                  setSelectedSubFilter("");
                  setShowTable(true);
                }}
                className={`fs-md lh-1 fw-700 ${
                  selectedFilter === "" ? "active-button" : ""
                }`}
              >
                عرض الأعمدة فقط
              </button>
              {dropdownOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedFilter(option);
                    setSelectedSubFilter("");
                    setSearchTerm("");
                    setFilteredData([]);
                    setShowTable(true);
                  }}
                  className={`fs-md lh-1 fw-700 ${
                    selectedFilter === option ? "active-button" : ""
                  }`}
                >
                  <FaBolt className="icon" />
                  <div className="count-container">
                    <span className="title">{option}</span>
                    <span className="count">{dataCounts[option]}</span>
                  </div>
                </button>
              ))}
            </div>
            {/* Search bar  */}
            {!subFilterColumn && subFilterOptions.length === 0 && (
              <div className="srchbar-container">
                <input
                  type="text"
                  placeholder="ابحث هنا..."
                  value={searchTerm}
                  onChange={(e) => {
                    const term = e.target.value;
                    setSearchTerm(term);
                    setSelectedFilter("");
                    setSelectedSubFilter("");

                    if (term.trim() !== "") {
                      const results = data.filter((item) =>
                        item["عنوان"]
                          ?.toString()
                          .toLowerCase()
                          .includes(term.toLowerCase())
                      );
                      setFilteredData(results);
                    } else {
                      setFilteredData([]);
                    }
                  }}
                  className="srchbar-input"
                />
              </div>
            )}
          </div>
          {/* Second Level Filter  */}
          {selectedFilter && subFilterColumn && subFilterOptions.length > 0 && (
            <div className="service-modal-buttons sub-filter">
              {subFilterOptions.map((subOption, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSubFilter(subOption)}
                  className={`fs-md lh-1 fw-700 ${
                    selectedSubFilter === subOption ? "active-button" : ""
                  }`}
                >
                  {subOption}
                </button>
              ))}
            </div>
          )}
          {/* Average Quantity */}
          {averageQuantity !== null && (
            <div className="average-label">متوسط الكمية: {averageQuantity}</div>
          )}
          {/* Table */}
          <div
            className={`service-modal-table-container ${
              showTable ? "show" : "hide"
            }`}
          >
            <table className="service-modal-table">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th key={index}  className="fs-md lh-1-3 fw-700 text-center">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {secondFilteredData.length > 0 ? (
                  secondFilteredData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <td key={colIndex}  className="fs-md lh-1-3 fw-500 text-center">{renderCell(row[col])}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="fs-md lh-1-3 fw-500 text-center">لا توجد بيانات</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
