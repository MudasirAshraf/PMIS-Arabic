import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import { FaSearch, FaFilter } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import SearchFilterView from "../../components/searchfilterview/SearchFilterView";
import ChatModal from "../../modals/chatbox-modal/ChatBoxModal";
import DeleteModal from "../../modals/delete-modal/DeleteModal";
import DocumentPanelModal from "../../modals/documentpanel-modal/DocumentPanelModal";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./documentpanel.scss";

const DocumentPanel = () => {
  const { theme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedDocumentForChat, setSelectedDocumentForChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newName, setNewName] = useState("");
  const [moveTarget, setMoveTarget] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const [moveErrors, setMoveErrors] = useState({});

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "برنامج لفهر القاعة المؤسسية",
      type: "📜",
      modifiedBy: "بدر القاضي",
      modifiedDate: "25/11/2024",
    },
    {
      id: 2,
      name: "العقود",
      type: "📁",
      modifiedBy: "",
      modifiedDate: "09/03/2025",
    },
    {
      id: 4,
      name: "مخرجات المشروع",
      type: "📜",
      modifiedBy: "",
      modifiedDate: "09/03/2025",
    },
    {
      id: 5,
      name: "وثائق العقد المعتمدة",
      type: "📁",
      modifiedBy: "",
      modifiedDate: "09/03/2025",
    },
    {
      id: 6,
      name: "نماذج الإغلاق",
      type: "📁",
      modifiedBy: "",
      modifiedDate: "09/03/2025",
    },
  ]);

  // Open Chat Modal
  const handleOpenChat = (doc) => {
    setSelectedDocumentForChat(doc);
    setChatModalOpen(true);
  };

  // Send Message Chat Modal
  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
    }
  };

  // Delete
  const handleDelete = (id) => {
    setDocumentToDelete(id);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    const descendants = getDescendantIds(documentToDelete, documents);
    setDocuments((docs) =>
      docs.filter(
        (doc) => doc.id !== documentToDelete && !descendants.includes(doc.id)
      )
    );
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  // Save
  const handleSaveEdit = () => {
    if (!newName.trim()) {
      setEditErrors({ name: "مطلوب" });
      toast.error("يرجى إدخال اسم صالح");
      return;
    }

    setEditErrors({});
    if (selectedDocument) {
      setDocuments((prevDocs) =>
        prevDocs.map((doc) =>
          doc.id === selectedDocument.id ? { ...doc, name: newName } : doc
        )
      );
      setEditModalOpen(false);
      toast.success("تم تعديل الاسم بنجاح");
    } else {
      toast.error("لم يتم تحديد مستند للتعديل");
    }
  };

  const getDescendantIds = (id, docs, visited = new Set()) => {
    if (visited.has(id)) return [];
    visited.add(id);

    const children = docs.filter((doc) => doc.parentId === id);
    let descendants = [];

    for (let child of children) {
      descendants.push(child.id);
      descendants = descendants.concat(
        getDescendantIds(child.id, docs, visited)
      );
    }
    return descendants;
  };

  const validMoveTargets = documents.filter((doc) => {
    if (doc.type !== "📁") return false;
    if (!selectedDocument) return true;
    const invalidTargets = [
      selectedDocument.id,
      ...getDescendantIds(selectedDocument.id, documents),
    ];
    return !invalidTargets.includes(doc.id);
  });

  // Move Document
  const handleMoveDocument = () => {
    if (!selectedDocument) {
      toast.error("لم يتم تحديد مستند");
      return;
    }

    if (!moveTarget || moveTarget === "") {
      setMoveErrors({ target: "مطلوب" });
      toast.error("يرجى اختيار مجلد للنقل");
      return;
    }

    const parsedTarget = parseInt(moveTarget, 10);
    const isValidTarget = validMoveTargets.some(
      (folder) => folder.id === parsedTarget
    );

    if (!isValidTarget) {
      setMoveErrors({ target: "المجلد المحدد غير صالح" });
      toast.error("المجلد المحدد غير صالح");
      return;
    }

    setMoveErrors({});
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === selectedDocument.id
          ? { ...doc, parentId: parsedTarget }
          : doc
      )
    );
    setMoveModalOpen(false);
    toast.success("تم النقل بنجاح");
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  // Add Document
  const handleAddDocument = (newDoc) => {
    setDocuments((prev) => [...prev, newDoc]);
  };

  // Filter and Search
  const filteredDocuments = documents.filter((doc) => {
    if (
      searchQuery &&
      !doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (filters.category && doc.category !== filters.category) return false;
    if (filters.priority && doc.priority !== filters.priority) return false;
    if (filters.source && doc.source !== filters.source) return false;

    return true;
  });

  const renderDocumentRows = (parentId = null, level = 0) => {
    return filteredDocuments
      .filter((doc) => {
        if (parentId === null || parentId === undefined) {
          return doc.parentId === undefined || doc.parentId === null;
        }
        return doc.parentId === parentId;
      })
      .map((doc) => (
        <React.Fragment key={doc.id}>
          <tr>
            <td onClick={() => doc.type === "📁" && toggleFolder(doc.id)}>
              {renderCell(doc.name)}
            </td>
            <td>{doc.type}</td>
            <td>{renderCell(doc.modifiedBy) || "-"}</td>
            <td>{renderCell(doc.modifiedDate)}</td>
            <td className="btn-icon-container">
              <button
                className="action-button edit"
                onClick={() => {
                  setSelectedDocument(doc);
                  setEditModalOpen(true);
                  setNewName(doc.name);
                }}
              >
                <MdEdit size={16} />
              </button>
              <button
                className="action-button move"
                onClick={() => {
                  setSelectedDocument(doc);
                  setMoveModalOpen(true);
                }}
              >
                🔄
              </button>
              <button
                className="action-button chat"
                onClick={() => handleOpenChat(doc)}
              >
                💬
              </button>
              <button
                className="action-button delete"
                onClick={() => handleDelete(doc.id)}
              >
                <MdDelete size={16} />
              </button>
            </td>
          </tr>
          {doc.type === "📁" &&
            expandedFolders[doc.id] &&
            renderDocumentRows(doc.id, level + 1)}
        </React.Fragment>
      ));
  };

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
    <div className="main-container-Document-Panel">
      <div className="header-document-panel-center">
        <div className="first-header-document-panel-center">
          <TiDocumentAdd
            className="react-icon"
            size={28}
            color={
              theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"
            }
          />
          <p className="fs-l fw-700 lh-1-4">
            المستندات - برنامج غير الثقافة المؤسسية Culture Change
          </p>
        </div>
        <div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="add-modal-button fs-md fw-600 lh-1-2"
          >
            <MdEdit size={17} />
            <p>إضافة مستند </p>
          </button>
        </div>
      </div>

      <section className="section-I-document-panel-center">
        <button
          className="query-btn fs-l fw-600 lh-1-3"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <FaSearch size={20} />
          <p>بحث</p>
        </button>
        <button
          className="query-btn fs-l fw-600 lh-1-3"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <FaFilter size={20} />
          <p>تصفية</p>
        </button>
      </section>

      {/* Search-Filter-view */}
      <SearchFilterView
        showSearch={showSearch}
        showFilter={showFilter}
        setShowSearch={setShowSearch}
        setShowFilter={setShowFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        filterLabels={["التصنيف", "الأولوية", "المصدر", "التاريخ"]}
        filterKeys={["category", "priority", "source", "date"]}
      />

      <div className="document-table-container">
        <table className="document-table">
          <thead className="fs-md lh-1 fw-700">
            <tr>
              <th>الإسم</th>
              <th>النوع</th>
              <th>تعديل بواسطة</th>
              <th>تاريخ التعديل</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody className="fs-m lh-1 fw-700">
            {renderDocumentRows()}
            {filteredDocuments.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  لا توجد نتائج
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="edit-modal-open-overlay">
          <div className="editmodal-content">
            <div className="edit-risk-modal-header">
              <div className="second-header-chatbox-modal">
                <GrAppsRounded size={20} />
                <p className="fs-md fw-600 lh-1-2">تعديل الاسم</p>
              </div>
              <button
                className="chatbox-close-btn"
                onClick={() => setEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="editmodal-body">
              <label className="fs-md lh-1 fw-700">الاسم</label>
              <input
                type="text"
                className="fs-md lh-1 fw-500"
                value={newName}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewName(value);
                  if (editErrors.name && value.trim() !== "") {
                    setEditErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.name;
                      return updated;
                    });
                  }
                }}
              />

              {editErrors.name && (
                <span className="error fs-sm fw-700 lh-1">
                  {editErrors.name}
                </span>
              )}
            </div>
            <div className="container-editmodal-footer">
              <div className="editmodal-footer">
                <button
                  className="cancel-button fs-md fw-600 lh-1"
                  onClick={() => setEditModalOpen(false)}
                >
                  إلغاء
                </button>
                <button
                  className="save-button fs-md fw-600 lh-1"
                  onClick={handleSaveEdit}
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Move-Modal */}
      {moveModalOpen && (
        <div className="movemodal-overlay">
          <div className="movemodal-content">
            <div className="edit-risk-modal-header">
              <div className="second-header-chatbox-modal">
                <GrAppsRounded size={20} />
                <p className="fs-md fw-600 lh-1-2">نقل المستند</p>
              </div>
              <button
                className="chatbox-close-btn"
                onClick={() => setMoveModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="movemodal-body">
              <label className="fs-md lh-1 fw-700">اختر المجلد:</label>
              <select
                value={moveTarget}
                onChange={(e) => {
                  const val = e.target.value;
                  setMoveTarget(val);
                  if (moveErrors.target && val.trim() !== "") {
                    setMoveErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.target;
                      return updated;
                    });
                  }
                }}
                disabled={validMoveTargets.length === 0}
                className="fs-md lh-1 fw-500"
              >
                <option value="">اختر مجلد</option>
                {validMoveTargets.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>

              {/* // Validation */}
              {validMoveTargets.length === 0 ? (
                <p className="no-folder-warning fs-md lh-1 fw-700">
                  لا توجد مجلدات متاحة للنقل إليها
                </p>
              ) : (
                moveErrors.target && (
                  <span className="error fs-sm fw-700 lh-1">
                    {moveErrors.target}
                  </span>
                )
              )}
            </div>
            <div className="container-editmodal-footer">
              <div className="editmodal-footer">
                <button
                  className="cancel-button fs-md fw-600 lh-1"
                  onClick={() => setMoveModalOpen(false)}
                >
                  إلغاء
                </button>
                <button
                  className="save-button fs-md fw-600 lh-1"
                  onClick={handleMoveDocument}
                  disabled={!moveTarget || moveTarget === ""}
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  Chat-Modal */}
      <ChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        messages={chatMessages}
        currentMessage={currentMessage}
        onSendMessage={handleSendMessage}
        setCurrentMessage={setCurrentMessage}
        document={selectedDocumentForChat}
      />

      {/* Delete-Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

      {/* Add-Document-Panel-Modal */}
      <DocumentPanelModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddDocument}
      />

      {/* Toast-Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        hideProgressBar
        closeButton={false}
        newestOnTop
        toastStyle={{
          backgroundColor: "rgba(1,113,98,1)",
          color: "#fff",
          fontSize: "14px",
          padding: "10px 16px",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default DocumentPanel;
