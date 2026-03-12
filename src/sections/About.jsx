import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, MapPin } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

// --- SPEED OPTIMIZED BENTO BOX ---
const BentoBox = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" }); // Strictly runs ONCE

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.4, // Faster duration
        ease: smoothEase,
        delay: delay 
      }}
      className={`transform-gpu md:backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-lg flex flex-col min-h-[180px] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px]">
        
        {/* Delays drastically reduced for instant mobile loading */}
        
        {/* 1. MAIN INTRO (Instant) */}
        <BentoBox className="md:col-span-3 md:row-span-2 justify-center bg-gradient-to-br from-white/60 to-white/30" delay={0}>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
            More than just code.
          </h2>
          <p className="text-base md:text-xl text-onSurface/80 leading-relaxed mb-4 max-w-3xl">
            I'm <span className="font-bold text-primary">Mudassir</span>, a Software Engineer bridging the physical and digital worlds.
          </p>
          <p className="text-base md:text-lg text-onSurface/80 leading-relaxed max-w-3xl">
            I excel in professional documentation and have collaborated with international and local clients to build <strong>Smart Systems</strong> that bridge the physical and digital worlds.
          </p>
        </BentoBox>

        {/* 2. STATS (Super Fast) */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center items-center bg-primary text-white" delay={0.05}>
          <span className="text-5xl md:text-6xl font-black">4+</span>
          <span className="text-sm uppercase tracking-widest opacity-80 mt-2">Years Exp.</span>
        </BentoBox>

        {/* 3. LOCATION */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center items-center bg-indigo-100" delay={0.1}>
           <MapPin size={40} className="text-primary mb-2 md:mb-2 md:w-12 md:h-12" />
           <h3 className="font-bold text-lg md:text-xl text-primary">Lahore</h3>
           <p className="text-sm text-onSurface/60">Pakistan</p>
        </BentoBox>

        {/* 4. TECH STACK */}
        <BentoBox className="md:col-span-2 md:row-span-1 bg-gray-900 text-white" delay={0.15}>
          <div className="flex items-center gap-3 mb-4 text-purple-300">
            <Cpu />
            <span className="uppercase tracking-widest text-sm font-bold">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
             {["React", "IoT / Arduino", "Python", "Tailwind", "Firebase", "Sanity CMS"].map((tech) => (
               <span key={tech} className="px-3 py-1 md:px-4 md:py-2 bg-white/10 rounded-full text-xs md:text-sm border border-white/10 hover:bg-white/20 transition-colors">
                 {tech}
               </span>
             ))}
          </div>
        </BentoBox>

        {/* 5. STATUS */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center bg-green-100" delay={0.2}>
           <div className="flex items-center gap-3 mb-2">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
             </span>
             <span className="font-bold text-green-800">Status</span>
           </div>
           <p className="text-green-900 font-medium text-sm md:text-base">Open to freelance & collaboration</p>
        </BentoBox>

        {/* 6. SOCIAL */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center items-center bg-white border-2 border-primary/10 cursor-pointer hover:border-primary transition-colors" delay={0.25}>
           <a href="https://github.com/heyimudassir" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
             <Code2 size={40} className="text-onSurface mb-2 md:w-12 md:h-12" />
             <span className="font-bold text-lg">GitHub</span>
           </a>
        </BentoBox>

      </div>
    </section>
  );
}