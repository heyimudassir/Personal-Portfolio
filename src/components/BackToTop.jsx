import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 300px scroll hone ke baad button dikhayein
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          // --- SMOOTH ENTRY ANIMATION ---
          initial={{ opacity: 0, scale: 0.5, y: 20 }} // Thoda neeche se shuru hoga
          animate={{ opacity: 1, scale: 1, y: 0 }}    // Apni jagah par "Bounce" karega
          exit={{ opacity: 0, scale: 0.5, y: 20 }}    // Wapas neeche ja kar gayab hoga
          
          // --- SPRING PHYSICS (Makkhan Feel) ---
          transition={{ 
            type: "spring", 
            stiffness: 260, // Speed control
            damping: 20,    // Bounce control
          }}
          
          // --- INTERACTION ---
          whileHover={{ scale: 1.1 }} // Mouse lene par thoda bada hoga
          whileTap={{ scale: 0.9 }}   // Click karne par press hoga
          
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primaryDark transition-colors"
          aria-label="Back to Top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}