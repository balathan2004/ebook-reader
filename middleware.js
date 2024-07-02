import { NextResponse } from "next/server";

export default function middleware(request) {
  const { cookies, nextUrl } = request;
  let EBookUserId = cookies.get("EBookUserId")
    ? cookies.get("EBookUserId").value
    : false;

  const { pathname } = nextUrl;

  if (pathname == "/") {
    if (EBookUserId) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}
