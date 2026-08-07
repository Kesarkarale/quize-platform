"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";

import { createClient } from "@/lib/supabase/client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";


export default function LoginPage() {


  const router = useRouter();

  const supabase = createClient();


  const [loading,setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);



  const [formData,setFormData] = useState({

    email:"",
    password:""

  });



  async function handleLogin(e:FormEvent){

    e.preventDefault();



    if(!formData.email || !formData.password){

      toast.error("Please fill all fields");

      return;

    }



    try{


      setLoading(true);



      const {error}=await supabase.auth.signInWithPassword({

        email:formData.email,

        password:formData.password

      });



      if(error){

        toast.error(error.message);

        return;

      }



      toast.success("Login Successful");



      router.push("/student/dashboard");



    }
    catch{

      toast.error("Something went wrong");

    }
    finally{

      setLoading(false);

    }


  }



  return (


    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">



      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">



        {/* Logo */}


        <div className="text-center mb-8">


          <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">

            <ShieldCheck size={35}/>

          </div>



          <h1 className="text-4xl font-bold mt-5 text-gray-900">

            Welcome Back

          </h1>



          <p className="text-gray-500 mt-2">

            Login to Quiz Platform

          </p>


        </div>






        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >





          {/* Email */}


          <div>


            <label className="font-medium text-gray-700">

              Email Address

            </label>



            <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-indigo-500">


              <Mail
                size={18}
                className="text-gray-400"
              />


              <input

                type="email"

                placeholder="example@gmail.com"

                className="w-full p-3 outline-none"

                value={formData.email}



                onChange={(e)=>

                  setFormData({

                    ...formData,

                    email:e.target.value

                  })

                }


              />



            </div>


          </div>







          {/* Password */}


          <div>


            <div className="flex justify-between">


              <label className="font-medium text-gray-700">

                Password

              </label>


              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >

                Forgot?

              </Link>


            </div>





            <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-indigo-500">


              <Lock
                size={18}
                className="text-gray-400"
              />



              <input

                type={showPassword ? "text":"password"}

                placeholder="********"

                className="w-full p-3 outline-none"


                value={formData.password}



                onChange={(e)=>

                  setFormData({

                    ...formData,

                    password:e.target.value

                  })

                }


              />





              <button

                type="button"

                onClick={()=>setShowPassword(!showPassword)}

              >


                {
                  showPassword ?

                  <EyeOff size={18}/> :

                  <Eye size={18}/>

                }


              </button>




            </div>


          </div>







          {/* Button */}



          <button

            disabled={loading}

            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"

          >


            {

              loading ?

              <Loader2 className="animate-spin"/> :

              <>

              Login

              <ArrowRight size={18}/>

              </>

            }


          </button>





        </form>







        <div className="text-center mt-7 text-gray-600">


          Don't have an account?


          <Link

            href="/register"

            className="text-indigo-600 font-semibold ml-2"

          >

            Create Account

          </Link>



        </div>




      </div>



    </main>


  );

}
