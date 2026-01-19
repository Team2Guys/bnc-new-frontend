import React from 'react';
import Container from 'components/Res-usable/Container/Container';
import Link from 'next/link';
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import ContactForm from 'components/Contact/contact-form';
import ContactInfo from 'components/Contact/contact-info';
export const metadata = generateMetadata(metaData.contact);

const ContactUs = () => {
  return (
    <>
      <Breadcrumb image="/assets/images/contact-us/contact-us.webp" title="Contact Blinds and Curtains Dubai" bradcrumbtitle="Contact Us" imageclassName="object-center"/>
      <Container className="my-8 md:my-10 space-y-4 md:space-y-8">
        <h2 className="text-2xl lg:text-5xl font-semibold font-futura text-primary text-center"> Tell Us More </h2>
        <p className="text-base px-1 lg:px-8 text-primary text-center">
          Get some rough window measurements and call us on{' '}
          <Link
            aria-label="Call Phone Number"
            target="_blank"
            href={'tel:042522025'}
            className="underline"
          >
            04 252 2025
          </Link>{' '}
          with how many windows you have and we will be happy to give you an
          approximate quote over the phone. Alternatively, you can contact us
          using the contact form below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          <ContactInfo/>
          <ContactForm />
        </div>
      </Container>
    </>
  );
};

export default ContactUs;
