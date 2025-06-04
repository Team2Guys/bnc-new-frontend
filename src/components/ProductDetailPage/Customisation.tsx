import Container from 'components/Res-usable/Container/Container';
import { logos } from 'data/Homedata/tabdata';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Customisation = () => {
  return (
    <div className="relative bg-detailbanner bg-cover sm:bg-current 2xl:bg-cover w-full bg-no-repeat bg-right">
      {/* Black blur overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <Container className="py-10 space-y-2 sm:space-y-4 lg:space-y-8 relative z-10">
        <div className="max-w-[520px] space-y-2 sm:space-y-4 lg:space-y-8 ">
          <p className="text-3xl lg:text-[40px] text-secondary font-robotoSerif font-extrabold drop-shadow-2xl">
            Customisation
          </p>
          <p className="text-base lg:text-2xl text-white font-roboto drop-shadow-2xl">
            In Motorised curtains, we offer customisation with a range of fabrics, hardware colours, and charging options.
          </p>
        </div>
       <div className='space-y-3'>
         <p className="max-w-[660px] font-robotoSerif font-extrabold text-19 sm:text-3xl lg:text-[40px] text-white drop-shadow-2xl">
          Dubai&apos;s leading manufacturer{' '}
          <span className="block sm:hidden">of automated blinds</span>
        </p>
        <p className="font-robotoSerif font-extrabold text-19 sm:text-3xl lg:text-[40px] text-white hidden sm:block">
          of automated blinds
        </p>
       </div>

        <div className="flex items-center gap-2">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white h-12 rounded-sm flex items-center justify-center px-1"
            >
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
              />
            </div>
          ))}
        </div>
          <div className=' pt-5'>
            <Link href="/request-appointment/" className='bg-secondary hover:opacity-65 text-primary rounded-md py-2 sm:py-4 px-4 sm:px-8 font-roboto font-semibold block w-fit'>Book A Free Visit</Link>
          </div>
      </Container>
    </div>
  );
};

export default Customisation;
