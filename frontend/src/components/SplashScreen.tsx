import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { pageAnimation, updatedTextAnimation } from "../animation";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  const [moveFirstText, setMoveFirstText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondText(true);
      setMoveFirstText(true);
    }, 3000);

    const endTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#3461c2",
            zIndex: 9999,
          }}
          variants={pageAnimation}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.h1
            style={{
              color: "white",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
            variants={{
              ...updatedTextAnimation,
              show: {
                ...updatedTextAnimation.show,
                y: moveFirstText ? -40 : 0,
              },
            }}
            initial="show"
            animate="show"
            exit="exit"
          >
            Welcome!
          </motion.h1>

          {showSecondText && (
            <motion.h2
              style={{
                color: "white",
                fontSize: "2rem",
                fontWeight: "bold",
                position: "absolute",
                opacity: 0,
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              }}
              exit={{
                y: 50,
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
            >
              Visit our websites !
            </motion.h2>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}