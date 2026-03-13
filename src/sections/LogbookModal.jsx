import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import sanityClient from "../sanityClient"; 
import { PortableText } from "@portabletext/react"; 
import imageUrlBuilder from "@sanity/image-url"; 
import avatar from "../assets/profile.jpg"; 
import LogbookSkeleton from "../components/LogbookSkeleton";
import { motion } from "framer-motion";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source).width(600).quality(80).format('webp'); 
}

const LinkRenderer = ({ children, value }) => {
  return (
    <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
      {children}
    </a>
  );
};

export default function LogbookModal({ onClose }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lock background scrolling for normal browsers
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, publishedAt, body }`)
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
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      
      // 🔴 THE FIX: Lenis aur custom scrollers ko background scroll karne se rokne ke liye
      data-lenis-prevent="true" 
      onWheel={(e) => e.stopPropagation()} 
      onTouchMove={(e) => e.stopPropagation()}

      className="fixed inset-0 z-[100] bg-surface p-4 overflow-y-auto scroll-smooth no-scrollbar"
    >
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 pt-2">
        <h2 className="text-3xl font-bold text-primary">Work Log & Thoughts</h2>
        <button 
          onClick={onClose} 
          className="p-2 rounded-full text-primary bg-white/80 backdrop-blur shadow-sm hover:bg-primary/10 transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 pb-12 relative z-10">
        
        {loading ? (
          <>
            <LogbookSkeleton />
            <LogbookSkeleton />
          </>
        ) : (
          posts && posts.map((post) => (
            <div
              key={post._id}
              className="p-6 bg-white rounded-[30px] shadow-sm border border-primary/10"
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
                      day: "numeric" 
                    })}
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-bold text-primary mb-3">{post.title}</h4>

              <div className="text-lg text-onSurface leading-relaxed">
                <PortableText
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <img 
                          src={urlFor(value).url()} 
                          alt={value.alt || "Work log image"} 
                          loading="lazy" 
                          className="w-full h-auto rounded-lg my-4 bg-gray-100" 
                        />
                      ),
                    },
                    marks: { link: LinkRenderer },
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}