import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Cpu, Monitor, Play, X } from "lucide-react";

// --- ASSETS IMPORT ---
import imgStudent from "../assets/desktopApp.svg";
import vidStudent from "../assets/desktopAppVideo.mp4";

import imgSolar from "../assets/solarThumbnail.svg";
import vidSolar from "../assets/solar.mp4";

import imgFault from "../assets/Fault.svg";
import vidFault from "../assets/FaultVideo.mp4";

const projects = [
  {
    id: 1,
    title: "Student Management System",
    category: "Desktop App",
    description: "A Python-based desktop application designed to simplify attendance tracking, student data handling, and overall academic management.",
    tags: ["Python", "Tkinter", "CSV", "CustomTkinter"],
    icon: <Monitor />,
    color: "bg-purple-100",
    image: imgStudent,
    video: vidStudent,
    github: "https://github.com/yourusername/student-system", 
  },
  {
    id: 2,
    title: "Solar Cleaner via Bluetooth",
    category: "IoT System",
    description: "IoT-based Solar Panel Cleaning System using HC-05 Bluetooth module. Allows remote cleaning via mobile app.",
    tags: ["Arduino", "Python", "MQTT", "Sensors"],
    icon: <Cpu />,
    color: "bg-blue-100",
    image: imgSolar,
    video: vidSolar,
    github: "https://github.com/yourusername/solar-cleaner",
  },
  {
    id: 3,
    title: "Fault Detection System",
    category: "Real-time IoT",
    description: "Real-time fault detection system ensuring safety in industrial environments using advanced sensors.",
    tags: ["IoT", "Real-time", "C++", "Hardware"],
    icon: <Cpu />,
    color: "bg-orange-100",
    image: imgFault,
    video: vidFault,
    github: "https://github.com/yourusername/fault-detection",
  }
];

// --- SINGLE CARD COMPONENT (Optimized) ---
const ProjectCard = ({ project, index, targetScale, onOpenVideo }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Card ki scaling ab directly scroll par depend karti hai, GPU render ke liye will-change-transform add kiya gaya hai
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-20 md:top-28">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 15}px)` }} 
        // Removed heavy 'layout' and 'spring' transition to prevent stuttering
        className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-5xl h-[70vh] bg-white border border-white/20 rounded-[30px] md:rounded-[40px] p-6 md:p-12 shadow-2xl origin-top will-change-transform"
      >
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-3 md:gap-6 h-full order-2 md:order-1">
           <div className="flex flex-col gap-2 md:gap-4">
             <div className="flex items-center gap-2 md:gap-3">
               <span className={`p-2 md:p-3 rounded-full ${project.color} text-onSurface`}>
                 {project.icon}
               </span>
               <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary">
                 {project.category}
               </span>
             </div>
             
             <h3 className="text-xl md:text-4xl font-bold text-onSurface leading-tight">
               {project.title}
             </h3>
             
             <p className="text-sm md:text-lg text-onSurface/70 leading-relaxed line-clamp-3 md:line-clamp-4">
               {project.description}
             </p>
             
             <div className="flex flex-wrap gap-2">
               {project.tags.map(tag => (
                 <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-surface rounded-full text-[10px] md:text-xs font-medium border border-primary/10">
                   {tag}
                 </span>
               ))}
             </div>
           </div>

           <div className="flex gap-3 md:gap-4 mt-1 md:mt-2">
             {project.video ? (
               <button 
                 onClick={() => onOpenVideo(project.video)}
                 className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-full font-bold hover:bg-primaryDark transition-all active:scale-95 shadow-md hover:shadow-lg text-sm md:text-base w-full md:w-auto"
               >
                 <Play size={18} fill="currentColor" /> Watch Preview
               </button>
             ) : (
               <>
                 <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-onSurface text-surface rounded-full font-bold hover:bg-primary transition-colors text-sm md:text-base w-full md:w-auto">
                   <Github size={18} /> Code
                 </a>
                 <a href="#" className="flex items-center justify-center gap-2 px-5 py-3 bg-surface text-onSurface border border-onSurface/10 rounded-full font-bold hover:bg-primary/5 transition-colors text-sm md:text-base w-full md:w-auto">
                   <ExternalLink size={18} /> Demo
                 </a>
               </>
             )}
           </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 h-32 md:h-full rounded-2xl md:rounded-3xl overflow-hidden relative group border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center order-1 md:order-2 flex-shrink-0">
          <div className={`absolute inset-0 ${project.color} opacity-20`} />
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy" 
            decoding="async" 
            className="w-auto h-[85%] object-contain drop-shadow-lg transform transition-transform duration-700 md:group-hover:scale-105"
            onError={(e) => {e.target.src="https://placehold.co/600x400/21005D/FFFFFF?text=No+Image"}}
          />
        </div>

      </motion.div>
    </div>
  );
};

export default function Work() {
  const container = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section id="work" className="relative pt-24 md:pt-32 pb-20" ref={container}>
      
      {/* OPTIMIZED VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 will-change-transform"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              // Removed layout and spring physics. Switched to smooth, performant ease out.
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video will-change-transform"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/40 transition"
              >
                <X size={24} />
              </button>
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-10 md:top-12 left-0 right-0 text-center z-0">
         <h2 className="text-4xl md:text-7xl font-bold text-primary opacity-20 uppercase tracking-tighter">
           Selected Works
         </h2>
      </div>

      <div className="px-4 md:px-8">
        {projects.map((project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05 );
          return (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
              targetScale={targetScale} 
              onOpenVideo={setSelectedVideo}
            />
          );
        })}
      </div>
    </section>
  );
}