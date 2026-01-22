"use client";
import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "components/ui/Input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";
import { ContactSchema, initialContactValues } from "data/new-data";
import { showAlert } from "utils/Alert";
import axios from "axios";
import { IContactForm } from "types/general";

const ContactForm = ({textareaClass}:{textareaClass?:string}) => {
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [loading, setloading] = useState(false)

const ContactusPost = async (values:IContactForm) => {
  try {
    setloading(true)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/contact-us`,
      values,
    );
    return response.data;
  } catch (error: unknown) {
    showAlert({
    title: "Error",
    text: typeof error === "object" && error !== null && "message" in error
      ? (error as { message?: string }).message
      : JSON.stringify(error),
    icon: "error",
  });
  } finally{
    setloading(false)
  }
};
  return (
    <Formik
      initialValues={initialContactValues}
      validationSchema={ContactSchema}
      onSubmit={async(values, {resetForm}) => {
      try {
        await ContactusPost(values)
        showAlert({
          title: "Your message has been sent successfully!",
          icon: "success",
        });
        resetForm()
      } catch (error) {
        console.log(error, "error") 
      }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 md:order-2">
          <Input label="Full Name*" name="fullName" placeholder="Tap to write"/>
          <Input label="Email*" name="email" type="email" placeholder="Tap to write" />
          <div>
            <label htmlFor="phone" className="primary-label">Phone*
            </label>
            <PhoneInput
              className="primary-input"
              international
              defaultCountry="AE"
              countryCallingCodeEditable={false}
              value={values.phone}
              onChange={(phone) => {
                setFieldValue("phone", phone);
                if (sameAsPhone) {
                  setFieldValue("whatsapp", phone || "");
                }
              }}
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1"
            />
             <div className="flex items-center gap-2 cursor-pointer mt-3 w-fit" onClick={() => {setSameAsPhone(!sameAsPhone);
                if (!sameAsPhone) { setFieldValue("whatsapp", values.phone || "");}
              }}
            >
              <div className={`size-4 sm:size-5 flex items-center justify-center rounded-full border ${sameAsPhone? "bg-primary text-white": "border-primary text-priborder-primary"}`}>
                {sameAsPhone && (<IoMdCheckmark className="text-base sm:text-lg" />)}
              </div>
              <span className="text-sm font-roboto text-primary font-medium">
                I have the same WhatsApp number
              </span>
              <Image width={100} height={100} className="size-4 sm:size-5" src="/assets/images/whatsapp.webp" alt="whatsapp"/>
            </div>
          </div>
          <div>
            <label htmlFor="whatsapp" className="primary-label">
              WhatsApp
            </label>
            <PhoneInput
              className="primary-input"
              international
              defaultCountry="AE"
              countryCallingCodeEditable={false}
              value={values.whatsapp}
              onChange={(phone) => setFieldValue("whatsapp", phone)}
              disabled={sameAsPhone}
            />
          </div>
          <div className="sm:col-span-2">
            <Input label="Address*" name="address" placeholder="Tap to write" />
          </div>
          <div className="sm:col-span-2">
            <Input label="Message" name="message" textareaClass={textareaClass} textarea placeholder="Tap to write" />
          </div>
          <div className="sm:col-span-2 mx-auto">
            <button
              type="submit"
              disabled={loading}
              className="px-5 xs:px-6 py-2 xs:py-4 bg-secondary text-primary rounded-lg font-roboto font-semibold hover:opacity-80 transition"
            >
            {loading ? "Submitting..." : "Submit Message"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
