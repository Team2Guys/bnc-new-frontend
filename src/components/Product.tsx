import { ICategory, IProduct } from 'types/types';
import Breadcrumb from './Res-usable/breadcrumb';
import CategoryHero from './product-category/category-hero';
import AllProduct from './product-category/AllProduct';
import SimpleSteps from './SimpleSteps/SimpleSteps';
import Faqs from './product-category/Faqs';

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
      <Breadcrumb title={categories.breakcrum || categories.title}/>
      <CategoryHero Data={categories}/>
      <AllProduct title={categories.productpageHeading} Products={filteredItems || []} />
      <SimpleSteps />
      <Faqs Data={categories}/>
    </>
  );
};

export default Product;
