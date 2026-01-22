'use client';
import React, { useState } from 'react';
import BlogCard from './blog-card';
import { BlogInfo } from 'types/interfaces';

const BlogLoad = ({
  filteredBlog,
  iscategory,
}: {
  filteredBlog: BlogInfo[];
  iscategory?: boolean;
}) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const hasMore = visibleCount < filteredBlog.length;

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 my-5">
        {filteredBlog.map((blog, index) => (
          <div
            key={blog.id ?? index}
            className={index < visibleCount ? 'block' : 'hidden'}
          >
            <BlogCard blog={blog} iscategory={iscategory} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 text-primary border border-secondary rounded-lg py-3 font-semibold font-roboto hover:bg-secondary transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default BlogLoad;
