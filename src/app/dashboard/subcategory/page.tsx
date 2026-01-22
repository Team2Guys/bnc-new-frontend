import { fetchCategories, fetchSubCategories } from 'config/fetch';
import { ICategory } from 'types/types';
import SubCategory from './SubCategory';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AddSubCategory = async () => {
  const [subCategories, categories] = await Promise.all([
    fetchSubCategories(),
    fetchCategories(),
  ]);

  const sortedSubCategories = subCategories.sort(
    (a: ICategory, b: ICategory) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();

      return dateB - dateA;
    },
  );

  return (
    <SubCategory subCategories={sortedSubCategories} cetagories={categories} />
  );
};

export default AddSubCategory;
