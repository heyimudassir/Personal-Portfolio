import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// 1. Paths ab theek hain
import avatar from "../assets/profile.jpg"; 
import FadeInSection from "../components/FadeInSection"; 

const skills = ["React", "Internet of Things", "Desktop Apps"];

export default function Home({ onOpenLogbook }) {
  // 2. YAHAN SE EXTRA '=' HATA DIYA HAI
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Refs for timers and visibility state
  const fadeTimerRef = useRef(null);
  const nextCycleTimerRef = useRef(null);
  const isHiddenRef = useRef(document.hidden);

  // --- Animation flicker fix (Yeh code theek hai) ---
  useEffect(() => {
    const totalDuration = 2000;
    const fadeDuration = 500;

    const animate = () => {
      if (isHiddenRef.current) return;
      setFade(true); 

      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % skills.length);
        setFade(false); 

        clearTimeout(nextCycleTimerRef.current);
        nextCycleTimerRef.current = setTimeout(
          animate,
          totalDuration - fadeDuration
        );
      }, fadeDuration);
    };

    const handleVisibilityChange = () => {
      isHiddenRef.current = document.hidden;
      clearTimeout(fadeTimerRef.current);
      clearTimeout(nextCycleTimerRef.current);

      if (!document.hidden) {
        setFade(false); 
        nextCycleTimerRef.current = setTimeout(
          animate,
          totalDuration - fadeDuration
        );
      }
    };

    if (!isHiddenRef.current) {
      nextCycleTimerRef.current = setTimeout(
        animate,
        totalDuration - fadeDuration
      );
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(fadeTimerRef.current);
      clearTimeout(nextCycleTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Empty dependency array bilkul theek hai

  // --- Return statement (Yeh code theek hai) ---
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
        <h1 className="text-4l md:text-5xl font-bold text-primary mb-2 flex justify-center items-center">
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

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="/MudassirNadeem.pdf" 
            download
            className="px-6 py-3 bg-primary text-white font-medium rounded-full shadow-material hover:opacity-90 transition"
          >
            Download CV
          </a>

          <button
            onClick={onOpenLogbook}
            className="px-6 py-3 bg-white/80 backdrop-blur rounded-full shadow-material text-primary font-medium hover:bg-primary/10 transition"
          >
            View Work Log
          </button>
        </div>
        
      </section>
    </FadeInSection>
  );
}