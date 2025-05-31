
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import { fetchProducts } from 'config/fetch';
import dynamic from 'next/dynamic'
const Product = dynamic(() => import('./Product'), {
  loading: () => <p>Loading...</p>,
  ssr:false
})


const Produc_page = async () => {
  let products = await fetchProducts()
  return (
    <DefaultLayout>
      <Product products={products} />
    </DefaultLayout>
  );
};

export default Produc_page;


