import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }) => {
              request.cookies.set({
                name,
                value,
                ...options,
              });

              response = NextResponse.next({
                request,
              });

              response.cookies.set({
                name,
                value,
                ...options,
              });
            }
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isStudentRoute =
    pathname.startsWith("/student");

  const isAdminRoute =
    pathname.startsWith("/admin");

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register";

  /*
   * Not logged in
   */

  if (
    !user &&
    (isStudentRoute || isAdminRoute)
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /*
   * Logged in user trying to access
   * login/register
   */

  if (user && isAuthRoute) {
    return NextResponse.redirect(
      new URL(
        "/student/dashboard",
        request.url
      )
    );
  }

  /*
   * Get profile for role protection
   */

  if (
    user &&
    (isStudentRoute || isAdminRoute)
  ) {
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role, status")
        .eq("id", user.id)
        .single();

    /*
     * Account inactive
     */

    if (
      profile?.status &&
      profile.status !== "ACTIVE"
    ) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    /*
     * Student trying admin route
     */

    if (
      isAdminRoute &&
      profile?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/student/dashboard",
          request.url
        )
      );
    }

    /*
     * Admin trying student route
     */

    if (
      isStudentRoute &&
      profile?.role === "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/admin/dashboard",
          request.url
        )
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};

