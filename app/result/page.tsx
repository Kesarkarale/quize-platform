"use client";

import Link from "next/link";
import {
  Brain,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Home,
  BarChart3,
} from "lucide-react";

const answers = [
  {
    question: "Which planet is known as the Red Planet?",
    yourAnswer: "Mars",
    correctAnswer: "Mars",
    correct: true,
  },
  {
    question: "What is the largest ocean on Earth?",
    yourAnswer: "Atlantic Ocean",
    correctAnswer: "Pacific Ocean",
    correct: false,
  },
  {
    question: "Who invented the World Wide Web?",
    yourAnswer: "Tim Berners-Lee",
    correctAnswer: "Tim Berners-Lee",
    correct: true,
  },
  {
    question: "Which language is primarily used for styling web pages?",
    yourAnswer: "HTML",
    correctAnswer: "CSS",
    correct: false,
  },
  {
    question: "How many continents are there in the world?",
    yourAnswer: "7",
    correctAnswer: "7",
    correct: true,
  },
];

export default function ResultPage() {
  const score = 3;
  const total = 5;
  const percentage = Math.round((score / total) * 100);

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <span className="font-extrabold">
              Quiz<span className="text-indigo-600">Master</span>
            </span>
          </Link>

          <Link
            href="/leaderboard"
            className="flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100"
          >
            <Trophy size={17} />
            Leaderboard
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Score Card */}
        <section className="overflow-hidden rounded-[32px] bg-gray-950 p-8 text-white shadow-2xl sm:p-12">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              <Trophy size={40} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-indigo-300">
              Quiz Completed
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Excellent Work! 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              You completed the General Knowledge Challenge.
            </p>

            {/* Score */}
            <div className="mx-auto mt-10 flex h-44 w-44 flex-col items-center justify-center rounded-full border-[10px] border-indigo-500 bg-white/5">
              <span className="text-5xl font-black">
                {percentage}%
              </span>
              <span className="mt-1 text-sm text-gray-400">
                Your Score
              </span>
            </div>

            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-2xl font-black text-green-400">
                  {score}
                </p>
                <p className="text-xs text-gray-400">Correct</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-2xl font-black text-red-400">
                  {total - score}
                </p>
                <p className="text-xs text-gray-400">Wrong</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-2xl font-black">
                  {total}
                </p>
                <p className="text-xs text-gray-400">Questions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/quiz"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white hover:bg-indigo-700"
          >
            <RotateCcw size={18} />
            Try Again
          </Link>

          <Link
            href="/leaderboard"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-700 hover:bg-gray-50"
          >
            <Trophy size={18} />
            View Leaderboard
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-700 hover:bg-gray-50"
          >
            <Home size={18} />
            Home
          </Link>
        </div>

        {/* Answer Review */}
        <section className="mt-10 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BarChart3 size={21} />
            </div>

            <div>
              <h2 className="text-xl font-black">
                Answer Review
              </h2>
              <p className="text-sm text-gray-400">
                Check your answers and learn from mistakes.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {answers.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-5 ${
                  item.correct
                    ? "border-green-100 bg-green-50/50"
                    : "border-red-100 bg-red-50/50"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      item.correct
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.correct ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <XCircle size={19} />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">
                      {index + 1}. {item.question}
                    </p>

                    <p className="mt-3 text-sm">
                      <span className="font-semibold">
                        Your answer:
                      </span>{" "}
                      {item.yourAnswer}
                    </p>

                    {!item.correct && (
                      <p className="mt-1 text-sm text-green-700">
                        <span className="font-semibold">
                          Correct answer:
                        </span>{" "}
                        {item.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
