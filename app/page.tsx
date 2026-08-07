"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  Trophy,
  Brain,
  Users,
  ShieldCheck,
  Clock,
  Target,
  Zap,
  CheckCircle
} from "lucide-react";


export default function Home(){


return (

<main className="
min-h-screen
bg-[#050816]
text-white
overflow-hidden
relative
">





{/* Background Glow */}


<div className="
absolute
w-[600px]
h-[600px]
bg-indigo-600
rounded-full
blur-[180px]
opacity-30
top-[-200px]
left-[-200px]
"/>



<div className="
absolute
w-[500px]
h-[500px]
bg-purple-600
rounded-full
blur-[180px]
opacity-30
bottom-[-200px]
right-[-150px]
"/>








{/* Navbar */}



<nav className="
relative
z-10
max-w-7xl
mx-auto
px-6
py-6
flex
justify-between
items-center
">


<div className="
flex
items-center
gap-3
">


<div className="
w-11
h-11
rounded-xl
bg-gradient-to-r
from-indigo-600
to-purple-600
flex
items-center
justify-center
">


<Brain size={25}/>


</div>



<h1 className="
text-2xl
font-bold
">

QuizPro

</h1>


</div>





<div className="
flex
gap-4
">


<Link

href="/login"

className="
px-5
py-2
rounded-xl
text-gray-300
hover:text-white
"

>

Login

</Link>




<Link

href="/register"

className="
px-5
py-2
rounded-xl
bg-white
text-black
font-semibold
"

>

Get Started

</Link>


</div>



</nav>









{/* Hero */}



<section className="
relative
z-10
max-w-7xl
mx-auto
px-6
pt-20
grid
lg:grid-cols-2
gap-16
items-center
">





<motion.div

initial={{opacity:0,x:-40}}

animate={{opacity:1,x:0}}

transition={{duration:.7}}

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


AI Powered Quiz Platform


</div>








<h1 className="
text-5xl
lg:text-7xl
font-bold
leading-tight
mt-8
">


Test Knowledge.

<br/>

<span className="
bg-gradient-to-r
from-indigo-400
to-purple-400
bg-clip-text
text-transparent
">

Win Challenges.

</span>


</h1>







<p className="
text-gray-400
text-xl
mt-6
max-w-xl
">


A next generation online assessment platform
where students learn, compete and improve
their skills through interactive quizzes.


</p>







<div className="
flex
gap-5
mt-10
">


<Link

href="/register"

className="
bg-gradient-to-r
from-indigo-600
to-purple-600
px-7
py-4
rounded-2xl
font-semibold
flex
items-center
gap-2
hover:scale-105
transition
"

>


Start Learning

<ArrowRight size={20}/>


</Link>





<Link

href="/login"

className="
border
border-white/20
px-7
py-4
rounded-2xl
font-semibold
hover:bg-white/10
"

>

Login

</Link>


</div>







{/* Stats */}



<div className="
grid
grid-cols-3
gap-5
mt-12
">


<div>

<h2 className="
text-3xl
font-bold
">

50K+

</h2>

<p className="text-gray-400">

Students

</p>


</div>



<div>

<h2 className="
text-3xl
font-bold
">

2M+

</h2>

<p className="text-gray-400">

Questions

</p>


</div>



<div>

<h2 className="
text-3xl
font-bold
">

98%

</h2>

<p className="text-gray-400">

Success

</p>


</div>



</div>





</motion.div>









{/* Quiz Card Preview */}




<motion.div

initial={{opacity:0,y:50}}

animate={{opacity:1,y:0}}

transition={{duration:.7}}

className="
relative
"


>


<div className="
bg-white/10
border
border-white/20
backdrop-blur-xl
rounded-3xl
p-8
shadow-2xl
">


<div className="
flex
justify-between
items-center
">


<h3 className="
text-xl
font-bold
">

Live Quiz

</h3>


<div className="
bg-red-500/20
text-red-400
px-3
py-1
rounded-full
text-sm
">

02:45

</div>


</div>





<p className="
mt-8
text-lg
font-semibold
">

Which technology is used for AI?


</p>






<div className="
space-y-3
mt-6
">


{
[
"React",
"Artificial Intelligence",
"HTML",
"CSS"
].map((item,index)=>(


<div

key={item}

className={`
p-4
rounded-xl
border
border-white/10
${index===1
?
"bg-indigo-600"
:
"bg-white/5"
}
`}

>


{item}


</div>


))

}



</div>





<button className="
w-full
mt-6
bg-white
text-black
py-3
rounded-xl
font-semibold
">


Submit Answer


</button>




</div>


</motion.div>





</section>









{/* Features */}



<section className="
max-w-7xl
mx-auto
px-6
py-24
">


<h2 className="
text-center
text-4xl
font-bold
">


Everything you need to master skills


</h2>





<div className="
grid
md:grid-cols-3
gap-6
mt-12
">


{

[
{
icon:Brain,
title:"Smart Quizzes",
desc:"AI powered questions and assessments"
},
{
icon:Trophy,
title:"Leaderboard",
desc:"Compete and rank globally"
},
{
icon:Clock,
title:"Real Time Tests",
desc:"Timed exams with analytics"
}

].map((item)=>{


const Icon=item.icon;


return (

<div

key={item.title}

className="
bg-white/10
border
border-white/20
rounded-3xl
p-7
hover:scale-105
transition
"


>


<Icon size={35}/>


<h3 className="
text-xl
font-bold
mt-5
">

{item.title}

</h3>


<p className="
text-gray-400
mt-3
">

{item.desc}

</p>


</div>

)

})

}


</div>



</section>









{/* CTA */}



<section className="
max-w-5xl
mx-auto
px-6
pb-24
">


<div className="
bg-gradient-to-r
from-indigo-600
to-purple-600
rounded-3xl
p-10
text-center
">


<h2 className="
text-4xl
font-bold
">


Ready to start your journey?


</h2>


<p className="
mt-4
text-white/80
">


Join thousands of learners today.


</p>



<Link

href="/register"

className="
inline-flex
mt-7
bg-white
text-black
px-7
py-3
rounded-xl
font-semibold
items-center
gap-2
"


>


Create Free Account

<ArrowRight size={18}/>


</Link>


</div>


</section>








</main>


)

}
