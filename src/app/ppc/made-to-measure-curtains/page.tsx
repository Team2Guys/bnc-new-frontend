
import React from 'react'
import {banners, Chooseuscurtain, chooseuscurtain, Curtainbannerfeatures, curtaincrousal, Curtainfeatures, curtainImages, curtainsData, CurtainvideoData, serviceLocationsData, Tab2categories, workingProcesscurtainData} from 'data/data';
import Bullets from '../made-to-measure-blinds/bullets';
import LButton from '../made-to-measure-blinds/button';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CurtainTabData } from 'data/CurtainTabData';
import { explorecurtainData } from 'data/explorecurtaindata';
import { consultationblindData } from 'data/consultationdata';

//Dynamic imports
const CustomSection = dynamic(() => import('components/ppc-moterised/customization'));
const FeaturesCarousel = dynamic(() => import('components/ppc-moterised/features'));
const VideoSection = dynamic(() => import('components/LandingPage/video-section'));
const Header = dynamic(() => import('components/LandingPage/Header'));
const Videoblind = dynamic(() => import('components/ppc-moterised/videosection'));
const Blindtype = dynamic(() => import('components/ppc-moterised/blindtype'));
const BlindsTabs = dynamic(() => import('components/ppc-moterised/Tabcomponnet'));
const WhyChooseUs = dynamic(() => import('components/ppc-moterised/whychoose'));
const ExploreBlinds = dynamic(() => import('components/ppc-moterised/blindsrange'));
const WorkingProcess = dynamic(() => import('components/ppc-moterised/working'));
const Carousel  = dynamic(() => import('components/ppc-moterised/blindcrousal'));
const ServiceLocations = dynamic(() => import('components/ppc-moterised/servicelocation'));
const RollerReviews = dynamic(() => import('components/Rollerblind/Roller_Reviews/Review'));
const Banner = dynamic(() => import('components/HomeBanner/Home_Banner'));
const BookingForm = dynamic(() => import('components/ppc-moterised/Bookingform'));
const HeroBanner = dynamic(() => import('components/ppc-moterised/hero'));
const ImageGallery = dynamic(() => import('components/ppc-moterised/Grid'));
const Shop = dynamic(() => import('components/ppc-moterised/shop'));

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

const Made_to_Measure_Curtains = async () => {
  const locationData = serviceLocationsData[1];
  return (
    <>
    <Header/>
    <div id="Main">
    <VideoSection 
       videoSrc="https://bncvidoes.s3.eu-north-1.amazonaws.com/c1.mp4"
       title="Fastest, Made-To-Measure Curtain Service In Dubai"
       subtitle={<Bullets features={Curtainbannerfeatures}/>}
       description={<LButton/>}
       width='w-[500px] sm:w-[630px] md:w-[715px] lg:w-[850px] 2xl:w-[990px]'
       height="h-[700px] sm:h-[681px]"/>
       </div>
      <Shop/>
      <FeaturesCarousel
      title="What Do Blinds & Curtains Offer You?"
      subtitle="Features"
      features={Curtainfeatures}
      defaultVisibleItems={4}
    />
    <CustomSection data={curtainsData} />
    <Videoblind videos={CurtainvideoData} heading="Our Recent Curtains Dubai Projects" />
    <BlindsTabs blindsData={CurtainTabData} tabCategories={Tab2categories} />
    <WhyChooseUs
     paragraph={Chooseuscurtain.text}
     features={chooseuscurtain}
     backgroundImage="https://bncvidoes.s3.eu-north-1.amazonaws.com/image+(12).png"/>
    <ExploreBlinds data={explorecurtainData[0]} />
    <ExploreBlinds data={explorecurtainData[1]} reverse />
    <WorkingProcess data={workingProcesscurtainData}/>
    <ExploreBlinds data={consultationblindData[0]} reverse  className='h-auto lg:!h-[370px] xl:!h-[370px]' buttonsClassName='xl:!mt-20' hideViewMore  hidefeatures/>
    <Carousel data={curtaincrousal} />
    <Blindtype heading="Professional Installation Services For Your Interior" className='text-white' />
    <ImageGallery images={curtainImages} columns={4} />
    <HeroBanner/>
    <Blindtype heading="LOCATION" />
    <ServiceLocations {...locationData} />
    <RollerReviews />
    <div className='bg-white py-3 md:py-9'></div>
    <Banner {...banners.Curtain} />
    <div id="booking-form">
    <BookingForm />
    </div>
    </>   
  )
}

export default Made_to_Measure_Curtains 