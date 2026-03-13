import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
// 🔴 NEW: useMotionValue aur animate import kiye hain
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

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

  // 🔴 THE MAGIC WAND: GPU-Direct values (No React re-renders on scroll)
  const navY = useMotionValue(0);
  const navOpacity = useMotionValue(1);
  const navScale = useMotionValue(1);

  // Ref to prevent unnecessary React renders for the background blur
  const scrolledRef = useRef(false);

  // --- THE BULLETPROOF NATIVE SCROLL LOGIC ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // 1. Background Blur & Color Logic (Optimized to fire only once)
          if (currentScrollY > 50 && !scrolledRef.current) {
            scrolledRef.current = true;
            setScrolled(true);
          } else if (currentScrollY <= 50 && scrolledRef.current) {
            scrolledRef.current = false;
            setScrolled(false);
          }

          // 2. Hide / Show Logic (Direct DOM manipulation, 100% Smooth)
          if (!open) {
            if (currentScrollY < 100) {
              // Top par hain -> Hamesha Show karein
              animate(navY, 0, { type: "spring", stiffness: 250, damping: 25, mass: 0.5 });
              animate(navOpacity, 1, { duration: 0.2 });
              animate(navScale, 1, { duration: 0.2 });
            } 
            else if (currentScrollY > lastScrollY + 15) {
              // Scroll Down -> Hide Navbar (upar slide kar do, halka sa chota karke fade kardo)
              animate(navY, -100, { type: "spring", stiffness: 250, damping: 25, mass: 0.5 });
              animate(navOpacity, 0, { duration: 0.2 });
              animate(navScale, 0.95, { duration: 0.2 });
            } 
            else if (currentScrollY < lastScrollY - 15) {
              // Scroll Up -> Show Navbar
              animate(navY, 0, { type: "spring", stiffness: 250, damping: 25, mass: 0.5 });
              animate(navOpacity, 1, { duration: 0.2 });
              animate(navScale, 1, { duration: 0.2 });
            }
          }

          // Only update lastScrollY if direction is confirmed (fixes slow scroll)
          if (Math.abs(currentScrollY - lastScrollY) > 15) {
            lastScrollY = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, navY, navOpacity, navScale]);

  // --- ACTIVE LINK TRACKER ---
  useEffect(() => {
    const handleScrollManual = () => {
      if (window.scrollY < 100) {
        // 🔴 FIX: Prevent re-rendering every single pixel if already on #home
        setActive((prev) => (prev !== "#home" ? "#home" : prev));
      }
    };

    const sections = navItems.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 100) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    window.addEventListener("scroll", handleScrollManual, { passive: true });

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
      // 🔴 THE FIX: 'variants', 'animate' wagera nikal diye hain. 
      // Ab ye direct GPU variables se connect hai.
      style={{ y: navY, opacity: navOpacity, scale: navScale }}
      className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-4xl transition-colors duration-300 transform-gpu will-change-transform ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5"
          : "bg-white/50 backdrop-blur-md border border-white/20"
      } rounded-full px-6 py-3`}
    >
      <div className="flex justify-between items-center relative z-20">
        
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
          className="md:hidden p-2 text-onSurface hover:bg-black/5 rounded-full transition relative z-20"
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
            className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-4 mx-2 overflow-hidden -z-10"
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