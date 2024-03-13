import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  if (token) {
    if (pathname.startsWith("/auth/")) {
      return NextResponse.redirect(new URL("/notes", request.url));
    }
  } else {
    if (!pathname.startsWith("/auth/")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/", "/auth/:path*"],
};
