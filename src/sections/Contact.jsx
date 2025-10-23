import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import FadeInSection from "../components/FadeInSection";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react"; // Optional spinner icon

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => setSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_q4oluml",
        "template_qunr7lw",
        formRef.current,
        "kPMWrvFBajZBt0sl-"
      )
      .then(
        () => {
          setSent(true);
          toast.success("Message sent successfully!");
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          console.error("Email error:", error);
          toast.error("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <FadeInSection>
      <section
        id="contact"
        className="max-w-3xl mx-auto py-16 px-6 scroll-mt-20 animate-appear"
        aria-label="Contact Section"
      >
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">Contact</h2>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-onSurface">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="John Doe"
              className="bg-surface text-onSurface placeholder-onSurface/50 px-5 py-3 rounded-2xl shadow-md border border-onSurface/10 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-onSurface">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="bg-surface text-onSurface placeholder-onSurface/50 px-5 py-3 rounded-2xl shadow-md border border-onSurface/10 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium text-onSurface">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="Write your message here..."
              className="bg-surface text-onSurface placeholder-onSurface/50 px-5 py-3 rounded-2xl shadow-md border border-onSurface/10 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#F0ECF6] text-[#7661AD] px-6 py-3 rounded-material hover:bg-[#e3dced] transition-colors font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </FadeInSection>
  );
}
