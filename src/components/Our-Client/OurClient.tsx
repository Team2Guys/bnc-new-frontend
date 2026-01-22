'use client';
import { OurClientImage } from 'data/data';
import Container from 'components/Res-usable/Container/Container';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ClientLogoGridSlider from './OurClientSlider';
import NeedHelp from 'components/NeedHelp/NeedHelp';

const OurClient = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <>
      {!isMobile && <NeedHelp />}
      <div className="sm:bg-secondary-foreground sm:py-14 py-5 sm:mt-10">
        <Container>
          <div className=" pb-5 max-w-screen-2xl mx-auto">
            <h2 className="text-center font-bold text-2xl xs:text-xl sm:text-2xl lg:text-4xl xl:text-[44px] text-primary capitalize font-futura">
              Trusted By Many Multinational Brands
            </h2>
            <p className="text-center text-15 lg:text-lg xl:text-2xl mx-auto px-2 xs:px-10 pt-5 pb-2 font-roboto text-[#3E3F42] opacity-60 max-w-6xl">
              That&apos;s exactly why multinational brands trust us – we upscale
              window coverings so beautifully that everyone who sees them says,
              &quot;I want that too.&quot;
            </p>
          </div>

          {isMobile ? (
            <div className="mt-4">
              <ClientLogoGridSlider OurClientImage={OurClientImage} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3 xs:gap-5">
              {OurClientImage.map(
                (image: { src: string; alt: string }, index: number) => (
                  <div
                    className="bg-primary h-24 p-5 flex justify-center items-center"
                    key={index}
                  >
                    <Image
                      className="object-contain !relative"
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 12vw"
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default OurClient;
