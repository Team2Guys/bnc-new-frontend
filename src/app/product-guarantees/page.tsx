import { productData, PGuarantees } from 'data/data';
import React from 'react';
import Container from 'components/Res-usable/Container/Container';
import Image from 'next/image';
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import { TProductGuarantees } from 'types/interfaces';
import CallToActionSection from 'components/CallToAction/CallToActionSection';
import CallUS from 'components/CallUs/CallUS';
export const metadata = generateMetadata(metaData.product_guarantees);
const ProductGuarantees = () => {
  return (
    <>
      <Breadcrumb
        image="/assets/images/product-guarantees/large.webp"
        bradcrumbtitle="Product Guarantee"
        title="Product Guarantees"
        imageclassName="bg-center"
      />
      <Container className="space-y-4 p-3 mt-5 lg:mt-10 mx-auto">
        <h2 className="text-2xl lg:text-3xl text-primary font-semibold font-futura w-fit mx-auto">
          {productData.heading}
        </h2>
        <p
          className="text-base 2xl:text-lg leading-7 xl::leading-9 text-primary font-roboto"
          dangerouslySetInnerHTML={{ __html: productData.content }}
        ></p>
      </Container>
      {PGuarantees.map((data: TProductGuarantees, index: number) => (
        <Container
          key={index}
          className={`md:space-y-4 flex md:my-10 justify-between lg:gap-12 items-start flex-col md:flex-row ${data.imageAlign === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
          <div
            className={`w-full md:w-1/2 ${data.imageAlign === 'right' ? 'md:pl-2' : 'md:pr-2'}`}
          >
            <h3 className="font-semibold text-2xl tracking-wider font-futura mt-5">
              {data.heading}
            </h3>
            <p
              className="text-base 2xl:text-lg leading-7 xl::leading-9 mt-4 text-primary font-roboto"
              dangerouslySetInnerHTML={{ __html: data.text }}
            ></p>
            <div
              className={`flex flex-col gap-4 ${data.icons ? 'py-6' : 'pt-4 xs:py-6'}`}
            >
              {data.icons &&
                data.icons.map((item, index) => (
                  <div className="flex gap-4" key={index}>
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                    <div>
                      <h4 className="text-xl font-roboto font-semibold text-primary">
                        {item.heading}
                      </h4>
                      <p className="text-base 2xl:text-lg leading-7 xl:leading-9 text-primary">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className={`w-full md:w-1/2 ${data.imageAlign === 'right' ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <Image
              src={data.image}
              width={1000}
              height={300}
              alt="why-us img"
              className="mx-auto md:me-0 ms-auto w-full h-[280px] xss:h-[343px] md:h-[450px] xl:h-[500px]"
            />
          </div>
        </Container>
      ))}

      <Container className="py-6">
        <CallToActionSection />
      </Container>
      <CallUS />
    </>
  );
};

export default ProductGuarantees;
