// ? Import Libraries
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('currentUser')?.value
  const currentUser = true

  // Редирект к постам
  if (currentUser && request.nextUrl.pathname === ('/')) {
    return Response.redirect(new URL('/posts', request.url))
  }

  // Редирект к авторизации
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
