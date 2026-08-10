import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  /*
   * Do not crash the application if
   * environment variables are missing.
   */
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Supabase environment variables are missing."
    );

    return response;
  }

  /*
   * Create Supabase server client.
   */
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
            }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }) => {
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

  /*
   * IMPORTANT:
   * getUser() validates the authenticated
   * user with Supabase.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  /*
   * Never protect API routes here.
   */
  if (pathname.startsWith("/api")) {
    return response;
  }

  /*
   * Public routes.
   */
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const isPublicRoute =
    publicRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`
        )
    );

  /*
   * Quiz pages can be viewed publicly.
   * Actual quiz attempt should be protected
   * inside the quiz/start API.
   */
  const isQuizRoute =
    pathname === "/quiz" ||
    pathname.startsWith("/quiz/");

  /*
   * If user is not logged in and tries
   * to access a protected page.
   */
  if (
    !user &&
    !isPublicRoute &&
    !isQuizRoute
  ) {
    const loginUrl =
      new URL(
        "/login",
        request.url
      );

    /*
     * After login, return the user to
     * the page they originally requested.
     */
    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(
      loginUrl
    );
  }

  /*
   * Logged-in user should not stay on
   * login/register pages.
   *
   * Default destination = Student Dashboard.
   *
   * Admin role is checked below.
   */
  if (
    user &&
    (pathname === "/login" ||
      pathname === "/register")
  ) {
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle();

    if (
      profile?.role === "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/admin/dashboard",
          request.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        "/student/dashboard",
        request.url
      )
    );
  }

  /*
   * ADMIN ROUTES
   */
  if (
    user &&
    pathname.startsWith("/admin")
  ) {
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle();

    /*
     * No profile = don't allow admin access.
     */
    if (!profile) {
      return NextResponse.redirect(
        new URL(
          "/student/dashboard",
          request.url
        )
      );
    }

    /*
     * Inactive account.
     */
    if (
      profile.status &&
      profile.status !== "ACTIVE"
    ) {
      await supabase.auth.signOut();

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }

    /*
     * Only ADMIN can access /admin.
     */
    if (
      profile.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          "/student/dashboard",
          request.url
        )
      );
    }
  }

  /*
   * STUDENT ROUTES
   */
  if (
    user &&
    pathname.startsWith("/student")
  ) {
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle();

    /*
     * If profile doesn't exist,
     * don't create a redirect loop.
     */
    if (!profile) {
      return response;
    }

    /*
     * Inactive student.
     */
    if (
      profile.status &&
      profile.status !== "ACTIVE"
    ) {
      await supabase.auth.signOut();

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }

    /*
     * Admin should use admin dashboard.
     */
    if (
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
    /*
     * Run middleware on application pages,
     * but skip Next.js internals and static files.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
