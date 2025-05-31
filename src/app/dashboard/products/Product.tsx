'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
const FormElements = dynamic(()=>import("components/Dashboard/FormElements"),{ssr:false})
const ViewProduct = dynamic(()=>import("components/Dashboard/Tables/ViewProduct"),{ssr:false})
import ProtectedRoute from 'hooks/AuthHookAdmin';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { IProduct } from 'types/types';

interface Product extends IProduct {
  id: number;
  title: string;
  category: string;
  posterImage: { imageUrl: string };
  createdAt: string;
  CategoryId: number;
}
interface PRODUCTS_PROPS {
  products: Product[];
}

const Products = ({ products }: PRODUCTS_PROPS) => {
  const [editProduct, setEditProduct] = useState<any | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  const EditInitialValues: any = {
    id: editProduct?.id,
    name: editProduct?.title,
    description: editProduct?.description,
    salePrice: editProduct?.price ? editProduct?.price : editProduct?.salePrice,
    discountPrice: editProduct?.discountPrice,
    code: editProduct && editProduct.code,
    category: editProduct && editProduct?.CategoryId,
    subCategory: editProduct && editProduct?.subCategory,
    Meta_Title: editProduct && editProduct?.Meta_Title,
    Canonical_Tag: editProduct && editProduct?.Canonical_Tag,
    Meta_Description: editProduct && editProduct?.Meta_description,
    Images_Alt_Text: editProduct && editProduct?.Images_Alt_Text,
    modelDetails: editProduct && editProduct?.modelDetails || [],
    colors: editProduct?.colors,
    spacification: editProduct?.spacification,
    sizes: editProduct && editProduct?.sizes,
    starRating: editProduct && editProduct.starRating,
    reviews: editProduct && editProduct.starRating,
    posterImage: editProduct && editProduct.posterImage,
    hoverImage: editProduct && editProduct.hoverImage,
    imageUrls: editProduct && editProduct.imageUrls,
    additionalInformation: editProduct && editProduct.additionalInformation,
    product_type: editProduct && editProduct.product_type,
    short_description: editProduct && editProduct.short_description,
    heading: editProduct && editProduct.heading,
    Sub_Heading: editProduct && editProduct.Sub_Heading,
    Sub_Heading_description: editProduct && editProduct.Sub_Heading_description,
    bannerImage: editProduct && editProduct.bannerImage,
    subCategoryImage:   editProduct && editProduct.subCategoryImage,
    subcategory_description : editProduct && editProduct.subcategory_description,
    topImages: editProduct && editProduct.topImages,
    topHeading: editProduct && editProduct.topHeading,
    mainHeading: editProduct && editProduct.mainHeading,
    breadcurum: editProduct && editProduct.breadcurum,
    customUrl: editProduct && editProduct.customUrl,
    colorsImages : editProduct && editProduct.colorsImages,

        faqs: editProduct && editProduct.faqs,
        videos: editProduct && editProduct.videos,
        privacySectoin: editProduct && editProduct.privacySectoin,
        privarcyImage: editProduct && editProduct.privarcyImage,
 


  };

  let productFlag: boolean = selecteMenu === 'Add All Products' ? true : false;
  return (
    <>
      <Breadcrumb pageName={productFlag ? 'Products' : 'Add Products'} />
      {productFlag ? (
        <ViewProduct
          Categories={products}
          setselecteMenu={setselecteMenu}
          setEditProduct={setEditProduct}
        />
      ) : (
        <FormElements
          setselecteMenu={setselecteMenu}
          EditInitialValues={EditInitialValues}
          setEditProduct={setEditProduct}
          EditProductValue={
            EditInitialValues &&
              (EditInitialValues.name !== undefined ||
                EditInitialValues.category !== undefined)
              ? EditInitialValues
              : undefined
          }
        />
      )}
    </>
  );
};

export default ProtectedRoute(Products);
