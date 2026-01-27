export let schema: any = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Blinds And Curtains Dubai',
    url: 'https://blindsandcurtains.ae/',
    logo: 'https://blindsandcurtains.ae/_next/static/media/logomain.8dbb28bd.png',
    image:
      'https://blindsandcurtains.ae/_next/static/media/logomain.8dbb28bd.png',
    description:
      "One of the UAE's leading blinds, curtains and shutters retailers. Specialising in all types of window furnishings, all made to measure, delivered and installed by our team of professional fitters.",
    telephone: '+971 54 494 5339',
    email: 'sales@blindsandcurtains.ae',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 43 22nd St - Al Quoz - Ind 4',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    openingHours: 'Mon-Sun 09:00-18:00',
    sameAs: [
      'https://www.facebook.com/blindsandcurtainsdubai',
      'https://www.instagram.com/blindsandcurtainsdubai/',
      'https://www.pinterest.com/blindsandcurtainsdubai/',
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.1126',
      longitude: '55.1855',
    },
    additionalType: 'https://schema.org/Store',
    hasMap: 'https://g.co/kgs/Pnt6wBr',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
    ],
  },
];

export const matchedSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
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
          name: 'Blog',
          item: 'https://blindsandcurtains.ae/blog/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Lined vs Unlined Curtains',
          item: 'https://blindsandcurtains.ae/blog/lined-vs-unlined-curtains/',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are Lined Curtains Better?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It depends on what you want from your curtain. However, lined curtains are heavy and durable, look more elegant, and are perfect for larger spaces and rooms.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do Unlined Curtains Look Cheap?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not all the unlined curtains look cheap. It is always recommended to get your curtain lined but velvet curtains look decent even without lining.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should Living Room Curtains be Lined?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In addition to blocking sunlight, it guards the curtain against wear and tear. If you don’t line your curtains, replacing them will cost you more once damaged. Thus, the lining is important!',
          },
        },
        {
          '@type': 'Question',
          name: 'Do Lined Curtains Block Light Completely?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can block out light completely with lined curtains. Different lined curtains provide different light-filtering features.',
          },
        },
      ],
    },
  ],
};
