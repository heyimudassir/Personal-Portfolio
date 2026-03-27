import React, { useEffect } from "react";
// 👇 ArrowUpRight icon add kiya hai
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react"; 
import { motion } from "framer-motion";

const modalEase = [0.25, 0.1, 0.25, 1];

export default function ArchiveModal({ onClose, projects, onOpenDetails }) {
  // Lock background scrolling for normal browsers
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: modalEase }}
      
      data-lenis-prevent="true" 
      onWheel={(e) => e.stopPropagation()} 
      onTouchMove={(e) => e.stopPropagation()}

      className="fixed inset-0 z-[999] bg-surface p-4 md:p-8 overflow-y-auto scroll-smooth no-scrollbar"
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10 pt-2 relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Project Archive</h2>
          <p className="text-onSurface/70 mt-2">A complete list of my past work, experiments, and applications.</p>
        </div>
        
        <button 
          onClick={onClose} 
          className="p-3 rounded-full text-primary bg-white shadow-md border border-primary/10 hover:bg-primary/10 hover:scale-105 transition-all flex-shrink-0"
        >
          <X size={24} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
              
              // Card par click karne se bhi open hoga
              onClick={() => onOpenDetails && onOpenDetails(project)}
              className="group p-6 bg-white rounded-3xl shadow-sm border border-primary/10 hover:shadow-md transition-all flex flex-col h-full hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary/60 bg-primary/5 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <div className="flex gap-3 text-onSurface/40" onClick={(e) => e.stopPropagation()}>
                  {project.github && project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                      <Github size={18} />
                    </a>
                  )}
                  {project.link && project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-onSurface/70 leading-relaxed mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags && project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-onSurface/60 bg-gray-100 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 🟢 NAYA BUTTON: Explicit "View Details" Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Double event fire hone se rokne ke liye
                  if(onOpenDetails) onOpenDetails(project);
                }}
                className="mt-auto w-full py-3 bg-primary/5 text-primary text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-all group-hover:bg-primary group-hover:text-white"
              >
                View Details <ArrowUpRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}