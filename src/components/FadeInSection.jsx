import React, { useRef, useState, useEffect } from "react";

export default function FadeInSection({ children }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      // Mobile ke liye threshold kam kiya taake jaldi load ho
      { threshold: 0.1, rootMargin: "50px" } 
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      // FIX: 'will-change-transform' add kiya taake mobile GPU animation handle kare
      className={`transform-gpu transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      // CSS hint for browser optimization
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}