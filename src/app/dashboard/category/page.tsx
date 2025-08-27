import { fetchCategories } from "config/fetch";
import dynamic from 'next/dynamic'
import { ICategory } from "types/types";
const Category = dynamic(() => import('./Category'))


const AddCategory = async () => {
  const cetagories = await fetchCategories();
  const FilteredProd = cetagories.sort((a:ICategory, b:ICategory) => {
  const dateA = new Date(a.updatedAt || a.createdAt).getTime();
  const dateB = new Date(b.updatedAt || b.createdAt).getTime();

  return dateB - dateA;
});


  return (
    <Category cetagories={FilteredProd} />
  );
};

export default AddCategory;
