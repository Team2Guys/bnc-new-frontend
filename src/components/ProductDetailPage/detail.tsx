"use client"
import CustomModal from 'components/ui/Modal'
import { featuresinfo } from 'data/Homedata/tabdata'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { DetailProps } from 'types/product'


const Detail = ({ data, setColorImage, selectedColor }: DetailProps) => {
   console.log(data,"datadata")
  console.log(setColorImage,selectedColor)
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title?: string }>({
      src: '',
      alt: '',
      title: '',
    });
  return (
    <div className=' space-y-2 sm:space-y-4 max-w-[650px]'>
      <h1 className='font-robotoSerif font-bold text-2xl xl:text-5xl text-primary px-2'>{data.title}</h1>

      <div className='flex flex-wrap items-center gap-2 lg:gap-4 px-2 !mb-4'>
        {Array.isArray(data?.topImages) && data.topImages.map((feature, index) => (
          <div key={index} className='rounded-full py-2 px-4 flex items-center gap-1 bg-[#F2F2F2]'>
            <Image src={feature.imageUrl} height={20} width={20} alt='feature' />
            <p className='font-roboto text-sm '>{feature.name}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-[#F2F2F2] px-4 py-2 z-50 block sm:hidden">
    <Link 
    href="/request-appointment/"
    className="bg-secondary text-primary mt-2 mb-2 py-4 px-4 md:py-3 md:px-6 font-semibold block rounded-md w-full font-roboto text-center hover:opacity-65"
  >
    Book A Free Visit
    </Link>
    </div>
    
      <p className='px-2'>
      <span className='font-roboto blog-content'
        dangerouslySetInnerHTML={{ __html:data.description}}/>
      </p>
        {
          data.colorsImages && data.colorsImages.length > 0 && (
            <>
            <p className='font-roboto px-2'>Most demanded colours</p>
            <div className=' flex items-start gap-2 md:pb-10 px-2'>
            <div className='flex flex-wrap items-center gap-2'>
          {/* {data.colors?.map((item: { name?: string; detail?: string }, index: number) => { */}
                {data.colorsImages?.map((item, index) => {
            // if (!item.detail) return null;
            // const colorCode = `#${item.detail}`;
            // const isSelected = selectedColor === colorCode;
            return (
              <div
                  key={index}
                  onClick={() => {
                    setSelectedImage({
                      src: item.imageUrl || '',
                      alt: item.altText || 'color',
                    });
                    setOpenModal(true);
                  }}
                >
                  <Image
                    src={item.imageUrl || ''}
                    alt={item.altText || 'color'}
                    width={50}
                    height={50}
                    className="h-9 md:w-12 w-9 md:h-12 rounded-sm cursor-pointer shadow border-2"
                  />
                </div>
              // <div
              //   key={index}
              //   onClick={() => setColorImage(colorCode)}
              //   style={{ backgroundColor: colorCode }}
              //   className={`h-9 md:w-12 w-9 md:h-12 rounded-sm cursor-pointer shadow border-2 ${
              //     isSelected ? 'border-secondary' : ''
              //   }`}
              // />
            );
          })}
            </div>
              <p className='border rounded-lg font-roboto h-9 md:h-12 flex items-center px-2 text-xs md:text-base'>You can still pick from 3000+ fabric colours</p>
              </div>
              </>
            )
          }
      
        <Link href="/request-appointment/" className='bg-secondary hover:opacity-65 text-primary py-3 px-6 font-semibold hidden md:block rounded-md w-full sm:w-fit font-roboto text-center '>Book A Free Visit</Link>

      <div className='flex max-sm:flex-col sm:items-stretch sm:gap-2 sm:pt-5 px-2'>
      {featuresinfo.map((feature, index) => (
        <div key={index} className='sm:border sm:rounded-sm flex sm:flex-col gap-1 justify-center items-center sm:space-y-2 py-2 sm:px-4 sm:min-h-[140px] w-fit'>
          <Image src={feature.icon} height={200} width={200} className=' h-10 sm:h-12 w-10 sm:w-12' alt='feature' />
          <p className='font-roboto sm:max-w-32 sm:text-center text-base sm:text-sm'>{feature.text}</p>
        </div>
      ))}
    </div>
    <CustomModal open={openModal} onClose={() => setOpenModal(false)} title={" "} width={"max-w-md"} isheader>
      <div className="p-4 flex justify-center">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={700}
          height={700}
          className="rounded-md object-cover h-[300px] sm:h-[400px] "
        />
      </div>
    </CustomModal>
    </div>
  )
}

export default Detail
