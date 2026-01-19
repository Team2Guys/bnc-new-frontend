'use client'
import dynamic from 'next/dynamic';
import Breadcrumb from 'components/Res-usable/breadcrumb'
import Container from 'components/Res-usable/Container/Container';
import { useEffect, useState } from 'react'
import { IProduct } from 'types/types';
import Thumbnail from './thumbnail';
import Detail from './detail';
import QualitySection from './quality-section';
import Testimonial from './testimonial';
import Faqs from 'components/product-category/Faqs';
import Information from './information';
import { tabDataDetail } from 'data/Homedata/tabdata';
const InfoTabs = dynamic(() => import('components/NewHomecomponents/info'));
const Customisation = dynamic(() => import('./Customisation'));
import { TabDataItem } from 'types/product';
import { useInView } from 'react-intersection-observer';
const VideoGuide = dynamic(() => import("./video-guilde"), {
  loading: () => (
    <div className="grid grid-cols-3 gap-4 justify-items-center mx-auto max-w-5xl py-6 sm:py-12">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-3 w-full"
        >
          <div className="relative w-full h-[100px] sm:h-[230px] lg:h-[300px] xl:h-[345px] rounded-md bg-gray-300 animate-pulse">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gray-400 animate-pulse" />
          </div>
          <div className="h-4 sm:h-6 w-3/4 mx-auto rounded bg-gray-300 animate-pulse" />
        </div>
      ))}
    </div>
  ),
});

interface IProductDetail {
  title: string;
  filterProduct: IProduct | any;
}
const ProductDetail = ({ title, filterProduct }: IProductDetail) => {
  const [colorImage, setColorImage] = useState<string>('')
  const [processedTabDataDetail, setProcessedTabDataDetail] = useState<TabDataItem[]>(tabDataDetail)
   const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const isMotorisedCategory =
    title?.toLowerCase().includes('motorised blinds') || title?.toLowerCase().includes('motorised curtains');

  const isCurtainsCategory = title?.toLowerCase().includes("motorised curtains");

  useEffect(() => {
    if (!isCurtainsCategory) return;
    const replaceBlindsWithCurtains = (text: string) =>
      text.replace(/blinds/gi, "curtains");
    const processedData = tabDataDetail.map(({ title, heading, description, ...rest }) => ({
      title: replaceBlindsWithCurtains(title),
      heading: replaceBlindsWithCurtains(heading),
      description: typeof description === "string"
        ? replaceBlindsWithCurtains(description)
        : description,
      ...rest,
    }));
    setProcessedTabDataDetail(processedData);
  }, [isCurtainsCategory]);
 

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);


  return (
    <div>
      <Breadcrumb slug={filterProduct.category.breakcrum} title={title} categorylink={filterProduct.category.categoryCustomUrl} />
      <Container className='grid grid-cols-12 mt-5 md:mt-10 gap-4 xl:gap-8 max-sm:px-0'>
        <div className='col-span-12 md:col-span-6 xl:col-span-5 px-2'>
          <Thumbnail images={filterProduct.imageUrls} selectedColor={colorImage} setColorImage={setColorImage} videos={filterProduct.videos}
            videoThumbnail={filterProduct.imageUrls[0].imageUrl} isMotorisedCategory={isMotorisedCategory}
          />
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-7'>
          <Detail data={filterProduct} />
        </div>
      </Container>
      {isMotorisedCategory && <InfoTabs tabData={processedTabDataDetail} isCurtainsCategory={isCurtainsCategory} isMotorisedCategory={isMotorisedCategory} />}

      <div className='grid grid-cols-12 w-full'>
        <div className={`col-span-12 ${isMotorisedCategory ? "order-2" : "order-1"}`}>
          <QualitySection />
        </div>
        <div className={`col-span-12 ${isMotorisedCategory ? "order-1" : "order-2"}`}>
          <div ref={ref}>
            {show ? <VideoGuide videos={isMotorisedCategory ? "" : filterProduct.videos} isMotorisedCategory={isMotorisedCategory} /> : <p className="py-20 text-center">Scroll to load videos...</p>}
          </div>
          {isMotorisedCategory && <Customisation title={title} />}
        </div>
      </div>
      <Testimonial />
      <Faqs Data={filterProduct} />
      <Information privacySectoin={filterProduct.privacySectoin} privarcyImage={filterProduct?.privarcyImage || filterProduct.imageUrls[0]} />
    </div>
  )
}

export default ProductDetail