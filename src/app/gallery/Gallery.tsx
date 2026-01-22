'use client';
import Container from 'components/Res-usable/Container/Container';
import CustomModal from 'components/ui/Modal';
import { Category_wise_Content, sortOrder } from 'data/gallery';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import { IProduct } from 'types/types';
const ITEMS_PER_PAGE = 8;
const Gallery = ({ products }: { products: IProduct[] }) => {
  const uniqueCategories = Array.from(
    new Set(products.map((p) => p?.category?.title).filter(Boolean)),
  );

  const sortedCategories = [
    'All',
    ...sortOrder.filter((cat) => uniqueCategories.includes(cat)),
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>(
    sortedCategories[0] || 'All',
  );
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title?: string;
  }>({
    src: '',
    alt: '',
  });
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p?.category?.title === selectedCategory);
  }, [products, selectedCategory]);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory]);
  return (
    <Container className="my-10 space-y-10">
      <div className="flex flex-col items-center pb-4 mb-6 md:px-5">
        <h1 className="text-2xl xs:text-3xl font-medium">GALLERY</h1>
        <p className="text-center max-w-[70%] mt-4">
          Window Treatment Inspiration Gallery
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {sortedCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded border border-secondary transition ${
              selectedCategory === cat
                ? 'bg-secondary text-white'
                : 'border-gray-300 hover:bg-secondary hover:text-white'
            }`}
          >
            {cat === 'Commercial Window Coverings' ? 'Commercial' : cat}
          </button>
        ))}
      </div>

      <div className="w-full border-t border-borderclr"></div>

      <p className="text-center text-sm font-semibold md:font-normal lg:text-2xl xl:text-3xl 2xl:text-4xl leading-normal text-black w-full md:w-4/5 xl:w-3/4 mx-auto">
        {Category_wise_Content[selectedCategory] || ''}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xs:mt-20 mt-5 md:px-4">
        {visibleProducts &&
          visibleProducts.map((product: IProduct, index: number) => (
            <div
              key={index}
              className="bg-secondary-foreground rounded-md xs:rounded-xl flex flex-col h-full pb-4 shadow-sm hover:shadow-md transition"
            >
              <div
                className="relative block w-full h-[140px] xs:h-[300px] cursor-zoom-in"
                onClick={() => {
                  setSelectedImage({
                    src: product.posterImage.imageUrl || '',
                    alt: product.title,
                  });
                  setOpenModal(true);
                }}
              >
                <Image
                  src={product.posterImage.imageUrl}
                  alt={product.title}
                  fill
                  className="rounded-t-md xs:rounded-xl object-cover"
                  sizes="(max-width: 768px) 50vw, 307px"
                />
              </div>
              <h3 className="font-semibold font-futura text-sm sm:text-xl text-primary capitalize text-center px-4 mt-2">
                {product.title.replace(/\//g, ' ')}
              </h3>
            </div>
          ))}
        <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={' '}
          width={'max-w-xl'}
          isheader
        >
          <div className=" relative m-4 flex justify-center h-[300px] sm:h-[400px]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="rounded-md object-cover   "
            />
          </div>
        </CustomModal>
      </div>
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 border border-secondary rounded-md hover:bg-secondary transition font-semibold font-roboto"
          >
            Load More
          </button>
        </div>
      )}
    </Container>
  );
};

export default Gallery;
