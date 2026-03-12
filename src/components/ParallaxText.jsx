import React from "react";
import { motion } from "framer-motion";

export default function ParallaxText({ children, baseVelocity = 1 }) {
  // Velocity negative hai toh left move karega, positive hai toh right
  const isLeft = baseVelocity < 0;
  
  // Speed ko calculate karna taake dono directions smooth lagain
  const duration = Math.abs(100 / baseVelocity);

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap py-4">
      <motion.div
        className="font-black uppercase text-5xl md:text-8xl flex whitespace-nowrap flex-nowrap text-primary/10 tracking-tighter will-change-transform"
        // GPU accelerated infinite loop
        animate={{ 
          x: isLeft ? ["0%", "-50%"] : ["-50%", "0%"] 
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {/* Content ko 4 dafa repeat karna taake seamless loop banay */}
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
      </motion.div>
    </div>
  );
}