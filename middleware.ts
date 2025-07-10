import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sf_token;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/property-management',
    '/assets',
    '/asset-properties',
    '/asset-management',
    '/payment-history',
    '/coupons',
    '/payment-plan',
    '/reward-management',
    '/inspections',
    '/supply',
  ],
};
