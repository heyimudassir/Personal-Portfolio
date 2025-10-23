import { useEffect, useRef, useState } from "react";
import FadeInSection from "../components/FadeInSection";

const testimonials = [
  { id: 1, name: "Aljawarah", role: "Frontend Developer", rating: 5, comment: "This is an excellent service! The UI is clean, modern, and intuitive. I highly recommend it." },
  { id: 2, name: "Sergio", role: "Project Manager", rating: 4, comment: "You're the best in IoT development!" },
  { id: 3, name: "Hassan", role: "UX Designer", rating: 5, comment: "I love the attention to detail and the Material You inspired design. It feels premium and consistent." },
  { id: 4, name: "Simal", role: "Full Stack Developer", rating: 4, comment: "Thanks for the great work!" },
  { id: 5, name: "Eva Green", role: "Marketing Lead", rating: 5, comment: "Highly professional and prompt. The UI experience is top-notch!" },
];

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1 text-yellow-400" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-current" : "stroke-current"}`}
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [pageCount, setPageCount] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const mobileBreakpoint = 768; // Tailwind md breakpoint

      setIsMobile(width < mobileBreakpoint);

      // Cards per page 3 on desktop/tablet, 1 on mobile
      const newCardsPerPage = width < mobileBreakpoint ? 1 : 3;
      setCardsPerPage(newCardsPerPage);

      setPageCount(Math.ceil(testimonials.length / newCardsPerPage));
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToPage = (page) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.children[0];
    if (!card) return;

    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const marginRight = parseInt(cardStyle.marginRight) || 0;
    const totalCardWidth = cardWidth + marginRight;

    const scrollLeft = page * cardsPerPage * totalCardWidth;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActivePage(page);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.children[0];
    if (!card) return;

    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const marginRight = parseInt(cardStyle.marginRight) || 0;
    const totalCardWidth = cardWidth + marginRight;

    const scrollLeft = container.scrollLeft;
    const page = Math.round(scrollLeft / (cardsPerPage * totalCardWidth));
    setActivePage(page);
  };

  return (
    <FadeInSection>
    <section id="testimonials" className="max-w-5xl mx-auto py-12 px-6" aria-label="Testimonials Section">
      <h2 className="text-4xl font-bold text-primary mb-10 text-center">Testimonials</h2>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory`}
        tabIndex={0}
        role="list"
        aria-live="polite"
        aria-label="Testimonials carousel"
        style={{ scrollBehavior: "smooth", gap: "1.5rem" }}
      >
        {testimonials.map(({ id, name, role, rating, comment }) => (
          <article
            key={id}
            className={`flex-shrink-0 snap-center bg-primary rounded-material p-6 shadow-material hover:shadow-lg transition-shadow duration-300 cursor-default`}
            role="listitem"
            aria-labelledby={`testimonial-${id}-name`}
            aria-describedby={`testimonial-${id}-comment`}
            style={{
              marginRight: "0.5px",
              width: isMobile ? "78vw" : `calc((100% / 3) - 1rem)`,
              minWidth: isMobile ? "78vw" : "auto",
              flexBasis: isMobile ? "78vw" : "auto",
            }}
          >
            <StarRating rating={rating} />
            <p id={`testimonial-${id}-comment`} className="mt-4 text-onPrimary text-base font-medium leading-relaxed">
              “{comment}”
            </p>
            <p id={`testimonial-${id}-name`} className="mt-6 font-semibold text-onPrimary text-lg">
              {name}
            </p>
            <p className="text-sm italic text-onPrimary">{role}</p>
          </article>
        ))}
      </div>

      {/* Show dots only on desktop/tablet */}
      {!isMobile && (
        <div className="flex justify-center mt-6 space-x-4">
          {[...Array(pageCount)].map((_, idx) => (
            <button
              key={idx}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                idx === activePage ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Show testimonials page ${idx + 1}`}
              aria-current={idx === activePage ? "true" : undefined}
              onClick={() => scrollToPage(idx)}
            />
          ))}
        </div>
      )}
    </section>
    </FadeInSection>
  );
}
