"use client";
import { formatDateDayMonthYear } from "config";
import { generateSlug } from "data/data";
import HTMLReactParser from "html-react-parser/lib/index";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BlogInfo } from "types/interfaces";

const BlogCard = ({ blog, iscategory }: { blog: BlogInfo; iscategory?: boolean }) => {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between rounded-lg bg-secondary-foreground text-primary ${iscategory ? "" : "h-full min-h-[480px]"}`}
      onMouseDown={() => setDragging(false)}
      onMouseMove={() => setDragging(true)}
    >
      <div>
        <Link
        href={
          iscategory
            ? `/blog/${generateSlug(blog.category)}/`
            : `/blog/${blog.redirectionUrl ? blog.redirectionUrl : generateSlug(blog.title)}/`
        }
        className="space-y-2 flex-1 my-5"
        onClick={(e) => {
          if (dragging) {
            e.preventDefault();
          }
        }}
      >
        <div className="relative h-72">
          <Image
            src={blog.posterImage?.imageUrl}
            fill
            priority
            fetchPriority="high"
            className="rounded-lg object-cover"
            alt={blog.Images_Alt_Text || "blog image"}
            sizes="(max-width: 640px) 100vw, 
                  (max-width: 1024px) 50vw, 
                  33vw"
          />
        </div>
        <h3 className={`text-lg xl:text-2xl font-futura font-bold text-primary text-center px-2  ${iscategory ? "pb-2" : ""}`}>
          {iscategory ? blog.category : blog.title}
        </h3>
      </Link>
      </div>

      {!iscategory && (
        <div>
          <p className="font-roboto text-center px-2">
            {HTMLReactParser(blog.content.replace(/<[^>]*>?/gm, "").slice(0, 100))}
            <Link
              href={
                iscategory
                  ? `/blog/${generateSlug(blog.category)}/`
                  : `/blog/${blog.redirectionUrl ? blog.redirectionUrl : generateSlug(blog.title)}/`
              }
              className="font-bold"
            >
              {" "}
              Read More...
            </Link>
          </p>
          <div className="flex justify-between font-roboto p-2">
            <p className="font-roboto text-primary">{blog.category}</p>
            <p className="font-roboto text-primary">
              {formatDateDayMonthYear(blog.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
