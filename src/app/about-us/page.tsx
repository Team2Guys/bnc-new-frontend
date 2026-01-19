import Breadcrumb from 'components/Res-usable/breadcrumb';
import Container from 'components/Res-usable/Container/Container';
import AboutUsCompo from 'components/AboutUs/AboutUs';
import { aboutUsData } from 'data/data';
import MilestoneSteps from 'components/AboutUs/OurMilestones';
import WhyChooseUss from 'components/AboutUs/WhyChoosUs';
import Testimonial from 'components/ProductDetailPage/testimonial';
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
export const metadata = generateMetadata(metaData.about);
const AboutUsPage = () => {
  return (
    <>
      <Breadcrumb image="/assets/images/about-us/aboutusherobanner.webp" title="About Blinds and Curtains Dubai"/>
      <div className=' text-center capitalize mt-10 sm:mb-0 mb-6'>
        <h2 className='sm:text-4xl xl:text-5xl text-2xl font-futura font-bold text-primary'>Our Journey</h2>
        <p className='sm:text-3xl text-sm font-medium font-roboto pt-2 text-primary'>Started as Blinds & Curtains — now proudly Two Guys Home Furnishings.
        </p>
      </div>
      <Container>
        <AboutUsCompo blocks={aboutUsData} />
        <MilestoneSteps />
        <WhyChooseUss />
      </Container>
      <Testimonial />
    </>
  );
};

export default AboutUsPage;
