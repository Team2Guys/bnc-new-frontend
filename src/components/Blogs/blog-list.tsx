'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateMonth, formatDateMonthShort } from 'config';
import { BlogInfo } from 'types/interfaces';
import { generateSlug } from 'data/data';
import HTMLReactParser from "html-react-parser";

interface IBlogsList {
  blogs: BlogInfo[];
}
interface IBlogCard {
  blog: BlogInfo;
}

const BlogCard = ({ blog }: IBlogCard) => {
  const { title, content, posterImage, createdAt , category, redirectionUrl } = blog;
  const filteredContent = content.replace(/<[^>]*>?/gm, '').slice(0, 310);

  return (
    <div className="flex flex-col sm:flex-row border-b border-[#00000080] items-center border-gray-300 max-sm:space-y-3 relative w-full py-4">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 hover:underline text-center mt-4  sm:hidden px-4">
          <Link href={`/blog/${redirectionUrl ? redirectionUrl : generateSlug(title)}/`}>{title}</Link>
        </h3>
        <div className='relative max-sm:w-full w-4/12 md:w-3/12 lg:w-2/12 px-4'>
        <div className='bg-white w-[37px] h-[37px] border border-black rounded-md absolute top-5 left-1 flex items-center justify-center sm:hidden'>
        <span className="text-[9px] font-medium text-gray-500 whitespace-normal text-center px-2">
          {formatDateMonthShort(createdAt)}
        </span>
      </div>
        <Image
          src={posterImage?.imageUrl}
          alt={title}
          width={400}
          height={400}
          loading='lazy'
          className="rounded-xl md:object-cover w-full sm:w-[160px] sm:h-[160px] h-[160px]"
        />
        </div>
      <div className='grow max-sm:w-full w-2/12 px-4'>
        <div className="hidden sm:back_main_button mb-2">
          <span className="text-sm text-gray-500">{category}</span>
          <span className="text-sm text-gray-500">
            {formatDateMonth(createdAt)}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 hover:underline hidden sm:block">
          <Link href={`/blog/${redirectionUrl ? redirectionUrl : generateSlug(title)}/`}>{title}</Link>
        </h3>
        <div className="text-16 text-gray-600 mt-2 ">
          {HTMLReactParser(filteredContent || '') }...
          <Link
            href={`/blog/${redirectionUrl ? redirectionUrl : generateSlug(title)}/`}
            className={`text-primary ml-2   font-bold text-center sm:text-start max-sm:hidden`}
          >
            Read More
          </Link>
        </div>
        <div className='sm:hidden text-center mt-2'>
        <Link
            href={`/blog/${redirectionUrl ? redirectionUrl : generateSlug(title)}/`}
            className={`bg-[#BAA294] text-white ml-2 text-15  px-3 py-1 rounded-lg  font-bold text-center w-fit `}
          >
            Read More
          </Link>
        </div>
   
      </div>
    </div>
  );
};



const BlogList = ({ blogs }: IBlogsList) => {
  return (
    <div className="flex flex-col sm:gap-4">
      {blogs.map((blog: BlogInfo) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
