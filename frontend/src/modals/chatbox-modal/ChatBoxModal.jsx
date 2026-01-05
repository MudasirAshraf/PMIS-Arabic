import React, { useEffect } from "react";
import { GrAppsRounded } from "react-icons/gr";
import { useTheme } from "../../ThemeContext";
import "./chatboxmodal.scss";

const ChatModal = ({ isOpen, onClose, messages, currentMessage, onSendMessage, setCurrentMessage }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  
    if (!isOpen) return null;
  const {theme} = useTheme();
    return (
      <div className="risk-chat-modal">
        <div className="risk-chat-modal-content">
          <div className="risk-chat-modal-header">
            <div className='second-header-chatbox-modal'>
                <GrAppsRounded size={20} color={ theme === "green" ? "#FFF" : theme === "light" ? "#000" : "#FFF"}/>
            <p className="fs-md fw-600 lh-1-2">طلب تعديل - سوء التنسيق أو ضعف التواصل بين الفرق المختلفة قد يؤدي إلى أخطاء أو تأخيرات.</p>
            </div>
            <button className="chatbox-close-btn" onClick={onClose}>×</button>
          </div>
          <div className="risk-chat-input-container">
            <textarea
              className="risk-chat-textarea"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="الوصف"
            ></textarea>
          </div>
          <div className="risk-chat-modal-actions">
            <button className="cancel-button fs-lg fw-600 lh-1-2" onClick={onClose}>إلغاء</button>
            <button className="save-button fs-lg fw-600 lh-1-2" onClick={onSendMessage}>حفظ</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatModal;
  