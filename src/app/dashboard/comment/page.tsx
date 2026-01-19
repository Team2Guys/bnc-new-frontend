import React from 'react';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import { fetchBlogs } from 'config/fetch';
export const runtime = 'nodejs';
import dynamic from 'next/dynamic'
const CommentsData = dynamic(() => import('components/Dashboard/Blogs/comment-data/comment-data'))

const Comment = async() => {
  let blogs = await fetchBlogs()

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Blogs Comment"} />
      <CommentsData currentComments={blogs}/>
    </DefaultLayout>
  );
};

export default Comment;
