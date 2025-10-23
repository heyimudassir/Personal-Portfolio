import React, { useState, useRef } from "react";
import projects from "../data/projects";
import videoThumbnail from "../assets/iot.svg";

const getThumbnail = (project) => {
  if (project.image) return project.image;
  if (project.video) return videoThumbnail;
  return "/images/placeholder.png";
};

const renderDescription = (project) => {
  if (!Array.isArray(project.description)) {
    return <p className="text-onSurface mb-4">{project.description}</p>;
  }

  return (
    <div className="text-onSurface text-sm space-y-4">
      {project.description.map((block, idx) => {
        if (block.type === "paragraph") {
          return <p key={idx}>{block.content}</p>;
        }
        if (block.type === "section") {
          return (
            <div key={idx}>
              <h4 className="font-semibold text-primary mb-1">{block.title}</h4>
              {block.items ? (
                <ul className="list-disc list-inside space-y-1">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium">{block.content}</p>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllModal, setShowAllModal] = useState(false);
  const sliderRef = useRef(null);

  const allCategories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="min-h-[80vh] px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-primary mb-10 text-center">Work</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full font-medium border ${
              activeCategory === category
                ? "bg-primary text-white"
                : "bg-surface text-primary border-primary"
            } transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.slice(0, 3).map((project, i) => (
          <div
            key={i}
            className="relative cursor-pointer rounded-material overflow-hidden shadow-material hover:shadow-lg transition-shadow duration-300 bg-surface group"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image with aspect ratio */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
              <img
                src={getThumbnail(project)}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-material">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
                className="px-6 py-3 bg-primary text-white font-medium rounded-full shadow-material hover:opacity-90 transition"
              >
                View Project
              </button>
            </div>

            {/* Text Content */}
            <div className="p-4 min-h-[100px]">
              <h3 className="text-xl font-semibold text-primary mb-1">
                {project.name}
              </h3>
              <p className="text-onSurface text-sm">{project.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {filteredProjects.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllModal(true)}
            className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition"
          >
            View All Projects
          </button>
        </div>
      )}

      {/* Modal */}
      {showAllModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
          onClick={() => setShowAllModal(false)}
        >
          <div
            className="relative bg-surface rounded-material shadow-xl max-w-7xl w-full p-6 pt-6 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-primary">All Projects</h3>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-onSurface text-3xl font-bold hover:text-primary transition"
                aria-label="Close modal"
              >
                &times;
              </button>
            </header>

            {/* Scrollable Cards */}
            <div className="relative w-full">
              <button
                onClick={scrollLeft}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/80 transition z-10"
                aria-label="Scroll left"
              >
                &#8592;
              </button>

              <div
                ref={sliderRef}
                className="flex overflow-x-auto scrollbar-hide space-x-6 scroll-smooth px-4 snap-x snap-mandatory"
              >
                {filteredProjects.map((project, i) => (
                  <div
                    key={i}
                    className="w-[90vw] sm:w-[60vw] md:w-[45vw] lg:w-[320px] flex-shrink-0 bg-surface rounded-material shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer snap-center"
                    onClick={() => {
                      setShowAllModal(false);
                      setSelectedProject(project);
                    }}
                  >
                    <img
                      src={getThumbnail(project)}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-t-material bg-muted"
                      loading="lazy"
                    />
                    <div className="p-5 min-h-[100px]">
                      <h4 className="text-xl font-semibold text-primary mb-2">
                        {project.name}
                      </h4>
                      <p className="text-onSurface text-base">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollRight}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/80 transition z-10"
                aria-label="Scroll right"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-surface rounded-material shadow-material max-w-lg w-full p-6 relative overflow-hidden max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 text-onSurface text-xl font-bold hover:text-primary"
              aria-label="Close"
            >
              &times;
            </button>

            {selectedProject.video ? (
              <video
                src={selectedProject.video}
                controls
                className="w-full rounded-material mb-4"
              />
            ) : (
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-64 object-cover rounded-material mb-4 bg-muted"
                loading="lazy"
              />
            )}

            <div className="overflow-y-auto max-h-52 pr-2 scrollbar-hide">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {selectedProject.name}
              </h3>
              {renderDescription(selectedProject)}
              <p className="italic text-sm text-onSurface mt-4">
                Category: {selectedProject.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
