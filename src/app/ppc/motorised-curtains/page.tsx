import React from 'react';
import dynamic from 'next/dynamic';
import { InstacurtainData, KeyData, MotorisedSellingDataCurtain, benefits, TabData } from 'data/data';
import { fetchProducts } from 'config/fetch';
import { Metadata } from 'next';
import { IProduct } from 'types/types';

// Dynamic imports
const VideoSection = dynamic(() => import('components/LandingPage/video-section'),{ssr:false});
const InstaVideoSection = dynamic(() => import('components/LandingPage/InstaVideoSection'),{ssr:false});
const Button = dynamic(() => import('components/LandingPage/ButtonSection'),{ssr:false});
const MoterizedService = dynamic(() => import('components/LandingPage/MoterizedService'),{ssr:false});
const Header = dynamic(() => import('components/LandingPage/Header'),{ssr:false});
const SellingFeatures = dynamic(() => import('components/LandingPage/SellingFeatures'),{ssr:false});
const RelatedProducts = dynamic(() => import('components/Related-products/RelatedProducts'),{ssr:false});
const Container = dynamic(() => import('components/Res-usable/Container/Container'),{ssr:false});
const CustomSection = dynamic(() => import('components/LandingPage/Custommade'),{ssr:false});
const KeyFeature = dynamic(() => import('components/LandingPage/KeyFeature'),{ssr:false});
const MoterizedBlinds = dynamic(() => import('components/LandingPage/Moterized Blinds'),{ssr:false});

export const metadata: Metadata = {
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

const Custommade_MoterisedCurtains = async () => {
  const [products] = await Promise.all([fetchProducts()]);

const curtainsTitles = [
    "Sheer Curtains",
    "Modern Curtains",
    "Office Curtains",
    "Home Curtains"
  ];
  
  const getcurtainProducts = (filterproduct: IProduct[]) => {
    return filterproduct.filter(product =>
      curtainsTitles.includes(product?.title)
    );
  };

  const curtainProducts = getcurtainProducts(products || []);
  return (
    <>
      <Header/>
      <VideoSection 
       videoSrc="/assets/video/automated_curtains.mp4"
       title="Motorised Curtains"
       subtitle="Experience luxury and convenience with a single tap!"
       description="Wake up to sunlight naturally with automated timers and easy-to-use control options like remotes, wall switches, and smartphone apps."/>
      <CustomSection
      title="Custom-Made"
      subtitle="Motorised Curtains"
      description1="Our customers tell us they can’t imagine going back to manual curtains—and we know you’ll feel the same. Why we are different:"
      description2={[
        "Smart Home Integration",
        "Expert measuring and fitting",
      ]}
      imageSrc="/assets/images/Moterised-ads-blinds/Rectangle.png"
      imageAlt="Motorized Curtains"/>
      <KeyFeature title="Make Every Day More Comfortable" data={KeyData} />
      <MoterizedBlinds
      title="Convenience and Privacy" 
      subtitle="at Your Fingertips" 
      imageUrl="/assets/images/Moterised-ads-blinds/curtain.jpg" 
      benefits={benefits.motorized_curtains}  />
      <MoterizedService TabData={TabData.motorized_curtains}/>
      <SellingFeatures data={MotorisedSellingDataCurtain}/>
      <Button/>
      <InstaVideoSection data={InstacurtainData}  />
      <Container className="mt-10 md:mt-20">
      <RelatedProducts className='font-serif font-black' products={curtainProducts || []} limit={4} bgcolor={true} isPPc={true} description='Explore our collection, each piece a showcase of exceptional window curtains design.' />
      </Container>
      
    </>
  );
};

export default Custommade_MoterisedCurtains;