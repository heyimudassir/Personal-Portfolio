import React from "react";
import logbookData from "../data/logbook.json"; // JSON file ko import karein
import FadeInSection from "./FadeInSection"; // FadeInSection import karein

export default function Logbook() {
  return (
    <FadeInSection>
      <section id="logbook" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* --- Section Title --- */}
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
            Work Log & Thoughts
          </h2>

          {/* --- Logbook Posts Container --- */}
          <div className="space-y-8">
            {logbookData.map((post) => (
              // --- Har post ke liye ek card ---
              <div
                key={post.id}
                className="p-6 bg-white/80 backdrop-blur rounded-[30px] shadow-material border border-primary/10"
              >
                {/* Post Date */}
                <p className="text-sm font-medium text-onSurface/70 mb-2">
                  {post.date}
                </p>
                
                {/* Post Title */}
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {post.title}
                </h3>
                
                {/* Post Content */}
                <p className="text-lg text-onSurface leading-relaxed">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}