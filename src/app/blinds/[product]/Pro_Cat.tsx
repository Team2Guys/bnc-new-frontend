import CategoryPage from 'components/CategoryPage/CategoryPage';
import ProductDetail from 'components/ProductDetailPage/product-detail';
import Script from 'next/script';
import { PRODUCS_PROPS } from 'types/interfaces';

const CommercialPage = ({
  filteredProduct,
  filteredSubCategory,
  allprod,
  categories,
  subCategories,
  matchedSchema
}: PRODUCS_PROPS) => {
  return (

    <>
       {matchedSchema && (
        <Script type="application/ld+json" id="blinds-json-ld">
          {JSON.stringify(matchedSchema)}
        </Script>
      )}
      {filteredSubCategory ? (
    <>
          {filteredSubCategory.title === 'Roller Blinds' && (
            <CategoryPage
            title={`${filteredSubCategory.title}`}
            relatedProducts={filteredSubCategory?.products || []}
            products={allprod || []}
            categories={categories || []}
            subCategories={subCategories || []}
            />
          ) }
          </>
      ) : (
        <ProductDetail 
          title={`${filteredProduct?.title}`}
          filterProduct={filteredProduct}/>
      )}
    </>
  );
};

export default CommercialPage;
