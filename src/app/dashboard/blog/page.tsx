
import { fetchBlogs } from 'config/fetch';
import { BlogInfo } from 'types/interfaces';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const Blog = dynamic(() => import('./Blogs'))

const Blogging = async () => {
  let blog = await fetchBlogs()

  const filteredBlog: BlogInfo[] = blog?.sort((a: BlogInfo, b: BlogInfo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || []
  return (
    <Suspense fallback='loading...'>
      <Blog blogs={filteredBlog} />
    </Suspense>
  );
};

export default Blogging;
