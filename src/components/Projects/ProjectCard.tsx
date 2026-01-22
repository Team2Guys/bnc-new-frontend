'use client';
import { projectsData } from 'data/data';
import Image from 'next/image';
import React, { useState } from 'react';

const ProjectCard = () => {
  const sortedProjects = projectsData.sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 pt-4">
        {sortedProjects.slice(0, visibleCount).map((project, index) => (
          <div
            className="relative group w-full h-[280px] xss:h-[343px] md:h-[380px] overflow-hidden cursor-pointer"
            key={index}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              priority={index < 9}
              className="transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="text-center px-4">
                <h3 className="text-white text-xl md:text-2xl font-medium mb-2 font-futura">
                  {project.title}
                </h3>
                <p
                  className="text-white font-roboto"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < sortedProjects.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 border border-secondary rounded-md hover:bg-secondary transition font-semibold font-roboto"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
