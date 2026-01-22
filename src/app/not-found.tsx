import Link from 'next/link';
import Container from 'components/Res-usable/Container/Container';
import ContactForm from 'components/Contact/contact-form';
import { fetchProducts } from 'config/fetch';
import Image from 'next/image';
import ErrorTabs from 'components/Common/ErrorTabs';
import { featuresInfo } from 'data/error';

export default async function NotFound() {
  const products = await fetchProducts();

  return (
    <Container className=" my-5 sm:my-20 space-y-16">
      {/* CONTACT */}
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="space-y-4 text-center col-span-12 md:col-span-7">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold">
            Product Not Found
          </h2>
          <p className="text-2xl">
            Thank you for your patience. You are very special to us!
          </p>
          <p className="text-primary">
            Your desired product either has been sold or is in the publishing
            process.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 border rounded-md bg-secondary text-white hover:bg-white border-secondary hover:text-primary transition font-medium"
            >
              Back to Home
            </Link>
          </div>
          <div className="flex max-sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:pt-5 px-2">
            {featuresInfo.map((feature, index) => (
              <div
                key={index}
                className="sm:border sm:rounded-sm flex sm:flex-col gap-1 justify-start items-center sm:space-y-2 py-2 sm:px-4 sm:min-h-[140px] w-fit"
              >
                <Image
                  src={feature.icon}
                  height={200}
                  width={200}
                  className="h-10 sm:h-12 w-10 sm:w-12"
                  alt="feature"
                />
                <p className="font-roboto sm:max-w-32 text-start sm:text-center text-base sm:text-sm">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <ContactForm textareaClass="h-14" />
        </div>
      </div>
      <ErrorTabs products={products} />
    </Container>
  );
}
