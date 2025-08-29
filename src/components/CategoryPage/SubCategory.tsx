'use client';
import Container from 'components/Res-usable/Container/Container';
import Support from 'components/Res-usable/support/support';
import React, { useEffect, useState } from 'react';
import { ICategory, IProduct } from 'types/types';
import bgBreadcrum from '../../../public/assets/images/Breadcrum/modern.png';
import TopHero from 'components/ui/top-hero';
import { usePathname } from 'next/navigation';
import { urls } from 'data/urls';
import NotFound from 'app/not-found';
import { generateSlug, subCategoryName , subCategoryUrls } from 'data/data';
import BathroomCategory from './BathroomCategory';

interface ICategoryPage {
  title: string;
  relatedProducts: IProduct[];
  description: string;
  category: string;
  filteredSubCategory?: ICategory;
  products: IProduct[];
}

const SubCategory = ({
  title,
  relatedProducts,
  description,
  filteredSubCategory,
  products,

}: ICategoryPage) => {
  const pathname = usePathname();
  const [isNotFound, setIsNotFound] = useState(false);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [updateSubCategoryName, setUpdateSubCategoryName] = useState<{url: string; name: string;}>();
  useEffect(() => {
    if (pathname) {
      const matchingUrl = urls.find((url) => url.errorUrl === pathname);
      console.log(pathname, 'pathnamepathname');
      if (matchingUrl) {
        console.log(matchingUrl, 'matchingUrl');
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    }
    if (title) {
      const matchingTitle = subCategoryName.find((cat) => cat.name === title);
      if (matchingTitle) {
        setCategoryName(matchingTitle.alterName);
      }
    }
  }, [pathname]);


  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(relatedProducts);
  const [productCategory, setProductCategory] = useState<string>('');

  const filterProducts = () => {
    const filtered = products?.filter((product) => product.CategoryId === filteredSubCategory?.category?.id);
    setProductCategory(filteredSubCategory?.category?.title || '');

    setFilteredProducts(filtered || []);
  };

  

  useEffect(() => {
    if (!relatedProducts || relatedProducts.length === 0) {
      filterProducts();
    } else {
      if (title === 'Bedroom Blinds') {
        const updatedProducts = relatedProducts.map((product) => {
          const updateTitle = subCategoryUrls.find((item) => item.url === generateSlug(product.title));
          if (updateTitle) {
            setUpdateSubCategoryName(updateTitle);
            return { ...product, title: updateTitle.name };
          }
          return product;
        });
        setFilteredProducts(updatedProducts);
      } else {
        setFilteredProducts(relatedProducts);
      }
      setProductCategory( filteredSubCategory?.category?.title || '');
    }
  }, [title, products]);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <>
      <TopHero
        title={title}
        pageTitle={`Made to Measure ${title}`}
        image={`${filteredSubCategory?.bannerImage?.imageUrl || bgBreadcrum.src}`}
        pagename={pathname}
      />
      <Container className="my-12">
        <BathroomCategory
          categoryName={categoryName ? categoryName : title}
          description={description}
          filteredProducts={filteredProducts}
          isLoading={false}
          categoryTitle={productCategory}
          subCategory={title}
          updateSubCategoryName={updateSubCategoryName}
        />
      </Container>

      <Container>
        <Support />
      </Container>
    </>
  );
};

export default SubCategory;
