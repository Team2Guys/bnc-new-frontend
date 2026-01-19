import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  canonical?: string;
}

export function generateMetadata({
  title,
  description,
  path = '/',
  type = 'website',
  canonical,
}: MetadataProps): Metadata {
  const baseUrl = 'https://blindsandcurtains.ae';
  const fullUrl = path === '/' ? baseUrl : `${baseUrl}${path}`;

  return {
    metadataBase: new URL(baseUrl), // ✅ ALWAYS set

    title,
    description,

    openGraph: {
      title,
      description,
      url: fullUrl,
      type,
      images: [
        {
          url: '/assets/images/blind-curtains-dubai/blinds-curtains-dubai1.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    alternates: {
      canonical: canonical || fullUrl,
    },
  };
}
