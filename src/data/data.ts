
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
import { AboutUsBlock, ISUBCATEGORY, MilestoneStepsData, ReviewData, WhyChooseItem } from 'types/types';
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


export const banners = {
  Home: {
    imageSrc: "/assets/images/measure_shutter/measure_shutter.png",
    paraText: "From Bay Windows to Patio Doors..",
    linkHref: "/contact-us",
    linkText: "Contact Us",
    linkBgColor: "bg-secondary",
  },
  Blind: {
    imageSrc: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/banner.webp",
    paraText: "Let's measure, select, quote, and fit your blinds in a few easy steps. ",
    linkHref: "/contact-us/",
    linkText: "Get In touch",
    linkBgColor: "bg-black",
    className: "font-serif",
  },
  Curtain: {
    imageSrc: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/curtain_banner.webp",
    paraText: "Let's measure, select, quote, and fit your curtains in a few easy steps.",
    linkHref: "/contact-us/",
    linkText: "Get In touch",
    linkBgColor: "bg-black",
    className: "font-serif",
  },
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

//Review Hardcode Section
export const testimonials = [
  {
    id: 1,
    author_name: 'Fatima Seedat',
    time: '3 months ago',
    profile_photo_url: '/assets/images/static/testimonial/1.png',
    text: `
      The Meditation and Holistic Counseling course provided valuable insights and information. Nevine, our facilitator, was truly inspiring. I gained a wealth of knowledge and am eager to apply the skills I've acquired. This experience has not only broadened my understanding but also motivated me to integrate these new techniques into my practice. Overall, it was a rewarding learning journey that I am excited on my journey ahead.`,
    rating: 5,
  },
  {
    id: 2,
    author_name: 'Marlyn Hoffman',
    time: '2 years ago',
    profile_photo_url: '/assets/images/static/testimonial/2.png',
    text: `Excellent service from the team! Both Adeel and Robert were very helpful starting from the measurements, providing us options and  discussing what's best for our home. We also had great communication with Shiraz who gave us assurance that we will receive great service, good quality of work and reasonable price. And sure they delivered as promised! Very happy with Blinds & Curtains and will surely avail their services for our future needs! Thank you.`,
    rating: 5,
  },
  {
    id: 3,
    author_name: 'Katherine G. Tan Casis',
    time: '5 months ago',
    profile_photo_url: '/assets/images/static/testimonial/3.png',
    text: `Very happy with their customer service as they were very responsive when I was inquiring and scheduling the ocular. They have a wide variety of fabric selections and Jayson provided us so much assistance in the measurements and discussing the fabric options. He provided inputs that helped us decide which one to get.The curtains were ordered on Saturday and were delivered and installed by Thursday.Jayson and Robert did the installation and they did a wonderful job. We are very happy with the curtains they have delivered and installed. Highly recommended 👍🏻`,
    rating: 5,
  },
  {
    id: 4,
    author_name: 'Menna Hisham Essa',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/4.png',
    text: `One of the best companies, the quality of the curtains are very good and 100% black out comparing to the price they gave and very big variety of colors and materials to choose.Arshad and Shafiq came on time and they were very professional and very fast, they finished installing 4 curtains in only 40mins.I would highly recommend this company and for sure will deal with them again in future.`,
    rating: 5,
  },
  {
    id: 5,
    author_name: 'Sunny Collins',
    time: '2 years ago',
    profile_photo_url: '/assets/images/static/testimonial/5.png',
    text: `I used this company for my black-out roller blinds with sheers. I had such an AMAZING experience with this company from start to end! I cannot praise this team enough.The sales team- especially Mir- was very patient and attentive, answered all my many of questions and offered great suggestions of fabrics and products based on my needs. There were doubts about the initial measurements so they sent the team again to triple check everything. Abdul was so helpful when it came to giving technical information and what to expect for my space if I chose a specific design or material- for example, how much black out I'd have with 1 roller blind vs 2 roller blinds, and the ideal curtain length for my windows. He shared lots of photos of examples so I could visualize what he was talking about and the potential problems I could face if I went with my initial design ideas. I'm so grateful for his suggestions and don't regret changing the design based on his suggestions a single bit.Next was the installation- the guys were SUPER. Everything was installed perfectly, and the guys were VERY clean- washing their hands before touching the curtains to avoid dirtying the fabrics, and they left my apartment spotless. They are so very good at keeping the space dust-free while doing their work.The finished product is gorgeous and great quality too! I've definitely found my go-to place for curtains, and will highly recommed them to anyone else.`,
    rating: 5,
  },
  {
    id: 6,
    author_name: 'Maya Smadi',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/6.png',
    text: `Highly recommend using Blinds & Curtains. I came across them by coincidence through a google search. I was very hesitant in the beginning, but when the team came for a site visit, I was completely confident in their service.Yahweh and the team came on time, provided us with many samples, shared with us different pictures, explained the different mechanisms and got us the price on the spot through their iPads. They were truly very informed and really gave us peace of mind. And Once we paid the advance, installation was within a couple of days and they were so fast and efficient. Really excellent service, professional team and reasonable prices. `,
    rating: 5,
  },
  {
    id: 8,
    author_name: 'renren evans',
    time: '3 years ago',
    profile_photo_url: '/assets/images/static/testimonial/8.png',
    text: `I have a very good experience with Blinds and Curtains from day one (measurement/site visit) up to the installation. Kudos to Mr. Yahweh and his Assistant Robert who has done an excellent job to our new office. They have provided us with a very good service and these guys are really professional. Highly recommended!!! Attached are our sample photos. Thank you Blinds and curtains.`,
    rating: 5,
  },
  {
    id: 9,
    author_name: 'Phyllis Murray',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/9.png',
    text: `Great experience dealing with these guys. Very easy and straightforward process from initial enquiry to the installation of the curtains.Wahab and Tashiyana were very efficient in installing the curtains and very friendly as well. They cleaned up after themselves, too, and left no mess behind.Very happy customer here. Won't hesitate to use them again at all. Highly recommend!`,
    rating: 5,
  },
  {
    id: 10,
    author_name: 'Damian Seneviratne',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/10.png',
    text: `Had awesome work done by Yahweh and Arvin on 03/20/2023. Exceeding expectations and very professional all the way. Very courteous and really good at what they were doing. Neat and tidy. Thank you guys for making my new place much more beautiful than it was and able to make it home.. Cheers...`,
    rating: 5,
  },
  {
    id: 11,
    author_name: 'Alisha Alwany',
    time: '2 years ago',
    profile_photo_url: '/assets/images/static/testimonial/11.png',
    text: `Amazing Service. From the initial appointment to measure and choose materials to the installation. Perfect finish and so happy with the quality of the material too. Tanveer and Ray were very polite and cleaned up after the installation. Highly recommend!
    2 years on, I used blinds and curtains again to fit some shutters in our bedroom. Yahweh and Jayson were fantastic at installation but a special shout out to Yahweh who dealt with the whole process from measuring to installation. He put up with my messages to find out when the shutters will arrive in the UAE and was very patient. Both Yahweh and Jayson are a credit to your company! Would definitely recommend this company and have done to our friends and family.`,
    rating: 5,
  },
  {
    id: 12,
    author_name: 'Leisha Clark',
    time: '2 years ago',
    profile_photo_url: '/assets/images/static/testimonial/12.png',
    text: `A huge thank you to Yahweh & Arvin for doing a fantastic job putting up our curtains & blinds. They went above and beyond to make sure every curtain and blind was to my liking and perfect. I am very pleased with the quality of the curtains. I highly recommend them and would definitely use them again. ⭐️⭐️⭐️⭐️⭐️`,
    rating: 5,
  },
  {
    id: 13,
    author_name: 'James Spearman',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/13.png',
    text: `Lots of choice, easy to deal with and very professional.  The team came to measure and provide a quote, once I was ready we selected the final material and paid the deposit.. 2 days later blinds were ready Humayoun and Arvin quickly, efficiently and very cleanly installed the blinds.  Everything was super easy, even getting the security passes to my tower was handled without me getting involved.  Great service and love the end result.`,
    rating: 5,
  },
  {
    id: 14,
    author_name: 'Karolina Vaseva',
    time: '2 years ago',
    profile_photo_url: '/assets/images/static/testimonial/14.png',
    text: `Outstanding service from Abdul and Roy! From measuring, helping to pick the fabrics to setting everything up, the process was very smooth and fast. We love our blackout curtains in all rooms and we are very happy with Blinds and Curtains service, you got us as your loyal clients from now on.`,
    rating: 5,
  },
  {
    id: 15,
    author_name: 'Bintang A',
    time: '3 years ago',
    profile_photo_url: '/assets/images/static/testimonial/17.png',
    text: `Amazing guys working very hard, from the start of choosing the curtains and installation. Yahweh is very patient helping me with colour curtains as I can't decided 😊. Great choices for curtains with any budget. Yahweh and his installation team Jayson and Reagan very polite and professional.
    Definitely recommend them!`,
    rating: 5,
  },
  {
    id: 16,
    author_name: 'Eliska Mundell',
    time: '4 years ago',
    profile_photo_url: '/assets/images/static/testimonial/18.png',
    text: `I had two sets of curtains and a kitchen blind made, very impressed with the speed to deliver and the quality of the items. Tanveer was very easy to talk to and understood the requirements. The prices are reasonable, I would rather pay for quality. The installation job was done very quickly and the team is very professional. A small problem with the blind was rectified immediately. I certainly would use them again!`,
    rating: 5,
  },
  {
    id: 17,
    author_name: 'Eisa Alhabib',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/15.png',
    text: `Great place to get your curtains set up! They came to my apartment , took measurements then a few days later they set up my curtains and they look amazing! Very good quality and service. So happy with the final result`,
    rating: 5,
  },
  {
    id: 18,
    author_name: 'Carey Boucher Erasmus',
    time: 'a year ago',
    profile_photo_url: '/assets/images/static/testimonial/16.png',
    text: `Excellent service, so professional. Yahweh was brilliant and precise with our blind requirements. Fair, affordable prices too.`,
    rating: 5,
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
    content: `It all started with Shiraz, our managing partner, who has spent over 20 years working within the retail business in the UK. Multiple achievements were collected over the years, including Scottish retailer of the year (twice), Top Customer Service Accolades on 5 occasions and even a place in the top 100 most influential fashion icons. In 2014, Shiraz moved to Dubai with his family, ready for a new start and bigger dreams. That move led to something special — the beginning of Blinds & Curtains Furnitures Trading. A brand built on years of experience and strong family values. Over the years, it was felt that customer’s would join the Blinds & Curtains family at the end of their renovation journeys. 1000’s fell in love with the company and brand ethics, but by the time they were ready to cover their windows, they had already purchased their furnitures and flooring options. This led to real deep thinking process that lasted for several months before it was decided to re-brand. And that was the birth of Two Guys Home Furnishings. 

`,
    contentSize: 'text-base text-start',   
    imageUrl: '/assets/images/about-us/about-3.webp',
  },
  {
    shortHeading: 'Meet the People Behind the Promise',
    shortHeadingSize: 'sm:text-2xl text-20 text-[#3E3F42] font-roboto font-semibold',
    mainHeading: 'Real Experts. Real Advice. No Pushy Sales.',
    mainHeadingSize: 'sm:text-5xl text-2xl text[#3E3F42]',
    content: `At Two Guys, we don’t just hire staff — we have built a team of over 60 people who care about your home like it’s their own. Our team is friendly, honest, and never pushy. Shiraz, our founder, notices every little detail — even a crooked curtain! That’s how much we care. When you choose us, you’re part of the Two Guys family.`,
    contentSize: 'text-base text-start',
     imageUrl: '/assets/images/about-us/about-1.webp',
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
   
     imageUrl: '/assets/images/about-us/about-2.webp',
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

//page content
export const NavData = [
  {
    image: '/assets/images/Moterised-ads-blinds/visit.png',
    title: 'We Can Visit you',
    description: 'Take Measurements',
  },
  {
    image: '/assets/images/Moterised-ads-blinds/Vector1.png',
    title: 'Help Select Fabrics',
    description: 'Install in 2-3 Days ',
  },
  {
    image: '/assets/images/Moterised-ads-blinds/Group.png',
    title: 'Warranty',
    description: '10-YEAR',
  },
];

export const InstablindData = [

  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/bb1.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/bb5.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/bb4.mp4"
  },

  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/bb3.mp4"
  },


  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/bb6.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/bb2.mp4"
  },
];

export const InstacurtainData = [
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/cc6.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/cc4.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/cc1.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/cc2.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/cc3.mp4"
  },

  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/cc5.mp4"
  },

];


export const KeyData = [
  {
    image: "/assets/images/Moterised-ads-blinds/guarantee.png",
    para: "Trusted by over 750+ happy customers with glowing 5-star reviews for quality and service.",
  },
  {
    image: "/assets/images/Moterised-ads-blinds/businessmen.png",
    para: "Our expert installers will make sure you have the perfect setup along with a hassle-free, clean installation.",
  },
  {
    image: "/assets/images/Moterised-ads-blinds/ready.png",
    para: "There's a 10-year warranty on all hardware and a 5-year warranty on fabrics.",
  },
  {
    image: "/assets/images/Moterised-ads-blinds/loyalty.png",
    para: "Book a free consultation today and experience the difference with motorised blinds designed just for you.",
  },
];

export const benefits = {
  motorized_blinds: [
    {
      heading: "Control your blinds",
      description: "with just a tap on your phone or voice command, making life easier and more comfortable."
    },
    {
      heading: "Save energy and stay cool",
      description: "by scheduling your blinds to block heat during the day, helping reduce your energy bills."
    }
  ],
  motorized_curtains: [
    {
      heading: "Convenience",
      description: "Control them from anywhere—your couch, your office, even on vacation."
    },
    {
      heading: "Energy Efficiency",
      description: "Keep your home cool in the summer and warm in the winter with automated schedules."
    }
  ]
};



export const MotorisedSellingDataBlinds = [{
  icon: "/assets/images/Moterised-ads-blinds/icon-automation1.png",
  title: "Motorised blinds make life easy…",
  list: [
    { heading: "Easy Control:", para: "Adjust light or privacy using your phone, remote, or even voice commands like Alexa or Google Home." },
    { heading: "Energy Savings:", para: "Reduce heating and cooling costs by automatically adjusting your blinds." },
    { heading: "Safety First:", para: "No cords means a safer environment for children and pets, eliminating the risks of entanglement." },
    { heading: "Customised Solutions:", para: "A wide range of fabric and design choices to personalise your motorised blinds." },
  ],
},
{
  icon: "/assets/images/Moterised-ads-blinds/icon-automation1.png",
  title: "With full automation at your command",
  list: [
    { heading: "Quiet Operation:", para: "Designed to operate softly, so you can enjoy smooth operation without the racket." },
    { heading: "Convenient Scheduling:", para: "You can set timers for your blinds to open and close at certain times." },
    { heading: "Professional Installation:", para: "We make sure your blinds are measured, installed, and programmed perfectly for your home." },
    { heading: "Durable and Reliable:", para: "With a 10-year warranty so you can be sure they will work smoothly for as long as you need them." },
  ],
},
];

export const MotorisedSellingDataCurtain = [{
  icon: "/assets/images/Moterised-ads-blinds/icon-automation1.png",
  title: "Motorised Curtains make life easy…",
  list: [
    { heading: "Effortless Control:", para: "Use your phone, remote, or voice assistant to open or close them instantly." },
    { heading: "Customised for You:", para: " Pick fabrics, colours, and styles to match your space." },
    { heading: "Privacy Anytime:", para: "Close your curtains in seconds for complete privacy." },
    { heading: "Energy Efficient:", para: "Save on energy costs by scheduling your curtains to manage heat and light." },
  ],
},
{
  icon: "/assets/images/Moterised-ads-blinds/icon-automation1.png",
  title: "With full automation at your command",
  list: [
    { heading: "Cord-Free Safety:", para: "Keep your home safe for kids and pets with no dangling cords." },
    { heading: "Smooth & Silent:", para: "Quiet motors are good for easy operation and peace of mind." },
    { heading: "Convenient Scheduling:", para: "Set them to open and close automatically, whether you're home or not." },
    { heading: "Built to Last:", para: "A 10-year warranty proves that we don't compromise on quality." },
  ],
},
];

export const TabData = {
  motorized_blinds: [
    {
      icon: "/assets/images/MoterisedAndblinds/smart.svg",
      activeicon: "/assets/images/MoterisedAndblinds/smart1.svg",
      title: "Control your windows anytime, anywhere!",
      video: "/assets/video/moto.mp4",
      description:
        "Smart control systems from Somfy, Nice, and Motion make it easier than ever to manage your blinds from a smart hub, mobile device, voice assistant, or remote. All while blocking UV rays and offering precision light, privacy, and energy efficiency control.",
      tab: "Smart control",
    },
    {
      icon: "/assets/images/MoterisedAndblinds/mobile.svg",
      activeicon: "/assets/images/MoterisedAndblinds/mobile1.svg",
      title: "Just tap your screen & control your blinds",
      video: "/assets/video/moto.mp4",
      description:
        "Adjusting your blinds is now as easy as tapping a screen. No matter where you are—whether at home, the office, or even out running errands—you can control your blinds in real time.",
      tab: "Smartphone",
    },
    {
      icon: "/assets/images/MoterisedAndblinds/voice.svg",
      activeicon: "/assets/images/MoterisedAndblinds/voice1.svg",
      title: "Just say the word & enjoy the morning sunshine!",
      video: "/assets/video/moto.mp4",
      description:
        "Connect your blinds to a voice assistant like Alexa or Google Home. With a simple voice command like “Alexa, lower my blinds” you can open, close, or adjust the blinds without lifting a finger.",
      tab: "Voice assistant",
    },
    {
      icon: "/assets/images/MoterisedAndblinds/remote.svg",
      activeicon: "/assets/images/MoterisedAndblinds/remote1.svg",
      title: "Quick, easy, and always within reach!",
      video: "/assets/video/moto.mp4",
      description:
        "Whether you prefer the convenience of a handheld remote or a fixed wall switch, you get easy access to control light and privacy. No more fussing with cords—just a quick press to adjust your blinds exactly how you want them.",
      tab: "Remote or Wall switch",
    },
    {
      icon: "/assets/images/MoterisedAndblinds/automated.svg",
      activeicon: "/assets/images/MoterisedAndblinds/automated1.svg",
      title: "Set timers for your blinds to open and close automatically",
      video: "/assets/video/moto.mp4",
      description:
        "Set your blinds to open in the morning and close at night—without lifting a finger. Wake up to a natural light-filled morning or enjoy a moment of instant privacy at the exact moment you choose, all on autopilot.",
      tab: "Automated Scheduling",
    },
  ],
  motorized_curtains: [
    {
      icon: "/assets/images/MoterisedAndblinds/smart.svg",
      activeicon: "/assets/images/MoterisedAndblinds/smart1.svg",
      title: "Control your windows anytime, anywhere!",
      video: "/assets/video/curto.mp4",
      description:
        "Smart control systems from Somfy, Nice, and Motion make it easier than ever to manage your curtains from a smart hub, mobile device, voice assistant, or remote. All while blocking UV rays and offering precision light, privacy, and energy efficiency control.",
      tab: "Smart control"
    },
    {
      icon: "/assets/images/MoterisedAndblinds/mobile.svg",
      activeicon: "/assets/images/MoterisedAndblinds/mobile1.svg",
      title: "Just tap your screen & control your curtains",
      video: "/assets/video/curto.mp4",
      description:
        "Adjusting your curtains is now as easy as tapping a screen. No matter where you are—whether at home, the office, or even out running errands—you can control your curtains in real-time.",
      tab: "Smartphone",
    },
    {
      icon: "/assets/images/MoterisedAndblinds/voice.svg",
      activeicon: "/assets/images/MoterisedAndblinds/voice1.svg",
      title: "Just say the word & enjoy the morning sunshine!",
      video: "/assets/video/curto.mp4",
      description:
        "Connect with a voice assistant like Alexa or Google Home. With a simple voice command like “Alexa, close my curtains” you can open, close, or adjust the curtains without lifting a finger.",
      tab: "Voice assistant",
    },
    {
      icon: "/assets/images/MoterisedAndblinds/remote.svg",
      activeicon: "/assets/images/MoterisedAndblinds/remote1.svg",
      title: "Quick, easy, and always within reach!",
      video: "/assets/video/curto.mp4",
      description:
        "Whether you prefer the convenience of a handheld remote or a fixed wall switch, you get easy access to control light and privacy. No more fussing with cords—just a quick press to adjust your curtains exactly how you want them.",
      tab: "Remote or Wall switch"
    },
    {
      icon: "/assets/images/MoterisedAndblinds/automated.svg",
      activeicon: "/assets/images/MoterisedAndblinds/automated1.svg",
      title: "Set timers for your curtains to open and close automatically",
      video: "/assets/video/curto.mp4",
      description:
        "Set your curtains to open in the morning and close at night—without lifting a finger. Wake up to a natural light-filled morning or enjoy a moment of instant privacy at the exact moment you choose, all on autopilot.",
      tab: "Automated Scheduling",
    },
  ],
};


// RollerMainContent
export const tabsData = [
  {
    id: 0,
    title: 'Blackout Roller Blinds',
    subtitle: 'Made-to-measure for a perfect fit in any window size',
    heading: "Total Darkness & Maximum Comfort",
    content: [
      {
        title1: '100% Light Blockage:',
        description: 'No light can pass through the material. Add side channels to completely block light from entering from the edges too.'
      },
      {
        title1: 'Energy Efficient:',
        description: 'Insulated fabric keeps your room warmer in winter, cooler in summer and lower energy bills.'
      },
      {
        title1: 'Noise Reduction:',
        description: 'Thick blackout fabric helps to absorb sound and keeps your home quiet and peaceful all day long.'
      },
    ],
    iconSrc: '/assets/images/Rollerblind/roller.png',
    videoSrc: '/assets/video/blackoutroller.mp4',
  },
  {
    id: 1,
    title: 'Sunscreen Roller Blinds',
    subtitle: 'Enjoy Natural Light Without the Harsh Glare',
    heading: "Light Control with UV Protection",
    content: [
      {
        title1: 'UV Protection:',
        description: 'UV roller blinds block up to 98% of harmful UV rays and help protect your furniture, floors, and interior décor from fading.'
      },
      {
        title1: 'Energy Efficiency:',
        description: 'Blocking excessive sunlight reduces the need for air conditioning and reduces energy costs.'
      },
      {
        title1: 'Custom Fit & Style:',
        description: ' Various fabrics and colours are available to complement your interior while providing functional advantages.'
      },
    ],
    iconSrc: '/assets/images/Rollerblind/roller.png',
    videoSrc: '/assets/video/sunscreen.mp4',
  },
];

// BlackoutimagesSection
export const Blackoutimages = [{
  heading: "Stylish & Functional Blackout Blinds for Any Space",
  para: "Upgrade your home or office with sleek blackout blinds",
  imgurl: "/assets/images/Rollerblind/sliderimg/b4.jpg",
},
{
  heading: "Total Darkness, Maximum Comfort",
  para: "ultimate privacy with our high-quality blackout roller blinds",
  imgurl: "/assets/images/Rollerblind/sliderimg/b3.jpg",
},
{
  heading: "Enhance Your Space with Premium Blackout Blinds",
  para: "Enjoy a perfect balance of function and design with our blackout blinds",
  imgurl: "/assets/images/Rollerblind/sliderimg/b5.jpg",
},
];

// SunscreenimagesSection  
export const Sunscreenimages = [{
  heading: "Modern Sunscreen Blinds for Stylish Spaces",
  para: "Blinds",
  imgurl: "/assets/images/Rollerblind/sliderimg/s1.jpg",
},
{
  heading: "Smart Sun Protection with a Modern Touch",
  para: "Blinds",
  imgurl: "/assets/images/Rollerblind/sliderimg/s2.jpg",
},
{
  heading: "Sunscreen Roller Blinds – Style Meets Functionality",
  para: "Blinds",
  imgurl: "/assets/images/Rollerblind/sliderimg/s3.jpg",
},
];

// BlackoutFeatures
export const KeyFeaturesRoller = [
  {
    icon: "/assets/images/Rollerblind/keyfeatures/lightbulb.png",
    heading: "Control Light, Your Way",
    para: "Choose from blackout or light-filtering fabrics for maximum light control, privacy, and a peaceful sleep.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/energy.png",
    heading: "Energy Saving Design",
    para: "Reduce energy costs by controlling sunlight and temperature with our smart designs.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/custom.png",
    heading: "Custom-Made to Fit",
    para: "Every blind is measured and made to fit your windows, leaving no room for imperfections.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/moterised.png",
    heading: "Motorised Options Available",
    para: "Upgrade to motorised blinds for ultimate convenience—control them with your phone, voice or remote.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/gurantee.png",
    heading: "Durability Guaranteed",
    para: "Our high-quality materials will make sure long-lasting use, with a 5-year warranty on all products.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/installation.png",
    heading: "Professional Installation",
    para: "We offer expert guidance, custom fitting, and professional installation to guarantee a flawless fit for every window.",
  },
];
// SunscreenFeatures
export const KeyFeaturesSunScreen = [
  {
    icon: "/assets/images/Rollerblind/keyfeatures/natural.png",
    heading: "Reduce Heat Without Losing Natural Light",
    para: "Sunscreen blinds filter sunlight and keep your home cooler while natural light fills the room.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/privacy.png",
    heading: "Daytime Privacy with an Open View",
    para: "Enjoy full privacy during the day without shutting out the outside view. Perfect for rooms with large windows.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/fading.png",
    heading: "Protect Your Interiors from Fading",
    para: "No one enjoys constant sun exposure, which can cause interiors to fade over time. But with sunscreen, you can keep them fresh for a long time.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/cost.png",
    heading: "Energy-Efficient and Cost Saving",
    para: "These blinds help lower your need for air conditioning. So you can save a little on energy bills without sacrificing comfort.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/maintance.png",
    heading: "Low Maintenance for a Busy Life",
    para: "Sunscreen blinds are easy to maintain and naturally resist dust, making them perfect for Dubai's dry and dusty climate.",
  },
  {
    icon: "/assets/images/Rollerblind/keyfeatures/stylish.png",
    heading: "Stylish and Functional",
    para: "We offer an extensive selection of colours and textures, perfect for everything from living rooms and commercial spaces to your kid's room. So why not bring style into your space?",
  },
];

export const GallaryData1 = [
  {
    text: "Blackout Roller Blinds",
    images: [
      { imageurl: "/assets/images/galleryimages/blackout/b1.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/B3.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO4.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO5.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO6.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO7.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO8.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO9.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO10.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO11.webp", alt: "ss" },
      { imageurl: "/assets/images/galleryimages/blackout/BO12.jpg" },
      { imageurl: "/assets/images/galleryimages/blackout/BO13.jpg" },
    ],
  },
];

export const GallaryData2 = [{
  text: "Sunscreen Roller Blinds",
  images: [
    { className: "h-[493px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen1.jpg" },
    { className: "h-[308px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen2.jpg", alt: "ss" },
    { className: "h-[222px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen3.jpg" },
    { className: "h-[581px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen4.jpg" },
    { className: "h-[493px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen5.jpeg" },
    { className: "h-[308px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen6.webp" },
    { className: "h-[205px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen7.jpg" },
    { className: "h-[220px]", imageurl: "/assets/images/galleryimages/sunscreen/sunscreen8.jpg" },
    { className: "h-[356px]", imageurl: "/assets/images/galleryimages/all/s1.webp" },
    { className: "h-[493px]", imageurl: "/assets/images/galleryimages/all/s2.png" },
    { className: "h-[308px]", imageurl: "/assets/images/galleryimages/all/s3.png", alt: "ss" },
    { className: "h-[222px]", imageurl: "/assets/images/galleryimages/all/s4.png" },
    { className: "h-[581px]", imageurl: "/assets/images/galleryimages/all/s5.jpg" },
  ],
},]


// Rollervideos
export const InstaRollerData = [
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/Blackout+1.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/Blackout+2.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/Blackout+3.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/Sunscreen+2.mp4"
  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/Sunscreen+3.mp4"

  },
  {
    video: "https://bncvidoes.s3.eu-north-1.amazonaws.com/Sunscreen+5.mp4"
  },
];

// ppc-made-to-measure-blinds
export const ShopItems = [
  {
    imgUrl: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/1.webp",
    text: "Blinds",
    urls: "/made-to-measure-blinds/",
    NewUrls: [
      {
        url: "/ppc/made-to-measure-curtains/",
        redirected: "/ppc/made-to-measure-blinds/ ",
      },


    ]
  },
  {
    imgUrl: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/2.webp",
    text: "Curtains",
    urls: "/made-to-measure-curtains/",
    NewUrls: [
      {
        url: "/ppc/made-to-measure-blinds/",
        redirected: "/ppc/made-to-measure-curtains/ ",
      },


    ]
  },
  {
    imgUrl: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/3.webp",
    text: "Shutters",
    urls: "/shutters-range/"
  },
  {
    imgUrl: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/4.webp",
    text: "Motorised",
    NewUrls: [
      {
        url: "/ppc/made-to-measure-blinds/",
        redirected: "/ppc/motorised-blinds/ ",
      },
      {
        url: "/ppc/made-to-measure-curtains/",
        redirected: "/ppc/motorised-curtains/",
      },

    ]
  },
];

// Featuresblinds
export const Blindsfeatures = [
  {
    title: "Made To Measure",
    description:
      "Custom blinds are designed for every window size. We also specialise in large, double height windows.",
    icon: "/assets/images/ppc-blinds/features/7.png",
  },
  {
    title: "Free consultation & Visit",
    description:
      "Our experts visit your home with gorgeous samples,  give you impartial advice, and take precise measurements, all free of charge.",
    icon: "/assets/images/ppc-blinds/features/4.png",
  },
  {
    title: "Motorised Options",
    description:
      "Enjoy hassle-free operation with a remote, smartphone, or voice-activated blinds for ultimate convenience. We can also integrate with your smart home automation system.",
    icon: "/assets/images/ppc-blinds/features/3.png",
  },
  {
    title: "Quality You Can Trust",
    description:
      "These blinds are built to last with high-quality and durable materials and will never go out of style. 3 year warranty on fabrics and 10 years on mechanisms.",
    icon: "/assets/images/ppc-blinds/features/1.png",
  },
  {
    title: "Professionally Installed",
    description:
      "We can help you with all window sizes, including bay windows, skylights, and oversized glass doors.",
    icon: "/assets/images/ppc-blinds/features/5.png",
  },
];
//curtainfeatures
export const Curtainfeatures = [
  {
    title: "Customisation for an Ideal Fit",
    description:
      "No matter what size your window is, you can get customised curtains. Find the perfect colour fabric, and style for multiple windows.",
    icon: "/assets/images/ppc-blinds/features/7.png",
  },
  {
    title: "Light & Privacy Control",
    description:
      "Sheer fabrics can let in natural light and blackout fabrics gives complete privacy. Multiple pleat options for style and comfort.",
    icon: "/assets/images/ppc-blinds/features/6.png",
  },
  {
    title: "Energy Efficiency & Comfort",
    description:
      "You'll keep your home cooler in the summer with insulating fabrics. Blocks out the UV rays,  perfect for summer afternoons.",
    icon: "/assets/images/ppc-blinds/features/8.png",
  },
  {
    title: "Motorised for Convenience",
    description:
      "Control your blinds with a remote, smartphone, or voice assistant for total convenience. A neat, modern look.",
    icon: "/assets/images/ppc-blinds/features/3.png",
  },
  {
    title: "Free Reinstallation",
    description:
      "Free uninstall and reinstallation within 2 years, so you don’t need to add the stress of this when moving home again.",
    icon: "/assets/images/ppc-blinds/features/10.png",
  },
];

// customdata

export const blindsData = {
  heading: "Customisation Made Easy",
  heading1: "Choose Blinds That Fit Your Window Size, And Interior",
  description: `
    Make your space look stylish with custom blinds, including Roller, Roman, Wooden, and Zebra blinds, as well as vertical blinds. We design these for living rooms, bedrooms, kitchens, and more with options such as blackout, dim-out, and sunscreen.`,
  image: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/custom1.webp",
  button1Text: "GET DIRECTION",
  button2Text: "WHATSAPP",
  secondaryHeading: "Select a material of your choice",
  para: "Whether you want total darkness for a peaceful night, a soft glow for cosy afternoons, or gentle sunlight without heat, we’ve got the perfect fabric for you.",
  subheading: "Choose a style that suits you",
  para1: "Whether you love clean and simple look of roller blinds, soft elegance of Roman folds, or the natural feel of wooden blinds, we make sure every detail is right.",
  bulletPoints: [
    "Blackout Blinds – Zero light penetration through the material.",
    "Dimout Blinds – Diffused light without harsh glare.",
    "Sunscreen Blinds – Keep out harmful UV rays.",
    "Helps keep rooms cool in summer, and warm in winter.",
    "High-quality fabrics that stay beautiful for years."
  ],
  bulletPoints1: [
    "Roller Blinds – Simple, stylish, and convenient.",
    "Roman Blinds – Soft folds for a timeless touch.",
    "Wooden & Aluminum Venetian Blinds – Natural and classic.",
    "Vertical Blinds – Perfect for large windows and patio doors.",
    "Zebra Blinds – For flexible light control.",
  ],
};

export const curtainsData = {
  heading: " Customisation Made Easy",
  heading1: "Choose Curtains That Fit Your Window Size & Interior",
  description: `
   It's our speciality to dress up your windows the way you want. We can make custom pinch pleat curtains, triple pinch pleat curtains, pencil pleat curtains, tab top curtains, and wave curtains in blackout or sheer fabrics. We offer free home visits with samples and measurements without extra charges.
  `,
  image: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/cusm-curtain.webp",
  button1Text: "GET DIRECTION",
  button2Text: "WHATSAPP",
  secondaryHeading: "The Fabric You Love",
  para: "We have a big selection of high-quality fabrics, like blackout, sheers, and textured materials, to suit your windows and needs.",
  subheading: "The Style You Need",
  para1: "With a wide range of curtain types to choose from, you're sure to find the perfect curtain to compliment your decor.",
  bulletPoints: [
    "Blackout fabrics for complete light control.",
    "Sheer options for soft, elegant lighting.",
    "Durable, long-lasting materials.",
    " Variety of colours and textures available.",
    "Custom-made for a perfect fit.",
  ],
  bulletPoints1: [
    "Timeless and elegant with a pinch pleat.",
    "Fullness and luxury in a triple pleat.",
    "Simple and versatile pencil pleat.",
    "Casual and contemporary look with tab top.",
    " Smooth, flowing design with wave/ripplefold curtains."
  ],
};

//Banner features
export const Blindbannerfeatures = [
  "Made-to-measure blinds for any window size.",
  "You'll get it delivered and professionally installed.",
  "Only superior quality work by our expert team.",
  "Choose from a wide range of designs, fabrics, and styles.",
];

export const Curtainbannerfeatures = [
  "Free expert advice",
  "Free home visits with free installation",
  "Installation in just 2 to 3 Days",
  "More than 3000 fabrics and colours to choose from",
];
// 
export const BlindvideoData = [
  {
    src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/b1.mp4"

  },
  {
    src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/b2.mp4"

  },
  {
    src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/b3.mp4"

  },
];

export const CurtainvideoData = [
  {
    src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/c1.mp4"

  },
  {
    src: " https://bncvidoes.s3.eu-north-1.amazonaws.com/c2.mp4"

  },
  {
    src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/c3.mp4"

  },
];


//Tabdata
export const Tab1categories = [
  { label: "Blinds By Type", value: "type" },
  { label: "Blinds By Room", value: "room" },
  { label: "Blinds By Material", value: "material" },
];
export const Tab2categories = [
  { label: "Curtains By Style", value: "type" },
  { label: "Curtains By Room", value: "room" },
  { label: "Curtains By Fabric", value: "fabric" },
];

//whychoosedata
export const Chooseusblind = {
  text: "Why are we the leading blinds suppliers in Dubai? Unlike other companies, with British owners, we value service and satisfaction above all else. We are proud to have over twenty years of experience with seamless installation and hassle-free customer service from start to finish. Our commitment to quality and customer satisfaction has earned us 750+ 5-star reviews and the trust of countless happy customers."
};
export const Chooseuscurtain = {
  text: "Choosing Blinds & Curtains Dubai means getting custom-made window treatments, with transparent pricing and hassle free a-z service. With over 20 years of experience, our expert team guarantees a top-notch fit.  Customer satisfaction and quality have earned us hundreds of 5-star reviews."
};


export const chooseusblind = [
  {
    text: "With a team of 50+ experts, we pay attention to detail on every project.",
    image: "/assets/images/ppc-blinds/icon1.png"
  },
  {
    text: "Premium in-house production with the highest quality materials",
    image: "/assets/images/ppc-blinds/icon2.png"
  },
  {
    text: "Free home visits & installation, no hidden costs, just expert advice and service.",
    image: "/assets/images/ppc-blinds/icon3.png"
  },
  {
    text: "Fast & professional installation, enjoy quick, clean, and hassle-free fitting.",
    image: "/assets/images/ppc-blinds/icon4.png"
  },
  {
    text: "10-year warranty for peace of mind, durability and reliability you can trust.",
    image: "/assets/images/ppc-blinds/icon5.png"
  },
];
export const chooseuscurtain = [
  {
    text: "Dedicated team of 50+ Experts",
    image: "/assets/images/ppc-blinds/icon6.png", className: "xl:!h-12 xl:!w-12"
  },

  {
    text: "High-Quality In-House Production",
    image: "/assets/images/ppc-blinds/icon7.png"
  },

  {
    text: "Free home visits/free installation",
    image: "/assets/images/ppc-blinds/icon8.png", className: "xl:h-11 xl:w-11"
  },

  {
    text: "Quick installation, and a 10-year warranty",
    image: "/assets/images/ppc-blinds/icon9.png", className: "xl:h-12 xl:w-12"
  },

  {
    text: "750+ 5-star reviews and counting",
    image: "/assets/images/ppc-blinds/icon10.png", className: "xl:h-12 xl:w-20"
  },
];



//working process
export const workingProcessblindData = [
  {
    icon: "/assets/images/ppc-blinds/1.png",
    title: "Book an Appointment",
    description: "Call us or fill out our online form to schedule your free home visit at a time that suits you.",
  },
  {
    icon: "/assets/images/ppc-blinds/2.png",
    title: "Free Consultation",
    description: "We'll visit your home with fabric samples, take accurate measurements, and suggest options.",
  },
  {
    icon: "/assets/images/ppc-blinds/3.png",
    title: "Measurements & Selection",
    description: "We take precise measurements and help you choose the perfect style and material.",
  },
  {
    icon: "/assets/images/ppc-blinds/4.png",
    title: "Custom Production",
    description: "Your blinds are made-to-measure for a flawless fit and premium finish.",
  },
  {
    icon: "/assets/images/ppc-blinds/5.png",
    title: "Delivery & Installation",
    description: "We'll make sure your installation is hassle-free and without any mess or stress.",
  },
];

export const workingProcesscurtainData = [
  {
    icon: "/assets/images/ppc-blinds/1.png",
    title: "Book an Appointment",
    description: "Call us or fill out our online form to schedule your free home visit at a time that suits you.",
  },
  {
    icon: "/assets/images/ppc-blinds/6.png",
    title: "Free Consultation",
    description: "We'll visit your home with fabric samples, take accurate measurements, and give advice.",
  },
  {
    icon: "/assets/images/ppc-blinds/3.png",
    title: "Measurements & Selection",
    description: "We take precise measurements and help you choose the perfect fabric and style.",
  },
  {
    icon: "/assets/images/ppc-blinds/4.png",
    title: "Custom Production",
    description: "We make curtains to your exact measurements so their fit is perfect.",
  },
  {
    icon: "/assets/images/ppc-blinds/5.png",
    title: "Delivery & Installation",
    description: "Our team makes sure the installation goes smoothly and hassle-free.",
  },
];

//blind
export const blindcrousal = [
  { title: "Free Home Visit ", description: "We come to you with samples, ideas, and expert guidance.", icon: "/assets/images/ppc-blinds/h6.png" },
  { title: "Custom Measurements", description: "No more worrying about fit, we measure everything precisely.", icon: "/assets/images/ppc-blinds/h2.png" },
  { title: "Transparent Pricing", description: "Honest, upfront quotes with no surprises or hidden fees.", icon: "/assets/images/ppc-blinds/h3.png" },
  { title: "Expert Installation", description: "We handle everything, so you can sit back and enjoy your new blinds.", icon: "/assets/images/ppc-blinds/h4.png" },
  { title: "Free reinstall", description: "We offer free uninstall and reinstall within 2 years, so if you end up moving, we’ll help make your investment last longer.", icon: "/assets/images/ppc-blinds/h5.png" },
];
//curtain
export const curtaincrousal = [
  { icon: "/assets/images/ppc-blinds/h6.png", title: "Free Home Visit", description: "We come to you with samples and expert advice, at no cost." },
  { icon: "/assets/images/ppc-blinds/h2.png", title: "Custom Measurements", description: "Precise measuring gets you a flawless fit for your curtains." },
  { icon: "/assets/images/ppc-blinds/h3.png", title: "Transparent Pricing", description: "Get a clear, upfront quote with no hidden fees." },
  { icon: "/assets/images/ppc-blinds/h7.png", title: "Expert Installation", description: "Our professional team handles everything for a hassle-free setup." },
  { icon: "/assets/images/ppc-blinds/h5.png", title: "Extensive Collection", description: "There are a variety of styles, colours, as well as fabrics available." },
];



export const serviceLocationsData = [
  {
    id: 1,
    title: "We Deliver Blinds All Over Dubai",
    description: "Our blinds are made-to-order and delivered right to your door in any part of Dubai. We offer fast, reliable service and installation with expert expertise—convenience and quality combined!",
    locations: ['Albarsha', 'Arabian Ranches', 'Business Bay', 'Downtown Dubai', 'Dubai Hills', 'Jumeirah Bay Island', 'Jumeirah Beach', 'Palm Jumeirah', 'Academic City', 'DIFC', 'Damac Hills', '40+ Locations'],
    mapLink: "https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.117715,55.235686,2562m/data=!3m1!1e3!4m6!3m5!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!16s%2Fg%2F11bbt9c0yz?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
  },
  {
    id: 2,
    title: "We Deliver Curtains All Over Dubai",
    description: "Our curtains are made-to-order and delivered right to your door in any part of Dubai. We offer fast, reliable service and installation with expert expertise—convenience and quality combined!",
    locations: ['Al Barari', 'The Greens', 'Al Quoz', 'Al Qusais', 'Al Reem', 'Al Sufouh', 'Alvorada', 'Arjan', 'Barsha Heights', 'Villa Nova', 'Bur Dubai', '40+ Locations'],
    mapLink: "https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.117715,55.235686,2562m/data=!3m1!1e3!4m6!3m5!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!16s%2Fg%2F11bbt9c0yz?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
  }
];

export const gallerypara = "When you book an appointment, a van from Two Guys Home Furnishings (our sister company) will visit your home with experts to guide you, show fabric samples, and take precise measurements for a perfect fit.";

export const curtainImages = [
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c1.webp", width: 397, height: 301 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c2.webp", width: 397, height: 466 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c3.webp", width: 322, height: 241 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c7.webp", width: 323, height: 526 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c4.webp", width: 236, height: 322 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c5.webp", width: 482, height: 445 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/curtain-images/c6.webp", width: 236, height: 322 },
];

export const blindimages = [
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b1.webp", width: 397, height: 301 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b2.webp", width: 397, height: 466 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b3.webp", width: 322, height: 241 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b7.webp", width: 323, height: 526 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b4.webp", width: 236, height: 322 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b5.webp", width: 482, height: 445 },
  { src: "https://bncvidoes.s3.eu-north-1.amazonaws.com/images/b6.webp", width: 236, height: 322 },
];


export const milestoneStepsData: MilestoneStepsData = {
  heading: "What Got Us Here",
  subheading: "A timeline of dreams",
  image: "/assets/images/about-us/milestone.webp",
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
  "Regular Height Shutters",
  "Bi-fold Shutters",
  "Special Shape Shutters",
  "Bi-pass Shutters",
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
  name: 'Imran Ahmad',
  review:
    '“ Amazing experience from start to finish Ryan and Ben did a great job with installation leaving drive and garage clean ”',
  reviewLink:
    'https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.1177148,55.2356858,984m/data=!3m1!1e3!4m8!3m7!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!9m1!1b1!16s%2Fg%2F11bbt9c0yz?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D',
};
