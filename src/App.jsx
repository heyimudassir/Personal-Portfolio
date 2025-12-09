import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LogbookModal from './sections/LogbookModal';

// Sections
import Home from './sections/Home';
import About from './sections/About';
import Work from './sections/Work';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  const [isLogbookOpen, setIsLogbookOpen] = useState(false);

  const openLogbook = () => setIsLogbookOpen(true);
  const closeLogbook = () => setIsLogbookOpen(false);

  return (
    // 'bg-surface' humari tailwind config se aa raha hai
    <div className="bg-surface min-h-screen relative selection:bg-primary/30">
      
      {/* Jab modal khula ho to Navbar chupa dein */}
      {!isLogbookOpen && <Navbar />}

      <main>
        {/* Pass 'isPaused' to Home to stop parallax when modal is open */}
        <Home onOpenLogbook={openLogbook} isPaused={isLogbookOpen} />
        <About />
        <Work />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      {/* Modal */}
      {isLogbookOpen && <LogbookModal onClose={closeLogbook} />}
    </div>
  );
}