'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaHome } from 'react-icons/fa';
import { TopHeroLink } from 'data/data';
import { usePathname } from 'next/navigation';
import { BreakCrum_conent_pages } from 'data/data';
import { blogCategoryUrl } from 'data/urls';
import { UpdateShutterTitle } from 'utils/helperFunctions';

interface TopHeroProps {
  title: string | any;
  Video?: string;
  image?: string;
  home?: string;
  pagename?: string;
  pageTitle?: string;
  className?: string;
}

const TopHero: React.FC<TopHeroProps> = ({
  title,
  Video,
  home,
  pagename,
  pageTitle,
  className,
  image,
}) => {
  const [pageName, setPageName] = useState<string[]>([]);
  const page = usePathname();
  const name = pagename ? pagename : page;
  const pathname = title.replace('-', ' ');

  useEffect(() => {
    if (name) {
      const newPageName = name
        .split('/')
        .filter((segment: string) => segment !== '')
        .map((segment: string) => segment.replaceAll('-', ' '));

      setPageName(newPageName);
    }
  }, []);

  const result = BreakCrum_conent_pages.find((value: any) =>
    value.url.toLowerCase().includes(page.toLowerCase()),
  );


  return (
    <div
      className={`relative      
      flex items-center text-center justify-center bg-no-repeat w-full  border-black  bg-center bg-cover xl:bg-custom-size ${className} ${Video ? "h-[200px]  md:h-[55vh] lg:h-[65vh] xl:h-[75vh] 2xl:h-[84vh]" : "h-[200px] xs:h-[280px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px]"}`}
      style={
        !Video
          ? {
            backgroundImage: `url(${image})`,
            backgroundOrigin: 'content-box',
          }
          : undefined
      }
    >
      <>
        {Video &&
          <video
            className="absolute object-fill w-full h-[200px]  md:h-[55vh] lg:h-[65vh] xl:h-[75vh] 2xl:h-[84vh]"
            src={Video}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
          />
        }
        <div className={`relative`}>
          {page === '/shutters-range/black-shutters' && (
            <div className="absolute inset-0 bg-lightgrey opacity-30 z-10"></div>
          )}
          <div className="relative z-20 py-6 sm:py-14 md:py-24">
            <h1 className="text-xl xs:text-3xl md:text-4xl lg:text-5xl font-black mt-5 uppercase bg-[#9fac9ba3]">
              {result
                ? result.content
                : UpdateShutterTitle(pageTitle ? pageTitle : pathname)}
            </h1>
            <div className="flex justify-center items-center px-2 gap-1 xs:gap-2 sm:gap-4 mt-2 text-14 sm:text-base flex-wrap bg-[#9fac9ba3] w-fit m-auto">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold capitalize"
              >
                <FaHome size={20} />
                {home ? home.charAt(0).toUpperCase() + home.slice(1) : 'Home'}
              </Link>
              {pageName
                ? pageName.map((item, index) => {
                  const matchedLink = TopHeroLink.find(
                    (heroLink) =>
                      heroLink.matchingTitle.toLowerCase() ===
                      item.toLowerCase(),
                  );
                  const matchingPageTitle = TopHeroLink.find(
                    (itemTitle) =>
                      itemTitle.title.toLowerCase() === item.toLowerCase(),
                  );
                
                  let linkHref = '';
                  let linkText = item;
                  if (matchedLink) {
                    linkHref = `/${item !== 'blog' &&
                      pageName.length > 1 &&
                      blogCategoryUrl.some(
                        (item) =>
                          item.name.toLowerCase() ===
                          pageName.at(1)?.toLowerCase(),
                      )
                      ? `blog/${pageName.at(1)?.toLowerCase()}`
                      : matchedLink?.title || ''
                      }`;
                  } else if (matchingPageTitle) {
                    linkHref = `/${matchingPageTitle.title.replaceAll(' ', '-')}`;
                    linkText = matchingPageTitle.title;
                  } else if (index === pageName.length - 2) {
                    linkHref = `/${pageName.at(0)?.toLowerCase() === 'blinds'
                      ? 'blinds'
                      : pageName.at(0)?.toLowerCase() === 'curtains'
                        ? 'curtains'
                        : pageName.at(0)?.toLowerCase() === 'shutters'
                          ? 'shutters'
                          : pageName.at(0)?.toLowerCase() === 'commercial'
                            ? 'commercial'
                            : pageName.at(0)?.toLowerCase() === 'blog'
                              ? 'blog'
                              : ''
                      }${item === 'commercial' ? '' : `/${item.replaceAll(' ', '-')}`}`;
                  }  else {
                    linkText =
                      item === 'request appointment'
                        ? 'Book Appointment'
                        : item;
                  }
                  return (
                    <React.Fragment key={index}>
                      <FaAngleRight size={20} />
                      {linkHref ? (
                        <Link
                          href={linkHref+"/"}
                          className="font-bold capitalize"
                        >
                          {linkText}
                        </Link>
                      ) : (
                        <h2 className="font-bold capitalize">{linkText}</h2>
                      )}
                    </React.Fragment>
                  );
                })
                : null}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default TopHero;
