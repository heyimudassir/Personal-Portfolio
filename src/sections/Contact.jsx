import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const smoothEase = [0.16, 1, 0.3, 1];

export default function Contact() {
  const formRef = useRef();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Strictly trigger ONCE on scroll
  const isInView = useInView(containerRef, { once: true, margin: "0px" });

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => setSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_q4oluml", 
        "template_qunr7lw", 
        formRef.current,
        "kPMWrvFBajZBt0sl-" 
      )
      .then(
        () => {
          setSent(true);
          toast.success("Message sent successfully!");
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          console.error("Email error:", error);
          toast.error("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
      
      <motion.div 
        ref={containerRef}
        // FIX: Removed 'layout' prop, added transform-gpu and will-change-transform
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: smoothEase }}
        className="bg-primary rounded-[30px] md:rounded-[40px] p-6 md:p-16 shadow-2xl overflow-hidden relative flex flex-col md:flex-row gap-8 md:gap-12 transform-gpu will-change-transform"
      >
        
        {/* Background Circles - Optimized blur for mobile (blur-2xl instead of blur-3xl) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transform-gpu" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl md:blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none transform-gpu" />

        {/* --- LEFT SIDE: INFO --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-between z-10 text-white">
          <div>
            <h2 className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-70 mb-2">
              Get in touch
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Let's build something <br/> amazing together.
            </h3>
            <p className="text-sm md:text-lg opacity-80 mb-6 md:mb-8 max-w-md">
              Have a project in mind? Looking for a partner? 
              Or just want to say hi? I'm always open to discussing new projects.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Mail size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm opacity-60">Email me at</p>
                <a href="mailto:heyimudassir@gmail.com" className="font-bold hover:underline text-sm md:text-base">
                  heyimudassir@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full">
                <MapPin size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm opacity-60">Based in</p>
                <p className="font-bold text-sm md:text-base">Lahore, Pakistan</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6 md:mt-8">
              <a href="https://github.com/ohmudassir" target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/heyimudassir/" target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/heyimudassir" target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="w-full md:w-1/2 bg-white rounded-3xl p-6 md:p-8 text-onSurface z-10 shadow-lg">
          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4 md:gap-6">
            
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-onSurface/70 mb-1">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                placeholder="John Doe" 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-onSurface/70 mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                required
                placeholder="john@example.com" 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-onSurface/70 mb-1">Message</label>
              <textarea 
                id="message"
                name="message"
                required
                rows="4" 
                placeholder="Tell me about your project..." 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sending...
                </>
              ) : (
                <>
                  <Send size={20} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>

      </motion.div>
    </section>
  );
}