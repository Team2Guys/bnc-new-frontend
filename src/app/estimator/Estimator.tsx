'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from 'components/ui/button';
import { useRouter } from 'next/navigation';
import Input from 'components/Common/regularInputs';
import Container from 'components/Res-usable/Container/Container';
import UnitSelector from '../../components/estimator-product/UnitSelector';
import { EstimatorProductTypes } from 'types/interfaces';
import showToast from 'components/Toaster/Toaster';
import Link from 'next/link';
import { WhatsAppInfo } from 'data/data';
import Testimonial from 'components/ProductDetailPage/testimonial';
import InfoTabs from 'components/NewHomecomponents/info';
import Breadcrumb from 'components/Res-usable/breadcrumb';
import { tabData } from 'data/Homedata/tabdata';
import { FaChevronDown } from 'react-icons/fa';

const EstimatorPage = ({ sortedProducts }: { sortedProducts: EstimatorProductTypes[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<EstimatorProductTypes | null>(null);
  const [activeProduct, setActiveProduct] = useState<EstimatorProductTypes | null>(sortedProducts[0]);
  const [selectedUnit, setSelectedUnit] = useState<string>('cm');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const route = useRouter();
  const [productError, setproductError] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(productError, "product error")
  useEffect(() => {
    calculatePrice(width, height);
    setSelectedProduct(activeProduct);
  }, [activeProduct]);

  // eslint-disable-next-line no-undef
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 || isNaN(value)) {
      setWidth(isNaN(value) ? '' : value);
      calculatePrice(isNaN(value) ? '' : value, height);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 || isNaN(value)) {
      setHeight(isNaN(value) ? '' : value);
      calculatePrice(width, isNaN(value) ? '' : value);
    }
  };
  const checkForToast = () => {
    if (Number(width) > 0 && Number(height) > 0 && !activeProduct) {
      if (!toastTimeout.current) {
        toastTimeout.current = setTimeout(() => {
          setproductError("Please select a product");  // Set the error message
          showToast('error', 'Please select a product');

          // setTimeout(() => {
          //   setproductError("");  // Clear the error message after 1 second
          // }, 1000);

          toastTimeout.current = null;
        }, 1000);
      }
    } else if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
      toastTimeout.current = null;
    }
  };


  const calculatePrice = (width: number | '', height: number | '') => {


    if (activeProduct?.title === 'Sheer Curtains' || activeProduct?.title === 'Blackout Curtains') {
      if (width && activeProduct) {
        let calculatedPrice = width;
        switch (selectedUnit) {
          case 'cm':
            calculatedPrice = calculatedPrice / 100;
            break;
          case 'mm':
            calculatedPrice = calculatedPrice / 1000;
            break;
          case 'inches':
            calculatedPrice = calculatedPrice / 39.37;
            break;
          default:
            break;
        }
        const pricePerUnit = activeProduct.price || 0;
        const price = calculatedPrice * pricePerUnit;

        setCalculatedPrice(price);
      }
      else {

        setCalculatedPrice(0);
      }
    } else {
      if (width && height && activeProduct) {
        let calculatedPrice = width * height;
        if (selectedUnit === 'cm') {
          calculatedPrice = calculatedPrice / 10000;
        } else if (selectedUnit === 'mm') {
          calculatedPrice = calculatedPrice / 1000000;
        } else if (selectedUnit === 'inches') {
          calculatedPrice = calculatedPrice / 1550;
        }
        const pricePerUnit = activeProduct.price || 0;
        const price = calculatedPrice * pricePerUnit;

        setCalculatedPrice(price);
      }
      else {
        if (width && height && !activeProduct) {
          checkForToast();
        }
        setCalculatedPrice(0);
      }
    }

  };

  useEffect(() => {
    calculatePrice(width, height);
  }, [width, height, activeProduct, selectedUnit]);


  const getPlaceholder = (dimension: string) => {
    const unitPlaceholders: Record<string, string> = {
      mm: `Enter Your ${dimension} (mm)`,
      cm: `Enter Your ${dimension} (cm)`,
      inches: `Enter Your ${dimension} (inches)`,
    };
    return unitPlaceholders[selectedUnit] || `Enter Your ${dimension}`;
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (product: EstimatorProductTypes) => {
    setActiveProduct(product);
    setIsOpen(false);
  };
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <>
      <Breadcrumb title='Estimator' />
      <Container className="md:pt-10 pb-10 lg:pb-20">
        <div className="grid grid-cols-12 gap-4 lg:gap-10 xl:gap-14 md:px-2 xl:px-0">
          <div className="col-span-12 md:col-span-6 mt-2 sm:mt-0">
            <div className='w-full h-[350px] xs:h-[600px] md:h-[450px] xl:h-[620px]'>
              <Image
                src={selectedProduct?.posterImage?.imageUrl || sortedProducts[0].posterImage.imageUrl}
                fill
                alt={selectedProduct?.title || 'Product Image'}
                className="!relative"
                quality={100}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3 col-span-12 md:col-span-6 px-2 md:px-0">
            <div className='max-w-[520px] pb-2'>
              <h1 className="text-[24px] sm:text-[30px] lg:text-[36px] xl:text-[40px] leading-normal font-robotoSerif font-bold capitalize text-primary">
                Get Your Estimate in 3 Simple Steps
              </h1>

            </div>
            <div className="space-y-3 border-t pt-6 max-w-[520px]">
              <div className="relative w-full">
                <div
                  className="flex justify-between items-center border border-secondary rounded-md px-3 py-2 bg-white cursor-pointer font-roboto"
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-5 flex justify-center items-center bg-secondary text-14 text-gray-600 rounded-full">
                      1
                    </span>
                    <span className="text-gray-600 text-sm">
                      {activeProduct?.title || 'Select the Product'}
                    </span>
                  </div>
                  <FaChevronDown className="text-gray-400" />
                </div>

                {isOpen && (
                  <ul className="w-full mt-2 bg-white border rounded-lg shadow z-10 p-3">
                    {sortedProducts.map((product, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(product)}
                        className={`text-sm text-gray-600 py-2 rounded cursor-pointer transition
                ${activeProduct?.title === product.title
                            ? 'bg-secondary px-3'
                            : 'hover:bg-gray-100'
                          }`}
                      >
                        {product.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className="flex justify-between items-center border border-secondary rounded-md px-3 py-2 cursor-pointer bg-white font-roboto"
               onClick={handleFocusInput}>
                <div className="flex items-center gap-2">
                  <span className="size-5 flex justify-center items-center bg-secondary text-14 text-gray-600 rounded-full">
                    2
                  </span>
                  <span className="text-gray-600 text-sm">
                    Enter Size
                  </span>
                </div>
              </div>
              <UnitSelector
                selectedUnit={selectedUnit}
                setSelectedUnit={setSelectedUnit}
              />
              <div className="grid grid-cols-2 max-sm:w-full gap-2">
                <div className="w-full">
                  <Input
                    type="number"
                    id="width"
                    className="w-full h-11 2xl:h-12 !border text-xs xsm:text-sm px-2 xs:px-4 rounded-lg"
                    placeholder={getPlaceholder('Width')}
                    value={width || ''}
                    onChange={handleWidthChange}
                    ref={inputRef}
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="number"
                    id="height"
                    className="w-full h-11 2xl:h-12 !border text-xs xsm:text-sm px-2 xs:px-4 rounded-lg"
                    placeholder={getPlaceholder('Height')}
                    value={height || ''}
                    onChange={handleHeightChange}
                  />
                </div>
              </div>
              <div
                className="flex justify-between items-center border border-secondary rounded-md px-3 py-2 bg-white font-roboto"
              >
                <div className="flex items-center gap-2">
                  <span className="size-5 flex justify-center items-center bg-secondary text-14 text-gray-600 rounded-full">
                    3
                  </span>
                  <span className="text-gray-600 text-sm">
                    Your Estimate Below
                  </span>
                </div>
              </div>
              <div className="border border-dashed border-secondary bg-[#F1B42F1A] rounded-lg p-4 sm:p-6">
                <p className="text-sm sm:text-lg font-roboto opacity-80">The estimated price from our calculation will be:</p>
                <div className="text-lg sm:text-2xl font-bold text-wrap flex items-center gap-1 text-secondary">
                  <svg viewBox="0 0 531 462" className='fill-secondary size-4 sm:size-5' xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M48.4 1.10004C48.4 1.76669 49.6 3.76669 51.2 5.63336C55.4667 11.2334 62.5333 27.6334 64.9333 37.9001C69.0667 55.5001 69.7333 66.0334 69.7333 113.5V161.233H44.8C17.3333 161.233 14 160.433 4.53333 152.433L0 148.567L0.8 160.567C2 179.367 9.06667 193.5 21.3333 201.233C30.2667 206.967 34.9333 207.9 53.4667 207.9H69.7333V230.833V253.9L44.5333 253.633C17.0667 253.367 14.2667 252.7 4.53333 244.567L0.4 240.967V249.5C0.4 266.433 6.8 281.633 18 291.233C26.2667 298.167 32.9333 299.9 52.6667 299.9H69.7333V349.5C69.7333 403.633 68.6667 415.233 62.2667 434.433C58.5333 445.5 55.0667 451.9 49.8667 457.633L46.4 461.367L149.067 460.833C258.4 460.3 260 460.167 293.733 453.233C301.467 451.633 314.667 447.9 323.067 444.967C389.867 421.633 432.133 377.233 451.2 310.167L454.133 299.9H480.933C495.733 299.9 510 300.567 512.667 301.233C515.467 302.033 520.4 304.833 523.867 307.367L530 312.167L529.467 298.967C529.067 287.633 528.4 284.7 525.067 278.167C520.533 269.1 512.133 260.833 503.333 256.833C498 254.433 494.4 253.9 479.2 253.633L461.333 253.5L461.2 230.7L461.067 207.9H485.733C508.8 207.9 510.8 208.167 517.067 211.1C520.8 212.833 524.933 215.5 526.267 217.1C527.733 218.567 529.2 219.9 529.733 219.9C530.533 219.9 530.4 211.233 529.2 199.9C527.867 186.3 517.867 172.167 505.067 165.5C498.8 162.167 497.067 161.9 476.267 161.5L454 160.967L448.667 144.567C438.267 112.567 423.6 88.4334 401.067 65.7667C361.333 25.9001 309.067 5.50003 235.733 1.10004C210.4 -0.366638 48.4 -0.366638 48.4 1.10004ZM240 25.3667C300.4 32.0334 341.6 62.0334 362.133 113.9C366.533 125.1 375.067 154.967 375.067 159.367C375.067 160.967 358.533 161.233 257.067 161.233H139.067V92.5667V23.9001H183.067C207.333 23.9001 232.933 24.5667 240 25.3667ZM380.4 230.567C380.4 247.767 380 253.233 378.8 253.233C377.867 253.233 323.467 253.367 258 253.633L139.067 253.9V230.833V207.9H259.733H380.4V230.567ZM375.067 301.367C375.067 304.433 366.8 334.967 364.267 341.633C340.933 400.833 298.267 430.567 227.067 437.1C218.667 437.9 195.333 438.567 175.467 438.567H139.067V369.233V299.9H257.067C339.2 299.9 375.067 300.3 375.067 301.367Z" />
                  </svg>
                  {activeProduct ? (calculatedPrice ? calculatedPrice.toFixed(2) : '0') : '0'}
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2 lg:gap-4'>
                <Button
                  variant={'default'}
                  onClick={() => route.push('/request-appointment/')}
                  className="w-full h-12 bg-secondary text-primary font-semibold font-roboto text-base md:text-sm lg:text-base hover:opacity-65"
                >
                  Book A Free Visit
                </Button>
                <Link
                  href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="w-full h-12 bg-[#44C654] font-semibold text-base md:text-sm lg:text-base flex items-center gap-2 font-roboto justify-center text-white rounded-lg">
                  <Image width={100} height={100} className='size-5' src='/assets/images/whatsapp.png' alt='whatsapp' />
                  Send on Whatsapp
                </Link>
              </div>
            </div>

            {/* 
        {productError ? <p className='mt-0 p-0 text-15' style={{marginTop: "0px", marginBottom: "0px"}}>{productError}</p> : null} */}
          </div>
        </div>
      </Container>
      <InfoTabs tabData={tabData} isHome />
      <Testimonial />
    </>
  );
};

export default EstimatorPage;
