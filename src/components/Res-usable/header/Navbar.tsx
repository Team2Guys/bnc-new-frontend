'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from 'components/Res-usable/Container/Container';
import Sheet from 'components/ui/Drawer';
import SocialLink from '../social-link/social-link';


import { usePathname } from 'next/navigation';
import { links } from 'data/header_links';
import { TfiEmail } from 'react-icons/tfi';
import { LiaPhoneSolid } from 'react-icons/lia';
import { CgMenuRight } from 'react-icons/cg';


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined,
  );
  const [language, setLanguage] = useState('en');
  const [translatorReady, setTranslatorReady] = useState(false);
  const lastLangRef = useRef<string>('en');
  const skipNextUpdateRef = useRef<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    // Wait for Google Translate widget to be available
    const interval = setInterval(() => {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectEl && selectEl.options.length > 1) {
        setTranslatorReady(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLanguageSwitch = (lang: string) => {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (!combo) return;

    if (lang === 'en') {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change'));

      // Auto-select Arabic (simulate selection)
      combo.value = 'ar';
      combo.dispatchEvent(new Event('change'));

      skipNextUpdateRef.current = true; // Skip next Arabic update
      lastLangRef.current = 'en';
      setLanguage('en')
      return; // Do not update state
    }


    // Normal flow
    if (combo.value !== lang || lastLangRef.current !== lang) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
      lastLangRef.current = lang;
      setLanguage(lang); // ✅ Only update state now
    }
  }




  const handleLinkClick = () => {
    setDrawerOpen(false);
    setSelectedLabel(undefined);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };



  return (
    <>
      {
        path === '/ppc/motorised-blinds/' || path === '/ppc/motorised-curtains/' || path === '/ppc/roller-blinds/' || path === '/ppc/made-to-measure-blinds/' || path === '/ppc/made-to-measure-curtains/' ? "" :

          <div className="w-full bg-primary hidden md:block">
            <Container className="flex flex-wrap md:flex-nowrap justify-between items-center min-h-12">
              <div className="text-white py-2 text-10 md:text-14 font-normal font-roboto leading-relaxed 2xl:leading-loose flex gap-2 md:gap-10">
                <Link href="tel:04 252 2025" target='_black' rel='no-referrer' className='flex gap-1 md:gap-2 items-center'>
                  <LiaPhoneSolid className='text-12 md:text-18 text-secondary' />
                  04 252 2025
                </Link>
                <Link href="mailto:sales@blindsandcurtains.ae" target='_black' rel='no-referrer' className='gap-1 md:gap-2 items-center flex'>
                  <TfiEmail className='text-12 md:text-18 text-secondary' />
                  sales@blindsandcurtains.ae
                </Link>

              </div>
              <div>
                <SocialLink />
              </div>
            </Container>
          </div>
      }



      <nav className="sticky -top-1 z-50 py-2 sm:py-0 bg-white">

        {/* mobile container */}

        <Container className="flex w-full justify-between h-12 sm:h-24 max-lg:px-2 items-center gap-1 md:gap-3 lg:gap-0 overflow-hidden ">
          <div className='flex gap-4 items-center'>
            <Link href='/' className="w-[79px] h-[50px] relative md:w-[122px] md:h-[50px]">
              <Image
                fill
                loading='lazy'
                src='/assets/images/logomain.webp'
                alt="Logo"
              />
            </Link>
            <div className='w-[140px] overflow-hidden hidden lg:block'>
              {!translatorReady ?
                <div
                  className={`bg-gray-300 h-8 w-full rounded-lg`} />
                :
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLanguageSwitch('en')}
                    disabled={!translatorReady || language === 'en'}
                    className={`flex items-center justify-end gap-1 w-20 py-1 rounded-md font-medium text-12 xl:text-lg transition-colors duration-200 notranslate ${language === 'en' ? 'text-secondary' : 'text-primary'}`}
                  >
                    <Image
                      src="/assets/uaeFlag.webp"
                      alt="flag"
                      width={20}
                      height={20}
                      className="rounded-full size-6"
                      loading='lazy'
                    />
                    <span className='max-w-10 xl:max-w-14 notranslate'>Eng</span>
                  </button>
                  <div className='bg-primary w-[1px] h-6'></div>
                  <button
                    className={`w-fit py-1 text-start rounded-md font-medium text-12 xl:text-lg transition-colors duration-200 notranslate ${language === 'ar' ? 'text-secondary' : 'text-primary'}`}
                    onClick={() => handleLanguageSwitch('ar')}
                    disabled={!translatorReady || language === 'ar'}
                  >
                    العربية
                  </button>
                </div>
              }

            </div>
          </div>

          <div className=" hidden lg:flex gap-[48px] ">
            <div className="hidden lg:flex justify-evenly items-start lg:text-10 font-roboto font-medium  gap-[24px] text-primary text-18 ">
              {links.map((link, index) => {

                return (
                  <Link
                    key={index}
                    href={link.href + "/" || ''}
                    className="px-1 lg:text-10 text-12 xl:text-18 h-full flex items-center justify-center transition-all duration-200"

                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div>
              <Link
                className="py-2 px-2 xl:py-3 xl:px-6 font-roboto font-semibold hidden sm:block rounded-md text-[16px] text-secondary whitespace-nowrap border-2 border-secondary hover:bg-secondary hover:text-primary"
                href="/request-appointment/"
                onClick={handleLinkClick}
              >
                Book  A Free Visit
              </Link>
            </div>

          </div>


          <div className="flex lg:hidden max-lg:mr-2">
            <Sheet
              drawerName={<CgMenuRight width={20} height={20} className='min-w-6 w-6  h-6' />}
              open={drawerOpen}
              setOpen={setDrawerOpen}
              selectedLabel={selectedLabel}
              mobileBgColor="#E6E4E5"
              className="mb-10"
            >

              <div className='flex justify-between items-center mt-4 mb-5'>
                <Link href={'/'} className="w-[120px] h-[80px]  relative bg-transparent">
                  <Image
                    fill
                    loading='lazy'
                    src='/assets/images/logomain1.png'
                    alt="Logo"
                  />
                </Link>
                <CgMenuRight className='min-w-6 w-6 h-6 bg-[#F1B42F66]' onClick={() => setDrawerOpen(false)} />

              </div>

              <div className="flex flex-col gap-2">
                {links.map((link, index) => {


                  return (
                    <Link
                      key={index}
                      className={`text-16 border-b text-primary font-robotoSerif font-medium border-[#0000002a] pb-[6px] hover:text-black `}
                      onClick={handleCloseDrawer}
                      href={`${link.href}/`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

              </div>
              <div className='border-[#0000002a] border-b py-[6px]'>
                {!translatorReady ?
                  <div
                    className={`bg-gray-300 h-8 w-full rounded-lg`} />
                  :
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLanguageSwitch('en')}
                      disabled={!translatorReady || language === 'en'}
                      className='flex items-center justify-end gap-1 w-fit py-1 rounded-md font-medium font-robotoSerif transition-colors duration-200 text-primary'
                    >
                      <Image
                        src="/assets/uaeFlag.webp"
                        alt="flag"
                        width={20}
                        height={20}
                        className="rounded-full size-6"
                      />
                      <span>English</span>
                    </button>
                    <div className='bg-primary w-[1px] h-6'></div>
                    <button
                      className='w-fit py-1 mb-1 text-start rounded-md font-medium font-robotoSerif transition-colors duration-200 text-primary'
                      onClick={() => handleLanguageSwitch('ar')}
                      disabled={!translatorReady || language === 'ar'}
                    >
                      عربی
                    </button>
                  </div>
                }
              </div>

              <Link
                className="px-3 py-1  mt-5 text-center max-w-[80%] mx-auto block  font-roboto font-semibold text-20 rounded-md whitespace-nowrap border border-secondary text-secondary hover:bg-secondary"
                href="/request-appointment/"
                onClick={handleLinkClick}
              >
                Book A Free Visit
              </Link>
            </Sheet>
          </div>



        </Container>
      </nav>
    </>
  );
};

export default Navbar;