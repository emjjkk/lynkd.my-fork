import { NextRequest, NextResponse } from 'next/server';

const VALID_LOCALES = ['en', 'zh'] as const;
type Locale = typeof VALID_LOCALES[number];

export function middleware(request: NextRequest) {
  // 1. Check for existing valid locale cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Determine the locale
  let locale: Locale = cookieLocale && VALID_LOCALES.includes(cookieLocale)
    ? cookieLocale
    : detectBrowserLanguage(request);

  // 3. Create response
  const response = NextResponse.next();

  // 4. Set cookie if needed (valid for 1 year)
  if (!cookieLocale || !VALID_LOCALES.includes(cookieLocale)) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 31536000, // 1 year in seconds
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

function detectBrowserLanguage(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage?.includes('zh')) return 'zh';
  return 'en'; // Default fallback
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|locales).*)',
  ],
};