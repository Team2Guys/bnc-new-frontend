// middleware.ts
import { fetchRedirectUrlById } from 'config/fetch';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GARBAGE_PATTERNS = [
  '/wp-content',
  '/wp-json',
  '/xmlrpc.php',
  '/elementor-',
  '/portfolio_entries',
  '/feed/',
  '/cdn-cgi/',
  '/embed/',
  'c7128a8004343716-s.p.woff2', // Specific old font
  '7dd0604c8112379e-s.p.woff2', // Specific old font
  'res.cloudinary.com/de6owjeap', // The specific cloudinary account in your list
];

export async function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;
  const fullUrl = req.url;

  const isGarbage = GARBAGE_PATTERNS.some(
    (pattern) => pathname.includes(pattern) || search.includes(pattern),
  );

  if (isGarbage) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

  let redirectedProduct = await fetchRedirectUrlById(
    pathname.replace(/^\/+|\/+$/g, ''),
  );

  console.log({ pathname, cleanPath }, 'redirectedProduct', redirectedProduct);

  if (redirectedProduct?.redirectedUrl) {
    const redirectPath =
      redirectedProduct.redirectedUrl == '/'
        ? '/'
        : redirectedProduct.redirectedUrl + '/';
    const absoluteUrl = new URL(redirectPath, origin);
    return NextResponse.redirect(absoluteUrl, 301);
  }

  if (!fullUrl.endsWith('/')) {
    return NextResponse.redirect(
      new URL(`${req.nextUrl.pathname}/`, req.nextUrl),
      301,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.).+)'],
};
