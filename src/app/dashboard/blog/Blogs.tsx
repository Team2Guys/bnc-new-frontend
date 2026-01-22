'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ShowBlog from 'components/Dashboard/Blogs/show-blog';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import { UpdateBlog as IUpdateBlog } from 'types/interfaces';
import ProtectedRoute from 'hooks/AuthHookAdmin';

const AddBlogs = dynamic(() => import('components/Dashboard/Blogs/add-blog'), {
  ssr: false,
});

interface blogs {
  blogs: any;
}

const Blogging = ({ blogs }: blogs) => {
  const [menuType, setMenuType] = useState('Blogs');
  const [editBlog, setEditBlog] = useState<IUpdateBlog | null>(null);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Blogs' ? (
        <ShowBlog
          setMenuType={setMenuType}
          setEditBlog={setEditBlog}
          blogs={blogs}
          menuType={menuType}
        />
      ) : (
        <AddBlogs
          setMenuType={setMenuType}
          setEditBlog={setEditBlog}
          EditInitialValues={
            editBlog &&
            (editBlog.title !== undefined || editBlog.category !== undefined)
              ? editBlog
              : undefined
          }
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(Blogging);
