import React from 'react';
import dynamic from 'next/dynamic';
import { ICategory, IProduct } from 'types/types';
import Breadcrumb from './Res-usable/breadcrumb';
const CategoryHero = dynamic(() => import('./product-category/category-hero'));
const AllProduct = dynamic(() => import('./product-category/AllProduct'));
import Faqs from './product-category/Faqs';
import StepWrapper from './SimpleSteps/StepWrapper';

interface IProductProps {
  categories: ICategory;
  filteredItems?: IProduct[];
}

const Product = ({
  categories,
  filteredItems,
}: IProductProps) => {
  return (
    <>
      <Breadcrumb title={categories.breakcrum || categories.title} categorylink={categories.categoryCustomUrl}/>
      <CategoryHero Data={categories}/>
      <AllProduct title={categories.productpageHeading} Products={filteredItems || []} />
      <StepWrapper />
      <Faqs Data={categories}/>
    </>
  );
};

export default Product;
