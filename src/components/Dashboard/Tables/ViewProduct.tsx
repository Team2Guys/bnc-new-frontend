'use client';
import React, { useState, useEffect, SetStateAction } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import { useAppSelector } from 'components/Others/HelperRedux';
import Cookies from 'js-cookie';
import revalidateTag from 'components/ServerActons/ServerAction';
import Link from 'next/link';
import useColorMode from 'hooks/useColorMode';
// 🔴 TableSkeleton import remove kar diya
import Swal from 'sweetalert2';
import Table from 'components/ui/Table';
import ViewsTableHeader from '../TableHeader/ViewsTableHeader';
import { DateFormatHandler, getPath } from 'utils/helperFunctions';
import { IProduct } from 'types/types';
import { showAlert } from 'utils/Alert';

interface Product extends IProduct {
  id: number;
  title: string;
  posterImage: { imageUrl: string };
  createdAt: string;
  CategoryId: number;
  last_editedBy?: string;
}

interface CategoryProps {
  Categories: Product[];
  setselecteMenu: (menu: string) => void;
  setEditProduct: React.Dispatch<SetStateAction<Product | undefined>>;
}

const ViewProduct: React.FC<CategoryProps> = ({
  Categories,
  setselecteMenu,
  setEditProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const admin_token = Cookies.get('2guysAdminToken');
  const super_admin_token = Cookies.get('superAdminToken');
  const [colorMode, toggleColorMode] = useColorMode();
  console.log(toggleColorMode, 'toggleColorMode');
  const [loading, setLoading] = useState<boolean>(false);

  const token = admin_token || super_admin_token;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canAddProduct =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canAddProduct : true);
  const canDeleteProduct =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteProduct : true);
  const canEditproduct =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canEditProduct : true);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    if (Categories) {
      const filtered = Categories?.sort(
        (a: Product, b: Product) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ).filter((product: Product) =>
        product.title.toLowerCase().includes(lowercasedSearchTerm),
      );

      setFilteredProducts(filtered);
    }
  }, [searchTerm, Categories]);

  const confirmDelete = (key: number) => {
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

  const handleDelete = async (key: number) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/delete_product/${key}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      revalidateTag('products');
      showAlert({
        title: 'Product Deleted',
        text: 'The product has been successfully deleted.',
        icon: 'success',
      });
    } catch (err) {
      showAlert({
        title: 'Deletion Failed',
        text: 'There was an error deleting the product.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Image',
      key: 'posterImageUrl',
      render: (record: Product) => (
        <Image
          src={record.posterImage?.imageUrl}
          alt={`Image of ${record.title}`}
          className="rounded-md h-[50px]"
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
      render: (record: Product) => {
        const createdAt = DateFormatHandler(record?.createdAt);
        return <span>{createdAt}</span>;
      },
    },
    {
      title: 'UpdateAt',
      key: 'UpdateAt',
      render: (record: Product) => {
        const createdAt = DateFormatHandler(record?.updatedAt);
        return <span>{createdAt}</span>;
      },
    },
    {
      title: 'Last Edited By',
      key: 'time',
      render: (record: Product) => {
        return <span>{record.last_editedBy}</span>;
      },
    },
    {
      title: 'Preview',
      key: 'Preview',
      render: (record: Product) => {
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
      render: (record: Product) => (
        <LiaEdit
          className={`${
            canEditproduct
              ? 'cursor-pointer'
              : 'cursor-not-allowed text-slate-200'
          }`}
          size={20}
          onClick={() => {
            if (canEditproduct) {
              console.log(record, 'canEditproduct');
              setEditProduct(record);
              setselecteMenu('Add Products');
            }
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Product) => (
        <RiDeleteBin6Line
          className={`${
            canDeleteProduct
              ? 'text-red cursor-pointer'
              : 'cursor-not-allowed text-slate-200'
          }`}
          size={20}
          onClick={() => {
            if (canDeleteProduct) {
              confirmDelete(record.id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div className={colorMode === 'dark' ? 'dark' : ''}>
      <ViewsTableHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        canAdd={canAddProduct}
        setEdit={setEditProduct}
        setMenuType={setselecteMenu}
        menuTypeText="Add Products"
      />
      {filteredProducts && filteredProducts.length > 0 ? (
        <Table<Product>
          data={filteredProducts}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
      ) : (
        <p className="text-primary dark:text-white">No products found</p>
      )}
    </div>
  );
};

export default ViewProduct;
