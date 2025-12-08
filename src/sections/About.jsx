import { motion } from "framer-motion";
import { Code2, Cpu, Globe, MapPin, Briefcase } from "lucide-react";
import avatar from "../assets/profile.jpg";

// --- YAHAN FIX KIYA HAI ---
// Pehle yahan 'bg-white/40' likha tha, usay hata diya hai.
// Ab jo color hum neeche pass karenge (className mein), wahi lagega.
const BentoBox = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className={`backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-lg flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

export default function About() {
  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
        
        {/* 1. MAIN INTRO - Added specific background here */}
        <BentoBox className="md:col-span-2 md:row-span-2 justify-center bg-gradient-to-br from-white/60 to-white/30">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            More than just code.
          </h2>
          <p className="text-lg text-onSurface/80 leading-relaxed mb-4">
            I'm <span className="font-bold text-primary">Mudassir</span>, a Software Engineer bridging the physical and digital worlds.
          </p>
          <p className="text-lg text-onSurface/80 leading-relaxed">
            I don't just build websites; I build <strong>Smart Systems</strong>. From IoT circuits to React dashboards, I create solutions that actually do things.
          </p>
        </BentoBox>

        {/* 2. PHOTO BLOCK */}
        <BentoBox className="md:col-span-1 md:row-span-2 p-0 overflow-hidden relative group bg-gray-200" delay={0.1}>
          <img 
            src={avatar} 
            alt="Mudassir" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
             <span className="text-white font-bold text-xl">Hey! 👋</span>
          </div>
        </BentoBox>

        {/* 3. STATS (FIXED) - Ab purple color nazar aayega */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center items-center bg-primary text-white" delay={0.2}>
          <span className="text-6xl font-black">4+</span>
          <span className="text-sm uppercase tracking-widest opacity-80 mt-2">Years Exp.</span>
        </BentoBox>

        {/* 4. LOCATION */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center items-center bg-indigo-100" delay={0.3}>
           <MapPin size={48} className="text-primary mb-2" />
           <h3 className="font-bold text-xl text-primary">Bahawalnagar</h3>
           <p className="text-sm text-onSurface/60">Pakistan</p>
        </BentoBox>

        {/* 5. TECH STACK (Fixed) - Ab dark background nazar aayega */}
        <BentoBox className="md:col-span-2 md:row-span-1 bg-gray-900 text-white" delay={0.4}>
          <div className="flex items-center gap-3 mb-4 text-purple-300">
            <Cpu />
            <span className="uppercase tracking-widest text-sm font-bold">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-3">
             {["React", "IoT / Arduino", "Python", "Tailwind", "Firebase", "Sanity CMS"].map((tech) => (
               <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/10 hover:bg-white/20 transition-colors">
                 {tech}
               </span>
             ))}
          </div>
        </BentoBox>

        {/* 6. STATUS */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center bg-green-100" delay={0.5}>
           <div className="flex items-center gap-3 mb-2">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
             </span>
             <span className="font-bold text-green-800">Status</span>
           </div>
           <p className="text-green-900 font-medium">Open to freelance & collaboration</p>
        </BentoBox>

        {/* 7. SOCIAL */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-center items-center bg-white border-2 border-primary/10 cursor-pointer hover:border-primary transition-colors" delay={0.6}>
           <a href="https://github.com/ohmudassir" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
             <Code2 size={48} className="text-onSurface mb-2" />
             <span className="font-bold">GitHub</span>
           </a>
        </BentoBox>

      </div>
    </section>
  );
}