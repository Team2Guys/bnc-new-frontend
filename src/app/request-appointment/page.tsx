import dynamic from 'next/dynamic';
const BookAppointment = dynamic(
  () => import('components/Book-appointment/BookAppointment'),
);
const Container = dynamic(
  () => import('components/Res-usable/Container/Container'),
);
const Breadcrumb = dynamic(() => import('components/Res-usable/breadcrumb'));
const Testimonial = dynamic(
  () => import('components/ProductDetailPage/testimonial'),
);
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
import AppointmentMap from 'components/AppointmentMap/AppointmentMap';
export const metadata = generateMetadata(metaData.request_appointment);

const AppointmentPage = () => {
  return (
    <>
      <Breadcrumb title="Book A Free Visit" />
      <Container className="lg:pt-16 pt-5 pb-0">
        <h1 className="font-bold text-center lg:p-2 sm:p-3 p-0 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-futura text-primary">
          Book A Free Visit
        </h1>
        <BookAppointment singlePage={true} />
      </Container>
      <Testimonial />
      <Container className="mt-10">
        <AppointmentMap />
      </Container>
    </>
  );
};

export default AppointmentPage;
