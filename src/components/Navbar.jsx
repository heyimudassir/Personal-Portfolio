import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false); // New state to hide/show navbar

  // --- SMART SCROLL LOGIC ---
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Background blur active check (50px se neechay aane par)
    if (latest > 50) setScrolled(true);
    else setScrolled(false);

    // Navbar hide/show logic (agar menu khula hai toh hide nahi karna)
    if (!open) {
      if (latest > previous && latest > 150) {
        setHidden(true); // Scroll down -> Hide
      } else {
        setHidden(false); // Scroll up -> Show
      }
    }
  });

  // --- ACTIVE LINK TRACKER (Fixed for Home detection) ---
  useEffect(() => {
    const handleScrollManual = () => {
      // Agar user bilkul top par hai (e.g., < 100px), toh Home ko active rakho
      if (window.scrollY < 100) {
        setActive("#home");
      }
    };

    const sections = navItems.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Home ke ilawa baqi sections ke liye observer kaam karega
          if (entry.isIntersecting && window.scrollY >= 100) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      // Margin ko thora adjust kiya taake detection center mein ho
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Manual scroll listener for Home section
    window.addEventListener("scroll", handleScrollManual);

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScrollManual);
    };
  }, []);

  const handleClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <motion.nav
      // --- SMART ANIMATION ---
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 } // Upar slide ho jayega
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-4xl transition-colors duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5"
          : "bg-white/50 backdrop-blur-md border border-white/20"
      } rounded-full px-6 py-3`}
    >
      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <a href="#home" className="text-xl font-bold text-primary tracking-tight">
          heyimudassir
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                onClick={() => handleClick(item.href)}
                className={`relative z-10 block px-5 py-2 text-sm font-medium transition-colors ${
                  active === item.href ? "text-primary" : "text-onSurface/70 hover:text-primary"
                }`}
              >
                {item.name}
                
                {active === item.href && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white shadow-sm rounded-full -z-10 border border-black/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-onSurface hover:bg-black/5 rounded-full transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-4 mx-2 overflow-hidden"
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => handleClick(item.href)}
                    className={`block w-full px-4 py-3 rounded-full font-medium transition-all ${
                      active === item.href
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "text-onSurface hover:bg-black/5"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}