import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      console.error("Supabase login error:", error);

      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful.",
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        message:
          "Something went wrong while logging in.",
      },
      { status: 500 }
    );
  }
}

