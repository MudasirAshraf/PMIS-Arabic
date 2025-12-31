import React, { useState, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "../../cards/servicecard/service-card";
import BoxGreen from "../../assets/svg/square-green.svg";
import BoxWhite from "../../assets/svg/square-white.svg";
import CIGreen from "../../assets/svg/ci-green.svg";
import CIWhite from "../../assets/svg/ci-white.svg";
import CIIGreen from "../../assets/svg/cii-green.svg";
import CIIWhite from "../../assets/svg/cii-white.svg";
import CIIIGreen from "../../assets/svg/ciii-green.svg";
import CIIIWhite from "../../assets/svg/ciii-white.svg";
import CIVGreen from "../../assets/svg/civ-green.svg";
import CIVWhite from "../../assets/svg/civ-white.svg";
import CVGreen from "../../assets/svg/cv-green.svg";
import CVWhite from "../../assets/svg/cv-white.svg";
import CVIGreen from "../../assets/svg/cvi-green.svg";
import CVIWhite from "../../assets/svg/cvi-white.svg";
import CVIIGreen from "../../assets/svg/cvii-green.svg";
import CVIIWhite from "../../assets/svg/cvii-white.svg";
import CVIIIGreen from "../../assets/svg/cviii-green.svg";
import CVIIIWhite from "../../assets/svg/cviii-white.svg";
import "./services.scss";

const Service = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    [
      {
        title: " مكتبة دروس المستفادة",
        image: theme === "green" ? CIGreen : CIWhite,
      },
      {
        title: "سجل طلبات التغيير",
        image: theme === "green" ? CIIGreen : CIIWhite,
      },
      {
        title: "سجل الاسعار التقديرية والمخرجات",
        image: theme === "green" ? CVGreen : CVWhite,
      },
      { title: "التقارير", image: theme === "green" ? CVIGreen : CVIWhite },
      { title: "سجل المهام", image: theme === "green" ? CIIIGreen : CIIIWhite },
      { title: "مكتبة معرفة", image: theme === "green" ? CIVGreen : CIVWhite },
      { title: "التفويض", image: theme === "green" ? CVIIGreen : CVIIWhite },
      {
        title: "الموافقات",
        image: theme === "green" ? CVIIIGreen : CVIIIWhite,
        to: "/Budget-Details",
      },
    ],
    [
      {
        title: " مكتبة دروس المستفادة",
        image: theme === "green" ? CIGreen : CIWhite,
      },
      {
        title: "سجل طلبات التغيير",
        image: theme === "green" ? CIIGreen : CIIWhite,
      },
      {
        title: "سجل الاسعار التقديرية والمخرجات",
        image: theme === "green" ? CVGreen : CVWhite,
      },
      { title: "ةشتهي", image: theme === "green" ? CVIGreen : CVIWhite },
      { title: "ساشاهي", image: theme === "green" ? CIIIGreen : CIIIWhite },
      { title: "مكتبة معرفة", image: theme === "green" ? CIVGreen : CIVWhite },
      { title: "التفويض", image: theme === "green" ? CVIIGreen : CVIIWhite },
      {
        title: "الموافقات",
        image: theme === "green" ? CVIIIGreen : CVIIIWhite,
      },
    ],
    [
      {
        title: " مكتبة دروس المستفادة",
        image: theme === "green" ? CIGreen : CIWhite,
      },
      {
        title: "سجل طلبات التغيير",
        image: theme === "green" ? CIIGreen : CIIWhite,
      },
      {
        title: "سجل الاسعار التقديرية والمخرجات",
        image: theme === "green" ? CVGreen : CVWhite,
      },
      { title: "التقارير", image: theme === "green" ? CVIGreen : CVIWhite },
      { title: "سجل المهام", image: theme === "green" ? CIIIGreen : CIIIWhite },
      { title: "مكتبة معرفة", image: theme === "green" ? CIVGreen : CIVWhite },
      { title: "التفويض", image: theme === "green" ? CVIIGreen : CVIIWhite },
      {
        title: "الموافقات",
        image: theme === "green" ? CVIIIGreen : CVIIIWhite,
      },
    ],
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  // Automatic slide change for both carousel and cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="main-container-section-II">
      {/* Header */}
      <div className="first-container-section-II">
        <img src={theme === "green" ? BoxGreen : BoxWhite} alt="logo" />
        <p className="fs-md fw-600">الخدمات</p>
      </div>

      {/* Cards Section */}
      <div className="second-container-section-II">
        <div className="first-content-section-II">
         <AnimatePresence mode="wait">
  <motion.div
    key={activeSlide}
    className="content-wrapper"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="content-I-section-II">
      {slides[activeSlide].slice(0, 4).map((card, index) => (
        <ServiceCard
          key={index}
          title={card.title}
          image={card.image}
          onClick={() => handleCardClick(card.to)}
        />
      ))}
    </div>

    <div className="content-I-section-II">
      {slides[activeSlide].slice(4, 8).map((card, index) => (
        <ServiceCard
          key={index}
          title={card.title}
          image={card.image}
          onClick={() => handleCardClick(card.to)}
          showValue={card.title === "الموافقات"}
        />
      ))}
    </div>
  </motion.div>
</AnimatePresence>

        </div>

        {/* Carousel */}
        <div className="carousel-navigation">
          {slides.map((_, index) => (
            <motion.span
              key={index}
              className={`dot ${activeSlide === index ? "active" : ""}`}
              onClick={() => handleSlideChange(index)}
              whileHover={{ scale: 1.2 }}
              animate={{
                backgroundColor: activeSlide === index ? "#007bff" : "#ccc",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
