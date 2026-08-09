import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  request: Request
) {
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

    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          message:
            "Supabase environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      }
    );

    if (error) {
      return NextResponse.json(
        {
          message:
            error.message ||
            "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        {
          message:
            "Unable to login.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Login successful.",
        user: {
          id: data.user.id,
          email:
            data.user.email,
        },
        session:
          data.session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
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

