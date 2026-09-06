import { NextResponse, type NextRequest } from "next/server";

const IS_PRODUCTION = process.env.SITE_ENV === "production";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!IS_PRODUCTION) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/", "/ai-solutions", "/forward-deployed-engineering"],
};
