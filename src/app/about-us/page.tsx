import aboutUsImg from '../../../public/assets/images/blind-curtains-dubai/blinds-curtains-dubai.png';
import { Metadata } from 'next';
import { Fragment } from 'react';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import Container from 'components/Res-usable/Container/Container';
import AboutUsCompo from 'components/AboutUs/AboutUs';
import { aboutUsData } from 'data/data';
import MilestoneSteps from 'components/AboutUs/OurMilestones';
import WhyChooseUss from 'components/AboutUs/WhyChoosUs';

export const metadata: Metadata = {
  title: 'Blinds and Curtains Dubai | Made to Measure Blinds | About Us',
  description:
    'Learn all about Blinds and Curtains Dubai. We make custom blinds and curtains just for you. Stylish, high-quality, and perfect for your home or office.',
  openGraph: {
    title: 'Blinds and Curtains Dubai | Made to Measure Blinds | About Us',
    description:
      'Learn all about Blinds and Curtains Dubai. We make custom blinds and curtains just for you. Stylish, high-quality, and perfect for your home or office.',
    url: 'https://blindsandcurtains.ae/about-us/',
    images: [
      {
        url: `${aboutUsImg.src}`,
        alt: 'Blinds and Curtains Dubai | Made to Measure Blinds | About Us',
      },
    ],
  },
  alternates: {
    canonical: 'https://blindsandcurtains.ae/about-us/',
  },
};
const AboutUsPage = () => {
  return (
    <Fragment>
      <Breadcrumb title="About Us" />
      <section className="relative w-full h-[130px] md:h-[280px] bg-cover bg-center" style={{ backgroundImage: `url('/assets/images/about-us/aboutusherobanner.webp')` }}>

        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold">About Us</h1>
        </div>
      </section>
      <div className=' text-center capitalize mt-10 sm:mb-0 mb-6'>
        <h2 className='sm:text-4xl text-2xl font-robotoSerif font-bold text-primary'>Our Journey</h2>
        <p className='sm:text-3xl text-14 font-medium font-roboto pt-2 text-[#3E3F42]'>Started as Blinds & Curtains — now proudly Two Guys Home Furnishings.
        </p>
      </div>

      <Container>
        <AboutUsCompo blocks={aboutUsData} />
        <MilestoneSteps />
        <WhyChooseUss />

      </Container>

    </Fragment>
  );
};

export default AboutUsPage;
