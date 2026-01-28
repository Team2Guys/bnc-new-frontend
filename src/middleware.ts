// middleware.ts
import { fetchRedirectUrlById } from 'config/fetch';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GARBAGE_PATTERNS = [
  '_next/static/media', // Changed from /next to catch static assets
  '_next/image',        // Catch image optimization garbage
  '/wp-content',
  '/wp-json',
  '/xmlrpc.php',
  '/elementor-',
  '/portfolio_entries',
  '/feed/',
  '/cdn-cgi/',
  '/embed/',
  'c7128a8004343716-s.p.woff2',
  '7dd0604c8112379e-s.p.woff2',
  'res.cloudinary.com/de6owjeap',
];

export async function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;
  
  // 1. Check for Garbage URLs first
  const isGarbage = GARBAGE_PATTERNS.some(
    (pattern) => pathname.includes(pattern) || search.includes(pattern),
  );

  if (isGarbage) {
    // Return 410 Gone
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  // 2. Skip remaining logic for internal Next.js files that AREN'T garbage
  // This prevents the redirect logic from breaking your site's CSS/JS
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // 3. Redirection Logic
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  let redirectedProduct = await fetchRedirectUrlById(cleanPath);

  if (redirectedProduct?.redirectedUrl) {
    const redirectPath = redirectedProduct.redirectedUrl === '/' 
      ? '/' 
      : redirectedProduct.redirectedUrl + '/';
    return NextResponse.redirect(new URL(redirectPath, origin), 301);
  }

  // 4. Trailing Slash Enforcement
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return NextResponse.redirect(
      new URL(`${pathname}/`, req.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
matcher: ['/((?!api|_next|.*\\.).+)'],
};