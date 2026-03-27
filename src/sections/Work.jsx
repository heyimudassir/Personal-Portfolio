import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Cpu, Monitor, Play, Pause, Volume2, VolumeX, Maximize, X, ArrowRight, Download, ArrowUpRight } from "lucide-react";

import ArchiveModal from "./ArchiveModal"; 

// 🟢 CMS DYNAMIC DATA IMPORT
const projectFiles = import.meta.glob('../content/projects/*.json', { eager: true });
const iconColors = ["bg-purple-100", "bg-blue-100", "bg-orange-100", "bg-green-100", "bg-gray-200"];

const projectsData = Object.keys(projectFiles).map((key, index) => {
  const project = projectFiles[key].default;
  let cleanTags = [];
  if (project.tags) {
    if (typeof project.tags === 'string') cleanTags = project.tags.split(',').map(t => t.trim());
    else if (Array.isArray(project.tags)) {
      if (project.tags.length === 1 && typeof project.tags[0] === 'string' && project.tags[0].includes(',')) cleanTags = project.tags[0].split(',').map(t => t.trim());
      else cleanTags = project.tags;
    }
  }
  return {
    id: index + 1,
    title: project.title || "Untitled Project",
    category: project.category || "Development",
    description: project.description || "",
    tags: cleanTags,
    icon: project.category?.toLowerCase().includes("iot") ? <Cpu /> : <Monitor />,
    color: iconColors[index % iconColors.length],
    image: project.image || null,
    video: project.video || null,
    github: project.github || null,
    link: project.link || null,
    apk: project.apk || null,
    featured: project.featured === true || project.featured === "true",
  };
});

// 🟢 MATERIAL 3 CUSTOM VIDEO PLAYER
const MaterialVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // 1. DEFAULT MUTE TRUE
  const [isMuted, setIsMuted] = useState(true); 

  // 2. AUTO-HIDE CONTROLS LOGIC
  const [showControls, setShowControls] = useState(true);
  const timerRef = useRef(null);

  const handleUserActivity = () => {
    setShowControls(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Hide after 2.5 seconds of inactivity
    timerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  useEffect(() => {
    handleUserActivity();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying]);

  // Format time (e.g., 01:23)
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      onMouseLeave={() => { if (isPlaying) setShowControls(false) }}
      className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden"
    >
      <video 
        ref={videoRef} 
        src={src} 
        autoPlay 
        muted={isMuted} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain max-h-[45vh]" 
      />

      <div className={`absolute bottom-4 left-4 right-4 md:left-8 md:right-8 transition-opacity duration-500 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[#1C1B1F]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 md:p-3 flex items-center gap-3 md:gap-4 shadow-2xl">
          
          <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors flex-shrink-0">
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <div className="flex-grow flex items-center gap-3">
            <span className="text-white/80 text-xs font-medium w-10 text-right">{formatTime(currentTime)}</span>
            
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress || 0} 
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-150 transition-all"
              style={{ background: `linear-gradient(to right, #D0BCFF ${progress}%, rgba(255,255,255,0.2) ${progress}%)` }}
            />
            
            <span className="text-white/80 text-xs font-medium w-10">{formatTime(duration)}</span>
          </div>

          <button onClick={toggleMute} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors flex-shrink-0">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button onClick={toggleFullScreen} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors flex-shrink-0 hidden md:flex">
            <Maximize size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PROJECT CARD ---
const ProjectCard = ({ project, index, targetScale, onOpenDetails }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-20 md:top-28">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 15}px)` }}
        className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-4xl h-[70vh] bg-white border border-white/20 rounded-[30px] md:rounded-[40px] p-6 md:p-10 shadow-2xl origin-top transform-gpu will-change-transform"
      >
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-2 md:gap-4 h-full order-2 md:order-1 py-4 md:py-8">
           <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex items-center gap-2 md:gap-3">
               <span className={`p-2 md:p-3 rounded-full ${project.color} text-onSurface`}>{project.icon}</span>
               <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary">{project.category}</span>
             </div>
             <h3 className="text-xl md:text-4xl font-bold text-onSurface leading-tight line-clamp-2">{project.title}</h3>
             <p className="text-sm md:text-lg text-onSurface/70 leading-relaxed line-clamp-3">{project.description}</p>
             <div className="flex flex-wrap gap-2 mt-1">
               {project.tags.slice(0, 3).map(tag => (
                 <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-surface rounded-full text-[10px] md:text-xs font-medium border border-primary/10">{tag}</span>
               ))}
               {project.tags.length > 3 && <span className="px-2 py-1 text-[10px] md:text-xs text-gray-400 font-medium">+{project.tags.length - 3} more</span>}
             </div>
           </div>
           <div className="mt-4 md:mt-6">
             <button onClick={() => onOpenDetails(project)} className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primaryDark transition-all active:scale-95 shadow-lg w-full md:w-max">
               View Project Details <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </button>
           </div>
        </div>
        <div className="w-full md:w-1/2 h-32 md:h-full rounded-2xl md:rounded-3xl overflow-hidden relative group border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center order-1 md:order-2 flex-shrink-0">
          <div className={`absolute inset-0 ${project.color} opacity-20`} />
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="w-auto h-[85%] object-contain drop-shadow-lg transform transition-transform duration-700 md:group-hover:scale-105" onError={(e) => {e.target.src="https://placehold.co/600x400/21005D/FFFFFF?text=No+Image"}} />
        </div>
      </motion.div>
    </div>
  );
};

export default function Work() {
  const container = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (selectedProject || isArchiveOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
    }
    return () => { html.style.overflow = ''; body.style.overflow = ''; };
  }, [selectedProject, isArchiveOpen]);

  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 3);

  return (
    <section id="work" className="relative pt-24 md:pt-32 pb-32" ref={container}>
      
      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overscroll-contain"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} 
              onWheel={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors">
                <X size={20} strokeWidth={3} />
              </button>

              <div className="w-full bg-[#F3F4F6] relative flex-shrink-0 border-b border-gray-100 flex items-center justify-center" style={{ maxHeight: '45vh', minHeight: '250px' }}>
                <div className={`absolute inset-0 ${selectedProject.color} opacity-20 z-0`} />
                
                {selectedProject.video ? (
                  <MaterialVideoPlayer src={selectedProject.video} />
                ) : (
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain p-8 relative z-10 drop-shadow-xl max-h-[45vh]" />
                )}
              </div>

              <div className="p-6 md:p-10 flex-grow overflow-y-auto overscroll-contain custom-scrollbar flex flex-col gap-6">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-primary mb-2 block">{selectedProject.category}</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">{selectedProject.title}</h2>
                </div>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-600 border border-gray-200">{tag}</span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 pt-6 border-t border-gray-100">
                  {selectedProject.apk && (
                    <a href={selectedProject.apk} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3.5 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow-md">
                      <Download size={18} /> Download APK
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-md">
                      <Github size={18} /> View Source Code
                    </a>
                  )}
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3.5 bg-white text-black border-2 border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                  {(!selectedProject.apk && !selectedProject.github && !selectedProject.link) && (
                     <span className="text-sm text-gray-400 font-medium italic">Internal or NDA Project - Links not available</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟢 MODIFIED ARCHIVE MODAL WITH onOpenDetails PROP */}
      <AnimatePresence>
        {isArchiveOpen && (
          <ArchiveModal 
            projects={projectsData} 
            onClose={() => setIsArchiveOpen(false)} 
            onOpenDetails={setSelectedProject} 
          />
        )}
      </AnimatePresence>

      <div className="absolute top-10 md:top-12 left-0 right-0 text-center z-0 pointer-events-none">
         <h2 className="text-4xl md:text-7xl font-bold text-primary opacity-20 uppercase tracking-tighter">Selected Works</h2>
      </div>

      <div className="px-4 md:px-8 relative z-10">
        {featuredProjects.map((project, i) => {
          const targetScale = 1 - ( (featuredProjects.length - i) * 0.05 );
          return (
            <ProjectCard key={project.id} project={project} index={i} targetScale={targetScale} onOpenDetails={setSelectedProject} />
          );
        })}
      </div>

      <div className="relative z-10 flex justify-center mt-20 md:mt-32">
        <button onClick={() => setIsArchiveOpen(true)} className="group inline-flex items-center gap-3 px-8 py-4 bg-white border border-primary/20 rounded-full shadow-md hover:shadow-lg hover:border-primary/40 transition-all transform hover:-translate-y-1">
          <span className="font-bold text-primary text-lg tracking-wide">Explore Full Archive</span>
          <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}