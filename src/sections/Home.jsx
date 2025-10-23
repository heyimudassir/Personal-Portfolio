import { useState, useEffect, useRef } from "react";
import avatar from "../assets/profile.jpg";
import clsx from "clsx";
import FadeInSection from "../components/FadeInSection";

const skills = ["React", "Internet of Things", "Desktop Apps"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Refs for timers and visibility state
  const fadeTimerRef = useRef(null);
  const nextCycleTimerRef = useRef(null);
  const isHiddenRef = useRef(document.hidden);

  useEffect(() => {
    const totalDuration = 2000;
    const fadeDuration = 500;

    // Animation function
    const animate = () => {
      // Don't run animation if tab is hidden
      if (isHiddenRef.current) return;

      setFade(true); // 1. Start fade-out

      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % skills.length);
        setFade(false); // 2. Start fade-in

        clearTimeout(nextCycleTimerRef.current);
        nextCycleTimerRef.current = setTimeout(
          animate,
          totalDuration - fadeDuration
        );
      }, fadeDuration);
    };

    // Function to handle tab visibility changes
    const handleVisibilityChange = () => {
      isHiddenRef.current = document.hidden;

      // Always clear timers to pause animation
      clearTimeout(fadeTimerRef.current);
      clearTimeout(nextCycleTimerRef.current);

      if (!document.hidden) {
        // If tab is visible again (Resume)
        
        // 1. Instantly set to visible (prevents flicker on return)
        setFade(false); 
        
        // 2. Schedule the *next* animation cycle
        nextCycleTimerRef.current = setTimeout(
          animate,
          totalDuration - fadeDuration
        );
      }
      // If tab is hidden, timers are cleared and nothing else happens (Paused)
    };

    // Start the first animation cycle (only if tab is currently visible)
    if (!isHiddenRef.current) {
      nextCycleTimerRef.current = setTimeout(
        animate,
        totalDuration - fadeDuration
      );
    }

    // Add the event listener for tab visibility
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function to remove timers and listener
    return () => {
      clearTimeout(fadeTimerRef.current);
      clearTimeout(nextCycleTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Empty dependency array is correct

  // The rest of your component's JSX
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