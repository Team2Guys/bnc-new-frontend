
import { fetchBlogs } from 'config/fetch';
import { BlogInfo } from 'types/interfaces';
import Blogs from './Blogs';

const Blogging = async () => {
  const blog = await fetchBlogs()
  const filteredBlog: BlogInfo[] = blog?.sort((a: BlogInfo, b: BlogInfo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || []
  return (
  <Blogs blogs={filteredBlog} />
  );
};

export default Blogging;
