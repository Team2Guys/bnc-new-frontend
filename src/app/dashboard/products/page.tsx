import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import {
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
} from 'config/fetch';
import { IProduct } from 'types/types';
import Product from './Product';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Produc_page = async () => {
  const [products, categories, subcategories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchSubCategories(),
  ]);

  const FilteredProd = products.sort((a: IProduct, b: IProduct) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();

    return dateB - dateA;
  });

  return (
    <DefaultLayout>
      <Product
        products={FilteredProd}
        categories={categories}
        subcategories={subcategories}
      />
    </DefaultLayout>
  );
};

export default Produc_page;
