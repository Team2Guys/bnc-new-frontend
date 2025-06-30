"use client";
import Container from 'components/Res-usable/Container/Container';
import { QualityData } from 'data/Homedata/tabdata';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const QualitySection = () => {
  const path = usePathname();
  const category = path.includes('blinds')
    ? 'blinds'
    : path.includes('curtains')
    ? 'curtains'
    : 'shutters';

  const imageSrc = getImageSrc(category);
  const qualityFeatures = QualityData[category];

  return (
    <section className="sm:bg-secondary-foreground py-6 sm:py-12 md:px-6 sm:mt-10">
      <Container className="space-y-4 sm:space-y-10">
        <div className="space-y-2">
          <p className="uppercase text-sm sm:text-base font-medium text-primary text-center sm:text-start">
            We Only Focus On
          </p>
          <h2 className="text-2xl md:text-[40px] font-black text-primary font-robotoSerif text-center sm:text-start">
            Customer Satisfaction
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-4 items-center">
          <div className="col-span-12 md:col-span-5">
            <div className="w-full h-[250px] xsm:h-[300px] xs:h-[350px] sm:h-[430px] md:h-[300px] xl:h-[325px] 2xl:h-[400px]">
              <Image src={imageSrc} alt={category} fill className="!relative rounded" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4">
              {qualityFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Image
                    src={feature.icon}
                    alt={`icon-${idx}`}
                    className="w-14 sm:w-16 sm:h-16 h-14"
                    width={200}
                    height={200}
                  />
                  <p
                    className="text-base xl:text-xl text-primary font-medium font-roboto"
                    dangerouslySetInnerHTML={{ __html: feature.text }}
                  />
                </div>
              ))}
            </div>
            <div className="relative top-5">
              <Link
                href="/request-appointment/"
                className="bg-secondary text-primary font-semibold px-6 sm:px-20 py-3 sm:py-4 rounded-md mx-auto block w-fit hover:opacity-65"
                aria-label="Book a free visit"
              >
                Book A Free Visit
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

function getImageSrc(category: string) {
  switch (category.toLowerCase()) {
    case "blinds":
      return "/assets/images/safisfaction/Blinds.webp";
    case "curtains":
      return "/assets/images/safisfaction/Curtains.webp";
    default:
      return "/assets/images/safisfaction/Shutters.webp";
  }
}

export default QualitySection;
