'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { LiaEdit } from 'react-icons/lia';
import useColorMode from 'hooks/useColorMode';
import { useAppSelector } from 'components/Others/HelperRedux';
import Cookies from 'js-cookie';
import { FaRegEye } from 'react-icons/fa';
import { CategoryProps, ICategory, SUBCATEOGRY } from 'types/types';
import Swal from 'sweetalert2';
import Table from 'components/ui/Table';
import ViewsTableHeader from '../TableHeader/ViewsTableHeader';
import { DateFormatHandler, getPath } from 'utils/helperFunctions';
import revalidateTag from 'components/ServerActons/ServerAction';
import Link from 'next/link';
import { showAlert } from 'utils/Alert';

const ViewSubcategries = ({
  setMenuType,
  seteditCategory,
  editCategory,
  subCategories,
  categories,
}: CategoryProps) => {
  const admin_token = Cookies.get('2guysAdminToken');
  const super_admin_token = Cookies.get('superAdminToken');

  const token = admin_token ? admin_token : super_admin_token;
  console.log(editCategory, 'editCategory');

  const [colorMode, toggleColorMode] = useColorMode();
  console.log(toggleColorMode, 'toggleColorMode');

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canDeleteCategory =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteSubCategory : true);
  const canAddCategory =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canAddSubCategory : true);
  const canEditCategory =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canEditSubCategory : true);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return subCategories;
    return (
      subCategories?.filter((product: any) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || []
    );
  }, [searchTerm, subCategories]);

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/deletesubCategory/${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      revalidateTag('subCategories');
      showAlert({
        title: 'Category Deleted',
        text: 'The category has been successfully deleted.',
        icon: 'success',
      });

      return;
    } catch (err) {
      showAlert({
        title: 'Deletion Failed',
        text: 'There was an error deleting the category.',
        icon: 'error',
      });
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
      render: (record: any) =>
        record.posterImage.imageUrl ? (
          <Image
            src={record.posterImage.imageUrl || ''}
            alt={`Image of ${record.name}`}
            className="rounded-md h-[50px]"
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available</div>
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
      render: (record: SUBCATEOGRY) => {
        const createdAt = DateFormatHandler(record.createdAt);

        return <span>{createdAt}</span>;
      },
    },
    {
      title: 'Update At',
      key: 'date',
      render: (record: SUBCATEOGRY) => {
        const createdAt = DateFormatHandler(record?.updatedAt);

        return <span>{createdAt}</span>;
      },
    },
    {
      title: 'Last Edited By',
      key: 'time',
      render: (record: any) => {
        return <span>{record.last_editedBy}</span>;
      },
    },
    {
      title: 'Preview',
      key: 'Preview',
      render: (record: any) => {
        const category = categories?.find((i) => i.id === record.CategoryId);
        if (category === undefined) return null;
        return (
          <Link href={getPath(record)} target="_blank" rel="noreferrer">
            <FaRegEye className="cursor-pointer" />
          </Link>
        );
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (record: any) => (
        <LiaEdit
          className={`cursor-pointer ${canEditCategory && 'text-black dark:text-white'} ${!canEditCategory && 'cursor-not-allowed text-black dark:text-slate-300'}`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && 'text-red'} ${
            !canDeleteCategory &&
            'cursor-not-allowed text-black dark:text-slate-300'
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
        <ViewsTableHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          canAdd={canAddCategory}
          setEdit={seteditCategory}
          setMenuType={setMenuType}
          menuTypeText="Add Sub Category"
        />

        {filteredProducts && filteredProducts.length > 0 ? (
          <Table<ICategory>
            data={filteredProducts}
            columns={columns}
            rowKey="id"
          />
        ) : (
          <p className="text-black dark:text-white">No Sub Categories found</p>
        )}
      </>
    </div>
  );
};

export default ViewSubcategries;
