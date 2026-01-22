import {
  Email,
  PhoneNumber,
  Tproductdata,
  TProductGuarantees,
} from 'types/interfaces';
import * as Yup from 'yup';
import { Category, FormValues } from 'types/interfaces';
import {
  AboutUsBlock,
  ISUBCATEGORY,
  MilestoneStepsData,
  ReviewData,
  ThankYouCardProps,
  WhyChooseItem,
} from 'types/types';
/* eslint-disable no-useless-escape */
export const generateSlug = (text?: string) => {
  if (!text) return ' ';
  return text
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
  {
    src: '/assets/images/ourclient/new/roundedlogo.webp',
    alt: 'Khansaheb-Logo',
  },
  { src: '/assets/images/ourclient/new/waner.webp', alt: 'Khansaheb-Logo' },
];

export const productData: Tproductdata = {
  title: 'PRODUCT GUARANTEES',
  sideImage: '/assets/images/product-guarantees/guarantee1.png',
  sideImage1: '/assets/images/product-guarantees/guarantee2.png',
  heading: 'BLINDS, CURTAINS & SHUTTERS PRODUCT GUARANTEES',
  content:
    'We at blindsandcurtains.ae know our products will complement your home now and in the future. All our made-to-measure blinds, curtains, and shutters come with a 10-year mechanical and labour warranty. We make sure all our products are of high quality, but if something goes wrong, our team will visit to assess the situation. With them, you can be sure your problem will be handled with care, whether with a quick fix or a replacement. We stand behind our work so that you can trust us.',
};

export const PGuarantees: TProductGuarantees[] = [
  {
    heading: 'What Our Guarantee Cover?',
    text: `When choosing blindsandcurtains.ae, you're buying beautiful window dressings and getting a customer service experience that is unmatched in Dubai. From free consultation and installation to an after-sales care package, you can rest assured that you’ll be in good hands for the lifetime of your blinds, curtains or shutters. We understand how important fabric quality is to your blinds and curtains. That’s why we offer a 3-year warranty on all fabrics used in our products. From the track to the rod and every mechanism in between, every component of your blinds and curtains is durable. There's a 10-year warranty on all moving and static parts, so you're covered for the long term.If your custom window covering doesn’t perform as it should within 10 years of installation, we’ll fix it or give you a replacement of your choice. We do this so you'll always have a solution that works.`,
    image: '/assets/images/product-guarantees/guarantee3.png',
    imageAlign: 'left',
  },
  {
    heading: 'Why Choose Our Guarantees?',
    text: "We've revolutionized product guarantees with cutting-edge technology and customer-first approach.",
    icons: [
      {
        heading: 'Global Coverage',
        text: 'Submit claims online and get approval within 24 hours with our automated system.',
        icon: '/assets/images/product-guarantees/icon1.png',
      },
      {
        heading: 'Instant Claims Processing',
        text: 'Your products are protected worldwide with our international service network.',
        icon: '/assets/images/product-guarantees/icon2.png',
      },
      {
        heading: 'Transparent Terms',
        text: 'No hidden clauses or fine print. Clear, straightforward guarantee terms you can understand.',
        icon: '/assets/images/product-guarantees/icon3.png',
      },
    ],
    image: '/assets/images/product-guarantees/guarantee4.webp',
    imageAlign: 'right',
  },
];

export const aboutUsData: AboutUsBlock[] = [
  {
    shortHeading: 'A New Country – A New Chapter',
    shortHeadingSize:
      'sm:text-2xl text-20 font-Roboto font-medium text-primary',
    mainHeading: 'How It All Began — From the UK to Dubai',
    mainHeadingSize:
      'sm:text-2xl text-24 font-bold xl:text-[40px] text-primary',
    content: `It all started with Shiraz, our managing partner, who has spent over 20 years working within the retail business in the UK. Multiple achievements were collected over the years, including Scottish retailer of the year (twice), Top Customer Service Accolades on 5 occasions and even a place in the top 100 most influential fashion icons. In 2014, Shiraz moved to Dubai with his family, ready for a new start and bigger dreams. That move led to something special — the beginning of Blinds & Curtains Furnitures Trading. A brand built on years of experience and strong family values. Over the years, it was felt that customer’s would join the Blinds & Curtains family at the end of their renovation journeys. 1000’s fell in love with the company and brand ethics, but by the time they were ready to cover their windows, they had already purchased their furnitures and flooring options. This led to real deep thinking process that lasted for several months before it was decided to re-brand. And that was the birth of Two Guys Home Furnishings.`,
    contentSize: 'text-base text-start',
    imageUrl: '/assets/images/about-us/aboutus.webp',
  },
  {
    shortHeading: 'Meet the People Behind the Promise',
    shortHeadingSize:
      'sm:text-2xl text-20 text-primary font-roboto font-semibold',
    mainHeading: 'Real Experts. Real Advice. No Pushy Sales.',
    mainHeadingSize: 'sm:text-5xl text-2xl text-primary',
    content: `At Two Guys, we don’t just hire staff — we have built a team of over 60 people who care about your home like it’s their own. Our team is friendly, honest, and never pushy. Shiraz, our founder, notices every little detail — even a crooked curtain! That’s how much we care. When you choose us, you’re part of the Two Guys family.`,
    contentSize: 'text-base text-start',
    imageUrl: '/assets/images/about-us/only-sources.webp',
  },
  {
    shortHeading: 'Our First Big Step in Dubai',
    shortHeadingSize:
      'sm:text-2xl text-20 text-primary font-roboto font-semibold',
    mainHeading: 'From a Tiny Office to the First Two Guys Showroom',
    mainHeadingSize: 'sm:text-5xl text-2xl text-primary',
    content: `We started in a small, cosy office in Port Saeed — no fancy setup, just hard work and learning the Dubai market.
In 2017, we opened our first showroom in Oud Metha as Blinds and Curtains and quickly became a trusted name.
With loyal customers and growing demand, we evolved into Two Guys Home Furnishings — built on service, trust, and homes that feel just right.`,
    contentSize: 'text-base text-start',

    imageUrl: '/assets/images/about-us/aboutUsimage.webp',
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
  productCustomUrl: '',
  categoryCustomUrl: '',
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

export const AddProductvalidationSchema = Yup.object().shape({});

export const footerData = [
  {
    key: '1',
    title: 'Blinds',
    link: '/made-to-measure-blinds/',
    items: [
      'Motorised blinds',
      'Blackout Roller Blinds',
      'Sunscreen Roller Blinds',
      'Day/Night Blinds',
      'Blackout Roman blinds',
    ],
  },
  {
    key: '2',
    title: 'Curtains',
    link: '/made-to-measure-curtains/',
    items: [
      'Motorised Curtains',
      'Blackout Triple Pinch Pleat curtains',
      'Sheer Triple Pinch Pleat curtains',
      'Sheer Ripple Fold Curtains',
      'Eyelet Curtains',
    ],
  },
  {
    key: '3',
    title: 'Shutters',
    link: '/shutters-range/',
    items: [
      'Full Height Shutters',
      'Tracked Shutters',
      'Special Shape Shutters',
      'Solid Panel Shutters',
      'Tier On Tier Shutters',
    ],
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
  heading: 'What Got Us Here',
  subheading: 'A timeline of dreams',
  image: '/assets/images/about-us/Our-Milestones.webp',
  steps: [
    {
      step: '1999',
      description:
        'Scottish Retailer of the Year — our journey began with quality.',
      iconimage: '/assets/images/Line-380.svg',
    },
    {
      step: '2014',
      description: 'Launched blindsandcurtains.ae to serve Dubai homes better.',
      iconimage: '/assets/images/Line-380.svg',
    },
    {
      step: '2016',
      description:
        'Started in-house Production to ensure better quality and control',
      iconimage: '/assets/images/Line-380.svg',
    },
    {
      step: '2023',
      description:
        'From Blinds & Curtains to Two Guys — Al Quoz is our new home.',
    },
  ],
};

export const whyChooseData: WhyChooseItem[] = [
  {
    icon: '/assets/images/about-us/why1.svg',
    title: 'Built on 20+ Years <br /> of Expertise',
    description:
      ' We bring decades of hands-on experience to every home we furnish.',
  },
  {
    icon: '/assets/images/about-us/why2.svg',
    title: 'In-house Production, <br /> No Outsourcing',
    description:
      ' Everything’s made by us —since 2016, so you get full quality, no compromises.',
  },
  {
    icon: '/assets/images/about-us/why3.svg',
    title: 'No Pushy Sales.<br />  Just Happy Customers',
    description:
      'We guide, not pressure — because your comfort always comes first.',
  },
  {
    icon: '/assets/images/about-us/why4.svg',
    title: 'Crafted with Care. <br />  Installed with Confidence.',
    description:
      'From stitching to setup, we handle every detail with precision and pride.',
  },
];

export const subCategoryUrls = [
  { url: 'blackout-blinds', name: 'Blackout/Private Blinds' },
];

export const subCategoryName = [
  {
    name: 'Living Room Blinds',
    alterName: 'Made To Measure Blinds For Living Room',
  },
];

export const shuttersSubcategories = [
  'Regular Full Height Shutters',
  'Bi-fold Shutters',
  'Special Shape Shutters',
  'Bypass Shutters',
  'Solid Panel Shutters',
  'Tier On Tier Shutters',
  'Dark Wood Shutters',
  'Bold Colours Shutters',
  'Light Wood Shutters',
  'Cafe Style Shutters',
  'Outdoor Shutters',
  'Living Room Shutters',
  'Dining Room Shutters',
  'Kitchen Room Shutters',
  'Bedroom Shutters',
  'Staircase Shutters',
  'White Shutters',
  'Off White Shutters',
];

export const blindsSubcategories = [
  'Blackout Roller Blinds',
  'Sunscreen Roller Blinds',
  'Day/night Blinds',
  'Wood Venetian Blinds',
  'Blackout Roman Blinds',
  'Vertical Blinds',
  'Motorised Blinds',
  'Sheer Roman blinds',
  'Roller Blinds',
  'Roman Blinds',
  'Zipline Outdoor Blinds',
  'Skylight Blinds',
  'Blackout Blinds',
  'Zebra Blinds',
  'Sheer Horizon Blinds',
  'Honeycomb Blinds',
  'Printed Blinds',
  'Wooden Blinds',
  'Staircase Blinds',
  'Translucent Blinds',
  'Patricia Blinds',
  'Panel Blinds',
  'Aluminium Blinds',
  'Living Room Blinds',
  'Kitchen Blinds',
  'Dining Room Blinds',
  'Bathroom Blinds',
  'Kids Room Blinds',
  'Bedroom Blinds',
  'Balcony Blinds Dubai',
];

export const curtainsSubcategories = [
  'Blackout Triple Pinch Pleat Curtains',
  'Sheer Triple Pinch Pleat Curtains',
  'Sheer Ripple Fold Curtains',
  'Eyelet Curtains',
  'Double Pinch Pleat Curtains',
  'Blackout Curtains',
  'Motorised Curtains',
  'Wave Sheer & Blackout Curtains',
  'Office Curtains',
  'Home Curtains',
  'Plain Curtains',
  'Patterned Curtains',
  'Natural Fabric Curtains',
  'Kids Prints Curtains',
  'Textured Curtains',
  'Geometric Curtains',
  'Goblet Pleat Curtains',
  'Velvet Curtains',
  'Stripes Curtains',
  'Tab Top Curtains',
  'Pencil Pleat Curtains',
  'Dining Room Curtains',
  'Bedroom Curtains',
  'Hotel Curtains',
  'Kids Room Curtains',
  'Living room Curtains',
  'Pelmet Curtains',
  'Linen Curtains',
  'Chiffon Curtains',
  'Pinch Pleat Curtains',
  'Staircase Curains',
  'Conservatory Curtains',
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
