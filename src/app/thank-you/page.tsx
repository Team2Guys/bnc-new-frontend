import Breadcrumb from 'components/Res-usable/breadcrumb'
import { thankYouCards } from 'data/data'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { FaCalendarCheck, FaMapMarkedAlt, FaWhatsapp } from 'react-icons/fa'
const iconMap = {
    calendar: <FaCalendarCheck className="mr-2 text-xl" />,
    map: <FaMapMarkedAlt className="mr-2 text-xl" />,
    message: <FaWhatsapp className="mr-2 text-xl" />,
};
const ThankYou = () => {
    return (
        <Fragment>
            <Breadcrumb title="Thank You" />
            <div className="px-4 py-10 max-w-7xl mx-auto text-center ">
                <h1 className="sm:text-5xl text-3xl font-extrabold mb-4">THANK YOU</h1>
                <p className="sm:text-3xl text-2xl text-gray-700 mb-2">
                    Thank you for contacting us. One of our sales team will contact you shortly. If you’re in a hurry, feel free to call us on
                    <Link href="tel:043933242" className=" font-bold  underline ml-1">(04) 252 2025</Link>.
                </p>
                <h2 className="text-2xl font-bold mt-10 mb-6">NEXT STEPS TO CREATING YOUR DREAM HOUSE</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-6 bg-white border shadow-xl">
                    {thankYouCards.map((card, index) => (
                        <div key={index} className="text-center sm:p-12 p-6 ">
                            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                            <p className="text-base text-gray-600 mt-4 sm:h-24 sm:pb-0 pb-4">{card.description}</p>
                            <div className='flex items-center justify-center'>
                                <Link
                                    href={card.buttonLink}
                                    target="_blank"
                                    className="bg-primary text-white hover:bg-secondary p-3 flex items-center justify-center"
                                >
                                    {iconMap[card.iconKey]} {card.buttonLabel}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default ThankYou
