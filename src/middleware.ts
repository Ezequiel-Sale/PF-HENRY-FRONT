import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

function decodeToken(token: string): { role: string } | null {
  try {
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTimestamp) {
      console.log("Token expirado");
      return null;
    }

    return { role: payload.role };
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('userSession');

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decodedToken = decodeToken(sessionCookie.value);
  console.log("Decoded token:", decodedToken); // Para depuración

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { role } = decodedToken;
  const path = request.nextUrl.pathname;

  // Ruta del dashboard principal (solo para admin)
  if (path === '/dashboard' && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Ruta para profesores
  if (path === '/dashboard-profesor' && role !== 'profesor' && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Ruta para usuarios normales
  if (path === '/userdashboard' && !['user', 'profesor', 'admin'].includes(role)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirigir usuarios a sus respectivos dashboards si intentan acceder a otros
  if (role === 'admin' && (path === '/dashboard-profesor' || path === '/userdashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (role === 'profesor' && (path === '/dashboard' || path === '/userdashboard')) {
    return NextResponse.redirect(new URL('/dashboard-profesor', request.url));
  } else if (role === 'user' && (path === '/dashboard' || path === '/dashboard-profesor')) {
    return NextResponse.redirect(new URL('/userdashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard-profesor',
    '/userdashboard',
  ],
}