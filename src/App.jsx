import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home'
import About from './sections/About';
import Work from './sections/Work';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
      <div className="bg-surface min-h-screen px-4 md:px-8 py-6">
      <Navbar />
      <Home />
      <About />
      <Work />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop />
     </div>
  );
}