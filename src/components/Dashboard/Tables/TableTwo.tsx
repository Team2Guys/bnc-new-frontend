'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { LiaEdit } from 'react-icons/lia';
import { useAppSelector } from 'components/Others/HelperRedux';
import useColorMode from 'hooks/useColorMode';
import Cookies from 'js-cookie';
import { CategoryProps, ICategory } from 'types/types';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Table from 'components/ui/Table';

const TableTwo = ({
  setMenuType,
  seteditCategory,
  categories,
}: CategoryProps) => {
  const admin_token = Cookies.get('2guysAdminToken');
  const super_admin_token = Cookies.get('superAdminToken');

  const token = admin_token ? admin_token : super_admin_token;

  const [category, setCategory] = useState<ICategory[] | undefined>(categories);
  const [colorMode, toggleColorMode] = useColorMode();

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  console.log(toggleColorMode, 'toggleColorMode');
  const canAddCategory =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canAddCategory : true);
  const canDeleteCategory =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteCategory : true);
  const canEditCategory =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canEditCategory : true);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts: ICategory[] =
    category?.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const confirmDelete = (key: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the blog cannot be recovered.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key);
      }
    });
  };

  const handleDelete = async (key: any) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/deleteCategory/${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategory((prev: any) => prev.filter((item: any) => item.id != key));
      toast.success(
       'Category Deleted: The category has been successfully deleted.');
    } catch (err) {
      toast.error('Deletion Failed: There was an error deleting the category.');
    }
  };

  const handleEdit = (record: any) => {
    if (seteditCategory) {
      seteditCategory(record);
      setMenuType('CategoryForm');
    }
  };

  const columns = [
    {
      title: 'Image',
      key: 'posterImageUrl',
      render: (record: ICategory) => (
        <Image
          src={record.posterImage?.imageUrl || ''}
          alt={`Image of ${record.title}`}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: 'Name',
      key: 'title',
    },
    {
      title: 'Status',
      key: 'status',
    },
    {
      title: 'Date',
      key: 'date',
      render: (record: ICategory) => {
        const createdAt = new Date(record.createdAt);
        return <span>{createdAt.toLocaleDateString()}</span>;
      },
    },
    {
      title: 'Time',
      key: 'time',
      render: (record: ICategory) => {
        const createdAt = new Date(record.createdAt);
        return <span>{createdAt.toLocaleTimeString()}</span>;
      },
    },
    {
      title: 'Last Edited By',
      key: 'time',
      render: (record: ICategory) => {
        return <span>{record.last_editedBy}</span>;
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (record: ICategory) => (
        <LiaEdit
          className={`cursor-pointer ${canEditCategory && 'text-black dark:text-white'} ${!canEditCategory && 'cursor-not-allowed text-slate-300'}`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: ICategory) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && 'errorColor'} ${!canDeleteCategory && 'cursor-not-allowed text-slate-300'
            }`}
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              confirmDelete(record.id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div className={colorMode === 'dark' ? 'dark' : ''}>
      <>
        <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
          <input
            className="search_input"
            type="search"
            placeholder="Search Category"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <p
              className={`${canAddCategory && 'cursor-pointer'} lg:p-2 md:p-2 ${canAddCategory &&
                ' bg-secondary text-white rounded-md hover:text-white '
                } flex justify-center ${!canAddCategory && 'cursor-not-allowed '
                }`}
              onClick={() => {
                seteditCategory && seteditCategory(null);
                if (canAddCategory) {
                  setMenuType('Add Category');
                }
              }}
            >
              Add Category
            </p>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <Table<ICategory> data={filteredProducts} columns={columns} rowKey="id"/>
        ) : (
          <p className="text-xl text-black dark:text-white">
            No Categories found
          </p>
        )}
      </>
    </div>
  );
};

export default TableTwo;
