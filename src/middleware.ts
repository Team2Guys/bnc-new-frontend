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
  '/cdn-cgi/',
  '/embed/',
  '/blinds-and-curtains-dubai/feed',
  'c7128a8004343716-s.p.woff2',
  '7dd0604c8112379e-s.p.woff2',
  'wbzqqjddux5reszjhfr1.webp',
  'sfdhbiqktobaidykklgj.webp',
  'ahl6dmj2ukl3yzw3ynnz.jpg',
  'wbzqqjddux5reszjhfr1.webp',
  'brn5wb6cohkgifz7xiu5.jpg',
];

  export async function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;
  const isGarbage = GARBAGE_PATTERNS.some(
    (pattern) => pathname.includes(pattern) || search.includes(pattern)
  );

  if (isGarbage) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  const fullUrl = req.url;

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