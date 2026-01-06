import React, { useState } from "react";
import { FaCubes } from "react-icons/fa6";
import { useTheme } from "../../ThemeContext";
import { FaEye } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { FaCoins, FaMoneyBillAlt, FaFileAlt } from "react-icons/fa";
import BOQModal from "../../modals/boq-modal/BOQModal";
import "./boqcenter.scss";

const BOQCenter = () => {
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalHeaders, setModalHeaders] = useState([]);
  const [modalData, setModalData] = useState([]);

  const openModalWithData = (title, headers, data) => {
    setModalTitle(title);
    setModalHeaders(headers);
    setModalData(data);
    setModalOpen(true);
  };

  const handleIconClick = (type) => {
    if (type === "top-eye") {
      openModalWithData(
        "طلب شراء",
        [
          "#",
          "رقم طلب شراء",
          "الوصف",
          "التصنيف",
          "العدد",
          "القيمة",
          "اجمالي قيمة (مع ضريبة)",
        ],
        [
          [
            "1",
            "1100000071",
            "بناء النظام المالي",
            "EA",
            "10",
            "1000000",
            "1150000",
          ],
          ["2", "1100000071", "تطوير الواجهة", "EA", "15", "750000", "862500"],
          ["3", "1100000071", "إدارة المحتوى", "EA", "8", "400000", "460000"],
          ["4", "1100000071", "تحسين الأداء", "EA", "20", "300000", "345000"],
          ["5", "1100000071", "تحليل البيانات", "EA", "5", "250000", "287500"],
        ]
      );
    } else if (type === "eye") {
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
          ["5", "2200000015", "خدمة دعم فني", "EA", "12", "30000", "460000"],
        ]
      );
    } else if (type === "file") {
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
          [
            "4",
            "مواصفات المشروع.pdf",
            "PDF",
            "2024-05-03",
            "2024-05-10",
            "3MB",
            "الهندسي",
          ],
          [
            "5",
            "جدول الكميات.csv",
            "CSV",
            "2024-05-01",
            "2024-05-08",
            "800KB",
            "التوريد",
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
          ["4", "دفعة رابعة", "25000", "2024-05-20", "شيك", "مرفوضة", "مورد A"],
          [
            "5",
            "دفعة خامسة",
            "30000",
            "2024-05-25",
            "تحويل بنكي",
            "موافق عليها",
            "مورد B",
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
          [
            "4",
            "تسويق رقمي",
            "15000",
            "التسويق",
            "INV004",
            "2024-05-08",
            "قيد التحصيل",
          ],
          [
            "5",
            "تحليل البيانات",
            "18000",
            "التحليل",
            "INV005",
            "2024-05-09",
            "موافق عليها",
          ],
        ]
      );
    }
  };

  const closeModal = () => setModalOpen(false);
  return (
    <div className="main-container-BOQ-Center">
      {/* Header */}
      <div className="header-BOQ-center">
        <div className="first-header-BOQ-center fs-lg fw-700 lh-1-4">
          <FaCubes
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p>
            جدول كميات - مشروع تطوير و تصميم منظومة منصة الحساب الوقفي الرقمي
            'أوقاف PAY
          </p>
        </div>
      </div>
      {/* Second-Header */}
      <div className="second-header-boq fs-md fw-700 lh-1-2">
        <p>جميع طلب شراء</p>
      </div>
      {/* Card */}
      <div className="first-card-boq">
        <p className="value-card-boq fs-lg fw-700 lh-1-2">1100000071</p>
        <div className="content-card-boq">
          <p className="para-content fs-md fw-600 lh-1-2">اجمالي مبلغ : </p>
          <p className="para-content-value fs-md fw-600 lh-1-2">
            15,887,050.52
          </p>
          <FaEye
            className="file-icon"
            onClick={() => handleIconClick("top-eye")}
          />
          <MdAttachFile className="file-icon" />
          <MdAttachFile className="file-icon" />
        </div>
      </div>
      {/* Third-Header */}
      <div className="second-header-boq fs-md fw-700 lh-1-2">
        <p>جميع أمر شراء</p>
      </div>
      {/* Card here below */}
      <div className="boq-purchase-card">
        <div className="boq-header">
          <p className="boq-id fs-lg fw-700 lh-1-2">4300000428</p>
        </div>
        <div className="boq-values">
          <div className="boq-column">
            <p className="boq-label fs-md fw-700 lh-1-2">المبلغ</p>
            <p className="boq-value fs-md fw-700 lh-1-2">8,299,000.27</p>
            <p className="boq-label fs-md fw-700 lh-1-2">الاستلام</p>
            <p className="boq-value fs-md fw-700 lh-1-2">2,380,950.03</p>
            <div className="boq-icons">
              <FaEye
                className="file-icon"
                onClick={() => handleIconClick("eye")}
              />
              <FaFileAlt
                className="file-icon"
                onClick={() => handleIconClick("file")}
              />
              <FaMoneyBillAlt
                className="file-icon"
                onClick={() => handleIconClick("money")}
              />
              <FaCoins
                className="file-icon"
                onClick={() => handleIconClick("coins")}
              />
            </div>
          </div>
          <div className="boq-column">
            <p className="boq-label">المعتمد</p>
            <p className="boq-value">1,722,500.01</p>
            <p className="boq-label">المؤشر</p>
            <p className="boq-value">0.00</p>
          </div>
        </div>
      </div>
      {/* BOQ-Modal */}
      <BOQModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={modalTitle}
        headers={modalHeaders}
        data={modalData}
      />
    </div>
  );
};

export default BOQCenter;
