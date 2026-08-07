"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import { toast } from "sonner";



export default function RegisterPage(){


const router = useRouter();


const [loading,setLoading] = useState(false);

const [showPassword,setShowPassword] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);




const [formData,setFormData] = useState({

fullName:"",
email:"",
password:"",
confirmPassword:""

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

toast.error("Password must contain 8 characters");

return;

}





if(formData.password !== formData.confirmPassword){

toast.error("Passwords do not match");

return;

}





try{


setLoading(true);



const response = await fetch("/api/auth/register",{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

fullName:formData.fullName,

email:formData.email,

password:formData.password

})


});





const result = await response.json();





if(!response.ok){

toast.error(result.message);

return;

}




toast.success("Account created successfully 🚀");


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


<main className="
min-h-screen
relative
overflow-hidden
bg-[#050816]
flex
items-center
justify-center
px-6
py-10
">





{/* Glow Background */}


<div className="
absolute
w-[500px]
h-[500px]
bg-purple-600
rounded-full
blur-[160px]
opacity-30
top-[-200px]
right-[-200px]
"/>


<div className="
absolute
w-[400px]
h-[400px]
bg-indigo-600
rounded-full
blur-[150px]
opacity-30
bottom-[-150px]
left-[-100px]
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

Join Quiz Revolution


</div>








<h1 className="
text-5xl
lg:text-6xl
font-bold
mt-8
leading-tight
">


Create.

Learn.

<br/>

Compete.


</h1>






<p className="
text-gray-400
text-lg
mt-6
max-w-xl
">


Build your skills with interactive quizzes,
real-time challenges and performance analytics.


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


<GraduationCap/>


<h3 className="text-xl font-bold mt-3">

50K+

</h3>


<p className="text-gray-400 text-sm">

Learners

</p>


</div>





<div className="
bg-white/10
border
border-white/10
rounded-2xl
p-4
">


<Trophy/>


<h3 className="text-xl font-bold mt-3">

100K+

</h3>


<p className="text-gray-400 text-sm">

Challenges

</p>


</div>






<div className="
bg-white/10
border
border-white/10
rounded-2xl
p-4
">


<ShieldCheck/>


<h3 className="text-xl font-bold mt-3">

100%

</h3>


<p className="text-gray-400 text-sm">

Secure

</p>


</div>



</div>






</motion.div>









{/* REGISTER CARD */}




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



<div className="text-white mb-7">



<div className="
w-14
h-14
rounded-2xl
bg-purple-600
flex
items-center
justify-center
mb-5
">


<GraduationCap size={30}/>


</div>



<h2 className="
text-3xl
font-bold
">

Create Account

</h2>


<p className="
text-gray-400
mt-2
">

Start your quiz journey

</p>



</div>







<form

onSubmit={handleRegister}

className="space-y-4"

>








{/* Name */}


<div>


<label className="text-gray-300">

Full Name

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


<User
size={18}
className="text-gray-400"
/>



<input

placeholder="John Doe"

className="
bg-transparent
outline-none
w-full
p-3
text-white
"


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


<Mail
size={18}
className="text-gray-400"
/>



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









{/* Password */}



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

>

{

showPassword ?

<EyeOff size={18}/> :

<Eye size={18}/>

}


</button>


</div>


</div>








{/* Confirm */}



<div>


<label className="text-gray-300">

Confirm Password

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


<Lock size={18}/>




<input

type={showConfirm?"text":"password"}

placeholder="********"

className="
bg-transparent
outline-none
w-full
p-3
text-white
"


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

onClick={()=>setShowConfirm(!showConfirm)}

>


{

showConfirm ?

<EyeOff size={18}/> :

<Eye size={18}/>

}


</button>



</div>


</div>









<button

disabled={loading}

className="
w-full
mt-3
bg-gradient-to-r
from-purple-600
to-indigo-600
text-white
py-3
rounded-xl
font-semibold
flex
justify-center
items-center
gap-2
hover:scale-[1.02]
transition
"


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









<div className="
text-center
mt-7
text-gray-400
">


Already have account?


<Link

href="/login"

className="
text-purple-400
font-semibold
ml-2
"

>

Login

</Link>


</div>




</motion.div>







</div>







</main>


);


}
