import React from 'react';
import Image from 'next/image';
import { IProduct } from 'types/types';
import Link from 'next/link';
import { Categories_wise_Images } from 'data/Images';
import { usePathname } from 'next/navigation';
import { getPath } from 'utils/helperFunctions';

interface BathroomCategoryProps {
  filteredProducts: IProduct[];
  isLoading: boolean;
  categoryTitle?: string;
  subCategory?: string;
  categoryName?: string;
  description?: string | any;
  updateSubCategoryName?: {
    url: string;
    name: string;
  }
}


const BathroomCategory = ({
  filteredProducts,
  isLoading,
  subCategory,
  categoryName,
  description,
}: BathroomCategoryProps) => {
  const pathname = usePathname();




  

  let prod_finder_handler = (arr: IProduct) => {
    let product;
    for (let category of Categories_wise_Images) {
      if (!pathname.includes('commercial')) {
        if (category.sub_Category === subCategory) {
          product = category.Product.find((value) => value.product_name === arr.title.trim());
          return product;
        }
      } else {
        if (category.sub_Category === subCategory) {
          product = category.Product.find((value) => value.product_name == arr.title.trim());
          break;
        }
      }
    }

    return product;
  };
  const currentCategory = Categories_wise_Images.find((category) =>category.sub_Category === subCategory
  );
  const static_Title = currentCategory?.static_Title;

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4 px-2">
        <h2 className="text-xl sm:text-30 font-bold border-b-[#A9B4A4] text-center">
          {static_Title ? static_Title : categoryName}
        </h2>
        <p className="font-normal text-xs sm:text-16 leading-6 sm:leading-9 text-center text-[#666768]  border-b-[#A9B4A4] pb-2 " dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10 2xl:gap-16 my-10 px-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between sm:items-start space-y-2 w-full animate-pulse"
            >
              <div className="w-full h-[374px] bg-gray-300 rounded-md"></div>
              <div className="h-6 w-1/2 bg-gray-300 rounded-md mt-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md mt-1"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
              <div className="h-10 w-1/2 bg-gray-300 rounded-md mt-2"></div>
            </div>
          ))
          : filteredProducts &&
          filteredProducts.map((arr: IProduct, index: number) => {
            let product_Images = prod_finder_handler(arr);
            let findModel = arr?.modelDetails?.find((value)=>value?.name?.trim()?.toLowerCase()===subCategory?.trim()?.toLowerCase())
  
            return (
              <div
                className="flex flex-col md:items-center sm:items-start space-y-2 text-center sm:text-start w-full  pb-3 shadow-md md:pb-0 md:shadow-none  justify-between"
                key={index}
              >
                <div>
                  <Image
                    className="w-full h-[280px] xs:h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-md"
                    src={product_Images?.Imagesurl || arr?.subCategoryImage?.imageUrl || arr.posterImage.imageUrl }
                    height={774}
                    width={1032}
                    alt={product_Images ? product_Images.altText : arr.title}
                    loading="lazy"
                  />
                  <h2 className="font-bold  sm:text-xl md:text-2xl text-center mt-2">
                    {arr.title}
                  </h2>
                    <p
                      className="leading-6 sm:leading-9 text-xs sm:text-base text-[#797D85] font-normal w-full"
                      dangerouslySetInnerHTML={{
                        __html: findModel?.detail || product_Images?.desc || "",
                      }}
                    ></p>
                
                </div>
                <div>
                  <Link
                  href={`${getPath(arr)}`}
                    className="font-bold text-xs sm:text-base bg-secondary text-white hover:bg-primary w-fit px-2 py-2 rounded-md flex items-center justify-center text-center mx-auto"
                  >
                    View Our {arr.title} 

                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default BathroomCategory;
