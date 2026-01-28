export let schema: any = [
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://blindsandcurtains.ae/#website',
        name: 'Blinds and Curtains',
        url: 'https://blindsandcurtains.ae/',
        potentialAction: {
          '@type': 'SearchAction',
          target: '{search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://blindsandcurtains.ae/#organization',
        name: 'Blinds and Curtains',
        alternateName: 'BnC',
        url: 'https://blindsandcurtains.ae/',
        logo: 'https://blindsandcurtains.ae/_next/image?url=%2Fassets%2Fimages%2Flogomain.webp&w=128&q=75',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '04 252 2025',
            contactType: 'customer service',
            areaServed: 'AE',
            availableLanguage: 'en',
          },
          {
            '@type': 'ContactPoint',
            telephone: '+971 54 494 5339',
            contactType: 'technical support',
            areaServed: 'AE',
            availableLanguage: 'en',
          },
        ],
        sameAs: [
          'https://www.facebook.com/blindsandcurtainsdubai',
          'https://www.instagram.com/blindsandcurtainsdubai/',
          'https://www.youtube.com/@blindsandcurtainsdubai',
          'https://www.pinterest.com/blindsandcurtainsdubai/',
          'https://blindsandcurtains.ae/',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://blindsandcurtains.ae/#localbusiness',
        name: 'Blinds and Curtains',
        image:
          'https://blindsandcurtains.ae/_next/image?url=%2Fassets%2Fimages%2Flogomain.webp&w=128&q=75',
        url: 'https://blindsandcurtains.ae/',
        telephone: '+971 54 494 5339',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Unit 43 22nd St – Al Quoz Industrial Area 4 – Dubai UAE',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '08:30',
          closes: '23:00',
        },
        sameAs: [
          'https://www.facebook.com/blindsandcurtainsdubai',
          'https://www.instagram.com/blindsandcurtainsdubai/',
          'https://www.youtube.com/@blindsandcurtainsdubai',
          'https://www.pinterest.com/blindsandcurtainsdubai/',
          'https://blindsandcurtains.ae/',
        ],
      },
      {
        '@type': 'Product',
        '@id':
          'https://blindsandcurtains.ae/blinds/roller-blinds/blackout-roller-blinds/#product',
        name: 'Blackout Roller Blinds',
        image:
          'https://blindsandcurtains.ae/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fde6owjeap%2Fimage%2Fupload%2Fv1748842740%2Fk9fkatmjprgq5hoytjul.webp&w=640&q=75',
        description:
          "Looking for blackout roller blinds in Dubai? Our blackout roller blinds are made with thick, light-blocking fabric that keeps your room cool and completely dark— even when the sun’s at its peak. These roller blinds Dubai are great for bedrooms to improve sleep, nurseries for naps, home theatres to block glare, and even as office roller blinds to reduce screen reflections. In Dubai's sunny climate, our Blackout roller blinds for windows provide excellent heat reduction and UV protection. Our blinds have two operating systems, one manual and another motorised. We have multiple colour options, from classic white blackout roller blinds to modern grey.",
        brand: {
          '@type': 'Brand',
          name: 'Blinds and Curtains',
        },
        offers: {
          '@type': 'AggregateOffer',
          url: 'https://blindsandcurtains.ae/blinds/roller-blinds/blackout-roller-blinds/',
          priceCurrency: '',
          lowPrice: '',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '3',
          reviewCount: '3',
        },
        review: [
          {
            '@type': 'Review',
            name: 'Great quality curtains and excellent service',
            reviewBody:
              'Great place to get your curtains set up! They came to my apartment , took measurements then a few days later they set up my curtains and they look amazing! Very good quality and service. So happy with the final result',
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            datePublished: '2026-01-01',
            author: { '@type': 'Person', name: 'Eisa Alhabib' },
            publisher: { '@type': 'Organization', name: 'Blinds and Curtains' },
          },
          {
            '@type': 'Review',
            name: 'Quick and professional blinds installation',
            reviewBody:
              'Very happy with my new curtains and blinds. Quick and professional installation. Highly recommend them',
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            datePublished: '2026-01-07',
            author: { '@type': 'Person', name: 'Marie St.' },
            publisher: { '@type': 'Organization', name: 'Blinds and Curtains' },
          },
          {
            '@type': 'Review',
            name: 'Professional bespoke sheer curtains service',
            reviewBody:
              'I had a wonderful experience with their custom-made sheer curtains service. From the very beginning, the team guided me with accurate measurements, helped me choose the perfect fabric, and handled the entire installation seamlessly. The curtains fit perfectly, look elegant, and really transform the space. Their professionalism and attention to detail made the whole process stress-free. Highly recommend for anyone looking for quality bespoke sheer curtains with complete service from start to finish!',
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            datePublished: '2026-01-10',
            author: { '@type': 'Person', name: 'Savitha C' },
            publisher: { '@type': 'Organization', name: 'Blinds and Curtains' },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://blindsandcurtains.ae/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://blindsandcurtains.ae/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blinds',
            item: 'https://blindsandcurtains.ae/blinds/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Curtains',
            item: 'https://blindsandcurtains.ae/curtains/',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Shutters',
            item: 'https://blindsandcurtains.ae/shutters-range/',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Commercial',
            item: 'https://blindsandcurtains.ae/commercial/',
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Estimator',
            item: 'https://blindsandcurtains.ae/estimator/',
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'About Us',
            item: 'https://blindsandcurtains.ae/about-us/',
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'FAQs',
            item: 'https://blindsandcurtains.ae/faqs/',
          },
          {
            '@type': 'ListItem',
            position: 9,
            name: 'Our Projects',
            item: 'https://blindsandcurtains.ae/projects/',
          },
          {
            '@type': 'ListItem',
            position: 10,
            name: 'Contact Us',
            item: 'https://blindsandcurtains.ae/contact-us/',
          },
          {
            '@type': 'ListItem',
            position: 11,
            name: 'Blog',
            item: 'https://blindsandcurtains.ae/blog/',
          },
          {
            '@type': 'ListItem',
            position: 12,
            name: 'Gallery',
            item: 'https://blindsandcurtains.ae/gallery/',
          },
          {
            '@type': 'ListItem',
            position: 13,
            name: 'Product Guarantees',
            item: 'https://blindsandcurtains.ae/product-guarantees/',
          },
          {
            '@type': 'ListItem',
            position: 14,
            name: 'Why Choose Us',
            item: 'https://blindsandcurtains.ae/why-choose-blinds-curtains/',
          },
          {
            '@type': 'ListItem',
            position: 15,
            name: 'Book A Free Visit',
            item: 'https://blindsandcurtains.ae/request-appointment/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://blindsandcurtains.ae/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you have a physical showroom we can visit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we have a lovely showroom in Al Quoz Ind 4',
            },
          },
          {
            '@type': 'Question',
            name: 'What are your opening hours?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We are open 7 days a week, from 8.30am to 11.00pm',
            },
          },
          {
            '@type': 'Question',
            name: 'How long have you been in business?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our Dubai journey started in 2014 and we have served over 18,000 customers since that time',
            },
          },
          {
            '@type': 'Question',
            name: 'I see that you offer free home visits. Are there definitely no secret charges?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. We are transparent and always want you to feel we can be trusted. The last thing we want is to make you feel conned. So yes, absolutely no charge, no obligation, no pressure.',
            },
          },
          /* Add all remaining FAQ questions in the same format here */
        ],
      },
    ],
  },
];

// export const matchedSchema = {
//   '@context': 'https://schema.org',
//   '@graph': [
//     {
//       '@type': 'BreadcrumbList',
//       itemListElement: [
//         {
//           '@type': 'ListItem',
//           position: 1,
//           name: 'Home',
//           item: 'https://blindsandcurtains.ae/',
//         },
//         {
//           '@type': 'ListItem',
//           position: 2,
//           name: 'Blog',
//           item: 'https://blindsandcurtains.ae/blog/',
//         },
//         {
//           '@type': 'ListItem',
//           position: 3,
//           name: 'Lined vs Unlined Curtains',
//           item: 'https://blindsandcurtains.ae/blog/lined-vs-unlined-curtains/',
//         },
//       ],
//     },
//     {
//       '@type': 'FAQPage',
//       mainEntity: [
//         {
//           '@type': 'Question',
//           name: 'Are Lined Curtains Better?',
//           acceptedAnswer: {
//             '@type': 'Answer',
//             text: 'It depends on what you want from your curtain. However, lined curtains are heavy and durable, look more elegant, and are perfect for larger spaces and rooms.',
//           },
//         },
//         {
//           '@type': 'Question',
//           name: 'Do Unlined Curtains Look Cheap?',
//           acceptedAnswer: {
//             '@type': 'Answer',
//             text: 'Not all the unlined curtains look cheap. It is always recommended to get your curtain lined but velvet curtains look decent even without lining.',
//           },
//         },
//         {
//           '@type': 'Question',
//           name: 'Should Living Room Curtains be Lined?',
//           acceptedAnswer: {
//             '@type': 'Answer',
//             text: 'In addition to blocking sunlight, it guards the curtain against wear and tear. If you don’t line your curtains, replacing them will cost you more once damaged. Thus, the lining is important!',
//           },
//         },
//         {
//           '@type': 'Question',
//           name: 'Do Lined Curtains Block Light Completely?',
//           acceptedAnswer: {
//             '@type': 'Answer',
//             text: 'You can block out light completely with lined curtains. Different lined curtains provide different light-filtering features.',
//           },
//         },
//       ],
//     },
//   ],
// };
