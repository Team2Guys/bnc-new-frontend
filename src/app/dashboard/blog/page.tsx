'use client';

import { useEffect, useState } from 'react';
import { fetchBlogs } from 'config/fetch';
import { BlogInfo } from 'types/interfaces';
import Blogs from './Blogs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Blogging = () => {
  const [blogs, setBlogs] = useState<BlogInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blog = await fetchBlogs();
        const filtered =
          blog?.sort(
            (a: BlogInfo, b: BlogInfo) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ) || [];

        setBlogs(filtered);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) return null;

  return <Blogs blogs={blogs} />;
};

export default Blogging;
