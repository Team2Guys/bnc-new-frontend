'use client';

import Link from 'next/link';

const ctaCards = [
    {
        title: "Book a free consultation",
        description: "Our experts will come over at your convenience and discuss colours, styles, and measurements.",
        buttonText: "Book An Appointment",
        buttonLink: "/request-appointment/",
    },
    {
        title: "Visit our showroom",
        description: "Visit us in person next time you're in the area, and see for yourself what we've got to offer.",
        buttonText: "Find Our Location Map",
        buttonLink: "https://www.google.com/maps/place/Two+Guys+-+Blinds+%26+Curtains+Dubai/@25.1177196,55.2331055,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!16s%2Fg%2F11bbt9c0yz?entry=tts&g_ep=EgoyMDI0MDkxOC4xKgBIAVAD",
    },
    {
        title: "Talk To Our Specialist",
        description: "Do you want to talk with the Blinds & Curtains Team? Our team will get back to you ASAP.",
        buttonText: "Talk To Specialist",
        buttonLink: "/contact-us/",
    },
];

const CallToActionSection = () => {
    return (
        <>
            <h2 className="text-2xl lg:text-3xl pb-2 text-primary font-bold font-futura text-center mb-4 w-fit mx-auto">
                Window Solutions at Your Fingertips!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ctaCards.map((card, index) => (
                    <div
                        key={index}
                        className={`bg-primary text-white p-6 flex flex-col items-center text-center shadow-md ${index === 2 ? 'col-span-1 sm:col-span-2 lg:col-span-1' : ''}`}
                    >
                        <h3 className="text-xl font-futura font-semibold mb-2">
                            {card.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-5 font-roboto mb-4">
                            {card.description}
                        </p>
                        <Link
                            href={card.buttonLink}
                            target={card.buttonLink.startsWith('http') ? '_blank' : '_self'}
                            rel={card.buttonLink.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="bg-secondary text-black font-semibold px-5 py-2 xs:py-3 rounded hover:bg-yellow-300 transition-colors"
                        >
                            {card.buttonText}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CallToActionSection;
