import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import sanityClient from "../sanityClient"; 
import { PortableText } from "@portabletext/react"; 
import imageUrlBuilder from "@sanity/image-url"; 
import avatar from "../assets/profile.jpg"; 
import LogbookSkeleton from "../components/LogbookSkeleton";
// 1. Motion Import kiya animation ke liye
import { motion } from "framer-motion";

const builder = imageUrlBuilder(sanityClient);

// 2. IMAGE OPTIMIZATION LOGIC (WebP + Resize)
function urlFor(source) {
  return builder.image(source)
    .width(800)       // Mobile ke liye size limit kiya
    .quality(80)      // Quality optimized
    .format('webp');  // Lightweight format
}

const LinkRenderer = ({ children, value }) => {
  return (
    <a
      href={value.href}
      target="_blank" 
      rel="noopener noreferrer"
      className="text-primary font-medium hover:underline"
    >
      {children}
    </a>
  );
};

export default function LogbookModal({ onClose }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          publishedAt,
          body
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
        setLoading(false);
      });
  }, []); 

  return (
    // 3. SMOOTH ENTRY ANIMATION (Motion.div)
    <motion.div 
    layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed inset-0 z-[60] bg-surface p-4 overflow-y-auto scroll-smooth no-scrollbar"
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 pt-2">
        <h2 className="text-3xl font-bold text-primary">Work Log & Thoughts</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-primary bg-white/80 backdrop-blur shadow-material hover:bg-primary/10 transition"
          aria-label="Close work log"
        >
          <X size={24} />
        </button>
      </div>

      {/* Feed Layout */}
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        
        {loading && (
          <>
            <LogbookSkeleton />
            <LogbookSkeleton />
          </>
        )}

        {!loading && posts &&
          posts.map((post, index) => (
            // 4. POST ENTRY ANIMATION (Staggered)
            <motion.div
            layout
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }} // Har card thoda ruk ke ayega
              className="p-6 bg-white/80 backdrop-blur rounded-[30px] shadow-material border border-primary/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={avatar}
                  alt="Mudassir Nadeem"
                  className="w-12 h-12 rounded-full object-cover object-top"
                />
                <div>
                  <h3 className="text-lg font-bold text-onSurface">Mudassir Nadeem</h3>
                  <p className="text-sm text-onSurface/70">
                    {new Date(post.publishedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-bold text-primary mb-3">
                {post.title}
              </h4>

              <div className="text-lg text-onSurface leading-relaxed">
                <PortableText
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <img
                          src={urlFor(value).url()}
                          alt={value.alt || "Work log image"}
                          // 5. LAZY LOAD IMAGES INSIDE POSTS
                          loading="lazy" 
                          className="w-full h-auto rounded-lg my-4"
                        />
                      ),
                    },
                    marks: {
                      link: LinkRenderer, 
                    },
                  }}
                />
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}