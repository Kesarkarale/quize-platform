import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
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

    if (password.length < 8) {
      return NextResponse.json(
        {
          message:
            "Password must contain at least 8 characters.",
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

    /*
     * Create Supabase Auth user
     */

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
      console.error("Supabase register error:", error);

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
          message: "Unable to create account.",
        },
        { status: 500 }
      );
    }

    /*
     * Create profile
     */

    const { error: profileError } =
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
        role: "STUDENT",
        status: "ACTIVE",
      });

    if (profileError) {
      console.error(
        "Profile creation error:",
        profileError
      );

      /*
       * If profile creation fails,
       * remove auth user to avoid
       * half-created accounts.
       */

      await supabase.auth.admin.deleteUser(
        data.user.id
      );

      return NextResponse.json(
        {
          message:
            "Account could not be created. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: {
          id: data.user.id,
          name,
          email,
          role: "STUDENT",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);

    return NextResponse.json(
      {
        message:
          "Something went wrong while creating your account.",
      },
      { status: 500 }
    );
  }
}

