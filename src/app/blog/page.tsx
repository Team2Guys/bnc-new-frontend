import React from 'react';
import { BlogInfo } from 'types/interfaces';
import { fetchBlogs } from 'config/fetch';
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import Container from 'components/Res-usable/Container/Container';
import BlogCard from 'components/Blogs/blog-card';
import dynamic from 'next/dynamic';
const  SlickSlider = dynamic(() => import('components/Blogs/slick-slider'));
const  BlogLoad = dynamic(() => import('components/Blogs/blog-load'));
export const metadata = generateMetadata(metaData.blog);

const Blog = async () => {
 let blogs: BlogInfo[] = [];

  try {
    const data = await fetchBlogs();
    blogs = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  const filteredBlog: BlogInfo[] = blogs
    .filter((blog) => blog.isPublished)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  const uniqueCategories = Array.from(
    new Set(filteredBlog.map((blog) => blog.category))
  );
  return (
    <>
      <Breadcrumb title="Blog - Blinds and Curtains Dubai" bradcrumbtitle='Blog' image='/assets/images/Blog/blogbackground.png' /> 
      <Container>
      <BlogLoad filteredBlog={filteredBlog}/>
      <SlickSlider title="Blog Category">
        {uniqueCategories.map((category, index) => {
          const blog = filteredBlog.find((b) => b.category === category);
          return (
            blog && <BlogCard key={blog.id ?? index} blog={blog} iscategory  />
          );
        })}
      </SlickSlider>

      </Container> 

    </>
  );
};

export default Blog;
