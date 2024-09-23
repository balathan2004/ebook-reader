/**
 * 
 * 
 * import { NextResponse } from "next/server";

export default function middleware(request) {
  const { cookies, nextUrl } = request;
  const EBookUserId = cookies.get("EBookUserId").value ||false;

  const { pathname } = nextUrl;
  console.log(pathname, EBookUserId, "path uid");

  // If user is not authenticated and not already on the login page ("/"), redirect to login
  if (!EBookUserId) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user is authenticated and trying to access the login page, redirect them to home
  else {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

 */