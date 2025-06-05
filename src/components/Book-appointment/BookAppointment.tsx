'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import showToast from 'components/Toaster/Toaster';
import { AppointmentProps, ContactMethods, ProductOptions } from 'types/types';
import { Radio, RadioChangeEvent } from 'antd';
import HorizontalDatePicker from './HorizontalDatePicker';
import TimeSlotPicker from './TimeSlotPicker';
import { IoMdCheckmark } from 'react-icons/io';
import Image from 'next/image';
import Loader from 'components/Loader/Loader';
interface IAppointments {
  name: string;
  phone_number: string;
  area: string;
  email: string;
  whatsapp_number: string;
  windows: string;
  prefered_Date: Date;
  prefered_contact_method: string[];
  how_user_find_us: string;
  user_query: string;
  product_type: string[];
  other: string;
  prefered_time: string;
}

const BookAppointment: React.FC<AppointmentProps> = ({
  singlePage,
  className,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Dubai');

  const PostAppointments = async (appointmentData: IAppointments) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/AddAppointment`,
        appointmentData,
      );
      return response.data;
    } catch (error: any) {
      showToast('error', error.message || JSON.stringify(error));
    }
  };

  const getInitialSelectedOptions = (): ProductOptions => {
    if (singlePage) {
      return {
        curtains: false,
        blinds: false,
        roller_blinds: false,
        wooden_blinds: false,
        other_blinds: false,
        shutters: false,
        others: false,
      };
    } else {
      return {
        shutters: false,
        curtains: false,
        blinds: false,
      };
    }
  };

  const [selectedOptions, setSelectedOptions] = useState<ProductOptions>(
    getInitialSelectedOptions(),
  );
  const initialContactMethods = {
    email: false,
    telephone: false,
    whatsapp: false,
  };
  const [contactMethods, setContactMethods] = useState<ContactMethods>(initialContactMethods);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const formInitialValues = {
    name: '',
    phone_number: '',
    area: '',
    email: '',
    whatsapp_number: '',
    windows: '',
    prefered_Date: new Date(),
    prefered_contact_method: contactMethods,
    how_user_find_us: '',
    user_query: '',
    productoption: selectedOptions,
    other: '',
    prefered_time: '08:30 - 12:00 PM',
  };

  const [formData, setFormData] = useState(formInitialValues);
  const [errors, setErrors] = useState({
    name: '',
    phone_number: '',
    email: '',
    windows: '',
    area: '',
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedCity(e.target.value)
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      phone_number: '',
      email: '',
      windows: '',
      area: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = 'Name cannot contain numbers.';
      isValid = false;
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }

    if (!formData.windows.trim()) {
      newErrors.windows = 'Select Windows is required.';
      isValid = false;
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Address  is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const {
          productoption,
          prefered_contact_method,
          prefered_time,
          ...withoutproductoption
        } = formData;
        console.log(
          productoption,
          prefered_contact_method,
          prefered_time,
          withoutproductoption,
        );
        let productTypeArray: any = Object.keys(formData.productoption)
          .map((item) => {
            const key = item as keyof ProductOptions;
            if (formData.productoption[key]) return item;
          })
          .filter((item) => item !== undefined);

        let prefered_contact_method_list: any = Object.keys(
          formData.prefered_contact_method,
        )
          .map((item) => {
            const key = item as keyof ContactMethods;
            if (formData.prefered_contact_method[key]) return item;
          })
          .filter((item) => item !== undefined);

        const response = await PostAppointments({
          ...withoutproductoption,
          prefered_time,
          prefered_contact_method: prefered_contact_method_list,
          product_type: productTypeArray,
          area: formData.area + ' ' + selectedCity
        });
        console.log('response:', response);
        setFormData({
          ...formInitialValues,
          how_user_find_us: '',

        });
        setTimeout(() => setFormData(formInitialValues), 0);
        setSelectedOptions(getInitialSelectedOptions());
        setContactMethods(initialContactMethods)
        setSuccessMessage('Form Submitted Successfully🎉');
      } catch (error) {
        toast.error('Failed to submit the appointment. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const referralOptions = [
    { value: 'google', label: 'Google' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'Friends', label: 'Friends' },
    { value: 'Returning Customers', label: 'Returning Customers' },
    { value: 'Radio', label: 'Radio' },
    { value: 'Others', label: 'Others' },
  ];

  const cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];


  return (
    <div
      className={`bg-white  text-left text-black ${className} ${singlePage ? 'w-full rounded-lg sm:px-3 sm:py-4' : 'xl:w-6/12 2xl:w-5/12 py-4 bg-white drop-shadow-md rounded-xl  mt-5'}`}
    >
      {!singlePage && (
        <h3 className="font-bold text-lg text-center tracking-[5px] uppercase">
          Book a free appointment
        </h3>
      )}
      <form
        onSubmit={handleSubmit}
        className={` bg-white rounded-md ${singlePage ? 'w-full  px-0 py-4 sm:p-4 ' : ' px-4 py-2'}`}
      >
        <div>
          <label className="font-bold mb-2 block font-robotoSerif text-xl sm:text-2xl">City</label>
          <Radio.Group
            onChange={handleRadioChange}
            value={selectedCity}
            className="flex sm:gap-12 justify-between sm:justify-start custom-radio"
          >
            {cities.map((city) => (
              <Radio key={city} value={city} className="text-xs xsm:text-sm sm:text-xl font-medium">
                {city}
              </Radio>
            ))}
          </Radio.Group>
       {  selectedCity !== "Dubai" &&  
       <p className='text-red-500 font-medium font-roboto text-sm sm:text-xl py-4 sm:px-8'>Services available with a minimum order of 8 windows.</p>}
        </div>
        <div className='pt-4 sm:pt-8'>
          <HorizontalDatePicker
            onChange={(date: Date) =>
              setFormData({ ...formData, prefered_Date: date })
            }
          />
        </div>
        <div className='py-8'>
          <h3 className='text-xl sm:text-2xl font-robotoSerif font-bold mb-4 text-primary'>Time Slot For The Visit</h3>
          <TimeSlotPicker
            value={formData.prefered_time}
            onChange={(val: string) => setFormData({ ...formData, prefered_time: val })}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <label htmlFor="name" className="block text-sm sm:text-xl font-roboto font-medium">
              Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Full Name"
              id="name"
              className={`mt-1 h-14 px-4 border-2 border-gray-300 w-full font-medium rounded-xl text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm sm:text-xl font-roboto font-medium">
              E-Mail *
            </label>
            <input
              type="email"
              placeholder="Enter Your E-Mail"
              name="email"
              id="email"
              className={`mt-1 h-14 px-4 border-2 border-gray-300 w-full font-medium rounded-xl text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="Address " className="block text-sm sm:text-xl font-roboto font-medium">
              Address *
            </label>
            <input
              type="text"
              name="area"
              placeholder="Enter Your Address"
              id="area"
              className={`mt-1 h-14 px-4 border-2 border-gray-300 w-full font-medium rounded-xl text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
              value={formData.area}
              onChange={handleChange}
            />

            {errors.area && (
              <p className="text-red-500 text-xs">{errors.area}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm sm:text-xl font-roboto font-medium"
            >
              Phone Number *
            </label>

            <PhoneInput
              className="mt-1 h-14 px-4 border-2 border-gray-300 w-full font-medium rounded-xl text-sm sm:text-base outline-none"
              international
              aria-label="Phone Number"
              defaultCountry="AE"
              limitMaxLength
              countryCallingCodeEditable={false}
              value={formData.phone_number}
              onChange={(phone: any) =>
                setFormData({ ...formData, phone_number: phone })
              }
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs">{errors.phone_number}</p>
            )}
            <div
              className="flex items-center gap-2 cursor-pointer mt-3"
              onClick={() => setSameAsPhone(!sameAsPhone)}
            >
              <div
                className={`size-4 sm:size-5 flex items-center justify-center rounded-full border 
            ${sameAsPhone ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-400 text-gray-400'}`}
              >
                {sameAsPhone && <IoMdCheckmark className='text-16 sm:text-18' />}
              </div>
              <span className="text-sm sm:text-base font-medium">I have the same WhatsApp number</span>
              <Image width={100} height={100} className='size-4 sm:size-5' src='/assets/images/whatsapp.png' alt='whatsapp' />
            </div>
          </div>
          {!sameAsPhone && (
            <div className="relative overflow-hidden">
              <label
                htmlFor="whatsapp_number"
                className="block text-sm sm:text-xl font-roboto font-medium"
              >
                WhatsApp No. If Different
              </label>
              <PhoneInput
                className="mt-1 h-14 px-4 border-2 border-gray-300 w-full font-medium rounded-xl text-sm sm:text-base"
                international

                defaultCountry="AE"
                limitMaxLength
                countryCallingCodeEditable={false}
                value={formData.whatsapp_number}
                onChange={(phone: any) =>
                  setFormData({ ...formData, whatsapp_number: phone })
                }
              />
            </div>
          )}
          <div>
            <label htmlFor="windows " className="block text-sm sm:text-xl font-roboto font-medium">
              How Many Windows *
            </label>
            <input
              type="number"
              placeholder="Enter No of Windows"
              name="windows"
              id="windows"
              min={0}
              className={`mt-1 h-14 px-4 border-2 border-gray-300 w-full font-medium rounded-xl text-sm sm:text-base ${errors.windows ? 'border-red-500' : ''}`}
              value={formData.windows}
              onChange={handleChange}
            />

            {errors.windows && (
              <p className="text-red-500 text-xs">{errors.windows}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="how_user_find_us"
              className="block text-sm sm:text-xl font-roboto font-medium"
            >
              How Did You Hear About Us?
            </label>
            <Select
              instanceId="window-options-select"
              isSearchable={false}
              options={referralOptions}
              onChange={(option: any) =>
                handleSelectChange('how_user_find_us', option?.value || null)
              }
              value={
                referralOptions.find(
                  (option) => option.value === formData.how_user_find_us,
                ) || null
              }
              className="mt-1 w-full text-sm sm:text-xl font-medium custom-select"
            />
          </div>
        </div>

        <div className="text-center sm:text-start mt-8">
          <button
            type="submit"
            id='appointment'
            className="w-fit bg-secondary py-3 px-5 sm:px-8 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? <Loader color="#fff" /> : 'Submit Request'}
          </button>
          {successMessage && (
            <p className=" text-lg mt-2">{successMessage}


            </p>
          )}

        </div>



      </form>
    </div>
  );
};

export default BookAppointment;
