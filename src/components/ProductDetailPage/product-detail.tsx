'use client'
import dynamic from 'next/dynamic';
import Breadcrumb from 'components/Res-usable/breadcrumb'
import Container from 'components/Res-usable/Container/Container';
import { useEffect, useState } from 'react'
import { IProduct } from 'types/types';
import Thumbnail from './thumbnail';
import Detail from './detail';
import QualitySection from './quality-section';
import VideoGuide from './video-guilde';
import Testimonial from './testimonial';
import Faqs from 'components/product-category/Faqs';
import Information from './information';
import { tabDataDetail } from 'data/Homedata/tabdata';
const InfoTabs = dynamic(() => import('components/NewHomecomponents/info'));
const Customisation = dynamic(() => import('./Customisation'));
import { TabDataItem } from 'types/product';

interface IProductDetail {
  title: string;
  filterProduct: IProduct | any;
}
const ProductDetail = ({ title, filterProduct }: IProductDetail) => {
  const [colorImage, setColorImage] = useState<string>('')
  const [processedTabDataDetail, setProcessedTabDataDetail] = useState<TabDataItem[]>(tabDataDetail)
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

  return (
    <div>
      <Breadcrumb slug={filterProduct.category.breakcrum} title={title} />
      <Container className='grid grid-cols-12 mt-10 gap-4 xl:gap-8 max-sm:px-0'>
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
          <VideoGuide videos={isMotorisedCategory ? "" : filterProduct.videos} isMotorisedCategory={isMotorisedCategory} />
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