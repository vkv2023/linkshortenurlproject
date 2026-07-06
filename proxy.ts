import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\.[\\w]+$).*)", "/__clerk/:path*"],
};
