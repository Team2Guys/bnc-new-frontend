'use client';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from 'types/types';
import { getPath } from 'utils/helperFunctions';
const Card = ({ card }: { card: IProduct }) => {
  return (
    <div className="pb-4 bg-secondary-foreground rounded-md xs:rounded-xl flex flex-col justify-between h-full xs:mx-2">
      <div className="space-y-2">
        <Link
          href={getPath(card)}
          className="relative block w-full h-[150px] xxs:h-[170px] xs:h-[300px]"
        >
          <Image
            src={card?.posterImage?.imageUrl}
            alt={card.title}
            fill
            className="rounded-t-md xs:rounded-xl object-fill"
            sizes="(max-width: 768px) 20vw, 307px"
          />
        </Link>

        <div className="flex flex-col h-full px-2 xs:px-4 pb-4 text-center space-y-1">
          <div className="min-h-[30px] xs:min-h-[60px]">
            <h3 className="font-extrabold font-futura text-sm xs:text-2xl text-primary capitalize">
              {card.title.replace(/\//g, ' ')}
            </h3>
          </div>

          <div className="min-h-[30px] xs:min-h-[60px]">
            <p className="text-primary font-normal text-xs xs:text-base font-roboto transition-all">
              {card?.short_description}
            </p>
          </div>
        </div>
      </div>
      <Link
        href={getPath(card)}
        className="text-primary bg-secondary text-sm md:text-xl font-roboto font-semibold rounded-md py-2 lg:py-3 px-4 xxs:px-6 block w-fit mx-auto hover:opacity-65"
      >
        Learn More
      </Link>
    </div>
  );
};
export default Card;
