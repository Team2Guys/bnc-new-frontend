import SubCategory from 'components/CategoryPage/SubCategory';
import ProductDetail from 'components/ProductDetailPage/product-detail';
import { IProduct } from 'types/types';

interface ISubProduct { products: IProduct[],
    filteredProduct: IProduct | undefined, 
    filteredSubCategory: any
   }


const SubProduct = ({ products, filteredProduct, filteredSubCategory }:ISubProduct ) => {
  return (
    <>
      {filteredSubCategory ? (
        <>
          <SubCategory
            title={`${filteredSubCategory.title}`}
            description={`${filteredSubCategory.description}` || ""}
            category={`${filteredSubCategory.category.title}`}
            relatedProducts={filteredSubCategory?.products || []}
            products={products}
       
          />

        </>
      ) : (
        <ProductDetail
          title={`${filteredProduct?.title}`}
          filterProduct={filteredProduct}
        />
      )}
    </>
  );
};

export default SubProduct;
