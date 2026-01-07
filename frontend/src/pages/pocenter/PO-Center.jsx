import React, { useState, useEffect } from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../ThemeContext";
import POCard from "../../cards/pocard/po-card";
import "./pocenter.scss";

const POCenter = () => {
  const { theme } = useTheme();

  const demoPOData = [
    { poNumber: "4100000010", totalAmount: "2,000.00" },
    { poNumber: "4100000011", totalAmount: "3,450.50" },
    { poNumber: "4100000012", totalAmount: "6,125.75" },
    { poNumber: "4100000013", totalAmount: "7,800.00" },
    { poNumber: "4100000014", totalAmount: "9,999.99" },
    { poNumber: "4100000015", totalAmount: "1,200.00" },
    { poNumber: "4100000016", totalAmount: "8,800.00" },
    { poNumber: "4100000017", totalAmount: "5,000.00" },
    { poNumber: "4100000018", totalAmount: "3,300.00" },
    { poNumber: "4100000019", totalAmount: "4,150.00" },
    { poNumber: "4100000020", totalAmount: "6,600.00" },
    { poNumber: "4100000021", totalAmount: "7,700.00" },
    { poNumber: "4100000022", totalAmount: "9,200.00" },
    { poNumber: "4100000023", totalAmount: "2,250.00" },
    { poNumber: "4100000024", totalAmount: "3,300.00" },
    { poNumber: "4100000025", totalAmount: "5,500.00" },
    { poNumber: "4100000026", totalAmount: "4,750.00" },
    { poNumber: "4100000027", totalAmount: "1,875.00" },
    { poNumber: "4100000028", totalAmount: "2,950.00" },
    { poNumber: "4100000029", totalAmount: "8,999.00" },
  ];

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 6 : 16 );
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(demoPOData.length / itemsPerPage);

  const currentItems = demoPOData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="main-container-PO-Center">
      {/* Header Para */}
      <div className="header-po-page fs-lg fw-700 lh-1-2">
        <p>بوابة إتقان / بوابة المشاريع</p>
      </div>
      {/* Header */}
      <div className="header-PO-center">
        <div className="first-header-PO-center">
          <TfiLayoutGrid3
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-lg fw-700 lh-1-3">أمر شراء</p>
        </div>
      </div>
      {/* Filters and Search Section */}
      <div className="po-center-filters">
        <div className="po-flex">
          <span className="po-center-label fs-md fw-600 lh-1-3">جميع أوامر الشراء</span>
          <span className="po-center-badge fs-sm fw-600 lh-1">1384</span>
        </div>
        <div className="po-flex-I">
          <span className="po-center-label fs-md fw-600 lh-1-3">إصدار</span>
          <div className="po-center-dropdown">
            <select className="fs-sm fw-500 lh-1-2">
              <option>...Select</option>
            </select>
          </div>
          <div className="po-center-amount fs-md lh-1-3 fw-500">المبلغ 1,336,264,918.46</div>
        </div>
        {/* Search */}
        <div className="po-center-search">
  <input
    type="text"
    placeholder="بحث برقم أمر شراء"
    className="fs-sm fw-400 lh-1"
  />
   <FiSearch className="po-center-search-icon" />
</div>
      </div>
      {/* PO-CARD- Grid */}
      <div className="po-card-grid">
        {currentItems.map((po, idx) => (
          <POCard
            key={idx}
            poNumber={po.poNumber}
            totalAmount={po.totalAmount}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination" dir="ltr">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === totalPages - index ? "active" : ""
            }`}
            onClick={() => handlePageChange(totalPages - index)}
          >
            {totalPages - index}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          &gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};
export default POCenter;
