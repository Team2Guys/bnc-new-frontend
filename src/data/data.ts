
import {
  Email,
  IColorData,
  ITopHeroLink,
  PhoneNumber,
  SupportItem,
  Tproductdata,
  TProductGuarantees,
} from 'types/interfaces';
import * as Yup from 'yup';
import { Category, FormValues } from 'types/interfaces';
import { AboutUsBlock, ISUBCATEGORY, MilestoneStepsData, ReviewData, ThankYouCardProps, WhyChooseItem } from 'types/types';
/* eslint-disable no-useless-escape */
export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};




export const footerInfo = ' ©Blinds & Curtains 2025 All rights reserved';

export const phoneNumberInfo: PhoneNumber = {
  number: '04 252 2025',
};
export const WhatsAppInfo: PhoneNumber = {
  number: '+971 54 494 5339',
};
export const EmailInfo: Email = {
  email: 'sales@blindsandcurtains.ae',
};

export const OurClientImage = [
  { src: '/assets/images/ourclient/new/holiday.webp', alt: 'mercedes-logo' },
  { src: '/assets/images/ourclient/new/huqqabaz.webp', alt: 'warner-logo' },
  { src: '/assets/images/ourclient/new/address.webp', alt: 'address-Logo' },
  { src: '/assets/images/ourclient/new/Khansaheb.webp', alt: 'HUQQBAZ-Logo' },
  { src: '/assets/images/ourclient/new/maison.webp', alt: 'Khansaheb-Logo' },
  { src: '/assets/images/ourclient/new/mercedes.webp', alt: 'Khansaheb-Logo' },
  { src: '/assets/images/ourclient/new/roundedlogo.webp', alt: 'Khansaheb-Logo' },
  { src: '/assets/images/ourclient/new/waner.webp', alt: 'Khansaheb-Logo' },
];


export const supportItems: SupportItem[] = [
  {
    title: 'Added Convenience',
    description:
      'A luxurious addition to your home that lets you set timers, create scenes, and makes you wonder why you didn’t switch your blinds and curtains sooner.',
  },
  {
    title: 'Compatible with all major smart homes systems',
    description:
      'Talk to our specialists today to find the best option for your blinds & curtains, whether it’s a remote, Alexa, Google Home, or Apple HomeKit.',
  },
  {
    title: 'Energy Efficient',
    description:
      'Live comfortably and save energy with blinds and curtains automation that helps keep your room warm in winter and cool in summer.',
  },
];



export const productData: Tproductdata = {
  title: 'PRODUCT GUARANTEES',
  sideImage: '/assets/images/product-guarantees/guarantee1.png',
  sideImage1: '/assets/images/product-guarantees/guarantee2.png',
  heading: 'BLINDS, CURTAINS & SHUTTERS PRODUCT GUARANTEES',
  content:
    'We at <a href="/"" style="text-decoration:underline">blindsandcurtains.ae</a> know our products will complement your home now and in the future. All our made-to-measure <a href="/made-to-measure-blinds/"" style="text-decoration:underline">blinds</a>, <a href="/made-to-measure-curtains/"" style="text-decoration:underline">curtains</a>, and <a href="/shutters-range/"" style="text-decoration:underline">shutters</a> come with a 10-year mechanical and labour warranty. We make sure all our products are of high quality, but if something goes wrong, our team will visit to assess the situation. With them, you can be sure your problem will be handled with care, whether with a quick fix or a replacement. We stand behind our work so that you can trust us.',
};


export const PGuarantees: TProductGuarantees[] = [
  {
    heading: 'What Our Guarantee Cover?',
    text: `When choosing blindsandcurtains.ae, you're buying beautiful window dressings and getting a customer service experience that is unmatched in Dubai. From <b class="text-black font-bold">free consultation and installation</b> to an after-sales care package, you can rest assured that you’ll be in good hands for the lifetime of your blinds, curtains or shutters. We understand how important fabric quality is to your blinds and curtains. That’s why we offer a <b class="text-black font-bold">3-year warranty</b> on all fabrics used in our products. From the track to the rod and every mechanism in between, every component of your blinds and curtains is durable. There's a <b class="text-black font-bold">10-year warranty on</b> all moving and static parts, so you're covered for the long term.If your custom window covering doesn’t perform as it should within <b class="text-black font-bold">10 years of installation</b>, we’ll fix it or give you a replacement of your choice. We do this so you'll always have a solution that works.`,
    image: '/assets/images/product-guarantees/guarantee3.png',
    imageAlign: 'left',
  },
  {
    heading: 'The Best Quality and Workmanship',
    text: "Great care and pride is attached to everything we do. As soon as they are installed, you can count on our support. This is our commitment to you.For over a decade, we’ve been helping homes across Dubai achieve stunning, functional window solutions. From transparent pricing to honest advice, we’ve built a reputation for reliability. Our <b class='text-black font-bold'>750+ 5-star reviews</b> speak to the trust our customers place in us.Call or email our support team, and we’ll guide you through the next steps. To fix the problem, our technicians will come to you when it's convenient for you. The <b class='text-black font-bold'>warranty</b> covers all labour costs and parts replacements. Moreover, we provide free uninstall/reinstall services within two years, protecting your peace of mind during renovations.",
    image: '/assets/images/product-guarantees/guarantee4.png',
    imageAlign: 'right',
  },
];

// export const AboutUsPara = {
//   id: 1,
//   subheading: 'About Us',
//   heading: ['Our Journey'],
//   paragraph: [
//     'Having spent 20 years in the UK retail industry, our Managing Partner, Shiraz, decided it was time for sunnier climes and moved to Dubai in 2014 with his family. The first office was a stunning waste of space on Sheikh Zayed Road, which gave Shiraz a fantastic view of Burj Khalifah, but chewed through his finances like water. School fees were duly paid and a move to a compact but cosy office in Port Saeed was home for the next 2 years.',
//     'Like a lot of business people that move to Dubai, the first 2 years were painfully hard to adjust, but with the drive and ambition to succeed, and with a helping hand from God, things started to turn and the seeds that were laid in 2014 started bearing fruit.',
//     'By 2017, we moved to our first actual showroom in Oud Metha. This is where things started to blow. Blinds and Curtains was now established as a firm favourite with hundreds of customers, most of whom would recommend us to their friends and families and also ended up being our return customers.',
//   ],
// };
// export const UsHistoryPara = {
//   id: 1,
//   paragraph: [
//     'This cycle ran successfully for many years but by 2021, with covid out the way, we figured it was time to push the barriers further. We had already introduced flooring, wallpaper and other items to our list of services offered, but the name felt restrictive. It was also around this time that lots of other companies turned up with copycat versions of our name (we guess blindsandcurtains.ae can’t really be expected to be exclusive) and it was quite confusing for our existing customers and quite a few were misled into buying from companies claiming to be us.',
//     'With this in mind, we decided on a brand and image change. After weeks of deliberating, Shiraz’s brother Valy, (who had since followed his brother and made the move to Dubai), came up with Two Guys. It was instant love for both brothers and that is the name we trade as today. But with <a href="/"" style="text-decoration: underline">www.blindsandcurtains.ae</a> having so many loyal customers, it would have been suicidal to wrap up and bury, so the brand is still alive and kicking today, albeit under the Two Guys Home Furnishings brand.',
//     'Today we employ over 60 staff, dedicated to giving our customers the level of satisfaction that the owners themselves would accept (Shiraz literally has OCD). Our staff are trained to give impartial advice, to NEVER be pushy in their sales pitch and to NEVER “up-sell” when not required. Once we have you as a customer, our goal is to keep you for life, so you will find that the service doesn’t end once the final payments have been made. Your journey is a part of our journey, and we believe we have a long way to go before reaching the end of the road.',
//   ],
// };


// export const OurHistoryData: OurHistory[] = [
//   {
//     id: 1,
//     year: '1999',
//     heading: 'Our UK fashion business wins Scottish Retailer of The Year Award',
//     discription:
//       'We started strong by winning the Scottish Retailer of the Year, setting a high standard from the outset. This early recognition defined our dedication to quality in the fashion industry.',
//   },
//   {
//     id: 2,
//     year: '2014',
//     heading:
//       '<a href="/"" style="text-decoration: underline">www.blindsandcurtains.ae</a> is born',
//     discription:
//       'We entered the online world with blindsandcurtains.ae to expand our reach and redefine the way we interact with our customers.',
//   },
//   {
//     id: 3,
//     year: '2016',
//     heading: 'Started manufacturing ourselves',
//     discription:
//       'Making our own products gave us greater control over quality and design, so we could better meet our customers needs.',
//   },

//   {
//     id: 4,
//     year: '2023 ',
//     heading: 'Re-branded to Two Guys & moved to Al Quoz',
//     discription:
//       'We moved to Al Quoz as part of our company rebranding, taking advantage of new opportunities to better serve our customers.',
//   },

// ];

export const aboutUsData: AboutUsBlock[] = [
  {
    shortHeading: 'A New Country – A New Chapter',
    shortHeadingSize: 'sm:text-[20px] text-20 font-Roboto font-medium text-[#3E3F42]',
    mainHeading: 'How It All Began — From the UK to Dubai',
    mainHeadingSize: 'sm:text-2xl text-24 text-[#3E3F42]',
    content: `It all started with Shiraz, our managing partner, who has spent over 20 years working within the retail business in the UK. Multiple achievements were collected over the years, including Scottish retailer of the year (twice), Top Customer Service Accolades on 5 occasions and even a place in the top 100 most influential fashion icons. In 2014, Shiraz moved to Dubai with his family, ready for a new start and bigger dreams. That move led to something special — the beginning of Blinds & Curtains Furnitures Trading. A brand built on years of experience and strong family values. Over the years, it was felt that customer’s would join the Blinds & Curtains family at the end of their renovation journeys. 1000’s fell in love with the company and brand ethics, but by the time they were ready to cover their windows, they had already purchased their furnitures and flooring options. This led to real deep thinking process that lasted for several months before it was decided to re-brand. And that was the birth of Two Guys Home Furnishings.`,
    contentSize: 'text-base text-start',   
    imageUrl: '/assets/images/about-us/aboutus.webp',
  },
  {
    shortHeading: 'Meet the People Behind the Promise',
    shortHeadingSize: 'sm:text-2xl text-20 text-[#3E3F42] font-roboto font-semibold',
    mainHeading: 'Real Experts. Real Advice. No Pushy Sales.',
    mainHeadingSize: 'sm:text-5xl text-2xl text[#3E3F42]',
    content: `At Two Guys, we don’t just hire staff — we have built a team of over 60 people who care about your home like it’s their own. Our team is friendly, honest, and never pushy. Shiraz, our founder, notices every little detail — even a crooked curtain! That’s how much we care. When you choose us, you’re part of the Two Guys family.`,
    contentSize: 'text-base text-start',
     imageUrl: '/assets/images/about-us/only-sources.webp',
  },
  {
    shortHeading: 'Our First Big Step in Dubai',
      shortHeadingSize: 'sm:text-2xl text-20 text-[#3E3F42] font-roboto font-semibold',
    mainHeading: 'From a Tiny Office to the First Two Guys Showroom',
    mainHeadingSize: 'sm:text-5xl text-2xl text[#3E3F42]',
    content: `We started in a small, cosy office in Port Saeed — no fancy setup, just hard work and learning the Dubai market.
In 2017, we opened our first showroom in Oud Metha as Blinds and Curtains and quickly became a trusted name.
With loyal customers and growing demand, we evolved into Two Guys Home Furnishings — built on service, trust, and homes that feel just right.`,
    contentSize: 'text-base text-start',
   
     imageUrl: '/assets/images/about-us/IMG_7006.webp',
  },
];

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('required'),
});
export const subcategoryValidationSchema = Yup.object({
  title: Yup.string().required('Required'),
  CategoryId: Yup.number().required('required'),
});


export const categoryInitialValues: Category = {
  name: '',
  description: '',
  Images_Alt_Text: '',
  Canonical_Tag: '',
  Meta_Title: '',
  Meta_description: '',
  headingchecks: [],
  faqs: [],
  productCustomUrl: "",
  categoryCustomUrl: ""
};


export const AddproductsinitialValues: FormValues = {
  name: '',
  description: '',
  salePrice: '',
  purchasePrice: '',
  discountPrice: '',
  starRating: '',
  reviews: '',
  colors: [],
  variantStockQuantities: [],
  totalStockQuantity: 0,
  modelDetails: [],
  spacification: [],
  sizes: [],
  category: '',
  price: 0,
  product_type: 'By Type',
  short_description: '',
  heading: '',
  Sub_Heading: '',
  Sub_Heading_description: '',
  Meta_Title: '',
  Meta_description: '',
  Canonical_Tag: '',
  Images_Alt_Text: '',
};



export const subcategoryInitialValues: ISUBCATEGORY = {
  title: '',
  description: '',
  CategoryId: undefined,
  Meta_Title: '',
  Meta_description: '',
  Canonical_Tag: '',
  Images_Alt_Text: '',
};

export const intitalValues = {
  fullname: '',
  email: '',
  password: '',
  canAddProduct: false,
  canEditProduct: false,
  canDeleteProduct: false,
  canAddCategory: false,
  canDeleteCategory: false,
  canEditCategory: false,
  canVeiwAdmins: false,
  canAddSubCategory: false,
  canDeleteSubCategory: false,
  canEditSubCategory: false,
  canViewAppointments: false,
  canVeiwTotalproducts: false,
  canVeiwTotalCategories: false,
  canVeiwTotalSubCategories: false,
  canAddBlog: false,
  canDeleteBlog: false,
  canEditBlog: false,
};


export const AddProductvalidationSchema = Yup.object().shape({

});

export const TopHeroLink: ITopHeroLink[] = [
  {
    matchingTitle: 'blinds',
    title: 'made-to-measure-blinds',
  },
  {
    matchingTitle: 'curtains',
    title: 'made-to-measure-curtains',
  },
  {
    matchingTitle: 'shutters',
    title: 'shutters-range',
  },
  {
    matchingTitle: 'shutters',
    title: 'shutters range',
  },
  {
    matchingTitle: 'blog',
    title: 'blog',
  },
];

export const BreakCrum_conent_pages = [
  {
    url: '/blinds/roller-blinds',
    content: 'Made to Measure Roller Blinds',
  },
];


export const colorData: IColorData[] = [
  {
    id: 1,
    name: 'Off White Shutters',
    color: 'FAF9EF',
    url: '/shutters-range/off-white-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off white tier on tier shutters.webp',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off white tracked window shutters.webp',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off White Shutters 1.jpg',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off White Shutters 2.jpg',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off White Shutters 3.jpg',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off White Shutters 4.jpg',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off White Shutters 5.jpg',
        altText: 'Off White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Off-white/Off White Shutters 6.jpg',
        altText: 'Off White Shutters',
      },
    ],
  },
  {
    id: 2,
    name: 'White Shutters',
    color: 'FFFFFF',
    url: '/shutters-range/white-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/White cafe style shutters.webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/White Cafe style Shutters (2).webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/Full height shutters (2).webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/Solid panel shutter for kitchen.webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/Cafe-Style-Shutters-2-.webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/BiFold Shutters (3).webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/Bay window shutters (2).webp',
        altText: 'White Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/White-shutters/Bay-Window-shutters.webp',
        altText: 'White Shutters',
      },
    ],
  },
  {
    id: 3,
    name: 'Black Shutters',
    color: '000000',
    url: '/shutters-range/black-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Black shutters (1).webp',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Black shutters (2).webp',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Black shutters (3).webp',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Black shutters (4).webp',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/BiFold Shutters (5).webp',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Cold color shutters (1).webp',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Black Shutters 3.jpg',
        altText: 'Black Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Black-shutters/Black Shutters 1-min.jpg',
        altText: 'Black Shutters',
      },
    ],
  },
  {
    id: 4,
    name: 'Grey Shutters',
    color: '808080',
    url: '/shutters-range/grey-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey color Bifold shutters.webp',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters (1).webp',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters (2).webp',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters (3).webp',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters 1.jpg',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters 2.jpg',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters 4.jpg',
        altText: 'Grey Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Grey-color/Grey Shutters 5.jpg',
        altText: 'Grey Shutters',
      },
    ],
  },
  {
    id: 5,
    name: 'Dark Wood Shutters',
    color: '815438',
    url: '/shutters-range/dark-wood-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Full-height-shutters-(-Dark-wood).jpg',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Special shaped shutters ( Dark wood).webp',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Dark Wood Shutters 1.jpg',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Dark Wood Shutters 2.jpg',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Dark Wood Shutters 3.jpg',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Dark Wood Shutters 4.jpg',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Dark Wood Shutters 5.jpg',
        altText: 'Dark Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Dark-wood/Dark Wood Shutters 6.jpg',
        altText: 'Dark Woods Shutters',
      },




    ],
  },
  {
    id: 6,
    name: 'Light Wood Shutters',
    color: 'deb887',
    url: '/shutters-range/light-wood-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light wood shutters (4).webp',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light wood shutters (1).webp',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light wood shutters (2).webp',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light wood shutters (3).webp',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light Wood Shutters 1.jpg',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light Wood Shutters 5 (1).jpg',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light Wood Shutters 3.jpg',
        altText: 'Light Woods Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Light-wood/Light Wood Shutters 4.jpg',
        altText: 'Light Woods Shutters',
      },


    ],
  },
  {
    id: 7,
    name: 'Bold Colour Shutters',
    color: '8f1601',
    url: '/shutters-range/bold-colours-shutters/',
    imageUrls: [
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Bold color shutters (1).webp',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Bold Colour Shutters 1 (1).jpg',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Bold color shutters (2).webp',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Bold color shutters.webp',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Cold color shutters (1).webp',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Cold color shutters (2).webp',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Cold color shutters (3).webp',
        altText: 'Bold Colour Shutters',
      },
      {
        imageUrl:
          '/assets/images/optimized-images/Color/Bold-colors/Cold color shutters (4).webp',
        altText: 'Bold Colour Shutters',
      },
    ],
  },
];




export const BooKNowbannerContent = [
  {
    url: '/blinds/roller-blinds',
    content:
      'Ready to get started? Call our sales team at <a href="tel:(04) 252 2025"" style="text-decoration:underline">(04) 252 2025</a> for a free quote or fill out the online form, and we&apos;ll be in touch',
  },
  {
    url: '/blinds/panel-blinds',
    content:
      'Need expert advice? We can make <a href="/made-to-measure-blinds/""" style="text-decoration: underline">custom window blinds</a> for you. Feel free to give us a call at (04) 252 2025, or fill out our online contact form, and we&apos;ll walk you through everything.',
  },
];


export const footerData = [
  {
    key: "1",
    title: 'Blinds',
    items: [
      'Motorised blinds',
      'Blackout Roller Blinds',
      'Sunscreen Roller Blinds',
      'Day/Night Blinds',
      'Blackout Roman blinds',
      // 'Roller Blinds',
      // 'Roman Blinds',
      // 'Vertical Blinds',
      // 'Wooden Blinds',
      // 'Aluminium Blinds',
      // 'Zebra Blinds',
      // 'Zipline Outdoor Blinds',
      // 'Panel Blinds',
      // 'Blackout Blinds',
    ],
  },
  {
    key: "2",
    title: 'Curtains',
    items: [
      'Motorised Curtains',
      'Blackout Triple Pinch Pleat curtains',
      'Sheer Triple Pinch Pleat curtains',
      'Sheer Ripple Fold Curtains',
      'Eyelet Curtains',
      // 'Triple Pinch Pleat Curtains',
      // 'Double Pinch Pleat Curtains',
      // 'Pencil Pleat Curtains',
      // 'Ripplefold/Wave Curtains',
      // 'Eyelet Curtains',
      // 'Tab Top Curtains',
      // 'Blackout Curtains',
      // 'Sheer Curtains',
      // 'Textured Curtains',
    ],
  },
  {
    key: "3",
    title: 'Shutters',
    items: [
      'Full Height Shutters',
      'Tracked Shutters',
      // 'Bi-Fold Shutters',
      'Special Shape Shutters',
      'Solid Panel Shutters',
      'Tier On Tier Shutters',
      // 'Cafe Style Shutters',
      // 'Bay Window Shutters',
      // 'Outdoor Shutters',

      // 'Black Shutters',
    ],
  },
{
    key: "4",
    title: 'Commercial',
    items: [
      'Pergola Window Coverings',
      'Outdoor Window Coverings',
      'Fire Retardant',
      'Washable',
      'Antimicrobial',
    ],
  },

];

export const GuaranteeVisitData = [
  {
    heading: 'Book a free consultation',
    description:
      'Our experts will come over at your convenience and discuss colours, styles, and measurements.',
    button: 'Book an appointment',
    href: '/request-appointment/',
  },
  {
    heading: 'Visit our showroom ',
    description:
      "Visit us in person next time you're in the area, and see for yourself what we've got to offer.",
    button: 'Find Our Location Map',
    href: 'https://www.google.com/maps?cid=2467468347994691262&hl=en',
  },
  {
    heading: 'Talk To Our Specialist',
    description:
      'Do you want to talk with the Blinds & Curtains Team? Our team will get back to you ASAP.',
    button: 'Talk To Specialist',
    href: 'https://api.whatsapp.com/send/?phone=%2B971544945339&text&type=phone_number&app_absent=0',
  },
];

export const contentArray = [
  [
    'Free home visits with free installation',
    'Great selection of blinds, curtains, and shutters',
    'Free uninstall/re-install within 2 years',
    'We’re trusted, with over 750+ 5* reviews',
  ],
  [
    'A team of 50 staff to ensure perfection from start to finish',
    'In-house production - quality is our concern, not yours',
    '10 YEARS warranty on all mechanical parts and labour',
  ],
];

export const links = {
  blinds: '/made-to-measure-blinds',
  curtains: '/made-to-measure-curtains',
  shutters: '/shutters-range',
};

export const locations = [
  ['Sheikh Zayed Road', 'Downtown Dubai', 'JLT', 'City Walk'],
  ['Oud Metha', 'Dubai Marina', 'Jadaff', 'Blue Water Island'],
  ['Business Bay', 'Nad Al Shiba', 'Palm Jumeirah', 'Dubai Hills'],
  ['Karama', 'JBR', 'Jumeirah', '50 More Areas'],
];
export const projectsData = [
  {
    title: 'Downtown Dubai',
    description:
      'In Downtown Dubai, we have installed <a href="/"" style="text-decoration:underline">window coverings</a> to keep out brightness and soften the lights. ',
    imageUrl: '/assets/images/Projects/downtown dubai.webp',
  },
  {
    title: 'Albarsha',
    description: `As versatile as life in Al Barsha, we've designed blinds, curtains, and shutters to suit busy or restful households.`,
    imageUrl: '/assets/images/Projects/Albarsha.webp',
  },
  {
    title: 'Business Bay',
    description:
      'We added calm and precision to the hectic world of Business Bay with our window coverings.',
    imageUrl: '/assets/images/Projects/Business bay dubai.webp',
  },
  {
    title: 'Jumeirah Beach',
    description:
      'The struggle of the sun and sea? We met those with fabrics that resist fading and salt air.',
    imageUrl: '/assets/images/Projects/Jumeirah Beach.webp',
  },
  {
    title: 'Arabian Ranches',
    description:
      'We brought warmth to Arabian Ranches with window treatments that feel as inviting as the homes themselves.',
    imageUrl: '/assets/images/Projects/Arabian Ranches.webp',
  },
  {
    title: 'Jumeirah Bay Island',
    description: `A luxury home needs custom care. We made <a href="/made-to-measure-blinds/"" style="text-decoration:underline">custom blinds</a>, curtains and shutters for Jumeirah Bay Island's exclusive clients.`,
    imageUrl: '/assets/images/Projects/jumeriah bay island.webp',
  },
  {
    title: 'Dubai Hills',
    description: `In keeping with Dubai Hills' tradition of balance, our designs integrate smoothly into any interior.`,
    imageUrl: '/assets/images/Projects/dubai-hills.jpg',
  },
  {
    title: 'Palm Jumeirah',
    description: `We've made sure the blinds and <a href="/made-to-measure-curtains/"" style="text-decoration:underline">curtains</a> match the scale and elegance of Palm Jumeirah.`,
    imageUrl: '/assets/images/Projects/Palm Jumeirah.webp',
  },
];

export const projectsTags = [
  'Emirates Hills',
  'The Lakes',
  'Meadows',
  'Damac Hills',
  'Arjan',
  'Al Quoz',
  'Al Barari',
  'Furjan',
  'Mohammed Bin Rashid City',
  'District 1',
  'Meydan',
  'Sobha Hartland',
  'Villa Nova',
  'Al Reem',
  'Townsquare',
  'Alvorada',
  'Beachfront',
  'Maple Villas',
  'Sidra Villas',
  'The Greens',
  'Dubai Harbour',
  'Dubai Creek Harbour',
  'Barsha Heights',
  'Academic City',
  'Nad Al Sheba',
  'Dubailand',
  'DIFC',
  'Al Khawaneej',
  'Dubai Design District',
  'Jumeirah Village Circle',
  'Discovery Gardens',
  'Umm Suqeim',
  'Jumeirah Beach Residence',
  'Jebel Ali Village',
  'Dubai Marina',
  'Business Bay Dubai',
  'Nad Al Hamar',
  'Festival City',
  'Dubai Creek',
  'Al Qusais',
  'Media City',
  'Bur Dubai',
  'Al Sufouh',
  'Silicon Oasis',
  'Mirdif',
  'Falcon City',
  'Jumeirah',
];



export const checkboxData = [
  { name: 'canAddProduct', label: 'Can Add Product' },
  { name: 'canEditProduct', label: 'Can Edit Product' },
  { name: 'canDeleteProduct', label: 'Can Delete Product' },
  { name: 'canAddCategory', label: 'Can Add Category' },
  { name: 'canDeleteCategory', label: 'Can Delete Category' },
  { name: 'canEditCategory', label: 'Can Edit Category' },
  { name: 'canAddSubCategory', label: 'Can Add SubCategory' },
  { name: 'canDeleteSubCategory', label: 'Can Delete SubCategory' },
  { name: 'canEditSubCategory', label: 'Can Edit SubCategory' },
  { name: 'canViewAppointments', label: 'Can View Appointments' },
  { name: 'canVeiwAdmins', label: 'Can View Admins' },
  { name: 'canVeiwTotalproducts', label: 'Can View Total Products' },
  { name: 'canVeiwTotalCategories', label: 'Can View Total Categories' },
  { name: 'canVeiwTotalSubCategories', label: 'Can View Total SubCategories' },
  { name: 'canAddBlog', label: 'Can Add Blog' },
  { name: 'canDeleteBlog', label: 'Can Delete Blog' },
  { name: 'canEditBlog', label: 'Can Edit Blog' },
];


export const milestoneStepsData: MilestoneStepsData = {
  heading: "What Got Us Here",
  subheading: "A timeline of dreams",
  image: "/assets/images/about-us/Our-Milestones.webp",
  steps: [
    {
      step: "1999",
      description: "Scottish Retailer of the Year — our journey began with quality.",
      iconimage: "/assets/images/Line-380.svg",
    },
    {
      step: "2014",
      description: "Launched blindsandcurtains.ae to serve Dubai homes better.",
      iconimage: "/assets/images/Line-380.svg",
    },
    {
      step: "2016",
      description: "Started in-house Production to ensure better quality and control",
      iconimage: "/assets/images/Line-380.svg",
    },
    {
      step: "2023",
      description: "From Blinds & Curtains to Two Guys — Al Quoz is our new home.",
    },
  ],
};


export const whyChooseData: WhyChooseItem[] = [
  {
    icon: "/assets/images/about-us/why1.svg",
    title: "Built on 20+ Years <br /> of Expertise",
    description: " We bring decades of hands-on experience to every home we furnish.",
  },
  {
     icon: "/assets/images/about-us/why2.svg",
    title: "In-house Production, <br /> No Outsourcing",
    description: " Everything’s made by us —since 2016, so you get full quality, no compromises.",
  },
  {
     icon: "/assets/images/about-us/why3.svg",
    title: "No Pushy Sales.<br />  Just Happy Customers",
    description: "We guide, not pressure — because your comfort always comes first.",
  },
  {
     icon: "/assets/images/about-us/why4.svg",
    title: "Crafted with Care. <br />  Installed with Confidence.",
    description: 'From stitching to setup, we handle every detail with precision and pride.',
  },
];

export const blindsSubcategories = [
  "Blackout Roller Blinds",
  "Sunscreen Roller Blinds",
  "Day/night Blinds",
  "Wood Venetian Blinds",
  "Blackout Roman Blinds",
  "Vertical Blinds",
  "Motorised Blinds",
  "Sheer Roman blinds"
];

export const shuttersSubcategories = [
  "Regular Full Height Shutters",
  "Bi-fold Shutters",
  "Special Shape Shutters",
  "Bypass Shutters",
  "Solid Panel Shutters",
  "Tier On Tier Shutters",
];

export const curtainsSubcategories = [
  "Blackout Triple Pinch Pleat Curtains",
  "Sheer Triple Pinch Pleat Curtains",
  "Sheer Ripple Fold Curtains",
  "Eyelet Curtains",
  "Double Pinch Pleat Curtains",
  "Blackout Curtains",
  "Motorised Curtains",
  "Wave Sheer & Blackout Curtains",
];

export const customerReview: ReviewData = {
  name: 'Eisa Alhabib',
  review:
    '“ Great place to get your curtains set up! They came to my apartment , took measurements then a few days later they set up my curtains and they look amazing! Very good quality and service. So happy with the final result ”',
  reviewLink:
    'https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.1177148,55.2356858,984m/data=!3m1!1e3!4m8!3m7!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!9m1!1b1!16s%2Fg%2F11bbt9c0yz?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D',
};



export const thankYouCards: ThankYouCardProps[] = [
  {
    title: 'VISIT OUR SHOWROOM',
    description:
      'The best way to experience our items is to see it for yourself in our showroom, which you are welcome to visit.',
    buttonLabel: 'Find Our Location Map',
    iconKey: 'map',
    buttonLink:
      'https://www.google.com/maps/place/Two+Guys+-+Blinds+%26+Curtains+Dubai/@25.1177196,55.2331055,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!16s%2Fg%2F11bbt9c0yz?entry=tts&g_ep=EgoyMDI0MDkxOC4xKgBIAVAD',
  },
  {
    title: 'TALK TO OUR SPECIALIST',
    description:
      'Do you want to talk with blindsandcurtains.ae team? We would be glad to contact you back ASAP.',
    buttonLabel: 'Send Us A Message',
    iconKey: 'message',
    buttonLink: 'https://wa.me/+971544945339',
  },
];
