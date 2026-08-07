import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function POST(req: Request) {


  try {


    const body = await req.json();


    const {
      fullName,
      email,
      password
    } = body;



    if(!fullName || !email || !password){


      return NextResponse.json(

        {
          message:"Please fill all fields"
        },

        {
          status:400
        }

      );

    }




    if(password.length < 8){


      return NextResponse.json(

        {
          message:"Password must be at least 8 characters"
        },

        {
          status:400
        }

      );

    }




    const supabase = await createClient();




    const { data, error } =

      await supabase.auth.signUp({


        email,

        password,


        options:{


          data:{


            full_name: fullName,


            role:"student"


          }


        }


      });






    if(error){


      return NextResponse.json(

        {
          message:error.message
        },

        {
          status:400
        }

      );

    }






    return NextResponse.json(

      {

        message:"Registration successful",

        user:data.user

      },

      {

        status:201

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
