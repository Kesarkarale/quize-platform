import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Name, email and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "student",
          },
        },
      });

    if (error) {
      console.error("Supabase register error:", error);

      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Account created successfully.",
        user: data.user,
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
 
