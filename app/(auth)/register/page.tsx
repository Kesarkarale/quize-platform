"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

import { toast } from "sonner";


export default function RegisterPage() {


  const router = useRouter();


  const [loading,setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);

  const [showConfirmPassword,setShowConfirmPassword] = useState(false);



  const [formData,setFormData] = useState({

    fullName:"",
    email:"",
    password:"",
    confirmPassword:"",

  });





  async function handleRegister(e:FormEvent){


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

      toast.error(
        "Password must be minimum 8 characters"
      );

      return;

    }





    if(formData.password !== formData.confirmPassword){

      toast.error(
        "Passwords do not match"
      );

      return;

    }



    try{


      setLoading(true);



      const response = await fetch(
        "/api/auth/register",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({

            fullName:formData.fullName,

            email:formData.email,

            password:formData.password,

          })

        }
      );




      const result = await response.json();




      if(!response.ok){

        toast.error(result.message);

        return;

      }





      toast.success(
        "Account created successfully"
      );



      router.push("/login");




    }
    catch{


      toast.error(
        "Something went wrong"
      );


    }
    finally{


      setLoading(false);


    }


  }





return (

<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">



<div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">





{/* Header */}


<div className="text-center mb-8">


<div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">


<GraduationCap size={35}/>


</div>



<h1 className="text-4xl font-bold text-gray-900 mt-5">

Create Account

</h1>



<p className="text-gray-500 mt-2">

Join Quiz Platform today

</p>


</div>






<form
onSubmit={handleRegister}
className="space-y-5"
>



{/* Full Name */}


<div>


<label className="font-medium text-gray-700">

Full Name

</label>



<div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-indigo-500">


<User
size={18}
className="text-gray-400"
/>



<input

type="text"

placeholder="Enter your name"

className="w-full p-3 outline-none"


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


<label className="font-medium text-gray-700">

Password

</label>




<div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-indigo-500">


<Lock
size={18}
className="text-gray-400"
/>



<input

type={showPassword ? "text":"password"}

placeholder="Minimum 8 characters"

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









{/* Confirm Password */}



<div>


<label className="font-medium text-gray-700">

Confirm Password

</label>




<div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-indigo-500">


<Lock
size={18}
className="text-gray-400"
/>



<input

type={
showConfirmPassword
?
"text"
:
"password"
}

placeholder="Confirm password"

className="w-full p-3 outline-none"



value={formData.confirmPassword}



onChange={(e)=>

setFormData({

...formData,

confirmPassword:e.target.value

})

}


/>




<button

type="button"

onClick={()=>

setShowConfirmPassword(
!showConfirmPassword
)

}

>


{

showConfirmPassword ?

<EyeOff size={18}/> :

<Eye size={18}/>

}


</button>



</div>


</div>








{/* Button */}



<button

disabled={loading}

className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition"

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







{/* Benefits */}


<div className="mt-6 space-y-2">


<p className="flex items-center gap-2 text-sm text-gray-600">

<CheckCircle
size={16}
className="text-green-500"
/>

Secure account

</p>


<p className="flex items-center gap-2 text-sm text-gray-600">

<CheckCircle
size={16}
className="text-green-500"
/>

Access online quizzes

</p>


</div>








<div className="text-center mt-7 text-gray-600">


Already have an account?


<Link

href="/login"

className="text-indigo-600 font-semibold ml-2"

>

Login

</Link>


</div>




</div>


</main>


);

}
