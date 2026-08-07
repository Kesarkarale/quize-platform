"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { createClient } from "@/lib/supabase/client";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";


export default function RegisterPage() {

  const router = useRouter();

  const supabase = createClient();


  const [loading, setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);



  const [formData,setFormData] = useState({

    fullName:"",
    email:"",
    password:"",
    confirmPassword:"",

  });



  async function handleRegister(e: FormEvent){

    e.preventDefault();



    if(
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ){

      toast.error("Please fill all fields");

      return;

    }



    if(formData.password.length < 8){

      toast.error("Password must be at least 8 characters");

      return;

    }



    if(formData.password !== formData.confirmPassword){

      toast.error("Passwords do not match");

      return;

    }



    try{


      setLoading(true);



      const {error}=await supabase.auth.signUp({

        email:formData.email,

        password:formData.password,


        options:{

          data:{

            full_name:formData.fullName,

            role:"student"

          }

        }

      });



      if(error){

        toast.error(error.message);

        return;

      }



      toast.success(
        "Registration successful. Check your email."
      );


      router.push("/login");



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


<div className="text-center mb-8">

<h1 className="text-4xl font-bold">
Create Account
</h1>

<p className="text-gray-500 mt-2">
Join Quiz Platform
</p>

</div>



<form
onSubmit={handleRegister}
className="space-y-5"
>



<div>

<label className="font-medium">
Full Name
</label>


<div className="flex items-center border rounded-xl px-4 mt-2">


<User size={18}/>


<input

className="w-full p-3 outline-none"

placeholder="John Doe"

value={formData.fullName}


onChange={(e)=>

setFormData({

...formData,

fullName:e.target.value

})

}

/>


</div>

</div>





<div>

<label className="font-medium">
Email
</label>


<div className="flex items-center border rounded-xl px-4 mt-2">


<Mail size={18}/>


<input

type="email"

className="w-full p-3 outline-none"

placeholder="john@gmail.com"


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





<div>

<label className="font-medium">
Password
</label>


<div className="flex items-center border rounded-xl px-4 mt-2">


<Lock size={18}/>



<input

type={showPassword ? "text":"password"}

className="w-full p-3 outline-none"

placeholder="********"


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





<div>


<label className="font-medium">
Confirm Password
</label>


<div className="flex items-center border rounded-xl px-4 mt-2">


<Lock size={18}/>


<input

type={showPassword ? "text":"password"}

className="w-full p-3 outline-none"


placeholder="********"


value={formData.confirmPassword}



onChange={(e)=>

setFormData({

...formData,

confirmPassword:e.target.value

})

}


/>


</div>


</div>





<button

disabled={loading}

className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl py-3 flex justify-center items-center gap-2"

>


{

loading ?

<Loader2 className="animate-spin"/> :

<>

Create Account

<ArrowRight size={18}/>

</>

}


</button>



</form>





<div className="text-center mt-6">


Already have an account?


<Link

href="/login"

className="text-indigo-600 ml-2 font-semibold"

>

Login

</Link>


</div>



</div>


</main>


);


}
