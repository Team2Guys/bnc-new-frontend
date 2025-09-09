
import BlogMain from 'components/Blogs/blog-main';
import OurBlog from 'components/Blogs/our-blog';
import Container from 'components/Res-usable/Container/Container';
import Comments from 'components/comments/Comments';
import TopHero from 'components/ui/top-hero';
import { formatDateMonth } from 'config';
import Image from 'next/image';
import React from 'react';
import { BlogInfo } from 'types/interfaces';
import bgBreadcrum from '../../../../public/assets/images/Blog/blogbackground.png';
import { FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { ICategory } from 'types/types';
import HTMLReactParser from "html-react-parser";
import Script from 'next/script';
import { notFound } from 'next/navigation';


const Blog = ({
  category,
  filterCategoryBlogPosts,
  blog,
  filterRelatedPosts
}: {
  category?: ICategory;
  filterCategoryBlogPosts?: BlogInfo[];
  blog?: BlogInfo;
  filterRelatedPosts?: BlogInfo[];
}) => {

  const matchedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://blindsandcurtains.ae/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://blindsandcurtains.ae/blog/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Lined vs Unlined Curtains",
            "item": "https://blindsandcurtains.ae/blog/lined-vs-unlined-curtains/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are Lined Curtains Better?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on what you want from your curtain. However, lined curtains are heavy and durable, look more elegant, and are perfect for larger spaces and rooms."
            }
          },
          {
            "@type": "Question",
            "name": "Do Unlined Curtains Look Cheap?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not all the unlined curtains look cheap. It is always recommended to get your curtain lined but velvet curtains look decent even without lining."
            }
          },
          {
            "@type": "Question",
            "name": "Should Living Room Curtains be Lined?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In addition to blocking sunlight, it guards the curtain against wear and tear. If you don’t line your curtains, replacing them will cost you more once damaged. Thus, the lining is important!"
            }
          },
          {
            "@type": "Question",
            "name": "Do Lined Curtains Block Light Completely?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can block out light completely with lined curtains. Different lined curtains provide different light-filtering features."
            }
          }
        ]
      }
    ]
  }
  
  return (
    <>

{matchedSchema && (
        <Script type="application/ld+json" id="blinds-json-ld">
          {JSON.stringify(matchedSchema)}
        </Script>
      )}
      {category ? (
        <>
          <TopHero
            title={category?.title || 'blogs'}
            image={`${category?.bannerImage?.imageUrl || bgBreadcrum.src}`}
          />
          <div className="my-5">
            <BlogMain blogs={filterCategoryBlogPosts || []} />{' '}
          </div>
        </>
      ) : blog ? (
        <Container className="mt-10 space-y-4 lg:space-y-8 mb-10 md:mb-10">
          <div className="flex justify-center sm:justify-start items-center px-2 gap-1 xs:gap-2 sm:gap-4 mt-2 text-14 sm:text-base flex-wrap ">
            <Link
              href="/"
              className="flex items-center gap-2 text-12 xs:text-14 font-bold capitalize"
            >
              Home
            </Link>
            <FaAngleRight size={20} />
            <Link
              href={`/blog/`}
              className="flex items-center gap-2 text-12 xs:text-14 font-bold capitalize"
            >
              Blog
            </Link>
            <FaAngleRight size={20} />
            <Link
              href={`/blog/${blog?.category.toLowerCase()}/`}
              className="flex items-center gap-2 text-12 xs:text-14 font-bold capitalize"
            >
              {blog?.category}
            </Link>
            <FaAngleRight size={20} />
            <h2 className="flex items-center gap-2 text-12 xs:text-14 font-bold capitalize max-sm:text-center">
              {blog?.title}
            </h2>

          </div>
          <div className="text-24 sm:text-[36px] md:text-[48px] font-bold text-center">
            <h1>{blog?.title}</h1>
          </div>
          <div className="flex gap-8">
            <p className="text-12 2xl:text-14 font-medium text-[#999999]">
              {formatDateMonth(blog?.createdAt)}
            </p>
          </div>
          <div className="">
            <Image
              className="w-full rounded-md h-[270px] sm:h-[416px] xl:h-[467px] 2xl:sm:h-[526px]  xl:object-cover "
              width={1200}
              height={800}
              src={blog?.posterImage?.imageUrl}
              alt="Blog Image"
            />
          </div>

          <div className="w-[90%] m-auto overflow-hidden text-start">
            <div className='blog-content mt-8'>{HTMLReactParser(blog?.content || '')}</div>

            <div className='mt-5'>
              <Comments data={blog} />
            </div>
          </div>

          <div className="mt-10">
            <div className='flex flex-wrap justify-between items-center'>
              <h3 className="text-18 xs:text-28 md:text-[48px] font-semibold">
                Related Articles
              </h3>
              <Link className="text-14 font-semibold rounded-full py-2 px-4 text-white bg-secondary hover:bg-primary xs:text-16 sm:text-18"
                href={`/blog/${blog?.category.toLowerCase()}/`}>See All</Link>
            </div>

            {filterRelatedPosts && filterRelatedPosts?.length >= 2 && <OurBlog Blogdata={filterRelatedPosts.slice(0, 3)|| []} />}
          </div>
        </Container>
      ) : (
        notFound()
      )}
    </>
  );
};

export default Blog;
