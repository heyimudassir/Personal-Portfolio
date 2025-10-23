// 1. YAHAN 'useRef' IMPORT KAREIN
import { useState, useEffect, useRef } from "react";
import avatar from "../assets/profile.jpg";
import clsx from "clsx";
import FadeInSection from "../components/FadeInSection";

const skills = ["React", "Internet of Things", "Desktop Apps"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // 2. YAHAN PAR REFS ADD KAREIN
  const fadeTimerRef = useRef(null);
  const nextCycleTimerRef = useRef(null);

  // 3. APNA PURANA 'useEffect' HATA KAR YEH POORA NAYA WALA PASTE KAREIN
  useEffect(() => {
    const totalDuration = 2000;
    const fadeDuration = 500;

    // Animation ka function
    const animate = () => {
      setFade(true); // 1. Fade-out shuru

      // Pehle fade timer ko clear karein (safety)
      clearTimeout(fadeTimerRef.current);
      
      fadeTimerRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % skills.length);
        setFade(false); // 2. Fade-in shuru

        // Pehle next cycle timer ko clear karein (safety)
        clearTimeout(nextCycleTimerRef.current);
        
        // 3. Agla cycle schedule karein
        nextCycleTimerRef.current = setTimeout(
          animate,
          totalDuration - fadeDuration
        );
      }, fadeDuration);
    };
    
    // Function jo tab ki visibility check karega
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Agar tab active nahi hai, to dono timers rok dein (PAUSE)
        clearTimeout(fadeTimerRef.current);
        clearTimeout(nextCycleTimerRef.current);
      } else {
        // Agar tab wapas active hua hai, to animation foran start karein
        animate();
      }
    };

    // Pehli animation start karein
    nextCycleTimerRef.current = setTimeout(
      animate,
      totalDuration - fadeDuration
    );

    // Browser ko batayein ke tab change honay par 'handleVisibilityChange' function call kare
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup: Jab component unmount ho, to sab kuch saaf kar dein
    return () => {
      clearTimeout(fadeTimerRef.current);
      clearTimeout(nextCycleTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Empty array bilkul theek hai


  // AAPKA BAAKI KA JSX WAISE HI RAHEGA
  return (
    <FadeInSection>
      <section
        id="home"
        className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4"
      >
        <img
          src={avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover shadow-material mb-4 object-top"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex justify-center items-center">
          <span className="inline-block">Mudassir</span>
          <span className="inline-block ml-2 text-3xl">👋</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-onSurface mb-1">
          Building modern solutions with
        </h2>

        <h2 className="text-2xl md:text-3xl font-bold text-primary h-[42px]">
          <span
            className={clsx(
              "inline-block",
              fade ? "animate-dust" : "animate-appear"
            )}
            aria-live="polite"
          >
            {skills[index]}
          </span>
        </h2>

        <a
          href="/MudassirNadeem.pdf"
          download
          className="mt-6 px-6 py-3 bg-primary text-white font-medium rounded-full shadow-material hover:opacity-90 transition"
        >
          Download CV
        </a>
      </section>
    </FadeInSection>
  );
}