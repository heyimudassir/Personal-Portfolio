import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; 
import avatar from "../assets/profile.jpg"; 
import ParallaxText from "../components/ParallaxText";

const smoothEase = [0.16, 1, 0.3, 1];

export default function Home({ onOpenLogbook, isPaused }) {
  const [isMobile, setIsMobile] = useState(false);
  const isPausedRef = useRef(isPaused); 

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prefetchLogbook = () => {
    import("./LogbookModal"); 
  };

  return (
    // 🔴 FIX: Removed <FadeInSection>. Home element direct load hona chahiye bina scroll observer ke.
    <section
      id="home"
      className="relative min-h-[100svh] md:min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-24 md:pt-38 pb-20 md:pb-0 isolate"
    >
      
      {/* --- BACKGROUND EFFECTS --- */}
      {!isMobile && (
        <div className="hidden md:flex absolute inset-0 z-0 flex-col justify-center opacity-30 md:opacity-50 pointer-events-none select-none overflow-hidden">
          <div className="rotate-3 scale-110">
             <ParallaxText baseVelocity={-2}>MUDASSIR NADEEM —</ParallaxText>
             <ParallaxText baseVelocity={2}>IOT DEVELOPER • WEB •</ParallaxText>
             <ParallaxText baseVelocity={-2}>CREATIVE ENGINEER —</ParallaxText>
          </div>
        </div>
      )}

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="relative mb-5 md:mb-6"
        >
           <div 
             className="absolute -inset-10 md:-inset-16 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(103, 80, 164, 0.4) 0%, rgba(103, 80, 164, 0) 60%)" }}
           />
           <img
            src={avatar}
            alt="Mudassir"
            loading="eager"
            // 🔴 FIX: Changed to async. Synchronization blocks the mobile scrolling thread.
            decoding="async"
            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover object-top border-4 border-white/10 relative z-10 shadow-2xl"
          />
        </motion.div>
        
        <div className="relative w-fit mx-auto mb-3 md:mb-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: smoothEase }}
            // 🔴 FIX: Removed transform-gpu from text. Prevents GPU layer explosion.
            className="text-5xl md:text-8xl font-bold text-primary tracking-tight"
          >
            Mudassir
          </motion.h1>
          
          <motion.span 
            initial={{ rotate: -20, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: smoothEase }}
            className="absolute top-2 md:top-4 left-full ml-2 md:ml-5 text-4xl md:text-6xl origin-bottom-left"
          >
            👋
          </motion.span>
        </div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: smoothEase }}
          className="text-[16px] md:text-2xl font-medium text-onSurface/80 max-w-lg mx-auto leading-relaxed px-2"
        >
          Building modern solutions with <br className="hidden md:block" />
          <span className="text-primary font-bold">Internet of Things</span> & <span className="text-primary font-bold">React</span>
        </motion.h2>

        {/* Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: smoothEase }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 relative z-20"
        >
          <a
            href="/Mudassir_Nadeem_CV.pdf"
            download
            className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all active:scale-95 text-center"
          >
            Download CV
          </a>
          <button
            onClick={onOpenLogbook}
            onMouseEnter={prefetchLogbook}
            onTouchStart={prefetchLogbook}
            className="px-8 py-3 bg-white/50 backdrop-blur-md border border-white/20 text-primary font-bold rounded-full shadow-lg hover:bg-white/80 hover:scale-105 transition-all active:scale-95"
          >
            View Work Log
          </button>
        </motion.div>
      </div>

      {/* --- MOBILE-ONLY SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }} 
        className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1.5 z-0 pointer-events-none"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40">
          Scroll
        </span>
        {/* 🔴 FIX: Removed Framer Motion loop. Used Tailwind's pure CSS 'animate-bounce' (0% JS usage) */}
        <div className="animate-bounce mt-1">
          <ChevronDown className="text-primary/40" size={20} />
        </div>
      </motion.div>

    </section>
  );
}