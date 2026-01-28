import { ReactNode } from 'react';
import PathnameWrapper from 'components/Pathcomponent/PathnameWrapper';
import 'app/globals.css';
import { Providers } from './Providers';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import Head from 'next/head';
import { futura, roboto } from 'font/font';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  const isArabic = locale === 'ar';

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero_image.avif"
          fetchPriority="high"
          type="image/avif"
        />

        <meta
          name="google-site-verification"
          content="BHdLyJ6iGcCDMwuouc5ShyVcSBwHyip3ZtBxeKTEoVg"
        />
        {/* Pinterest Domain Verification */}
        <meta
          name="p:domain_verify"
          content="58b7c4e018c53c00c2cd12f5f838b47a"
        />
      </Head>
      {/* Google Tag Manager  */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MNXTN5B');`,
        }}
      />

      {/* End Google Tag Manager */}
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: '${locale}',
              includedLanguages: 'en,ar',
              autoDisplay: false
            }, 'google_translate_element');
            }
            `}
      </Script>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Microsoft Clarity */}
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "pwun6b0806");
            `,
        }}
      />
      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1192436448480999');
              fbq('track', 'PageView');
              `,
        }}
      />
      {/* Google Analytics Script */}
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-2W1CWBHDRB"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-2W1CWBHDRB');
        `}
      </Script>

      <body className={`${roboto.variable} ${futura.variable}`}>
        <Providers>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MNXTN5B"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <GoogleTagManager gtmId="GTM-MNXTN5B" />

          <div
            id="google_translate_element"
            className="translate-widget hidden"
          ></div>

          <PathnameWrapper>{children}</PathnameWrapper>
        </Providers>
      </body>
    </html>
  );
}
