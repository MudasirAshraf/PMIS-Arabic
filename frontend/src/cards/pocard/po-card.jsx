import React, { useState, useEffect } from "react";
import { FaEye, FaMoneyBillWave, FaCoins } from "react-icons/fa";
import { TbFileInvoice, TbChartPie4 } from "react-icons/tb";
import BOQModal from "../../modals/boq-modal/BOQModal";
import MODALPO from "../../modals/modal-po/ModalPO";
import "./pocard.scss";

const POCard = ({ poNumber, totalAmount }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalHeaders, setModalHeaders] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [chartModalOpen, setChartModalOPen] = useState(false);

  const openModalWithData = (title, headers, data) => {
    setModalTitle(title);
    setModalHeaders(headers);
    setModalData(data);
    setModalOpen(true);
  };

  //Restricted Body Scroll
  useEffect(() => {
    if (modalOpen || chartModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen, chartModalOpen]);

  const handleIconClick = (type) => {
    if (type === "eye") {
      openModalWithData(
        "1- أمر شراء",
        [
          "#",
          "رقم أمر شراء",
          "الوصف",
          "الفئة",
          "الكمية",
          "السعر للوحدة",
          "الإجمالي مع الضريبة",
        ],
        [
          ["1", "2200000011", "خدمة استضافة", "EA", "6", "100000", "690000"],
          ["2", "2200000012", "شراء خوادم", "EA", "3", "400000", "1380000"],
          ["3", "2200000013", "ترخيص البرامج", "EA", "10", "50000", "575000"],
          ["4", "2200000014", "تدريب المستخدمين", "EA", "25", "8000", "230000"],
        ]
      );
    } else if (type === "invoice") {
      openModalWithData(
        "2- الاستلام",
        [
          "#",
          "اسم الملف",
          "النوع",
          "تاريخ الإنشاء",
          "آخر تعديل",
          "الحجم",
          "المالك",
        ],
        [
          [
            "1",
            "عرض سعر.pdf",
            "PDF",
            "2024-05-01",
            "2024-05-10",
            "2MB",
            "فريق العطاءات",
          ],
          [
            "2",
            "مذكرة.docx",
            "DOCX",
            "2024-04-28",
            "2024-05-09",
            "1MB",
            "الإدارة",
          ],
          [
            "3",
            "تفاصيل العقد.xlsx",
            "XLSX",
            "2024-05-02",
            "2024-05-10",
            "500KB",
            "القانوني",
          ],
        ]
      );
    } else if (type === "money") {
      openModalWithData(
        "3- المعتمد",
        [
          "#",
          "اسم الدفعة",
          "المبلغ",
          "تاريخ الصرف",
          "طريقة الدفع",
          "الحالة",
          "الجهة المستفيدة",
        ],
        [
          [
            "1",
            "دفعة أولى",
            "10000",
            "2024-05-01",
            "تحويل بنكي",
            "مدفوعة",
            "شركة X",
          ],
          [
            "2",
            "دفعة ثانية",
            "15000",
            "2024-05-10",
            "شيك",
            "قيد المعالجة",
            "شركة Y",
          ],
          [
            "3",
            "دفعة ثالثة",
            "20000",
            "2024-05-15",
            "تحويل بنكي",
            "مدفوعة",
            "شركة Z",
          ],
        ]
      );
    } else if (type === "coins") {
      openModalWithData(
        "4- المفوتر",
        ["#", "البند", "المبلغ", "الجهة", "الفاتورة", "التاريخ", "الحالة"],
        [
          [
            "1",
            "خدمات التطوير",
            "50000",
            "المطورون",
            "INV001",
            "2024-05-05",
            "مدفوعة",
          ],
          [
            "2",
            "خدمات التصميم",
            "30000",
            "المصممون",
            "INV002",
            "2024-05-06",
            "قيد المراجعة",
          ],
          [
            "3",
            "الدعم الفني",
            "20000",
            "الدعم",
            "INV003",
            "2024-05-07",
            "مرفوضة",
          ],
        ]
      );
    } else if (type === "summary") {
      setChartModalOPen(true);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="po-card">
        <div className="po-card-top">
          <span className="po-number fs-lg fw-700 lh-1-2">{poNumber}</span>
          <span className="po-amount fs-md fw-700 lh-1-2">
            اجمالي مبلغ:
            <span className="po-span fs-md fw-500 lh-1-2">
              {parseFloat(totalAmount.replace(/,/g, "")).toLocaleString()}
            </span>
          </span>
        </div>
        <div className="po-card-icons">
          <FaEye className="file-icon" onClick={() => handleIconClick("eye")} />
          <TbFileInvoice
            className="file-icon"
            onClick={() => handleIconClick("invoice")}
          />
          <FaMoneyBillWave
            className="file-icon"
            onClick={() => handleIconClick("money")}
          />
          <FaCoins
            className="file-icon"
            onClick={() => handleIconClick("coins")}
          />
          <TbChartPie4
            className="file-icon"
            onClick={() => handleIconClick("summary")}
          />
        </div>
      </div>
      {/* BOQ-MODAL-TABLE */}
      <BOQModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={modalTitle}
        headers={modalHeaders}
        data={modalData}
      />
      {/* CHART-MODAL-PO */}
      <MODALPO
        isOpen={chartModalOpen}
        onClose={() => setChartModalOPen(false)}
      />
    </>
  );
};

export default POCard;
