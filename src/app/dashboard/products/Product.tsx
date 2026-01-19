'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
const FormElements = dynamic(()=>import("components/Dashboard/FormElements"))
const ViewProduct = dynamic(()=>import("components/Dashboard/Tables/ViewProduct"))
import ProtectedRoute from 'hooks/AuthHookAdmin';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ICategory, IProduct } from 'types/types';

interface Product extends IProduct {
  id: number;
  title: string;
  posterImage: { imageUrl: string };
  createdAt: string;
  CategoryId: number;
}
interface PRODUCTS_PROPS {
  products: Product[];
  subcategories: ICategory[];
  categories: ICategory[]
}

const Products = ({ products, categories , subcategories }: PRODUCTS_PROPS) => {
  const [editProduct, setEditProduct] = useState<any | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string>('Categories');

  const EditInitialValues: any = {
    id: editProduct?.id,
    name: editProduct?.title,
    description: editProduct?.description,
    price: editProduct?.price ? editProduct?.price : editProduct?.salePrice,
    discountPrice: editProduct?.discountPrice,
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
    // hoverImage: editProduct && editProduct.hoverImage,
    imageUrls: editProduct && editProduct.imageUrls,
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
    status : editProduct && editProduct.status,
    // updatedAt : editProduct && editProduct?.updatedAt,

        faqs: editProduct && editProduct.faqs || [],
        videos: editProduct && editProduct.videos,
        privacySectoin: editProduct && editProduct.privacySectoin || [],
        privarcyImage: editProduct && editProduct.privarcyImage ,
        recalledByCategories: editProduct?.recalledByCategories?.map((value: ICategory) => value.id) || [],
  };

  let productFlag: boolean = selecteMenu === 'Categories' ? true : false;
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
          // EditInitialValues={EditInitialValues && EditInitialValues.}
          setEditProduct={setEditProduct}
          EditProductValue={
            EditInitialValues &&
              (EditInitialValues.name !== undefined ||
                EditInitialValues.category !== undefined)
              ? EditInitialValues
              : undefined
          }
          EditInitialValues={
            EditInitialValues &&
              (EditInitialValues.name !== undefined ||
                EditInitialValues.category !== undefined)
              ? EditInitialValues
              : undefined
          }
          categoriesList={categories}
          subCategoriesList={subcategories}
        />
      )}
    </>
  );
};

export default ProtectedRoute(Products);
