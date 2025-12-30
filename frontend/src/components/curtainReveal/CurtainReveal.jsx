// Curtain-Animation
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import Logo from "../../assets/svg/logo.svg";
import LogoWhite from "../../assets/svg/logo-white.svg";
import "./curtain.scss";


const CurtainReveal = ({ children }) => {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowContent(true);
    }, 2500); 
  };

  const createCurtainPanels = (side, count = 5) => {
    return Array.from({ length: count }, (_, i) => (
      <motion.div
        key={`${side}-${i}`}
        className={`curtain-panel ${side}`}
        style={{
          left: side === 'left' ? `${i * (50 / count)}%` : 'auto',
          right: side === 'right' ? `${i * (50 / count)}%` : 'auto',
          width: `${100 / count}%`,
          zIndex: count - i,
        }}
        initial={{ 
          x: 0, 
          rotateY: side === 'left' ? 0 : 0,
          scaleX: 1
        }}
        animate={
          isAnimating
            ? {
                x: side === 'left' ? `-${150 + (i * 30)}%` : `${150 + (i * 30)}%`, // Increased distance
                rotateY: side === 'left' ? -25 - (i * 8) : 25 + (i * 8), // More rotation
                scaleX: 0.5 - (i * 0.08),
                opacity: 0
              }
            : { 
                x: 0, 
                rotateY: 0,
                scaleX: 1,
                opacity: 1
              }
        }
        transition={{ 
          duration: 2.2 + (i * 0.15), 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: i * 0.08
        }}
      >
        {/* Curtain fabric texture */}
        <div className="curtain-fabric">
          {Array.from({ length: 8 }, (_, foldIndex) => (
            <motion.div
              key={foldIndex}
              className="curtain-fold"
              style={{ left: `${(foldIndex * 12.5)}%` }}
              animate={
                isAnimating
                  ? {
                      scaleX: 0.3 + (Math.sin(foldIndex) * 0.2),
                      opacity: 0.7,
                    }
                  : { scaleX: 1, opacity: 1 }
              }
              transition={{ 
                duration: 1.5, 
                delay: (i * 0.1) + (foldIndex * 0.02),
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Curtain rod rings */}
        <div className="curtain-rings">
          {Array.from({ length: 6 }, (_, ringIndex) => (
            <motion.div
              key={ringIndex}
              className="curtain-ring"
              style={{ left: `${(ringIndex * 16.66)}%` }}
              animate={
                isAnimating
                  ? {
                      x: side === 'left' ? -20 - (ringIndex * 5) : 20 + (ringIndex * 5),
                      rotate: side === 'left' ? -10 : 10,
                    }
                  : { x: 0, rotate: 0 }
              }
              transition={{ 
                duration: 1.6, 
                delay: ringIndex * 0.03,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    ));
  };

  return (
    <>
      {!showContent && (
        <div className="curtain-wrapper" onClick={handleClick}>
          {/* Curtain Rod */}
          <div className="curtain-rod" />
          
          {/* Left Curtains */}
          {createCurtainPanels('left')}
          
          {/* Right Curtains */}
          {createCurtainPanels('right')}

          {/* Center Logo & Content */}
          <motion.div 
            className="curtain-center"
            animate={
              isAnimating 
                ? { scale: 1.1, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.img
              src={
                theme === "green" ? Logo : theme === "light" ? LogoWhite : Logo
              }
              alt="Logo"
              className="curtain-logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1 
              className="curtain-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              اتقان
            </motion.h1>
            <motion.p 
              className="curtain-click-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              اضغط للبدء
            </motion.p>
          </motion.div>

          {/*  lighting effect */}
          <motion.div
            className="curtain-ambient-light"
            animate={
              isAnimating
                ? { opacity: 0, scale: 1.5 }
                : { opacity: 0.3, scale: 1 }
            }
            transition={{ duration: 1.5 }}
          />
        </div>
      )}

      {/* Page Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default CurtainReveal;
// Existing-Code for Curtain-Animation

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useTheme } from "../ThemeContext";
// import Logo from "../assets/svg/logo.svg";
// import LogoWhite from "../assets/svg/logo-white.svg";


// const CurtainReveal = ({ children }) => {
//   const { theme } = useTheme();
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [showContent, setShowContent] = useState(false);


//   const handleClick = () => {
//     setIsAnimating(true);
//     setTimeout(() => {
//       setShowContent(true);
//     }, 1600);
//   };


//   return (
//     <>
//       {!showContent && (
//         <div className="curtain-wrapper" onClick={handleClick}>
//           {/* Left Curtain */}
//           <motion.div
//             className="curtain left"
//             initial={{ x: 0, skewY: 0, scaleX: 1 }}
//             animate={
//               isAnimating
//                 ? {
//                     x: "-100%",
//                     skewY: 10,
//                     scaleX: 0.8,
//                   }
//                 : { x: 0, skewY: 0, scaleX: 1 }
//             }
//             transition={{ duration: 1.5, ease: "linear" }}
//           />


//           {/* Right Curtain */}
//           <motion.div
//             className="curtain right"
//             initial={{ x: 0, skewY: 0, scaleX: 1 }}
//             animate={
//               isAnimating
//                 ? {
//                     x: "100%",
//                     skewY: -10,
//                     scaleX: 0.8,
//                   }
//                 : { x: 0, skewY: 0, scaleX: 1 }
//             }
//             transition={{ duration: 1.5, ease: "linear" }}
//           />


//           {/* Logo & Title */}
//           <div className="curtain-center">
//             <img
//               src={
//                 theme === "green" ? Logo : theme === "light" ? LogoWhite : Logo
//               }
//               alt="Logo"
//               className="curtain-logo"
//             />
//             <h1 className="curtain-title">اتقان</h1>
//             <p className="curtain-click-text">اضغط للبدء</p>
//           </div>
//         </div>
//       )}


//       {/* Page Content */}
//       {showContent && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.9 }}
//         >
//           {children}
//         </motion.div>
//       )}
//     </>
//   );
// };


// export default CurtainReveal;



