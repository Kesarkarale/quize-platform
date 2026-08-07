"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Brain,
  Trophy,
  Target,
  Clock,
  Flame,
  ArrowRight,
  Play,
  Award,
  BarChart3,
  CheckCircle,
  Star
} from "lucide-react";



export default function StudentDashboard(){



const stats=[

{
title:"Quizzes Completed",
value:"48",
icon:Brain
},

{
title:"Average Score",
value:"92%",
icon:Target
},

{
title:"Global Rank",
value:"#245",
icon:Trophy
},

{
title:"Learning Streak",
value:"12 Days",
icon:Flame
}

];





const quizzes=[

{
title:"JavaScript Master Challenge",
questions:"25 Questions",
time:"20 Minutes",
score:"95%"
},


{
title:"React Advanced Quiz",
questions:"30 Questions",
time:"25 Minutes",
score:"88%"
},


{
title:"Database Fundamentals",
questions:"20 Questions",
time:"15 Minutes",
score:"90%"
}

];





return (

<main className="
min-h-screen
bg-[#050816]
text-white
p-6
">





{/* Background */}


<div className="
fixed
w-[400px]
h-[400px]
bg-indigo-600
rounded-full
blur-[160px]
opacity-20
top-0
left-0
"/>







<div className="
relative
max-w-7xl
mx-auto
">






{/* Header */}


<div className="
flex
justify-between
items-center
mb-10
">


<div>


<p className="text-gray-400">

Good Morning 👋

</p>



<h1 className="
text-4xl
font-bold
mt-2
">

Welcome back, Student

</h1>


</div>





<Link

href="/quiz"

className="
bg-gradient-to-r
from-indigo-600
to-purple-600
px-6
py-3
rounded-xl
flex
items-center
gap-2
font-semibold
"


>


<Play size={18}/>

Start Quiz


</Link>



</div>









{/* Stats */}



<div className="
grid
md:grid-cols-4
gap-5
">



{

stats.map((item,index)=>{


const Icon=item.icon;


return (


<motion.div

key={item.title}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*.1
}}


className="
bg-white/10
border
border-white/20
backdrop-blur-xl
rounded-3xl
p-6
"


>



<div className="
w-12
h-12
rounded-xl
bg-indigo-600
flex
items-center
justify-center
">


<Icon size={25}/>


</div>



<h3 className="
text-3xl
font-bold
mt-5
">


{item.value}


</h3>



<p className="
text-gray-400
mt-2
">


{item.title}


</p>



</motion.div>


)


})


}



</div>









<div className="
grid
lg:grid-cols-3
gap-6
mt-10
">







{/* Recent Quiz */}



<div className="
lg:col-span-2
bg-white/10
border
border-white/20
rounded-3xl
p-7
">


<div className="
flex
justify-between
items-center
">


<h2 className="
text-2xl
font-bold
">

Recent Quizzes

</h2>



<Link

href="/student/quizzes"

className="
text-indigo-400
flex
items-center
gap-2
"

>

View All

<ArrowRight size={16}/>

</Link>


</div>







<div className="
space-y-4
mt-6
">


{

quizzes.map((quiz)=>(



<div

key={quiz.title}

className="
bg-white/5
border
border-white/10
rounded-2xl
p-5
flex
justify-between
items-center
"


>



<div>


<h3 className="
font-semibold
text-lg
">

{quiz.title}

</h3>


<div className="
flex
gap-5
text-sm
text-gray-400
mt-2
">


<span>

{quiz.questions}

</span>


<span>

{quiz.time}

</span>


</div>



</div>





<div className="
text-right
">


<p className="
text-green-400
font-bold
text-xl
">

{quiz.score}

</p>


<p className="text-gray-400 text-sm">

Score

</p>


</div>



</div>



))


}



</div>



</div>









{/* Profile Progress */}



<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-7
">


<h2 className="
text-2xl
font-bold
">

Your Progress

</h2>





<div className="
mt-8
text-center
">


<div className="
mx-auto
w-32
h-32
rounded-full
border-8
border-indigo-600
flex
items-center
justify-center
">


<h3 className="
text-3xl
font-bold
">

85%

</h3>


</div>



<p className="
text-gray-400
mt-5
">

Overall Completion

</p>



</div>







<div className="
mt-8
space-y-4
">



<p className="
flex
items-center
gap-3
text-gray-300
">


<CheckCircle
className="text-green-400"
/>


50+ quizzes attempted


</p>



<p className="
flex
items-center
gap-3
text-gray-300
">


<Award
className="text-yellow-400"
/>


5 achievements unlocked


</p>




<p className="
flex
items-center
gap-3
text-gray-300
">


<Star
className="text-purple-400"
/>


Top 5% learner


</p>



</div>



</div>








</div>










{/* Leaderboard */}



<div className="
mt-10
bg-white/10
border
border-white/20
rounded-3xl
p-7
">


<div className="
flex
items-center
gap-3
">


<Trophy
className="text-yellow-400"
/>


<h2 className="
text-2xl
font-bold
">

Leaderboard

</h2>


</div>





<div className="
grid
md:grid-cols-3
gap-5
mt-6
">



{

[
["Alex","98%"],
["John","96%"],
["You","92%"]

].map((user,index)=>(


<div

key={user[0]}

className="
bg-white/5
rounded-2xl
p-5
flex
justify-between
"


>


<span>

#{index+1} {user[0]}

</span>


<b>

{user[1]}

</b>


</div>


))


}



</div>


</div>






</div>


</main>


);

}s
