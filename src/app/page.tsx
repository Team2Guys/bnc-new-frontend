import Script from 'next/script';
import { schema } from 'data/schema';
import MainHero from 'components/Hero/main-hero';
import { fetchProducts } from 'config/fetch';
import InfoTabs from 'components/NewHomecomponents/info';
import ComparisonTable from 'components/NewHomecomponents/comparisontabble';
import OurClient from 'components/Our-Client/OurClient';
import Review_banner from 'components/ReviewBanner/Review_banner';
import { IProduct } from 'types/types';
import SellerSlider from 'components/BestSellerSlider/SellerCard';
import MotorizeBlindCurtain from 'components/MotorizedBlindCurtains/MotorizedBlindCurtains';
import VideoReelsWrapper from 'components/VideoSlider/VideoReelsWrapper';
import StepWrapper from 'components/SimpleSteps/StepWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://blindsandcurtains.ae'),

  title: 'Blinds and Curtains Dubai | Book a Free Appointment Today',
  description:
    'If you are looking for blinds in dubai, or maybe curtains in Dubai, look no further. Our ZERO pressure appointment guarantee will ensure you are.....',

  verification: {
    google: 'BHdLyJ6iGcCDMwuouc5ShyVcSBwHyip3ZtBxeKTEoVg',
  },

  openGraph: {
    title: 'Blinds and Curtains Dubai | Book a Free Appointment Today',
    description:
      'If you are looking for blinds in dubai, or maybe curtains in Dubai, look no further. Our ZERO pressure appointment guarantee will ensure you are.....',
    url: 'https://blindsandcurtains.ae/',
    type: 'website',
    images: [
      {
        url: '/assets/images/blind-curtains-dubai/blinds-curtains-dubai1.png',
        width: 1200,
        height: 630,
        alt: 'Blinds and Curtains Dubai | Book a Free Appointment Today',
      },
    ],
  },

  alternates: {
    canonical: 'https://blindsandcurtains.ae/',
  },
};

export default async function Home() {
  let products: IProduct[] = [];
  try {
    products = await fetchProducts();
  } catch (err) {
    console.error('Failed to fetch products for Home page', err);
  }
  const PublishedProduct = products.filter((p) => p.status === 'PUBLISHED');
  return (
    <>
      {schema.map((script: any, index: number) => (
        <Script type="application/ld+json" id="home-json-ld" key={index}>
          {JSON.stringify(script)}
        </Script>
      ))}
      <MainHero />
      <Review_banner />
      <InfoTabs isHome />
      <div className="flex flex-col-reverse md:flex-col">
        <ComparisonTable />
        <SellerSlider products={PublishedProduct && PublishedProduct} />
      </div>
      <StepWrapper />
      <MotorizeBlindCurtain />
      <VideoReelsWrapper />
      <OurClient />
    </>
  );
}
