'use client';
import React, { useState } from 'react';
import Container from 'components/Res-usable/Container/Container';
import Card from 'components/ui/newCard';
import { CategoryProps } from 'types/product';
import { IProduct } from 'types/types';

const AllProduct = ({ Products, title }: CategoryProps) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };
  const hasMore = visibleCount < Products.length;

  return (
    <Container className="mt-10 space-y-5 md:space-y-10">
      <h2 className="categoryHeading text-center sm:text-start">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xs:gap-4 xs:px-6 sm:px-4 md:px-0">
        {Products.map((product: IProduct, index: number) => (
          <div key={index} className={index < visibleCount ? 'block' : 'hidden'}>
            <Card card={product} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleShowMore}
            className="text-primary bg-secondary border border-secondary text-sm md:text-xl font-roboto font-semibold rounded-md py-2 lg:py-3 px-4 xxs:px-6 block w-fit mx-auto hover:bg-transparent hover:text-secondary"
          >
            Show More
          </button>
        </div>
      )}
    </Container>
  );
};

export default AllProduct;
