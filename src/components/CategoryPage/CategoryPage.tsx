'use client';
import TopHero from 'components/ui/top-hero';
import bgBreadcrum from '../../../public/assets/images/Breadcrum/bg_subcategory.jpeg';
import Container from 'components/Res-usable/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import RelatedProducts from 'components/Related-products/RelatedProducts';
import { ICategory, IProduct } from 'types/types';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BookNowBanner from 'components/BookNowBanner/BookNowBanner';
import { RollerBlindsPage } from 'data/Images';
import { generateSlug } from 'data/data';
import { desiredProductTitles } from 'data/urls';

interface ICategoryPage {
  title: string;
  relatedProducts: IProduct[];
  products: IProduct[];
  categories: ICategory[];
  subCategories: ICategory[]
}

const CategoryPage = ({ title, relatedProducts, products, categories, subCategories }: ICategoryPage) => {
  const pathname = usePathname();

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(relatedProducts);
  let filterSubCat = subCategories?.find((subCat) => subCat.title === title);
  const filterProducts = () => {
    const filtered = products?.filter((product) => product.CategoryId === filterSubCat?.CategoryId,
    );

    setFilteredProducts(filtered || []);
  };

  useEffect(() => {
    if (!relatedProducts || relatedProducts.length === 0) {
      filterProducts();
    } else {
      setFilteredProducts(relatedProducts);
    }
  }, [title, products, subCategories, categories]);

  let prod_finder_handler = (arr: IProduct) => {
    let product;
    for (let category of RollerBlindsPage) {
      if (
        category.Category_id === arr.CategoryId &&
        category.sub_Category === 'Roller Blinds'
      ) {
        product = category.Product.find(
          (value) => value.product_name === arr.title,
        );
        break;
      }
    }

    return product;
  };

  const filteredProductList = products?.filter(product =>
    desiredProductTitles.includes(product.title)
  );
  return (
    <div>
      <TopHero title={title} pagename={pathname} image={bgBreadcrum.src} />
      <Container className="sm:pt-10 pb-10 sm:pb-14 flex flex-col gap-3 sm:gap-10 items-center">
        {filteredProducts?.map((product, index) => {
          let product_Images = prod_finder_handler(product);
          return (
            <div
              key={index}
              className={`flex flex-col gap-5 items-center justify-between mt-5 sm:mt-10 md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} justify-between`}
            >
              <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end' }`}>
                <div className="font-bold text-xl xs:text-2xl tracking-wider space-y-3 block sm:hidden pb-2">
                  <h2 className="tracking-[.6rem] mb-2">
                    Roller Blinds in Dubai, UAE{' '}
                  </h2>
                </div>
                <div className='relative w-full max-w-[550px] h-[280px] sm:h-[300px] md:h-[450px]'>
                  <Image
                    className="rounded-xl"
                    src={product_Images ? product_Images.Imagesurl : product.imageUrls.at(-1)?.imageUrl || ''}
                    fill
                    alt={product.title}
                    priority
                    fetchPriority='high'
                    sizes='40vw'
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div>
                  <div className="font-bold text-xl xs:text-2xl tracking-wider space-y-3">
                    <h2 className="tracking-[.6rem] mb-2 sm:block hidden">
                      Roller Blinds in Dubai, UAE{' '}
                    </h2>
                    <h2 className="font-light tracking-[.2rem] ">
                      {product.title}
                    </h2>
                  </div>
                  <p
                    className="text-12 md:text-14 lg:text-16 leading-6 md:leading-8 text-lightdark mt-4"
                    dangerouslySetInnerHTML={{
                      __html: product_Images?.desc || product.description,
                    }}
                  ></p>
                </div>

                <div className="mt-5 sm:mt-10 mx-auto">
                  <Link
                    href={`/blinds/roller-blinds/${generateSlug(product.title === 'Sunscreen/Transparent Blinds' ? 'sunscreen-roller-blinds/' : product.title) + "/"
                      }`}
                    className="px-6 sm:px-8 py-4 bg-secondary rounded-md text-white hover:bg-primary max-xs:text-14"
                  >
                    View Our{' '}
                    {product.title === 'Sunscreen/Transparent Blinds'
                      ? 'Sunscreen Roller Blinds'
                      : product.title}
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </Container>
      <BookNowBanner />
      <Container className=" py-3 sm:py-10">
        <RelatedProducts products={(filteredProductList ?? []).slice(0, 4)} limit={4} />
      </Container>
    </div>
  );
};

export default CategoryPage;
