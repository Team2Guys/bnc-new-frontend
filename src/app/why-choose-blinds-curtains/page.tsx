import React from 'react';
import Container from 'components/Res-usable/Container/Container';
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import WhyChoose from 'components/why-choose/why-choose';
import {
  Description1,
  Description2,
  sliderImages1,
  sliderImages2,
} from 'data/choose.us';
import Image from 'next/image';
export const metadata = generateMetadata(metaData.why_choose);
const ChooseUs = () => {
  return (
    <>
      <Breadcrumb
        image="/assets/images/about-us/aboutusherobanner.webp"
        title="Why Choose Us"
      />
      <Container className="mt-5 lg:mt-10 space-y-4">
        <h2 className="font-semibold text-3xl md:text-4xl text-primary font-futura text-center hidden sm:block pb-4">
          Why Choose Blinds & Curtains
        </h2>
        <WhyChoose
          title="What Makes Blinds & Curtains Different?"
          description={Description1}
          sliderImages={sliderImages1}
        />
        <WhyChoose
          reverse
          title="With over 750 glowing reviews, we've built a reputation for quality"
          description={Description2}
          sliderImages={sliderImages2}
        />
      </Container>
      <div className="mb-6 mt-4 xs:my-10 space-y-4">
        <h2 className="font-semibold text-2xl md:text-4xl text-primary font-futura text-center">
          Location
        </h2>
        <div className="relative w-full h-[170px] sm:h-[400px] md:h-[500px] max-w-screen-xxl mx-auto">
          <Image
            src="/assets/images/choose-us/location.webp"
            alt="Location"
            fill
            sizes="100vw"
          />
        </div>
      </div>
    </>
  );
};

export default ChooseUs;
