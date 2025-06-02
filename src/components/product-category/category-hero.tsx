import Container from 'components/Res-usable/Container/Container'
import Circletick from 'components/svg/circle-tick'
import GreenCircle from 'components/svg/green-circle';
import Image from 'next/image'
import React from 'react'
import { CategoryProps } from 'types/product';

const CategoryHero = ({ Data }: CategoryProps) => {
 if (!Data) {
    return null;
  }

  console.log(Data.headingchecks, "headingchecks")
  return (
    <div className='bg-secondary-foreground py-4 md:py-0'>
        <Container className='grid grid-cols-12 md:gap-4 items-center px-4' >
           <div className=' col-span-12 md:col-span-8 space-y-3 order-2 md:order-1 text-primary'>
            <h1 className='categoryHeading'>{Data.title}</h1>
            <p className='font-normal font-roboto text-16 pb-[24px] '>{Data?.description}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
               {Data.headingchecks && Data.headingchecks.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center text-16 font-roboto font-normal">
                    <Circletick className='hidden md:block' />
                    <GreenCircle className='block md:hidden'/>
                    <p className='w-[90%]'>{item.specsDetails}</p>
                    </div>
                ))}
            </div>
           </div>
           <div className='col-span-12 md:col-span-4 order-1 md:order-2'>
            <p className='font-robotoSerif font-bold text-2xl text-center md:hidden block mb-3'>{Data.title}</p>
            <div className='relative w-full h-[230px] md:h-[320px] '>
            <Image src={Data.posterImage?.imageUrl || ""} className='rounded-xl object-fill' loading='eager' fill alt={"Hero"}/>
            </div>
           </div>
        </Container>
    </div>
  )
}

export default CategoryHero