'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IProduct } from 'types/types';
import { getPath } from 'utils/helperFunctions';
const Card = ({ card }: { card: IProduct }) => {
  return (
    <div className="px-2">
      <div className=" pb-4 bg-secondary-foreground rounded-xl flex flex-col justify-between h-full">
        <div className='space-y-2'>
          <Link href={getPath(card)} className="relative block w-full h-[300px]">
          <Image
          src={card?.posterImage?.imageUrl.replace('/upload/', '/upload/f_auto,q_auto,w_307/')}
          alt={card.title}
          fill
          className="rounded-xl object-fill"
          sizes="(max-width: 768px) 296px, 307px"
           />
        </Link>

          <div className="flex flex-col h-full px-4 pb-4 text-center space-y-1">
            <div className="min-h-[60px]">
              <h3 className="font-bold  font-robotoSerif text-24 text-primary capitalize">
                {card.title.replace(/\//g, ' ')}
              </h3>
            </div>

            <div className="min-h-[60px]">
              <p className="text-primary font-normal text-16 font-roboto transition-al">
                {card?.short_description}
              </p>
            </div>
          </div>

        </div>
        <Link
          href={getPath(card)}
          className="text-primary bg-secondary text-sm md:text-xl font-roboto font-semibold rounded-md p-2 lg:py-3 px-6 block w-fit mx-auto hover:opacity-65"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
export default Card;