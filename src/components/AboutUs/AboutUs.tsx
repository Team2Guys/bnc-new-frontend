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
            <p className={`${block.shortHeadingSize} font-medium`}>
              {block.shortHeading}
            </p>
            <h2 className={`${block.mainHeadingSize} font-bold font-robotoSerif`}>
              {block.mainHeading}
            </h2>
            <p className={`${block.contentSize} text-[#3E3F42] text-base font-roboto`}>
              {block.content}
            </p>
          </div>
        );

        const ImageContent = (
          <div
            className="w-full h-[300px] md:h-[300px] bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${block.imageUrl})` }}
          />
        );

        // For odd blocks: mobile = text then image (vertical), desktop = image then text (horizontal)
        if (isImageLeft) {
          return (
            <div key={index} className="sm:mt-16">
              {/* Mobile: stacked vertical text then image */}
              <div className="block sm:hidden sm:text-start text-center space-y-4 px-4">
                {TextContent}
                {ImageContent}
              </div>

              {/* Desktop: side by side image then text */}
              <div className="hidden sm:grid sm:grid-cols-2 sm:items-center sm:gap-8 sm:py-10 sm:px-0 sm:text-start text-center">
                <div>{ImageContent}</div>
                <div>{TextContent}</div>
              </div>
            </div>
          );
        }

        // For even blocks: always text then image (desktop and mobile stacked)
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
