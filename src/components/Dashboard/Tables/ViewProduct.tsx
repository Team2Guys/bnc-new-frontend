'use client';
import React, { useState, useEffect, SetStateAction } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import { useAppSelector } from 'components/Others/HelperRedux';
import { generateSlug } from 'data/data';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { ICategory, IProduct } from 'types/types';
import { fetchCategories } from 'config/fetch';
import revalidateTag from 'components/ServerActons/ServerAction';
import { ChangedProductUrl_handler, predefinedPaths } from 'data/urls';
import Link from 'next/link';
import useColorMode from 'hooks/useColorMode';
import TableSkeleton from './TableSkelton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Table from 'components/ui/Table';
import ViewsTableHeader from '../TableHeader/ViewsTableHeader';

interface Product extends IProduct {
  id: number;
  title: string;
  category: string;
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

  const { data: categories } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

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
      setLoading(true)
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/delete_product/${key}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      revalidateTag('products');

      toast.success('Product Deleted: The product has been successfully deleted.');
    } catch (err) {
      toast.error('Deletion Failed: There was an error deleting the product.');
    }
    finally {
      setLoading(false)

    }
  };

  const getPath = (product: IProduct, parent: string | undefined) => {
    const slug = ChangedProductUrl_handler(product.title);

    const basePath =
      product.href && parent ? `${window.origin}/${product.href}` : `/${slug}`;

    const path =
      predefinedPaths[slug as keyof typeof predefinedPaths] ||
      (slug === 'hotels-restaurants-blinds-curtains'
        ? basePath
        : `/${parent?.toLowerCase() === 'shutters'
          ? `${parent.toLowerCase()}-range`
          : parent?.toLowerCase() || ''
        }${[
          'dimout-roller-blinds',
          'sunscreen-roller-blinds',
          'blackout-roller-blinds',
        ].includes(slug)
          ? '/roller-blinds'
          : ''
        }/${slug}`);

    return path;
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
        const createdAt = new Date(record.createdAt);
        return <span>{createdAt.toLocaleDateString()}</span>;
      },
    },
    {
      title: 'Time',
      key: 'time',
      render: (record: Product) => {
        const createdAt = new Date(record.createdAt);
        return <span>{createdAt.toLocaleTimeString()}</span>;
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
        const category = categories?.find((i) => i.id === record.CategoryId);
        if (category === undefined) return null;
        const parent = generateSlug(category?.title);
        return (
          <Link href={getPath(record, parent)} target="_blank">
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
          className={`${canEditproduct ? 'cursor-pointer' : 'cursor-not-allowed text-slate-200'}`}
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
          className={`${canDeleteProduct ? 'text-red cursor-pointer' : 'cursor-not-allowed text-slate-200'}`}
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
      {loading ? (
        <TableSkeleton rows={10} columns={1} />
      ) : (
        <>
          <ViewsTableHeader
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            canAdd={canAddProduct}
            setEdit={setEditProduct}
            setMenuType={setselecteMenu}
            menuTypeText='Add Products'
          />
          {filteredProducts && filteredProducts.length > 0 ? (
            <Table<Product>
              data={filteredProducts}
              columns={columns}
              rowKey="id"
            />
          ) : (
            <p className="text-primary dark:text-white">No products found</p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewProduct;
