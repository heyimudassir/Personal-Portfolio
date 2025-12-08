import { motion } from "framer-motion";
import avatar from "../assets/profile.jpg";
import ParallaxText from "../components/ParallaxText";

export default function Home({ onOpenLogbook }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      
      {/* --- BACKGROUND PARALLAX LAYER --- */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-50 pointer-events-none">
        {/* Slow moving text */}
        <div className="rotate-3 scale-110">
           <ParallaxText baseVelocity={-2}>MUDASSIR NADEEM —</ParallaxText>
           <ParallaxText baseVelocity={2}>IOT DEVELOPER • WEB •</ParallaxText>
           <ParallaxText baseVelocity={-2}>CREATIVE ENGINEER —</ParallaxText>
        </div>
      </div>

      {/* --- FOREGROUND CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* 1. Avatar with Floating Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="relative"
        >
           {/* Glow Effect behind avatar */}
           <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
           <img
            src={avatar}
            alt="Mudassir"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top border-4 border-white/10 relative z-10 shadow-2xl"
          />
          <motion.span 
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -right-2 bottom-2 text-4xl z-20"
          >
            👋
          </motion.span>
        </motion.div>

        {/* 2. Name & Title */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-primary mt-8 mb-4 tracking-tight"
        >
          Mudassir
        </motion.h1>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-medium text-onSurface/80 max-w-2xl"
        >
          Building modern solutions with <span className="text-primary font-bold">Internet of Things</span> & <span className="text-primary font-bold">React</span>
        </motion.h2>

        {/* 3. Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <a
            href="/MudassirNadeem.pdf"
            download
            className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all active:scale-95"
          >
            Download CV
          </a>
          <button
            onClick={onOpenLogbook}
            className="px-8 py-4 bg-white/50 backdrop-blur-md border border-white/20 text-primary font-bold rounded-full shadow-lg hover:bg-white/80 hover:scale-105 transition-all active:scale-95"
          >
            View Work Log
          </button>
        </motion.div>

      </div>
    </section>
  );
}