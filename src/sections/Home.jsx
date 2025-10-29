import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import avatar from "../assets/profile.jpg"; 
import FadeInSection from "../components/FadeInSection"; 

const skills = ["React", "Internet of Things", "Desktop Apps"];

export default function Home({ onOpenLogbook, isPaused }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Refs for timers and visibility state
  const fadeTimerRef = useRef(null);
  const nextCycleTimerRef = useRef(null);
  const isHiddenRef = useRef(document.hidden);
  const isPausedRef = useRef(isPaused); 

  useEffect(() => {
    isPausedRef.current = isPaused;
    if (!isPaused) {
      setFade(false);
    }
  }, [isPaused]); 

  useEffect(() => {
    const totalDuration = 2000;
    const fadeDuration = 500;

    const animate = () => {
      if (isHiddenRef.current || isPausedRef.current) return;
      setFade(true); 

      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        if (isHiddenRef.current || isPausedRef.current) return;
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

      if (!document.hidden && !isPausedRef.current) {
        setFade(false); 
        nextCycleTimerRef.current = setTimeout(
          animate,
          totalDuration - fadeDuration
        );
      }
    };

    if (!isHiddenRef.current && !isPausedRef.current) {
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
  }, []); 

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
        
        {/* --- YAHAN CHANGE KIYA GAYA HAI --- */}
        {/* 1. 'text-center' poore h1 ko center karega */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 text-center">
          {/* 2. Yeh 'span' ab relative hai aur text-center ki wajah se center mein hoga */}
          <span className="relative inline-block">
            {/* 3. Aapka naam */}
            Mudassir
            
            {/* 4. Emoji ab 'absolute' hai, yeh layout flow mein nahi hai */}
            <span className="absolute top-0 -right-9 md:-right-11 text-3xl">
              👋
            </span>
          </span>
        </h1>
        {/* --- END OF CHANGE --- */}

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