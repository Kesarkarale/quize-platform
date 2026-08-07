"use client";

import Link from "next/link";

import {
  BookOpen,
  Brain,
  Clock,
  BarChart3,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";


export default function HomePage() {

  const features = [
    {
      icon: Brain,
      title: "Smart Quiz System",
      desc: "Create and attempt quizzes with an intelligent assessment platform."
    },
    {
      icon: Clock,
      title: "Real Time Exams",
      desc: "Take online exams with timer and instant submission."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      desc: "Track performance, scores and improvement reports."
    },
    {
      icon: ShieldCheck,
      title: "Secure Platform",
      desc: "Safe authentication and protected student data."
    },
    {
      icon: Users,
      title: "Student Management",
      desc: "Manage students, exams and results easily."
    },
    {
      icon: BookOpen,
      title: "Learning Hub",
      desc: "Practice quizzes and improve your knowledge."
    }
  ];


  return (

    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">


      {/* Navbar */}

      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">


        <h1 className="text-2xl font-bold text-indigo-600">
          QuizPro
        </h1>



        <div className="flex items-center gap-5">


          <Link
            href="/login"
            className="text-gray-700 hover:text-indigo-600"
          >
            Login
          </Link>


          <Link
            href="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
          >
            Register
          </Link>


        </div>


      </nav>





      {/* Hero Section */}


      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">


        <div>


          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
            Online Assessment Platform
          </span>



          <h1 className="text-5xl font-bold text-gray-900 mt-6 leading-tight">

            Test Your Knowledge.
            <br />

            Improve Your Skills.

          </h1>



          <p className="text-gray-600 mt-6 text-lg">

            A powerful quiz management platform for students,
            teachers and organizations to conduct online exams easily.

          </p>



          <div className="flex gap-4 mt-8">


            <Link
              href="/register"
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >

              Get Started

              <ArrowRight size={18}/>

            </Link>



            <Link
              href="/login"
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-white"
            >
              Login
            </Link>


          </div>



          <div className="mt-8 space-y-3">


            <p className="flex items-center gap-2 text-gray-700">

              <CheckCircle className="text-green-500" size={20}/>

              Instant Results

            </p>


            <p className="flex items-center gap-2 text-gray-700">

              <CheckCircle className="text-green-500" size={20}/>

              Secure Online Exams

            </p>


            <p className="flex items-center gap-2 text-gray-700">

              <CheckCircle className="text-green-500" size={20}/>

              Performance Tracking

            </p>


          </div>



        </div>






        {/* Right Card */}


        <div className="bg-white rounded-3xl shadow-2xl p-8">


          <div className="bg-indigo-600 rounded-2xl p-8 text-white">


            <h2 className="text-3xl font-bold">
              Start Your Quiz Journey
            </h2>


            <p className="mt-4 text-indigo-100">

              Join thousands of students and test your skills.

            </p>


            <div className="mt-8 grid grid-cols-2 gap-4">


              <div className="bg-white/20 rounded-xl p-4">

                <h3 className="text-2xl font-bold">
                  1000+
                </h3>

                <p>
                  Questions
                </p>

              </div>


              <div className="bg-white/20 rounded-xl p-4">

                <h3 className="text-2xl font-bold">
                  500+
                </h3>

                <p>
                  Students
                </p>

              </div>


            </div>


          </div>


        </div>


      </section>






      {/* Features */}


      <section className="max-w-7xl mx-auto px-8 py-16">


        <div className="text-center mb-12">


          <h2 className="text-4xl font-bold">

            Powerful Features

          </h2>


          <p className="text-gray-600 mt-3">

            Everything you need for online examinations

          </p>


        </div>




        <div className="grid md:grid-cols-3 gap-6">


          {
            features.map((item,index)=>{

              const Icon=item.icon;


              return (

                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 transition"
                >

                  <Icon
                    size={35}
                    className="text-indigo-600"
                  />


                  <h3 className="text-xl font-bold mt-4">

                    {item.title}

                  </h3>


                  <p className="text-gray-600 mt-2">

                    {item.desc}

                  </p>


                </div>

              )

            })
          }


        </div>


      </section>





      {/* Footer CTA */}


      <section className="text-center py-16">


        <h2 className="text-4xl font-bold">

          Ready to Start Your Assessment?

        </h2>


        <Link
          href="/register"
          className="inline-flex items-center gap-2 mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl"
        >

          Create Account

          <ArrowRight size={18}/>

        </Link>


      </section>



    </main>

  );

}
