import { useState } from "react"; // 1. useState import kiya gaya
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import Work from "./sections/Work";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import BackToTop from "./components/BackToTop";
// 2. Naya Modal component import kiya (hum isay 'sections' folder mein banayenge)
import LogbookModal from "./sections/LogbookModal";

export default function App() {
  // 3. State add ki gayi jo modal ko control karegi
  const [isLogbookOpen, setIsLogbookOpen] = useState(false);

  // 4. Modal kholne aur band karne ke functions
  const openLogbook = () => setIsLogbookOpen(true);
  const closeLogbook = () => setIsLogbookOpen(false);

  return (
    <div className="bg-surface min-h-screen px-4 md:px-8 py-6">
      {/* 5. Navbar ab tabhi show hogi jab modal band hoga */}     {" "}
      {!isLogbookOpen && <Navbar />}
      {/* 6. 'openLogbook' function ko 'Home' component mein pass kiya gaya */}
            <Home onOpenLogbook={openLogbook} />
            <About />
            <Work />
            <Testimonials />
            <Contact />
            <Footer />
            <BackToTop />
      {/* 7. Jab state 'true' hogi, to LogbookModal show hoga */}
      {isLogbookOpen && <LogbookModal onClose={closeLogbook} />}
    </div>
  );
}
