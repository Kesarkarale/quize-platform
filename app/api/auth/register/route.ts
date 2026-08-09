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

    const name = String(body.name || "").trim();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Please fill all fields.",
        },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        {
          message: "Please enter a valid name.",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        {
          message: "Please enter a valid email.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message:
            "Password must contain at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const { data, error } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,

        user_metadata: {
          name,
        },
      });

    if (error) {
      console.error(
        "Supabase Auth Error:",
        error
      );

      if (
        error.message
          .toLowerCase()
          .includes("already")
      ) {
        return NextResponse.json(
          {
            message:
              "An account with this email already exists.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        {
          message:
            "Unable to create account.",
        },
        { status: 500 }
      );
    }

    const { error: profileError } =
      await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name,
          email,
          role: "STUDENT",
          status: "ACTIVE",
        });

    if (profileError) {
      console.error(
        "Profile Error:",
        profileError
      );

      await supabase.auth.admin.deleteUser(
        data.user.id
      );

      return NextResponse.json(
        {
          message:
            "Account profile could not be created.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          "Account created successfully.",

        user: {
          id: data.user.id,
          name,
          email,
          role: "STUDENT",
          status: "ACTIVE",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Register API Error:",
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
