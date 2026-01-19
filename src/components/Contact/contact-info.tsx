import GoogleMap from 'components/googlemap'
import Link from 'next/link'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { PiPhoneCallFill } from "react-icons/pi";


const ContactInfo = () => {
    return (
        <div className="bg-black rounded-lg p-4 xs:p-6 text-white space-y-4 order-2 md:order-1">
            <h2 className="font-futura font-medium text-2xl">
                Tell Us More
            </h2>
            <p className="text-base md:text-lg">
                The most trusted window treatment company in Dubai with a decade
                of experience and 100s of positive reviews.
            </p>
            <div>
                <p className="text-2xl font-medium">Contact Information:</p>
                <div className="flex flex-col gap-4 lg:mt-6 mt-4">
                    <div className="flex gap-2">
                        <IoLocationSharp className="text-white text-2xl w-7" />
                        <Link href="https://maps.app.goo.gl/vNTgPQs3TQnwipvs5" target='_blank' className="max-w-80 w-full text-xl font-roboto hover:underline">
                            Unit 43 22nd St Al Quoz Industrial Area 4 – Dubai UAE
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <PiPhoneCallFill className="text-white text-2xl w-7" />
                        <Link
                            target="_blank"
                            href={'tel:042522025'}
                            className="hover:underline text-xl font-roboto"
                        >
                            04 252 2025
                        </Link>
                    </div>
                    <div className="flex gap-2">
                        <FaCalendarAlt className="text-white text-2xl w-7" />
                        <p className='text-xl font-roboto'>8.30am - 11.00pm 7 days a week</p>
                    </div>
                    <div className="flex gap-2 items-center md:text-lg">
                        <MdEmail className="text-white text-2xl w-7" />
                        <Link
                            target="_blank"
                            href="mailto:sales@blindsandcurtains.ae"
                            className="hover:underline text-xl font-roboto"
                        >
                            sales@blindsandcurtains.ae
                        </Link>
                    </div>
                </div>
                <div className="mt-5">
                    <GoogleMap />
                </div>
            </div>
        </div>
    )
}

export default ContactInfo