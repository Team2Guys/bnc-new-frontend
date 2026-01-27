'use client';
import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { IProduct } from 'types/types';
import Container from 'components/Res-usable/Container/Container';
import { getPath } from 'utils/helperFunctions';
import { orderedBlogs } from 'data/new-data';
import SlickSlider from 'components/Blogs/slick-slider';
import 'style/home-slider.css';

const ProductSlider = ({ products }: { products: IProduct[] }) => {
  const [isDragging, setIsDragging] = useState(false);
  const filteredAndSortedProducts = useMemo(
    () =>
      orderedBlogs
        .map((title) =>
          products.find(
            (item) => item.title.toLowerCase() === title.toLowerCase(),
          ),
        )
        .filter(Boolean) as IProduct[],
    [products],
  );
  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      swipeToSlide: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 800,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 640,
          settings: { slidesToShow: 1.1, arrows: false },
        },
      ],
    }),
    [],
  );
  const handleMouseUp = useCallback(
    (item: IProduct) => {
      if (!isDragging) {
        window.location.href = getPath(item);
      }
    },
    [isDragging],
  );

  return (
    <Container className="overflow-hidden best_seller_slider space-y-4">
      <div className=" lg:pt-8 space-y-2">
        <h3 className="text-3xl md:text-5xl font-extrabold font-futura text-primary border-b-2 py-3">
          Related Product
        </h3>
      </div>
      <SlickSlider settings={sliderSettings}>
        {filteredAndSortedProducts.map((item, index) => (
          <div key={item.id || index}>
            <div
              onMouseDown={() => setIsDragging(false)}
              onMouseMove={() => setIsDragging(true)}
              onMouseUp={() => handleMouseUp(item)}
            >
              <div className="bg-white overflow-hidden rounded-xl  cursor-pointer">
                <div className="relative w-full h-[280px] md:h-[345px] rounded-xl">
                  <Image
                    src={item.posterImage.imageUrl.replace(
                      '/upload/',
                      '/upload/w_296,f_auto,q_auto/',
                    )}
                    alt={item.title}
                    fill
                    className="rounded-xl"
                  />
                </div>
                <div className="pt-4 text-center md:text-start sm:px-0 px-2">
                  <h3 className="font-medium mb-1 text-primary text-base md:text-xl font-futura">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base font-roboto line-clamp-2">
                    {item.short_description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    </Container>
  );
};

export default ProductSlider;
