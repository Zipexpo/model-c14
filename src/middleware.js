import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware
