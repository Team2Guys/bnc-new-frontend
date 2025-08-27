"use client"

import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Loader from 'components/Loader/Loader';
import { FaEdit } from 'react-icons/fa';
import { admin_del_handler} from 'config/fetch';
import { ADMINS_PROPS } from 'types/interfaces';
import revalidateTag from 'components/ServerActons/ServerAction';
import Table from 'components/ui/Table';

function Admins({ setselecteMenu, setedit_admins, adminsData }: ADMINS_PROPS) {
  const [delLoading, setDelLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDelLoading(id);
      console.log(id, "id")
      await admin_del_handler(id)
      revalidateTag('admins')
    } catch (error) {
      console.error('Error deleting admin:', error);
    } finally {
      setDelLoading(null);
    }
  };


  console.log(adminsData, "adminsData")

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: any) => `${record.fullname}`,
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Add Product',
      key: 'canAddProduct',
      render: (record: any) => (
        <span>{record.canAddProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Edit Product',
      key: 'canEditProduct',
      render: (record: any) => (
        <span>{record.canEditProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Del Product',
      key: 'canDeleteProduct',

      render: (record: any) => (
        <span>{record.canDeleteProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Add Category',
      key: 'canAddCategory',

      render: (record: any) => (
        <span>{record.canAddCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Del Category',
      key: 'canDeleteCategory',
      render: (record: any) => (
        <span>{record.canDeleteCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Edit Category',
      key: 'canEditCategory',

      render: (record: any) => (
        <span>{record.canEditCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Add Sub Category',
      key: 'canAddSubCategory',

      render: (record: any) => (
        <span>{record.canAddSubCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Del Sub Category',
      key: 'canDeleteSubCategory',

      render: (record: any) => (
        <span>{record.canDeleteSubCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Edit Sub Category',
      key: 'canEditSubCategory',

      render: (record: any) => (
        <span>{record.canEditSubCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'View Appointments',
      key: 'canViewAppointments',

      render: (record: any) => (
        <span>{record.canViewAppointments ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'View Amins',
      key: 'canVeiwAdmins',

      render: (record: any) => (
        <span>{record.canVeiwAdmins ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Total products',
      key: 'canVeiwTotalproducts',
      render: (record: any) => (
        <span>{record.canVeiwTotalproducts ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Total Category',
      key: 'canVeiwTotalCategorie',

      render: (record: any) => (
        <span>{record.canVeiwTotalCategorie ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Total Sub Category',
      key: 'canVeiwTotalSubCategories',

      render: (record: any) => (
        <span>{record.canVeiwTotalSubCategories ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Add Blog',
      key: 'canAddBlog',

      render: (record: any) => (
        <span>{record.canAddBlog ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Del Blog',
      key: 'canDeleteBlog',

      render: (record: any) => (
        <span>{record.canDeleteBlog ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Edit Blog',
      key: 'canEditBlog',

      render: (record: any) => (
        <span>{record.canEditBlog ? 'Yes' : 'No'}</span>
      ),
    },

    {
      title: 'Actions',
      key: 'actions',

      render: (record: any) =>
      (
        <>
          <div className='flex gap-3'>
            <FaEdit
              className="cursor-pointer text-red-500"
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                const { password, ...withoutPassowrd } = record
                setedit_admins(withoutPassowrd); setselecteMenu(" ")
                console.log(password, "password")
                console.log(password, "password")
              }}
            />

            {
              delLoading === record._id ? <div><Loader color="#fff" /></div> : (
                <RiDeleteBin6Line
                  className="cursor-pointer text-red-500"
                  size={20}
                  onClick={() => handleDelete(record.id)}
                />
              )
          
            }

          </div>
        </>
      )
    },
  ];



  return (
    <div>
      {
        (
          <>
            <div className="flex justify-between mb-4 items-center text-black dark:text-white ">
              <p></p>
              <div>
                <button
                  onClick={() => setselecteMenu('Add Admin')}
                  className=" bg-secondary text-white rounded-md   lg:p-2 md:p-2"
                >
                  Add new Admin
                </button>
              </div>
            </div>
    
              <Table
                data={adminsData}
                columns={columns}
                rowKey="id"
              />
          
          </>
        )}

    </div>
  );
}

export default Admins;
