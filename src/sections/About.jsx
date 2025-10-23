import React from "react";
import aboutImage from "../assets/about.svg"; // replace with your image path
import FadeInSection from "../components/FadeInSection";

export default function About() {
  return (
    <FadeInSection>
    <section
      id="about"
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto"
    >
      <div className="w-full flex flex-col md:flex-row items-center gap-8">
        {/* Image without card styles */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aboutImage}
            width={694}
            height={576}
            alt="About Me"
            className="max-w-xs md:max-w-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-onSurface">
          <h2 className="text-4xl font-bold mb-6 text-primary">About Me</h2>
          <p className="text-lg leading-relaxed tracking-wide">
            I'm <strong>Mudassir</strong>, a Software Engineering graduate with 4 years in IoT
            and desktop apps, plus 1 year in web development. I excel in professional
            documentation and have collaborated with international and local clients.
          </p>
        </div>
      </div>
    </section>
    </FadeInSection>
  );
}
