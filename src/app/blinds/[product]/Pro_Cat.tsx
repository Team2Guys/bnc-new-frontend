import dynamic from 'next/dynamic';
const ProductDetail = dynamic(() => import('components/ProductDetailPage/product-detail'));
import Script from 'next/script';
import { PRODUCS_PROPS } from 'types/interfaces';

const CommercialPage = ({
  filteredProduct,
  matchedSchema
}: PRODUCS_PROPS) => {
  return (

    <>
      {matchedSchema && (
        <Script type="application/ld+json" id="blinds-json-ld">
          {JSON.stringify(matchedSchema)}
        </Script>
      )}
      <ProductDetail
        title={`${filteredProduct?.title}`}
        filterProduct={filteredProduct} />
    </>
  );
};

export default CommercialPage;
