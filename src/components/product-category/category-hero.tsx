import Container from 'components/Res-usable/Container/Container';
import Circletick from 'components/svg/circle-tick';
import GreenCircle from 'components/svg/green-circle';
import Image from 'next/image';
import { CategoryProps } from 'types/product';

const CategoryHero = ({ Data }: Omit<CategoryProps, 'Products'>) => {
  if (!Data) {
    return null;
  }

  return (
    <div className="bg-secondary-foreground py-4 md:py-0">
      <Container className="grid grid-cols-12 md:gap-4 items-center">
        <div className=" col-span-12 md:col-span-8 space-y-3 order-2 md:order-1 text-primary animate-fadeUp">
          <h1 className="categoryHeading hidden lg:block">{Data.title}</h1>
          <p className="font-medium font-roboto text-base pb-1 xs:pb-6">
            {Data?.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {Data.headingchecks &&
              Data.headingchecks.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center text-base font-roboto font-normal"
                >
                  <Circletick className="hidden md:block" />
                  <GreenCircle className="block md:hidden" />
                  <p className="w-[90%] font-medium font-roboto">
                    {item.specsDetails}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 order-1 md:order-2">
          <p className="font-futura font-bold text-2xl text-center md:hidden block mb-3">
            {Data.title}
          </p>
          <div className="relative w-full h-[230px] md:h-[320px] content-visibility-auto">
            <Image
              src={`${Data.posterImage?.imageUrl}?f_auto&q_auto`}
              fill
              alt={Data.title}
              priority
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover rounded-md xs:rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryHero;
