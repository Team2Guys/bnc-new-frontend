import React from 'react';
import dynamic from 'next/dynamic';
const ProductDetail = dynamic(
  () => import('components/ProductDetailPage/product-detail'),
);
import Script from 'next/script';
import { PRODUCS_PROPS } from 'types/interfaces';
const SubCategory = dynamic(() => import('./SubCategory'));

const Mainpage = ({
  filteredProduct,
  filteredSubCategory,
  matchedSchema,
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
          <SubCategory
            title={`${filteredSubCategory.title}`}
            description={`${filteredSubCategory.description}`}
            category={`${filteredSubCategory.category.title}`}
            relatedProducts={filteredSubCategory?.products || []}
            filteredSubCategory={filteredSubCategory}
            products={filteredSubCategory.products}
          />
        </>
      ) : (
        filteredProduct && (
          <ProductDetail
            title={`${filteredProduct?.title}`}
            filterProduct={filteredProduct}
          />
        )
      )}
    </>
  );
};

export default Mainpage;
