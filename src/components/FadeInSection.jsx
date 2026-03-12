import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null);
  
  // 'once: true' ensures it strictly fires only ONE time.
  // 'margin: "0px 0px -50px 0px"' triggers the animation slightly before it fully enters.
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.4, // Speed up the animation (from 0.7s to 0.4s)
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Ultra smooth Apple-style curve
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}