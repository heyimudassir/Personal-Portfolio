import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import avatar from "../assets/profile.jpg"; 
import FadeInSection from "../components/FadeInSection"; 
import ParallaxText from "../components/ParallaxText";

export default function Home({ onOpenLogbook, isPaused }) {
  const [fade, setFade] = useState(false);

  const fadeTimerRef = useRef(null);
  const nextCycleTimerRef = useRef(null);
  const isHiddenRef = useRef(document.hidden);
  const isPausedRef = useRef(isPaused); 

  useEffect(() => {
    isPausedRef.current = isPaused;
    if (!isPaused) {
      setFade(false);
    }
  }, [isPaused]); 

  return (
    <FadeInSection>
      <section
        id="home"
        // FIX: 'overflow-hidden' yahan se HATA diya gaya hai
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 md:pt-40"
      >
        
        {/* BACKGROUND */}
        {/* FIX: 'overflow-hidden' yahan lagaya hai taake sirf parallax text contain rahe */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-30 md:opacity-50 pointer-events-none select-none overflow-hidden">
          <div className="rotate-3 scale-110">
             <ParallaxText baseVelocity={-2}>MUDASSIR NADEEM —</ParallaxText>
             <ParallaxText baseVelocity={2}>IOT DEVELOPER • WEB •</ParallaxText>
             <ParallaxText baseVelocity={-2}>CREATIVE ENGINEER —</ParallaxText>
          </div>
        </div>

        {/* FOREGROUND CONTENT */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="relative mb-6"
          >
             <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
             <img
              src={avatar}
              alt="Mudassir"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top border-4 border-white/10 relative z-10 shadow-2xl"
            />
          </motion.div>
          
          {/* Name & Emoji */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold text-primary tracking-tight"
            >
              Mudassir
            </motion.h1>
            
            <motion.span 
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl origin-bottom-left"
            >
              👋
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl font-medium text-onSurface/80 max-w-lg mx-auto leading-relaxed px-2"
          >
            Building modern solutions with <br className="hidden md:block" />
            <span className="text-primary font-bold">Internet of Things</span> & <span className="text-primary font-bold">React</span>
          </motion.h2>

          {/* Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <a
              href="/MudassirNadeem.pdf"
              download
              // Added pb-1 to ensure text doesn't look cut
              className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all active:scale-95 text-center"
            >
              Download CV
            </a>
            <button
              onClick={onOpenLogbook}
              className="px-8 py-3 bg-white/50 backdrop-blur-md border border-white/20 text-primary font-bold rounded-full shadow-lg hover:bg-white/80 hover:scale-105 transition-all active:scale-95"
            >
              View Work Log
            </button>
          </motion.div>

        </div>
      </section>
    </FadeInSection>
  );
}