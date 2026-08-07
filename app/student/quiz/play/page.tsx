"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Clock,
  Trophy,
  ArrowRight,
  CheckCircle,
  XCircle,
  Flame,
  Brain
} from "lucide-react";

import { useRouter } from "next/navigation";



const questions = [

{
question:"Which language is used for building React applications?",
options:[
"Python",
"JavaScript",
"Java",
"C++"
],
answer:"JavaScript"
},


{
question:"What does SQL stand for?",
options:[
"Structured Query Language",
"Simple Query Language",
"Style Query Language",
"System Query Language"
],
answer:"Structured Query Language"
},


{
question:"Which company created Next.js?",
options:[
"Google",
"Facebook",
"Vercel",
"Microsoft"
],
answer:"Vercel"
},


{
question:"Which hook is used for state management in React?",
options:[
"useState",
"useRouter",
"useFetch",
"usePage"
],
answer:"useState"
}

];





export default function QuizPlayPage(){



const router = useRouter();


const [current,setCurrent]=useState(0);

const [selected,setSelected]=useState("");

const [score,setScore]=useState(0);

const [time,setTime]=useState(60);

const [finished,setFinished]=useState(false);







useEffect(()=>{


if(time<=0){

finishQuiz();

return;

}


const timer=setInterval(()=>{


setTime(prev=>prev-1);


},1000);



return ()=>clearInterval(timer);



},[time]);







function selectAnswer(option:string){


setSelected(option);



if(option===questions[current].answer){

setScore(prev=>prev+1);

}


}





function nextQuestion(){



if(current < questions.length-1){


setCurrent(prev=>prev+1);

setSelected("");


}

else{


finishQuiz();


}


}





function finishQuiz(){


setFinished(true);


}







if(finished){


return (

<main className="
min-h-screen
bg-[#050816]
text-white
flex
items-center
justify-center
px-5
">


<motion.div

initial={{scale:.7,opacity:0}}

animate={{scale:1,opacity:1}}

className="
bg-white/10
border
border-white/20
backdrop-blur-xl
rounded-3xl
p-10
text-center
max-w-md
"


>


<Trophy
size={60}
className="
mx-auto
text-yellow-400
"
/>



<h1 className="
text-4xl
font-bold
mt-5
">

Quiz Completed 🎉

</h1>


<p className="
text-gray-400
mt-4
">

Your Score

</p>



<h2 className="
text-5xl
font-bold
mt-3
">

{score}/{questions.length}

</h2>




<button

onClick={()=>router.push("/student/dashboard")}

className="
mt-8
bg-indigo-600
px-6
py-3
rounded-xl
"

>


Back Dashboard


</button>


</motion.div>


</main>

)


}







return (

<main className="
min-h-screen
bg-[#050816]
text-white
px-5
py-10
">






<div className="
max-w-4xl
mx-auto
">





{/* Header */}



<div className="
flex
justify-between
items-center
mb-8
">


<div className="
flex
items-center
gap-3
">


<div className="
bg-indigo-600
p-3
rounded-xl
">


<Brain/>

</div>


<div>


<h1 className="
text-2xl
font-bold
">

React Master Quiz

</h1>


<p className="
text-gray-400
">

Question {current+1}/{questions.length}

</p>


</div>


</div>







<div className="
flex
items-center
gap-2
bg-white/10
px-5
py-3
rounded-xl
">


<Clock
className="
text-red-400
"
/>


<span className="
font-bold
">

00:{time}

</span>


</div>


</div>









{/* Progress */}



<div className="
w-full
bg-white/10
h-3
rounded-full
overflow-hidden
mb-10
">


<motion.div

animate={{

width:`${((current+1)/questions.length)*100}%`

}}

className="
h-full
bg-gradient-to-r
from-indigo-500
to-purple-500
"


/>


</div>









{/* Question Card */}



<AnimatePresence mode="wait">


<motion.div

key={current}

initial={{
opacity:0,
x:50
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:-50
}}


className="
bg-white/10
border
border-white/20
rounded-3xl
p-8
backdrop-blur-xl
"


>


<h2 className="
text-2xl
font-bold
mb-8
">


{questions[current].question}


</h2>








<div className="
space-y-4
">


{

questions[current].options.map((option)=>(


<motion.button


whileTap={{
scale:.97
}}



key={option}

onClick={()=>selectAnswer(option)}


className={`
w-full
text-left
p-5
rounded-2xl
border
transition

${
selected===option

?

"bg-indigo-600 border-indigo-400"

:

"bg-white/5 border-white/10 hover:bg-white/10"

}

`}



>


<div className="
flex
justify-between
items-center
">


<span>

{option}

</span>



{

selected===option &&

<CheckCircle size={20}/>

}



</div>


</motion.button>



))


}


</div>









<button


disabled={!selected}


onClick={nextQuestion}


className="
mt-8
w-full
bg-gradient-to-r
from-indigo-600
to-purple-600
py-4
rounded-xl
font-semibold
flex
justify-center
items-center
gap-2
disabled:opacity-50
"


>



{

current===questions.length-1

?

"Finish Quiz"

:

"Next Question"

}


<ArrowRight size={20}/>


</button>





</motion.div>



</AnimatePresence>









<div className="
flex
justify-center
gap-3
mt-8
text-gray-400
">


<Flame
className="text-orange-400"
/>


Keep your streak alive!


</div>






</div>


</main>


)

}
