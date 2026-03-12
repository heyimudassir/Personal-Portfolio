import { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { Loader2 } from 'lucide-react';

import Home from './sections/Home';
import About from './sections/About';
import Work from './sections/Work';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

const LogbookModal = lazy(() => import('./sections/LogbookModal'));

export default function App() {
  const [isLogbookOpen, setIsLogbookOpen] = useState(false);

  const openLogbook = () => setIsLogbookOpen(true);
  const closeLogbook = () => setIsLogbookOpen(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // --- FIX: MOBILE PAR LENIS DISABLE KARNA ---
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let lenis;

    // Sirf Desktop par Lenis initialize hoga
    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        smoothWheel: true, 
        // touchMultiplier nikaal diya hai taake touch events hijack na hon
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-surface min-h-screen relative selection:bg-primary/30">
      
      {!isLogbookOpen && <Navbar />}

      <main>
        <Home onOpenLogbook={openLogbook} isPaused={isLogbookOpen} />
        <About />
        <Work />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      {isLogbookOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
        }>
          <LogbookModal onClose={closeLogbook} />
        </Suspense>
      )}
    </div>
  );
}