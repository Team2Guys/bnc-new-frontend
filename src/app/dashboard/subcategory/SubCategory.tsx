'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { CategoriesType } from 'types/interfaces';
import { ICategory } from 'types/types';

const AddSubcategory = dynamic(
  () => import('components/AddCategory/AddSubcategory'),
);
const ViewSubcategries = dynamic(
  () => import('components/Dashboard/Tables/ViewSubcategries'),
);
const Subcategory = ({
  subCategories,
  cetagories,
}: {
  subCategories: ICategory[];
  cetagories: ICategory[];
}) => {
  const [menuType, setMenuType] = useState<string>('Categories');
  const [editCategory, seteditCategory] = useState<
    CategoriesType | undefined | null
  >();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Sub Categories'} />
      {menuType === 'Categories' ? (
        <div className="flex flex-col gap-10">
          <ViewSubcategries
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
            subCategories={subCategories}
            categories={cetagories}
          />
        </div>
      ) : (
        <AddSubcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
          categoriesList={cetagories}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(Subcategory);
