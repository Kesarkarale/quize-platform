"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  Play,
  Search,
  Sparkles,
} from "lucide-react";

import { quizzes } from "@/lib/quiz-data";

export default function QuizPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "JavaScript",
    "React",
    "Python",
    "HTML",
  ];

  const filteredQuizzes = useMemo(() => {
    const query = search.toLowerCase().trim();

    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(query) ||
        quiz.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || quiz.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/student/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-black sm:text-3xl">
                  Explore Quizzes
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Choose a subject and test your knowledge.
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}

          <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm md:w-[300px] dark:border-white/10 dark:bg-[#101114]">
            <Search size={18} className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quizzes..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* FILTER */}

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                category === item
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 dark:border-white/10 dark:bg-[#101114] dark:text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* QUIZ GRID */}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredQuizzes.map((quiz) => {
            const difficultyClass =
              quiz.difficulty === "Easy"
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                : quiz.difficulty === "Medium"
                ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";

            return (
              <div
                key={quiz.id}
                className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#101114]"
              >
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-5">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                        <BookOpen size={21} />
                      </div>

                      <span className="rounded-lg bg-white/15 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                        {quiz.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-white/80">
                      <Clock3 size={14} />
                      <span className="text-[11px] font-semibold">
                        {quiz.duration} minutes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${difficultyClass}`}
                    >
                      {quiz.difficulty}
                    </span>

                    <span className="text-[10px] font-semibold text-gray-400">
                      {quiz.questions} Questions
                    </span>
                  </div>

                  <h2 className="mt-4 text-base font-black">
                    {quiz.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-400">
                    {quiz.description}
                  </p>

                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white transition hover:bg-indigo-700"
                  >
                    Start Quiz
                    <Play size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-gray-300 py-16 text-center dark:border-white/10">
            <Search
              size={32}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-sm font-bold">
              No quizzes found
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Try searching for another subject.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
