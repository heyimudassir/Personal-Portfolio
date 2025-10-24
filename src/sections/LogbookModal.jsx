import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import sanityClient from "../sanityClient"; 
import { PortableText } from "@portabletext/react"; 
import imageUrlBuilder from "@sanity/image-url"; 
import avatar from "../assets/profile.jpg"; 

// 1. --- NAYA SKELETON COMPONENT IMPORT KAREIN ---
// (Path check kar lein, yeh 'sections' se bahar 'components' mein hai)
import LogbookSkeleton from "../components/LogbookSkeleton";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

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
    <div className="fixed inset-0 z-[60] bg-surface p-4 overflow-y-auto scroll-smooth no-scrollbar">
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
        
        {/* --- 2. YEH LOADING SECTION CHANGE HUA HAI --- */}
        {loading && (
          <>
            {/* Hum 2-3 skeleton posts dikhayeinge */}
            <LogbookSkeleton />
            <LogbookSkeleton />
          </>
        )}

        {/* Jab loading false ho, tab posts dikhayein */}
        {!loading && posts &&
          posts.map((post) => (
            <div
              key={post._id}
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
                          className="w-full h-auto rounded-lg my-4"
                        />
                      ),
                    },
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}