import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        {
          message:
            "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Supabase server environment variables are missing."
      );

      return NextResponse.json(
        {
          message:
            "Server configuration error.",
        },
        { status: 500 }
      );
    }

    /*
     * Server-side Supabase client.
     * Service role key MUST remain server-side.
     */
    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    /*
     * Authenticate user using Supabase Auth.
     */
    const {
      data: authData,
      error: authError,
    } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          message:
            authError?.message ||
            "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const userId =
      authData.user.id;

    /*
     * Get user's role from profiles.
     */
    const {
      data: profile,
      error: profileError,
    } =
      await supabase
        .from("profiles")
        .select(
          "id, name, email, role, status"
        )
        .eq("id", userId)
        .maybeSingle();

    if (profileError) {
      console.error(
        "Profile error:",
        profileError
      );

      return NextResponse.json(
        {
          message:
            "Unable to load user profile.",
        },
        { status: 500 }
      );
    }

    /*
     * Profile doesn't exist.
     */
    if (!profile) {
      return NextResponse.json(
        {
          message:
            "User profile not found. Please contact administrator.",
        },
        { status: 404 }
      );
    }

    /*
     * Account status.
     */
    if (
      profile.status &&
      profile.status !== "ACTIVE"
    ) {
      return NextResponse.json(
        {
          message:
            "Your account is inactive.",
        },
        { status: 403 }
      );
    }

    /*
     * Role validation.
     */
    if (
      profile.role !== "ADMIN" &&
      profile.role !== "STUDENT"
    ) {
      return NextResponse.json(
        {
          message:
            "User role is not configured correctly.",
        },
        { status: 403 }
      );
    }

    /*
     * Return user + role to Login Page.
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "Login successful.",

        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          status: profile.status,
        },

        /*
         * Useful if you later need it.
         */
        authUserId: authData.user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "LOGIN API ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Something went wrong during login.",
      },
      { status: 500 }
    );
  }
}
