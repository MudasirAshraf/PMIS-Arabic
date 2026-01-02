import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaDownload, FaEye } from "react-icons/fa";
import { IoArrowForwardCircle } from "react-icons/io5";
import AI from "../../assets/documents/AI.pdf";
import WordFile from "../../assets/documents/sample.docx";
import ExcelFile from "../../assets/documents/sample.xlsx";
import ImageFile from "../../assets/documents/sample.jpg";
import DocumentViewModal from "../../modals/documentview-modal/DocumentViewModal";
import "./folderview.scss";

const FolderView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(4);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDocumentsPerPage(4);
      } else if (window.innerWidth <= 768) {
        setDocumentsPerPage(6);
      } else {
        setDocumentsPerPage(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const documentData = {
    "المجلد-الأول": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يحتوي هذا الملف على مقترح المشروع بالتفصيل، بما في ذلك الأهداف والخطوات التنفيذية. يتم تناول تحليل الفكرة، الموارد المطلوبة، والتحديات المحتملة. كما يوضح الخطوات المتبعة لضمان نجاح المشروع ضمن الجدول الزمني المحدد. يتضمن أيضًا خطة للتعامل مع المخاطر المحتملة وكيفية تحقيق أعلى مستويات الكفاءة. هذا المستند ضروري لفهم المشروع قبل البدء في تنفيذه.",
      },
      {
        title: "خطة الميزانية",
        file: WordFile,
        type: "docx",
        description:
          "تحليل شامل للتكاليف المتوقعة للمشروع، يشمل المصروفات التشغيلية والاستثمارية. يحتوي المستند على تقديرات دقيقة لجميع النفقات، بما في ذلك تكاليف المواد، العمالة، والتكنولوجيا المستخدمة. كما يتضمن خطة مالية بديلة في حالة حدوث تغييرات غير متوقعة في الميزانية. هذا المستند يساعد على إدارة الموارد بفعالية وضمان عدم تجاوز الميزانية المخطط لها.",
      },
      {
        title: "الجدول الزمني",
        file: ExcelFile,
        type: "xlsx",
        description:
          "مخطط زمني مفصل يحدد المراحل الأساسية للمشروع والمهام المطلوبة في كل مرحلة. يتضمن تقديرًا زمنيًا لكل نشاط لضمان تنفيذ المشروع في الوقت المحدد. يساعد في تتبع التقدم واتخاذ إجراءات تصحيحية إذا حدثت تأخيرات. كما يتضمن قائمة بالمخاطر المحتملة وكيفية التعامل معها للحفاظ على سير العمل بسلاسة.",
      },
      {
        title: "شعار الشركة",
        file: ImageFile,
        type: "image",
        description:
          "الشعار الرسمي للشركة بتصميم عالي الجودة يمكن استخدامه في العروض التقديمية والمستندات الرسمية. يعكس هوية الشركة ورؤيتها بطريقة احترافية. يتوفر بعدة تنسيقات تناسب مختلف الاستخدامات مثل الطباعة والتصميمات الرقمية. يُمكن استخدامه في مواقع التواصل الاجتماعي والمواد التسويقية لتعزيز العلامة التجارية.",
      },
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يحتوي هذا الملف على مقترح المشروع بالتفصيل، بما في ذلك الأهداف والخطوات التنفيذية. يتم تناول تحليل الفكرة، الموارد المطلوبة، والتحديات المحتملة. كما يوضح الخطوات المتبعة لضمان نجاح المشروع ضمن الجدول الزمني المحدد. يتضمن أيضًا خطة للتعامل مع المخاطر المحتملة وكيفية تحقيق أعلى مستويات الكفاءة. هذا المستند ضروري لفهم المشروع قبل البدء في تنفيذه.",
      },
      {
        title: "خطة الميزانية",
        file: WordFile,
        type: "docx",
        description:
          "تحليل شامل للتكاليف المتوقعة للمشروع، يشمل المصروفات التشغيلية والاستثمارية. يحتوي المستند على تقديرات دقيقة لجميع النفقات، بما في ذلك تكاليف المواد، العمالة، والتكنولوجيا المستخدمة. كما يتضمن خطة مالية بديلة في حالة حدوث تغييرات غير متوقعة في الميزانية. هذا المستند يساعد على إدارة الموارد بفعالية وضمان عدم تجاوز الميزانية المخطط لها.",
      },
      {
        title: "الجدول الزمني",
        file: ExcelFile,
        type: "xlsx",
        description:
          "مخطط زمني مفصل يحدد المراحل الأساسية للمشروع والمهام المطلوبة في كل مرحلة. يتضمن تقديرًا زمنيًا لكل نشاط لضمان تنفيذ المشروع في الوقت المحدد. يساعد في تتبع التقدم واتخاذ إجراءات تصحيحية إذا حدثت تأخيرات. كما يتضمن قائمة بالمخاطر المحتملة وكيفية التعامل معها للحفاظ على سير العمل بسلاسة.",
      },
      {
        title: "شعار الشركة",
        file: ImageFile,
        type: "image",
        description:
          "الشعار الرسمي للشركة بتصميم عالي الجودة يمكن استخدامه في العروض التقديمية والمستندات الرسمية. يعكس هوية الشركة ورؤيتها بطريقة احترافية. يتوفر بعدة تنسيقات تناسب مختلف الاستخدامات مثل الطباعة والتصميمات الرقمية. يُمكن استخدامه في مواقع التواصل الاجتماعي والمواد التسويقية لتعزيز العلامة التجارية.",
      },
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يحتوي هذا الملف على مقترح المشروع بالتفصيل، بما في ذلك الأهداف والخطوات التنفيذية. يتم تناول تحليل الفكرة، الموارد المطلوبة، والتحديات المحتملة. كما يوضح الخطوات المتبعة لضمان نجاح المشروع ضمن الجدول الزمني المحدد. يتضمن أيضًا خطة للتعامل مع المخاطر المحتملة وكيفية تحقيق أعلى مستويات الكفاءة. هذا المستند ضروري لفهم المشروع قبل البدء في تنفيذه.",
      },
      {
        title: "خطة الميزانية",
        file: WordFile,
        type: "docx",
        description:
          "تحليل شامل للتكاليف المتوقعة للمشروع، يشمل المصروفات التشغيلية والاستثمارية. يحتوي المستند على تقديرات دقيقة لجميع النفقات، بما في ذلك تكاليف المواد، العمالة، والتكنولوجيا المستخدمة. كما يتضمن خطة مالية بديلة في حالة حدوث تغييرات غير متوقعة في الميزانية. هذا المستند يساعد على إدارة الموارد بفعالية وضمان عدم تجاوز الميزانية المخطط لها.",
      },
      {
        title: "الجدول الزمني",
        file: ExcelFile,
        type: "xlsx",
        description:
          "مخطط زمني مفصل يحدد المراحل الأساسية للمشروع والمهام المطلوبة في كل مرحلة. يتضمن تقديرًا زمنيًا لكل نشاط لضمان تنفيذ المشروع في الوقت المحدد. يساعد في تتبع التقدم واتخاذ إجراءات تصحيحية إذا حدثت تأخيرات. كما يتضمن قائمة بالمخاطر المحتملة وكيفية التعامل معها للحفاظ على سير العمل بسلاسة.",
      },
      {
        title: "شعار الشركة",
        file: ImageFile,
        type: "image",
        description:
          "الشعار الرسمي للشركة بتصميم عالي الجودة يمكن استخدامه في العروض التقديمية والمستندات الرسمية. يعكس هوية الشركة ورؤيتها بطريقة احترافية. يتوفر بعدة تنسيقات تناسب مختلف الاستخدامات مثل الطباعة والتصميمات الرقمية. يُمكن استخدامه في مواقع التواصل الاجتماعي والمواد التسويقية لتعزيز العلامة التجارية.",
      },
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يحتوي هذا الملف على مقترح المشروع بالتفصيل، بما في ذلك الأهداف والخطوات التنفيذية. يتم تناول تحليل الفكرة، الموارد المطلوبة، والتحديات المحتملة. كما يوضح الخطوات المتبعة لضمان نجاح المشروع ضمن الجدول الزمني المحدد. يتضمن أيضًا خطة للتعامل مع المخاطر المحتملة وكيفية تحقيق أعلى مستويات الكفاءة. هذا المستند ضروري لفهم المشروع قبل البدء في تنفيذه.",
      },
      {
        title: "خطة الميزانية",
        file: WordFile,
        type: "docx",
        description:
          "تحليل شامل للتكاليف المتوقعة للمشروع، يشمل المصروفات التشغيلية والاستثمارية. يحتوي المستند على تقديرات دقيقة لجميع النفقات، بما في ذلك تكاليف المواد، العمالة، والتكنولوجيا المستخدمة. كما يتضمن خطة مالية بديلة في حالة حدوث تغييرات غير متوقعة في الميزانية. هذا المستند يساعد على إدارة الموارد بفعالية وضمان عدم تجاوز الميزانية المخطط لها.",
      },
      {
        title: "الجدول الزمني",
        file: ExcelFile,
        type: "xlsx",
        description:
          "مخطط زمني مفصل يحدد المراحل الأساسية للمشروع والمهام المطلوبة في كل مرحلة. يتضمن تقديرًا زمنيًا لكل نشاط لضمان تنفيذ المشروع في الوقت المحدد. يساعد في تتبع التقدم واتخاذ إجراءات تصحيحية إذا حدثت تأخيرات. كما يتضمن قائمة بالمخاطر المحتملة وكيفية التعامل معها للحفاظ على سير العمل بسلاسة.",
      },
      {
        title: "شعار الشركة",
        file: ImageFile,
        type: "image",
        description:
          "الشعار الرسمي للشركة بتصميم عالي الجودة يمكن استخدامه في العروض التقديمية والمستندات الرسمية. يعكس هوية الشركة ورؤيتها بطريقة احترافية. يتوفر بعدة تنسيقات تناسب مختلف الاستخدامات مثل الطباعة والتصميمات الرقمية. يُمكن استخدامه في مواقع التواصل الاجتماعي والمواد التسويقية لتعزيز العلامة التجارية.",
      },
    ],
    "المجلد-الثاني": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يحتوي هذا الملف على مقترح لمشروع جديد يتناول الفكرة العامة، الأهداف، وآلية التنفيذ. يشمل خطة تفصيلية لضمان نجاح المشروع وفقًا للموارد المتاحة. كما يتضمن تحليل المخاطر المحتملة وخطط الطوارئ لمعالجة أي تحديات مستقبلية. يُستخدم هذا المستند كأساس لاتخاذ القرارات حول المضي قدمًا في المشروع.",
      },
    ],
    "المجلد-الثالث": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "وثيقة شاملة توضح تفاصيل المشروع الاستراتيجي مع تحديد الأهداف والخطوات الرئيسية. تحتوي على تحليل دقيق للسوق والفرص المتاحة للمشروع. كما تتضمن خطة تشغيلية تحدد المسؤوليات والجداول الزمنية للمهام المختلفة. يوفر هذا المستند رؤية واضحة للمشروع قبل بدء التنفيذ.",
      },
    ],
    "المجلد-الرابع": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يشرح هذا المستند مفهوم المشروع وخطوات تنفيذه لضمان تحقيق الأهداف المرجوة. يحتوي على تقييم شامل للجدوى الاقتصادية للمشروع. كما يتناول الموارد المطلوبة، بما في ذلك القوى العاملة والبنية التحتية اللازمة. يقدم توصيات مهمة حول تحسين كفاءة التنفيذ وضمان النجاح.",
      },
    ],
    "المجلد-الخامس": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "تفاصيل المشروع متضمنة أهدافه الرئيسية وكيفية تحقيقها بكفاءة. يحتوي المستند على تحليل شامل للعوامل المؤثرة في نجاح المشروع. كما يتضمن دراسة الجدوى المالية وآثارها طويلة المدى على الشركة. يساعد هذا الملف في اتخاذ قرارات مستنيرة حول المشروع قبل بدء العمل عليه.",
      },
    ],
    "المجلد-السادس": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "يتناول هذا المستند جميع الجوانب الهامة لتنفيذ المشروع بفعالية. يشمل تحليلًا دقيقًا للمخاطر المحتملة وخطط التعامل معها. كما يحتوي على استراتيجيات لضمان تحقيق أقصى استفادة من الموارد المتاحة. يعد هذا الملف أداة أساسية للتخطيط الناجح وتنفيذ المشروع بسلاسة.",
      },
    ],
    "المجلد-السابع": [
      {
        title: "مقترح المشروع",
        file: AI,
        type: "pdf",
        description:
          "وثيقة استراتيجية تحتوي على معلومات تفصيلية حول المشروع وجدواه الاقتصادية. تتضمن تحليلًا للفرص والتحديات التي قد تواجه المشروع أثناء التنفيذ. كما تقدم نظرة مستقبلية حول تأثير المشروع على السوق المستهدف. يساهم هذا المستند في وضع خطط متينة لتحقيق النجاح المتوقع.",
      },
    ],
  };

  const documents = documentData[title] || [];
  const totalDocuments = documents.length;

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(totalDocuments / documentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to Document Details
  const handleDetailsClick = (doc) => {
    navigate("/document-details", { state: { doc } });
  };

  const openModal = (doc) => {
    setSelectedDocument(doc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
  };

  //  File Preview
  const renderFile = (doc) => {
    return (
      <div className="file-container">
        {doc.type === "pdf" ? (
          <embed
            src={doc.file}
            className="file-preview"
            type="application/pdf"
          />
        ) : doc.type === "image" ? (
          <img src={doc.file} alt={doc.title} className="file-preview" />
        ) : (
          <div className="download-container">
            <p className="file-title fs-md fw-700 lh-1-2">{doc.title}</p>
          </div>
        )}
        <a href={doc.file} download className="download-icon">
          <FaDownload size={20} />
        </a>
      </div>
    );
  };

  return (
    <div className="folder-view-container">
      {/* Header */}
      <div className="header-container-video-center">
        <IoArrowForwardCircle
          onClick={() => navigate(-1)}
          className="back-icon"
        />
        <header className="header-video-center fs-lg fw-700 lh-1-3">{title}</header>
      </div>
      {/* Document List */}
      <div className="document-grid">
        {currentDocuments.length > 0 ? (
          currentDocuments.map((doc, index) => (
            <div key={index} className="document-item">
              <h2 className="document-title fs-md fw-700 lh-1-2 text-start">{doc.title}</h2>
              {renderFile(doc)}
              <div className="button-container-fv">
                <button className="view-btn-fv fs-md fw-700 lh-1" onClick={() => openModal(doc)}>
                  <FaEye className="icon-fv" /> عرض
                </button>
                <button
                  className="details-btn-fv fs-md fw-700 lh-1"
                  onClick={() => handleDetailsClick(doc)}
                >
                  التفاصيل
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No documents available</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <DocumentViewModal doc={selectedDocument} onClose={closeModal} />
      )}

      {/* Pagination Controls */}
      {totalDocuments > documentsPerPage && (
        <div className="main-container-pagination-control">
          <div className="video-pagination-controls">
            <button
              className={`video-pagination-btn ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className={`video-pagination-btn ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {[
              ...Array(Math.ceil(totalDocuments / documentsPerPage)).keys(),
            ].map((page) => (
              <button
                key={page + 1}
                className={`video-pagination-btn ${
                  currentPage === page + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            ))}

            <button
              className={`video-pagination-btn ${
                currentPage === Math.ceil(totalDocuments / documentsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(totalDocuments / documentsPerPage)
              }
            >
              ›
            </button>
            <button
              className={`video-pagination-btn ${
                currentPage === Math.ceil(totalDocuments / documentsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage(Math.ceil(totalDocuments / documentsPerPage))
              }
              disabled={
                currentPage === Math.ceil(totalDocuments / documentsPerPage)
              }
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderView;
