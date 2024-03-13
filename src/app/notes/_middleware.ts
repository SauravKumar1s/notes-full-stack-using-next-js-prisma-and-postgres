// import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest, ev: NextFetchEvent) {
//   const token = req.cookies.get('token'); // 'userToken' is the cookie name where the token is stored

//   // Placeholder for token validation logic
//   // You need to replace this with your actual token validation logic
//   const isValidToken = token !== undefined;

//   if (!isValidToken) {
//     // Redirect to login page if token is not valid
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // If the token is valid, proceed with the request
//   return NextResponse.next();
// }

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req.cookies.get('token');
    console.log('Token:', token); // Check the token value
  
    const isValidToken = token !== undefined;
  
    if (!isValidToken) {
      console.log('Redirecting to login, invalid token');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    console.log('Token is valid, proceeding');
    return NextResponse.next();
  }
  