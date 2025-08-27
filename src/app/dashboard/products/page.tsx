
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import { fetchProducts } from 'config/fetch';
import dynamic from 'next/dynamic'
import { IProduct } from 'types/types';
const Product = dynamic(() => import('./Product'), {
  loading: () => <p>Loading...</p>,
})


const Produc_page = async () => {
  let products = await fetchProducts()


  const FilteredProd = products.sort((a:IProduct, b:IProduct) => {
  const dateA = new Date(a.updatedAt || a.createdAt).getTime();
  const dateB = new Date(b.updatedAt || b.createdAt).getTime();

  return dateB - dateA;
});

  return (
    <DefaultLayout>
      <Product products={FilteredProd} />
    </DefaultLayout>
  );
};

export default Produc_page;


