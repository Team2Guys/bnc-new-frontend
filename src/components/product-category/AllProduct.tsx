'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Container from 'components/Res-usable/Container/Container';
import Card from 'components/ui/newCard';
import { CategoryProps } from 'types/product';
import { IProduct } from 'types/types';

const AllProduct = ({ Products, title }: CategoryProps) => {
  const pathname = usePathname();
  const productsPerRow = 4;
  const rowsToShowInitially = 2;

  const storageKey = `category-visible-rows-${pathname}`;

  const [visibleRows, setVisibleRows] = useState(rowsToShowInitially);

  useEffect(() => {
    const savedRows = sessionStorage.getItem(storageKey);
    if (savedRows) {
      setVisibleRows(parseInt(savedRows, 10));
    }
  }, [storageKey]);

  const visibleCount = visibleRows * productsPerRow;
  const hasMore = visibleCount < Products.length;

  const handleShowMore = () => {
    setVisibleRows((prev) => {
      const newCount = prev + 2;
      sessionStorage.setItem(storageKey, newCount.toString());
      return newCount;
    });
  };

  return (
    <Container className="mt-10 space-y-5 md:space-y-10">
      <h2 className="categoryHeading text-center sm:text-start">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xs:gap-4 xs:px-6 sm:px-4 md:px-0">
        {Products.map((product: IProduct, index: number) => (
          <div
            key={index}
            className={`${index >= visibleCount ? 'hidden' : 'block'} transition-all duration-300`}
          >
            <Card card={product} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="text-primary bg-secondary text-sm md:text-xl font-roboto font-semibold rounded-md py-2 lg:py-3 px-4 xxs:px-6 block w-fit mx-auto xs:hover:opacity-65"
          >
            View More
          </button>
        </div>
      )}
    </Container>
  );
};

export default AllProduct;
