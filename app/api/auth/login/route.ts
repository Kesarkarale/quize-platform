import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      email,
      password
    } = body;


    if(!email || !password){

      return NextResponse.json(
        {
          message:"Email and password required"
        },
        {
          status:400
        }
      );

    }



    const supabase = await createClient();



    const { data, error } =
      await supabase.auth.signInWithPassword({

        email,

        password,

      });




    if(error){

      return NextResponse.json(
        {
          message:error.message
        },
        {
          status:401
        }
      );

    }



    return NextResponse.json(
      {
        message:"Login successful",

        user:data.user
      },
      {
        status:200
      }
    );



  }
  catch(error){

    return NextResponse.json(
      {
        message:"Something went wrong"
      },
      {
        status:500
      }
    );

  }

}
