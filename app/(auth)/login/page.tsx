"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sparkles,
  Trophy,
  Users,
  Brain,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";



export default function LoginPage(){


const router = useRouter();


const [loading,setLoading]=useState(false);

const [showPassword,setShowPassword]=useState(false);



const [formData,setFormData]=useState({

email:"",
password:""

});






async function handleLogin(e:FormEvent){


e.preventDefault();



if(!formData.email || !formData.password){

toast.error("Please enter email and password");

return;

}



try{


setLoading(true);



const response = await fetch("/api/auth/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(formData)

});




const result = await response.json();



if(!response.ok){

toast.error(result.message);

return;

}



toast.success("Welcome back 🎉");


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

<main className="
min-h-screen
relative
overflow-hidden
bg-[#050816]
flex
items-center
justify-center
px-6
">





{/* Background Glow */}


<div className="
absolute
w-[500px]
h-[500px]
bg-indigo-600
rounded-full
blur-[150px]
opacity-30
top-[-200px]
left-[-200px]
"/>


<div className="
absolute
w-[400px]
h-[400px]
bg-purple-600
rounded-full
blur-[150px]
opacity-30
bottom-[-150px]
right-[-100px]
"/>








<div className="
relative
z-10
max-w-7xl
w-full
grid
lg:grid-cols-2
gap-16
items-center
">






{/* LEFT SIDE */}



<motion.div

initial={{opacity:0,x:-50}}

animate={{opacity:1,x:0}}

transition={{duration:.6}}

className="text-white"

>



<div className="
inline-flex
items-center
gap-2
bg-white/10
border
border-white/20
px-4
py-2
rounded-full
backdrop-blur
">


<Sparkles size={18}/>

Next Generation Quiz Platform


</div>







<h1 className="
text-5xl
lg:text-6xl
font-bold
mt-8
leading-tight
">


Master Your Skills.

<br/>

Win Every Challenge.


</h1>







<p className="
text-gray-400
text-lg
mt-6
max-w-xl
">


A powerful online assessment platform
built for students, teachers and organizations.


</p>








<div className="
grid
grid-cols-3
gap-4
mt-10
">



<div className="
bg-white/10
border
border-white/10
rounded-2xl
p-4
backdrop-blur
">


<Users/>

<h3 className="text-2xl font-bold mt-3">

50K+

</h3>

<p className="text-gray-400 text-sm">

Students

</p>


</div>





<div className="
bg-white/10
border
border-white/10
rounded-2xl
p-4
backdrop-blur
">


<Brain/>

<h3 className="text-2xl font-bold mt-3">

2M+

</h3>

<p className="text-gray-400 text-sm">

Questions

</p>


</div>






<div className="
bg-white/10
border
border-white/10
rounded-2xl
p-4
backdrop-blur
">


<Trophy/>

<h3 className="text-2xl font-bold mt-3">

98%

</h3>

<p className="text-gray-400 text-sm">

Success

</p>


</div>



</div>






</motion.div>









{/* LOGIN CARD */}



<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{duration:.6}}

className="
bg-white/10
border
border-white/20
backdrop-blur-xl
rounded-3xl
p-8
shadow-2xl
max-w-md
w-full
"



>




<div className="text-white mb-8">


<div className="
w-14
h-14
rounded-2xl
bg-indigo-600
flex
items-center
justify-center
mb-5
">


<ShieldCheck size={30}/>


</div>



<h2 className="
text-3xl
font-bold
">


Welcome Back


</h2>


<p className="
text-gray-400
mt-2
">


Login to continue your journey


</p>


</div>









<form
onSubmit={handleLogin}
className="space-y-5"
>





<div>


<label className="text-gray-300">

Email

</label>


<div className="
mt-2
flex
items-center
bg-white/10
border
border-white/20
rounded-xl
px-4
">


<Mail className="text-gray-400" size={18}/>



<input

type="email"

placeholder="you@gmail.com"

className="
bg-transparent
outline-none
w-full
p-3
text-white
"

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


<label className="text-gray-300">

Password

</label>



<div className="
mt-2
flex
items-center
bg-white/10
border
border-white/20
rounded-xl
px-4
">


<Lock
size={18}
className="text-gray-400"
/>



<input

type={showPassword?"text":"password"}

placeholder="********"

className="
bg-transparent
outline-none
w-full
p-3
text-white
"


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

className="text-gray-400"

>


{

showPassword ?

<EyeOff size={18}/>:

<Eye size={18}/>

}


</button>


</div>



</div>









<div className="flex justify-between text-sm">


<label className="text-gray-400 flex gap-2">


<input type="checkbox"/>

Remember me


</label>




<Link
href="/forgot-password"
className="text-indigo-400"
>

Forgot password?

</Link>


</div>







<button

disabled={loading}

className="
w-full
bg-gradient-to-r
from-indigo-600
to-purple-600
text-white
py-3
rounded-xl
font-semibold
flex
items-center
justify-center
gap-2
hover:scale-[1.02]
transition
"


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








<div className="
text-center
mt-8
text-gray-400
">


Don't have an account?


<Link

href="/register"

className="
text-indigo-400
font-semibold
ml-2
"

>

Create Account

</Link>


</div>





</motion.div>






</div>






</main>


);


}
