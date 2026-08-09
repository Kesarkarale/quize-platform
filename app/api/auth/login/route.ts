import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase environment variables are missing."
    );
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey
  );
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();

    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          message:
            "Please enter email and password.",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Authenticate user
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error || !data.user) {
      return NextResponse.json(
        {
          message:
            "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select(
          "id, name, email, role, status"
        )
        .eq("id", data.user.id)
        .single();

    if (profileError || !profile) {
      console.error(
        "Profile error:",
        profileError
      );

      return NextResponse.json(
        {
          message:
            "User profile was not found.",
        },
        { status: 404 }
      );
    }

    // Check account status
    if (profile.status !== "ACTIVE") {
      return NextResponse.json(
        {
          message:
            "Your account has been deactivated. Please contact the administrator.",
        },
        { status: 403 }
      );
    }

    // Successful login
    return NextResponse.json(
      {
        success: true,

        message: "Login successful.",

        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          status: profile.status,
        },

        session: data.session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Login API Error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Server configuration error. Please check Supabase environment variables.",
      },
      { status: 500 }
    );
  }
}

