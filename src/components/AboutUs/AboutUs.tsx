'use client';

import { FC } from 'react';
import { AboutUsBlock } from 'types/types';

interface Props {
  blocks: AboutUsBlock[];
}

const AboutUsCompo: FC<Props> = ({ blocks }) => {
  return (
    <div className="sm:space-y-24 md:space-y-10 space-y-6">
      {blocks.map((block, index) => {
        const isImageLeft = index % 2 !== 0;

        const TextContent = (
          <div className="space-y-4">
            <p
              className={`${block.shortHeadingSize} font-medium text-[24px] text-primary font-roboto`}
            >
              {block.shortHeading}
            </p>
            <h2
              className={`${block.mainHeadingSize} font-bold font-futura text-[40px] text-primary`}
            >
              {block.mainHeading}
            </h2>
            <p
              className={`${block.contentSize} text-[#3E3F42] text-base font-roboto`}
            >
              {block.content}
            </p>
          </div>
        );

        const ImageContent = (
          <div
            className="w-full h-[300px] md:h-[450px] bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${block.imageUrl})` }}
          />
        );

        if (isImageLeft) {
          return (
            <div key={index} className="sm:mt-base">
              <div className="block sm:hidden sm:text-start text-center space-y-4 px-4">
                {TextContent}
                {ImageContent}
              </div>

              <div className="hidden sm:grid sm:grid-cols-2 sm:items-center sm:gap-8 sm:py-10 sm:px-0 sm:text-start text-center">
                <div>{ImageContent}</div>
                <div>{TextContent}</div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:py-10 sm:mt-16 text-center sm:text-start px-4 sm:px-0"
          >
            <div>{TextContent}</div>
            <div>{ImageContent}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutUsCompo;
