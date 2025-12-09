import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aljawarah",
    role: "Frontend Developer",
    text: "This is an excellent service! The UI is clean, modern, and intuitive. I highly recommend working with Mudassir.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sergio",
    role: "Project Manager",
    text: "You're the best in IoT development! Delivered the project way ahead of the deadline with perfect documentation.",
    stars: 5,
  },
  {
    id: 3,
    name: "Hassan",
    role: "UX Designer",
    text: "I love the attention to detail and the Material You inspired design. It feels premium and consistent.",
    stars: 5,
  },
  {
    id: 4,
    name: "Simal",
    role: "Full Stack Developer",
    text: "Thanks for the great work! The code quality was top-notch and easy to integrate with our backend.",
    stars: 5,
  },
  {
    id: 5,
    name: "Eva Green",
    role: "Marketing Lead",
    text: "Highly professional and prompt. The UI experience is top-notch! Will definitely hire again.",
    stars: 5,
  },
];

const TestimonialCard = ({ item }) => (
  // White Card Design
  <div className="relative w-[350px] md:w-[450px] bg-white p-8 rounded-[30px] shadow-xl flex-shrink-0 mx-6 border border-gray-100">
    <Quote className="absolute top-6 right-8 text-primary/10" size={48} />
    
    <div className="flex gap-1 mb-4">
      {[...Array(item.stars)].map((_, i) => (
        <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>

    <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
      "{item.text}"
    </p>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
        {item.name[0]}
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500 font-medium">{item.role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative bg-gray-50 rounded-3xl mx-4 md:mx-0">
      
      <div className="text-center mb-16 relative z-10 px-4">
        <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">
          Feedback
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-onSurface">
          Trusted by Professionals
        </h3>
      </div>

      {/* --- FIX: CSS MASKING (Zero "Box" Feel) --- */}
      {/* Humne extra DIVs hata diye. Ab hum seedha container ko mask kar rahe hain */}
      <div 
        className="relative w-full flex overflow-hidden"
        style={{
          // Left 20% fade in (transparent to black)
          // Right 20% fade out (black to transparent)
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
        }}
      >
        
        {/* Moving Track - Padding 'py-12' rakhi hai taake shadow na katay */}
        <motion.div 
          className="flex items-center py-12"
          animate={{ x: "-50%" }} 
          transition={{ 
            ease: "linear", 
            duration: 40, 
            repeat: Infinity,
            repeatType: "loop"
          }}
          whileHover={{ animationPlayState: "paused" }} 
        >
          {/* List double render for infinite loop */}
          {[...testimonials, ...testimonials].map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>

    </section>
  );
}