import React from 'react';
import bgBreadcrum from '../../../public/assets/images/Breadcrum/endering.png';
import BookAppointment from 'components/Book-appointment/BookAppointment';
import Container from 'components/Res-usable/Container/Container';
import { Metadata } from 'next';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import Testimonial from 'components/ProductDetailPage/testimonial';
import AppointmentMapWrapper from 'components/AppointmentMap/AppointmentMapWrapper';

export const metadata: Metadata = {
  title: 'Blind And Curtains Dubai | Book Appointment',
  description: 'Spruce up your space with stylish blinds and curtains in Dubai. Book an appointment today for expert advice, custom designs, and perfect fits.',
  openGraph: {
    title: 'Blind And Curtains Dubai | Book Appointment',
    description: 'Spruce up your space with stylish blinds and curtains in Dubai. Book an appointment today for expert advice, custom designs, and perfect fits.',
    url: 'https://blindsandcurtains.ae/request-appointment/',
    images: [
      {
        url: `${bgBreadcrum.src}`,
        alt: 'Blind And Curtains Dubai | Book Appointment',
      },
    ],
  },
  alternates: {
    canonical: 'https://blindsandcurtains.ae/request-appointment/',
  },
};

const AppointmentPage = () => {
  return (
    <>
      <Breadcrumb title="Book A Free Visit" />
      <Container className="lg:pt-16 pt-5 pb-0">
        <h1 className="font-bold text-center lg:p-2 sm:p-3 p-0 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-robotoSerif">
          Book A Free Visit
        </h1>
        <BookAppointment singlePage={true} />
      </Container>
      <Testimonial />
      <Container className="mt-10">
        <AppointmentMapWrapper />
      </Container>
    </>
  );
};

export default AppointmentPage;
