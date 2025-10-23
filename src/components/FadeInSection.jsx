import React, { useRef, useState, useEffect } from "react";

export default function FadeInSection({ children }) {
  const ref = useRef(null); // Initialize with null
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ref.current ko ek variable mein copy karein
    const currentRef = ref.current; 
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check karein agar element intersect kar raha hai
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // --- YEH HAI FIX ---
          // Jaise hi visible ho, observer ko disconnect kar dein
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.2 }
    );

    // Observe karein agar currentRef mojood hai
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Dependency array ko khali rakhein

  return (
    <div
      ref={ref}
      className={`relative z-10 transition-opacity transform duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}