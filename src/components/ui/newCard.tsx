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
              src={card?.posterImage?.imageUrl}
              alt={card.title}
              fill
              className="rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </Link>
          <div className="text-center space-y-1 px-4 pb-4">
            <h3 className="font-semibold md:font-black font-robotoSerif text-xl lg:text-2xl text-primary capitalize">
              {card.title.replace(/\//g, ' ')}
            </h3>
            <div className="text-primary text-base lg:text-lg font-roboto transition-all">
              <p>
                {card?.short_description}{' '}
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