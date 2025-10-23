import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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

  // Active section detection
  useEffect(() => {
    const sections = navItems.map((item) =>
      document.querySelector(item.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // ✅ Auto-close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <nav className="sticky top-4 z-50 max-w-4xl mx-auto px-4">
      <div className="relative px-4 py-5 bg-white/80 backdrop-blur rounded-[40px] shadow-material">
        {/* Mobile top bar */}
        <div className="flex justify-between items-center md:hidden">
          <h1 className="text-xl font-semibold text-primary">Menu</h1>
          <button
            onClick={() => setOpen(!open)}
            className="text-primary"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="absolute top-full left-0 w-full mt-2 z-40 px-4 py-3 bg-white/90 backdrop-blur rounded-[30px] shadow-md mx-2">
            <ul>
              {navItems.map(({ href, name }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => handleClick(href)}
                    className={`block w-full px-4 py-3 rounded-full font-medium text-primary transition ${
                      active === href ? "bg-primary/10" : "hover:bg-primary/10"
                    }`}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Desktop menu */}
        <ul className="hidden md:grid grid-cols-5 gap-2 text-center mt-4 md:mt-0">
          {navItems.map(({ href, name }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleClick(href)}
                className={`block w-full px-4 py-3 rounded-full font-medium text-primary transition ${
                  active === href ? "bg-primary/10" : "hover:bg-primary/10"
                }`}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}