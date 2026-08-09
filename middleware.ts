import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Prevent middleware from crashing during
  // build/deployment when env variables are missing.
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Supabase environment variables are missing."
    );

    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
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
              request.cookies.set(
                name,
                value
              );

              response = NextResponse.next(
                {
                  request,
                }
              );

              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  /*
   * Public routes
   */

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  /*
   * Authentication routes
   */

  if (
    user &&
    (pathname === "/login" ||
      pathname === "/register")
  ) {
    return NextResponse.redirect(
      new URL(
        "/student/dashboard",
        request.url
      )
    );
  }

  /*
   * Protected routes
   */

  const isStudentRoute =
    pathname.startsWith("/student");

  const isAdminRoute =
    pathname.startsWith("/admin");

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /*
   * If user is logged in, check profile role
   */

  if (
    user &&
    (isStudentRoute || isAdminRoute)
  ) {
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle();

    /*
     * Profile doesn't exist
     */

    if (!profile) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    /*
     * Inactive account
     */

    if (profile.status !== "ACTIVE") {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    /*
     * Student trying to access Admin
     */

    if (
      isAdminRoute &&
      profile.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/student/dashboard",
          request.url
        )
      );
    }

    /*
     * Admin trying to access Student
     */

    if (
      isStudentRoute &&
      profile.role === "ADMIN"
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
