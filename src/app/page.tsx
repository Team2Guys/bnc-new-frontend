import type { Metadata } from 'next'
import Script from 'next/script';
import { schema } from 'data/schema';
import logo from '../../public/assets/images/blind-curtains-dubai/blinds-curtains-dubai1.png';
import MainHero from 'components/Hero/main-hero';
import { fetchProducts } from 'config/fetch';
import InfoTabs from 'components/NewHomecomponents/info';
import ComparisonTable from 'components/NewHomecomponents/comparisontabble';
import dynamic from 'next/dynamic';
const SellerSlider = dynamic(() => import("components/BestSellerSlider/SellerCard"))
import SimpleSteps from 'components/SimpleSteps/SimpleSteps';
import MotorizeBlindCurtain from 'components/MotorizedBlindCurtains/MotorizedBlindCurtains';
import VideoReelsSlider from 'components/VideoSlider/VideoSlider';
import OurClient from 'components/Our-Client/OurClient';
import Review_banner from 'components/ReviewBanner/Review_banner';

export const metadata: Metadata = {
  metadataBase: new URL("https://blindsandcurtains.ae/"),

  title: 'Blinds and Curtains Dubai | Book a Free Appointment Today',
  description: 'If you are looking for blinds in dubai, or maybe curtains in Dubai, look no further. Our ZERO pressure appointment guarantee will ensure you are.....',
  openGraph: {
    title: 'Blinds and Curtains Dubai | Book a Free Appointment Today',
    description: 'If you are looking for blinds in dubai, or maybe curtains in Dubai, look no further. Our ZERO pressure appointment guarantee will ensure you are.....',
    url: 'https://blindsandcurtains.ae/',
    images: [
      {
        url: `${logo.src}`,
        alt: 'blindsandcurtains',
      },
    ],
    type: "website"
  },
  alternates: {
    canonical: 'https://blindsandcurtains.ae/',
  },
}

export default async function Home() {
  const products = await fetchProducts();
  return (
    <>
      {schema.map((script: any, index: number) =>
        <Script type="application/ld+json" id="home-json-ld" key={index}>
          {JSON.stringify(script)}

        </Script>
      )}

      <MainHero />
      <Review_banner />
      <InfoTabs isHome />
      <div className='grid grid-cols-12'>
        <div className='col-span-12 order-2 md:order-1'>
          <ComparisonTable />
        </div>
        {products && (
          <div className='col-span-12 order-1 md:order-2'>
            <SellerSlider products={products} />
          </div>
        )}
      </div>
      <SimpleSteps />
      <MotorizeBlindCurtain />
      <VideoReelsSlider />
      <OurClient />
    </>
  );
}
