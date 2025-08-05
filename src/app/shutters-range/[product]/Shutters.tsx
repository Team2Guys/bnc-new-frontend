import ProductDetail from 'components/ProductDetailPage/product-detail';
import { PRODUCS_PROPS } from 'types/interfaces';

const CommercialPage = ({
  filteredProduct,
}: PRODUCS_PROPS) => {


  return (
    <>
      {filteredProduct && (
        <ProductDetail 
          title={`${filteredProduct?.title}`}
          filterProduct={filteredProduct}/>
          )
      }
    </>
  );
};

export default CommercialPage;
