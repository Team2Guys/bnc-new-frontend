"use client"

import Breadcrumb from 'components/Res-usable/breadcrumb'
import { thankYouCards } from 'data/data'
import Link from 'next/link'
import React from 'react'
import { FaCalendarCheck, FaMapMarkedAlt, FaWhatsapp } from 'react-icons/fa'
const iconMap = {
    calendar: <FaCalendarCheck className="mr-2 text-xl" />,
    map: <FaMapMarkedAlt className="mr-2 text-xl" />,
    message: <FaWhatsapp className="mr-2 text-xl" />,
};
const ThankYou = () => {
    return (
        <>
            <Breadcrumb title="Thank You" />
            <div className="px-4 py-10 max-w-7xl mx-auto text-center ">
                <h1 className="sm:text-5xl text-3xl font-extrabold mb-4">THANK YOU</h1>
                <p className="sm:text-3xl text-2xl mb-2">
                    One of our sales team will be in touch shortly to confirm the details. If you’re in a hurry, drop us a message on{' '}
                    <Link href="https://wa.me/0544945339" className="font-bold underline ml-1 text-secondary">054 494 5339</Link> or call <Link href="tel:042522025" className=" font-bold  underline ml-1 text-secondary">04 252 2025</Link>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6 bg-white border shadow-xl mt-10">
                    {thankYouCards.map((card, index) => (
                        <div key={index} className="text-center sm:p-12 p-6 ">
                            <h2 className="font-bold text-lg mb-2">{card.title}</h2>
                            <p className="text-base mt-4 sm:h-24 sm:pb-0 pb-4">{card.description}</p>
                            <div className='flex items-center justify-center'>
                                <Link
                                    href={card.buttonLink}
                                    target="_blank"
                                    className=" flex tems-center justify-center py-2 px-2 xl:py-3 xl:px-6 font-roboto font-semibold rounded-md text-[16px] text-secondary border-2 border-secondary hover:bg-secondary hover:text-primary"
                                >
                                    {iconMap[card.iconKey]} {card.buttonLabel}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ThankYou
