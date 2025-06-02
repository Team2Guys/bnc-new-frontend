
import React from 'react';
import dynamic from 'next/dynamic';
import { InstablindData, KeyData, MotorisedSellingDataBlinds, benefits, TabData } from 'data/data';
import { fetchProducts } from 'config/fetch';
import { Metadata } from 'next';
import { IProduct } from 'types/types';

// Dynamic imports
const VideoSection = dynamic(() => import('components/LandingPage/video-section'));
const InstaVideoSection = dynamic(() => import('components/LandingPage/InstaVideoSection'));
const Button = dynamic(() => import('components/LandingPage/ButtonSection'));
const MoterizedService = dynamic(() => import('components/LandingPage/MoterizedService'));
const Header = dynamic(() => import('components/LandingPage/Header'));
const SellingFeatures = dynamic(() => import('components/LandingPage/SellingFeatures'));
const RelatedProducts = dynamic(() => import('components/Related-products/RelatedProducts'));
const Container = dynamic(() => import('components/Res-usable/Container/Container'));
const CustomSection = dynamic(() => import('components/LandingPage/Custommade'));
const MoterizedBlinds = dynamic(() => import('components/LandingPage/Moterized Blinds'));
const KeyFeature = dynamic(() => import('components/LandingPage/KeyFeature'));

export const metadata:Metadata  = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const Custommade_MoterisedBlinds = async () => {
  const [products] = await Promise.all([fetchProducts()]);
  console.log("products",products)
  const blindsTitles = [
    "Roman Blinds",
    "Blackout Roller Blinds",
    "Zebra Blinds",
    "Wooden Blinds"
  ];

  const getBlindsProducts = (filterproduct: IProduct[]) => {
    return filterproduct.filter(product =>
      blindsTitles.includes(product?.title)
    );
  };
  
  const blindsProducts = getBlindsProducts(products || [])
  return (
    <>
      <Header/>
      <VideoSection 
       videoSrc="/assets/video/Automated_Blinds.mp4"
       title="Motorised Blinds"
       subtitle="Control the light with a tap on your phone screen"
       description="Enjoy the benefits of comfortable modern living coupled with the long lasting style of Roman, Roller and Venetian Blinds."/>
      <CustomSection
      title="Custom-Made"
      subtitle="Motorized Blinds"
      description1="Upgrade your windows with motorized zebra blinds from Blinds & Curtains!"
      description2={[
        "Smart Home Integration",
        "Expert measuring and fitting",
      ]}
      imageSrc="/assets/images/Moterised-ads-blinds/Rectangle.png"
      imageAlt="Motorized Blinds"/>
      <KeyFeature title="Simplify Your Day With Motorised Blinds" data={KeyData} />
      <MoterizedBlinds
      title="Convenience and Privacy" 
      subtitle="at Your Fingertips" 
      imageUrl="/assets/images/Moterised-ads-blinds/Rectangle884.png" 
      benefits={benefits.motorized_blinds}  />

      
      <MoterizedService TabData={TabData.motorized_blinds}/>
      <SellingFeatures data={MotorisedSellingDataBlinds}/>
      <Button/>
      <InstaVideoSection data={InstablindData}/>
      <Container className="mt-10 md:mt-20">
      <RelatedProducts className='font-serif font-black' products={blindsProducts || []} limit={4} bgcolor={true} isPPc ={true}/>
      </Container>

    </>
  );
};

export default Custommade_MoterisedBlinds;