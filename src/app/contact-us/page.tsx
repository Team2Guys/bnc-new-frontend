import dynamic from 'next/dynamic';
const TopHero = dynamic(() => import('components/ui/top-hero'));
const BookAppointment = dynamic(() => import('components/Book-appointment/BookAppointment'));
import second from '../../../public/assets/images/contact-us/contactUs.webp';
import Container from 'components/Res-usable/Container/Container';
import { MdEmail } from 'react-icons/md';
import { IoCall, IoLocationSharp } from 'react-icons/io5';
import Link from 'next/link';
import { SlCalender } from "react-icons/sl";
import { Metadata } from 'next';
import GoogleMap from 'components/googlemap';


export const metadata: Metadata = {
  title: 'Blind And Curtains Dubai | Contact Us',
  description: 'Shop the best blinds and curtains in Dubai. Stylish, affordable, and perfect for your space. Call us now to upgrade your home or office today.',
  openGraph: {
    title: 'Blind And Curtains Dubai | Contact Us',
    description: 'Shop the best blinds and curtains in Dubai. Stylish, affordable, and perfect for your space. Call us now to upgrade your home or office today.',
    url: 'https://blindsandcurtains.ae/contact-us/',
    images: [
      {
        url: `${second.src}`,
        alt: 'Blind And Curtains Dubai | Contact Us',
      },
    ],
  },
  alternates: {
    canonical: 'https://blindsandcurtains.ae/contact-us/',
  },
};



const ProductUs = () => {
  return (
    <>
      <TopHero title="CONTACT US" image={second.src} />
      <Container>
        <section className="text-center mb-12 max-w-screen-xl mx-auto">
          <h5 className="xs:py-12 py-5 text-[#666666] text-base font-bold">
            CONTACT US
          </h5>
          <h2 className="lg:text-5xl text-xl font-bold text-[#333333]">
            Tell us More
          </h2>
          <p className="text-14 lg:text-16 lg:pt-4 lg:px-12 text-[#666666]">
            Get some rough window measurements and call us on{' '}
            <Link
             aria-label="Call Phone Number"
              target="_blank"
              href={'tel:+04042522025'}
              className="underline"
            >
              04 252 2025
            </Link>{' '}
            with how many windows you have and we will be happy to give you an
            approximate quote over the phone. Alternatively, you can contact us
            using the contact form below.
          </p>
        </section>

        <section className="flex flex-col lg:flex-row gap-5  justify-between bg-primary p-6 lg:p-12 lg:mt-20 mt-12 rounded-lg overflow-hidden">
          <div className="lg:w-1/2 w-full text-white ">
            <div className="lg:pl-12 ">
              <p className="md:text-xl font-bold">Contact Info :</p>
              <h2 className="text-left lg:text-4xl text-3xl font-bold lg:mt-5 mt-4">
                Tell Us More
              </h2>
              <p className="lg:mt-4 mt-4 font-light text-14 lg:text-16 md:text-18">
              The most trusted window treatment company in Dubai with a decade of experience and 100s of positive reviews.</p>
              <div className="block sm:hidden">
                <BookAppointment />
              </div>
              
            </div>
            <div className="lg:mt-5 mt-4 lg:pl-12">
              <p className="md:text-xl font-bold">Contact Info :</p>
              <div className="flex flex-col gap-4 lg:mt-6 mt-4">
                <div className="text-14 md:text-15 2xl:text-18 flex gap-3 items-center">
                  <IoLocationSharp size={25} className="text-white w-1/12" />
                  <p className='w-11/12'>
                    Unit 43 22nd St Al Quoz Industrial Area 4 – Dubai UAE
                  </p>
                </div>
                <div className="text-14 md:text-15 2xl:text-18 flex gap-3 items-start">
                  <IoCall size={25} className="text-white w-1/12 " />
                  <Link
                    target="_blank"
                    href={'tel:042522025'}
                    className="hover:underline w-11/12"
                  >
                    04 252 2025
                  </Link>
                </div>
                <div className="text-14 md:text-15 2xl:text-18 flex gap-3 items-start">
                  <SlCalender size={20} className="text-white w-1/12 " />
                    <p className='w-11/12'>8.30am - 11.00pm 7 days a week</p>
                    </div>
                <div className=" text-14 flex gap-3 items-start md:text-18">
                  <MdEmail size={25} className="text-white w-1/12 " />
                  <Link
                    target="_blank"
                    href="mailto:sales@blindsandcurtains.ae"
                    className="hover:underline w-11/12"
                  >
                    sales@blindsandcurtains.ae
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:mt-5 mt-4">
    <GoogleMap/>
    
            </div>
          </div>
          <BookAppointment className=" hidden sm:block" />
        </section>
      </Container>
    </>
  );
};

export default ProductUs;
