
import { fetchCategories, fetchSubCategories } from 'config/fetch';
import dynamic from 'next/dynamic';
const SubCategory = dynamic(()=>import('./SubCategory'),{ssr:false})

const AddSubCategory = async () => {
  const [subCategories, categories] = await Promise.all([
    fetchSubCategories(),
    fetchCategories()
  ])
  return (
    <SubCategory subCategories={subCategories} cetagories={categories} />
  );
};

export default AddSubCategory;