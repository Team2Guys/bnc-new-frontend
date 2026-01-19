import { ICategory } from "types/types";
import { headers } from "next/headers";
import { fetchBlogs, fetchCategories } from "config/fetch";
import { blogLinks } from "data/header_links";
import { Metadata } from "next";
import { BlogInfo } from "types/interfaces";
import { generateSlug } from "data/data";
import { notFound } from "next/navigation";
import Container from "components/Res-usable/Container/Container";
import BlogLoad from "components/Blogs/blog-load";
import { matchedSchema } from "data/schema";
import Script from "next/script";
import Breadcrumb from "components/Res-usable/breadcrumb";
import Image from "next/image";
import HTMLReactParser from "html-react-parser/lib/index";
import dynamic from 'next/dynamic';
import "style/blog.css";
const  SlickSlider = dynamic(() => import('components/Blogs/slick-slider'));
import BlogCard from "components/Blogs/blog-card";
import Link from "next/link";
const CategoryTitle = ["blinds", "curtains", "shutters" , "commercial"];

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const name = (await params).name;
  const matchingLink = blogLinks.find((link) => link.href === name);
  const [categories, blogs] = await Promise.all([fetchCategories(), fetchBlogs()]);

  const filterCategory: any = categories.find((category: ICategory) => category.title === matchingLink?.label);

  const blog: BlogInfo | undefined = blogs?.find((blog: BlogInfo) => {
    const filterTitle = blog.redirectionUrl ? blog.redirectionUrl : generateSlug(blog.title);
    return filterTitle === name && blog.isPublished;
  });


  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;
  if (!filterCategory && !blog) {
    notFound();
  }

  let Category: BlogInfo | ICategory = filterCategory ? filterCategory : blog || {} as any;

  let ImageUrl = Category?.posterImage.imageUrl || 'blindsandcurtains';
  let alt = Category?.posterImage.altText || 'blindsandcurtains';

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];

  let title = Category?.Meta_Title || 'blindsandcurtains';
  let description = Category?.Meta_description || 'Welcome to blindsandcurtains';
  let url = `${fullUrl}blog/${name}/`;
  let meta_object: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
      type: 'article'
    },
    alternates: {
      canonical: url,
    },
  };



  if (filterCategory && CategoryTitle.includes(filterCategory?.title?.toLowerCase())) {
    meta_object = {
      ...meta_object, robots: {
        index: false,
        follow: false,
      },
    }
  }


  return { ...meta_object }
}

const BlogDetail = async ({ params }: { params: Promise<{ name: string }> }) => {
  const blogs = await fetchBlogs();
  const categorymatched = (await params).name;
 if (CategoryTitle.includes(categorymatched.toLowerCase())) {
    const filteredBlog = blogs.filter(
      (blog: BlogInfo) =>
        blog.isPublished &&
        blog.category?.toLowerCase() === categorymatched.toLowerCase()
    );
    return (
      <>
        {matchedSchema && (
          <Script type="application/ld+json" id="blinds-json-ld">
            {JSON.stringify(matchedSchema)}
          </Script>
        )}

        <Breadcrumb
          slug="blog"
          title={categorymatched || "blogs"}
          image="/assets/images/Blog/blogbackground.png"
        />
        <Container>
          <BlogLoad filteredBlog={filteredBlog} />
          <SlickSlider title="Top Stories">
          {filteredBlog.map((blog: BlogInfo, index:number) => (
            <BlogCard key={blog.id ?? index} blog={blog} />
          ))}
          </SlickSlider>
        </Container>
      </>
    );
  }

const blog: BlogInfo | undefined = blogs.find((blog: BlogInfo) => {
  const slug = blog.redirectionUrl ? blog.redirectionUrl : generateSlug(blog.title);
  return slug === categorymatched && blog.isPublished;
});
const filteredBlog = blogs.filter((blog: BlogInfo) => blog.isPublished);
const uniqueCategories = Array.from(
  new Set(filteredBlog.map((blog: BlogInfo) => blog.category))
);
const relatedBlogs = blogs.filter(
  (b: BlogInfo) =>
    b.isPublished &&
    b.category?.toLowerCase() === blog?.category?.toLowerCase() &&
    b.id !== blog?.id // exclude current blog
);
if (!blog) return notFound();

  return (
    <Container className="mt-10 space-y-4 lg:space-y-8 mb-10 md:mb-10">
    <Breadcrumb slug="blog" subcategory={blog?.category.toLowerCase()} title={blog?.title} />
      <div className=" grid grid-cols-12 md:gap-6">
        <div className="col-span-12 md:col-span-10">
        <div className="text-2xl sm:text-[36px] md:text-5xl font-bold">
        <h1>{blog?.title}</h1>
        <div className="relative w-full h-[270px] sm:h-[416px] xl:h-[467px] 2xl:h-[526px] mt-5">
          <Image
            src={blog?.posterImage?.imageUrl}
            alt="Blog Image"
            fill
            priority
            fetchPriority="high"
            className="rounded-md object-cover"
            sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 75vw,
                  50vw"
          />
        </div>
      </div>
      </div>
      <div className="col-span-12 md:col-span-2 hidden md:block">
       {uniqueCategories.map((category, index) => {
          return (
            <Link
              key={index}
              className="block hover:bg-primary hover:text-white text-black py-2 px-4 rounded-md font-semibold font-roboto"
              href={`/blog/${(category as string).toLowerCase()}/`}
            >
              {category as string}
            </Link>
          );
        })}

      </div>
      </div>
      <div className=" w-full md:w-[85%] overflow-hidden text-start">
      <div className="blog-content mt-5">{HTMLReactParser(blog?.content || "")}</div>
      </div>
        <SlickSlider title="Related Blogs">
          {relatedBlogs.map((relatedBlog: BlogInfo, index: number) => (
            <BlogCard key={relatedBlog.id ?? index} blog={relatedBlog} />
          ))}
        </SlickSlider>
    </Container>
  );
};

export default BlogDetail;