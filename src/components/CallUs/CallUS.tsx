"use client"
import Container from 'components/Res-usable/Container/Container'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiPhoneCall } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import showToast from 'components/Toaster/Toaster';
import Link from 'next/link';

const CallUS = () => {
   const [loading, setloading] = useState(false)
   const initialValues = {
      name: '',
      email: '',
      phone: '',
   };

   type EmailPayload = {
      name: string;
      email: string;
      phone: string;
   };
   const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().required('Required'),
   });

   const handleSubmit = async (values: EmailPayload, { resetForm }: any) => {
      try {
         setloading(true)
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/callback`

            , {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(values),
            });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send email');
         }

         await response.json();

         resetForm()
         showToast("success", "Form has been Submitted !")
      } catch (error) {
         showToast("error", 'Error sending email');
      } finally {
         setloading(false)
      }
   };

   return (
      <Container className='xs:py-5 lg:!pb-10 xl:mt-7 '>
         <div className='bg-primary grid grid-cols-1 sm:grid-cols-9 sm:px-0 px-3 rounded-md'>
            <div className='relative sm:col-span-5 md:col-span-4 sm:h-[320px] xsm:px-8 sm:px-0'>
               <Image src='/assets/images/callus/callus.png' fill className='!relative hidden sm:block' alt='call us image' />
               <div className='sm:absolute top-0 w-full h-full pt-8 sm:py-6 lg:py-8 sm:ps-8 sm:pe-14 2xl:pe-20 flex flex-col justify-center gap-4 items-center sm:items-start sm:justify-between'>
                  <h2 className='text-center sm:text-start text-primary-foreground text-24 sm:text-28 xl:text-[40px] font-semibold font-robotoSerif leading-tight lg:max-w-md'>Ready to Decide? Let&apos;s Set It Up Instantly!</h2>
                  <Link href="tel:042522025"  className='flex gap-4 items-center'>
                     <span>
                        <FiPhoneCall className='size-12 xl:size-16 text-primary-foreground' />
                     </span>
                     <div className='flex flex-col text-primary-foreground'>
                        <p className='text-md xl:text-xl font-medium font-robotoSerif'>Call Us Any Time</p>
                        <p className='text-lg xl:text-2xl font-bold font-roboto'>04 252 2025</p>
                     </div>
                  </Link>
               </div>
            </div>
            <div className='sm:col-span-4 md:col-span-5 flex items-center xsm:px-8 py-8 sm:pe-6 lg:pe-8 lg:ps-0'>
               <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
                     {/* Name */}
                     <div>
                        <Field
                           name="name"
                           placeholder="Name"
                           className="w-full text-10 xsm:text-sm md:text-base rounded-full px-4 md:px-6 py-3 border-2 text-primary-foreground font-medium font-robotoSerif border-primary-foreground bg-transparent placeholder-primary-foreground outline-none"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                     </div>

                     {/* Email */}
                     <div>
                        <Field
                           name="email"
                           placeholder="Email"
                           type="email"
                           className="w-full text-10 xsm:text-sm md:text-base rounded-full px-4 md:px-6 py-3 border-2 text-primary-foreground font-medium font-robotoSerif border-primary-foreground bg-transparent placeholder-primary-foreground outline-none"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                     </div>

                     {/* Phone Number */}
                     <div className="col-span-1">
                        <Field
                           name="phone"
                           placeholder="Phone Number"
                           className="w-full text-10 xsm:text-sm md:text-base rounded-full px-4 md:px-6 py-3 border-2 text-primary-foreground font-medium font-robotoSerif border-primary-foreground bg-transparent placeholder-primary-foreground outline-none"
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
                     </div>

                     {/* Submit Button */}
                     <div className="col-span-1">
                        <button
                           type="submit"
                           disabled={loading}
                           className="w-full text-10 xsm:text-sm md:text-base rounded-full px-4 md:px-6 py-3 bg-primary-foreground text-primary font-semibold font-robotoSerif hover:bg-secondary duration-200 transition"
                        >
                           {loading ? "Submitting..." : "Submit Now"}
                        </button>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </Container>
   )
}

export default CallUS