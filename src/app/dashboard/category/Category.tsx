'use client';
export const runtime = 'nodejs';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useState } from 'react';
const Addcategory = dynamic(() => import('components/AddCategory/Addcategory'));
const TableTwo = dynamic(() => import('components/Dashboard/Tables/TableTwo'));
import { CategoriesType } from 'types/interfaces';
import { ICategory } from 'types/types';
import dynamic from 'next/dynamic';

const Category = ({ cetagories = [] }: { cetagories?: ICategory[] }) => {
  const [menuType, setMenuType] = useState<string>('Categories');
  const [editCategory, seteditCategory] = useState<
    CategoriesType | undefined | null
  >();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Categories' ? (
        <div className="flex flex-col gap-10">
          <TableTwo
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
            categories={cetagories}
          />
        </div>
      ) : (
        <Addcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(Category);
