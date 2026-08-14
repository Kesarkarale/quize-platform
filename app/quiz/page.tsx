"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Clock3,
  Home,
  LogOut,
  Menu,
  Play,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  User,
  X,
} from "lucide-react";

import { quizzes } from "@/lib/quiz-data";
import { createClient } from "@/lib/supabase/client";

export default function QuizPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================================
     SUPABASE
  ========================================================= */

  const supabase = createClient();

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigateTo = (path: string) => {
    setSidebarOpen(false);
    router.push(path);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(quizzes.map((quiz) => quiz.category))
    );

    return ["All", ...uniqueCategories];
  }, []);

  /* =========================================================
     FILTER QUIZZES
  ========================================================= */

  const filteredQuizzes = useMemo(() => {
    const query = search.toLowerCase().trim();

    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(query) ||
        quiz.category.toLowerCase().includes(query) ||
        quiz.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || quiz.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fafaff] to-[#f5f3ff] text-gray-900 transition-colors duration-300 dark:from-[#070708] dark:via-[#0b0b0d] dark:to-[#101014] dark:text-white">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[270px]
          border-r
          border-gray-200
          bg-white
          px-5
          py-6
          transition-transform
          duration-300
          dark:border-white/10
          dark:bg-[#101114]

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="flex items-center justify-between">

          <button
            type="button"
            onClick={() => navigateTo("/student/dashboard")}
            className="flex items-center gap-3 text-left"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz
                <span className="text-indigo-600 dark:text-indigo-400">
                  Pro
                </span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                Learning Platform
              </p>
            </div>

          </button>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================================
            MAIN MENU
        ================================================= */}

        <div className="mt-10">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">

            {/* DASHBOARD */}

            <SidebarItem
              icon={<Home size={19} />}
              label="Dashboard"
              onClick={() =>
                navigateTo("/student/dashboard")
              }
            />

            {/* EXPLORE QUIZZES */}

            <SidebarItem
              icon={<BookOpen size={19} />}
              label="Explore Quizzes"
              active
              onClick={() =>
                navigateTo("/quiz")
              }
            />

            {/* LEADERBOARD */}

            <SidebarItem
              icon={<Trophy size={19} />}
              label="Leaderboard"
              onClick={() =>
                navigateTo("/leaderboard")
              }
            />

            {/* PERFORMANCE */}

            <SidebarItem
              icon={<BarChart3 size={19} />}
              label="My Performance"
              onClick={() =>
                navigateTo("/student/performance")
              }
            />

          </nav>

        </div>

        {/* =================================================
            ACCOUNT
        ================================================= */}

        <div className="mt-8">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">

            <SidebarItem
              icon={<User size={19} />}
              label="Profile"
              onClick={() =>
                navigateTo("/student/profile")
              }
            />

            <SidebarItem
              icon={<Settings size={19} />}
              label="Settings"
              onClick={() =>
                navigateTo("/student/settings")
              }
            />

          </nav>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="absolute bottom-5 left-5 right-5">

          {/* STREAK */}

          <div className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Target size={18} />
              </div>

              <div>
                <p className="text-xs font-bold">
                  Keep learning!
                </p>

                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Your streak is 7 days
                </p>
              </div>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="lg:ml-[270px]">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="mb-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm dark:border-white/10 dark:bg-[#101114] dark:text-gray-300 lg:hidden"
              >
                <Menu size={18} />
                Menu
              </button>

              {/* BACK */}

              <Link
                href="/student/dashboard"
                className="mb-5 hidden items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 lg:inline-flex"
              >
                <ArrowLeft size={17} />
                Back to Dashboard
              </Link>

              {/* TITLE */}

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles size={22} />
                </div>

                <div>

                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                    Explore Quizzes
                  </h1>

                  <p className="mt-1 text-sm text-gray-400">
                    Choose a subject and test your knowledge.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-indigo-400 md:w-[320px] dark:border-white/10 dark:bg-[#101114]">

              <Search
                size={18}
                className="shrink-0 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search quizzes..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />

            </div>

          </div>

          {/* =================================================
              CATEGORY FILTER
          ================================================= */}

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                Categories
              </p>

              <p className="text-xs font-semibold text-gray-400">
                {filteredQuizzes.length} quizzes
              </p>

            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">

              {categories.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    category === item
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-[#101114] dark:text-gray-400 dark:hover:border-indigo-500/40 dark:hover:text-indigo-400"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* =================================================
              QUIZ GRID
          ================================================= */}

          {filteredQuizzes.length > 0 ? (

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
                    className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-white/10 dark:bg-[#101114] dark:hover:border-indigo-500/30"
                  >

                    {/* =================================================
                        CARD HEADER
                    ================================================= */}

                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-5">

                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                      <div className="absolute -bottom-10 -left-5 h-24 w-24 rounded-full bg-purple-300/10 blur-2xl" />

                      <div className="relative flex h-full flex-col justify-between">

                        <div className="flex items-center justify-between gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md transition group-hover:scale-105">
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

                    {/* =================================================
                        CARD CONTENT
                    ================================================= */}

                    <div className="p-5">

                      <div className="flex items-center justify-between gap-2">

                        <span
                          className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${difficultyClass}`}
                        >
                          {quiz.difficulty}
                        </span>

                        <span className="text-[10px] font-semibold text-gray-400">
                          {quiz.questions.length} Questions
                        </span>

                      </div>

                      <h2 className="mt-4 line-clamp-1 text-base font-black">
                        {quiz.title}
                      </h2>

                      <p className="mt-2 line-clamp-3 min-h-[60px] text-xs leading-5 text-gray-400">
                        {quiz.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/5">

                        <div>

                          <p className="text-[10px] text-gray-400">
                            Passing Score
                          </p>

                          <p className="mt-0.5 text-xs font-bold">
                            {quiz.passingScore}%
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-[10px] text-gray-400">
                            Questions
                          </p>

                          <p className="mt-0.5 text-xs font-bold">
                            {quiz.questions.length}
                          </p>

                        </div>

                      </div>

                      {/* START QUIZ */}

                      <Link
                        href={`/quiz/${quiz.id}`}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/10 transition hover:bg-indigo-700 hover:shadow-lg"
                      >
                        Start Quiz
                        <Play size={14} />
                      </Link>

                    </div>

                  </div>

                );

              })}

            </div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white/60 py-16 text-center dark:border-white/10 dark:bg-white/[0.02]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5">
                <Search size={28} />
              </div>

              <h3 className="mt-4 text-sm font-bold">
                No quizzes found
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Try searching for another subject or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
              >
                Clear Filters
              </button>

            </div>

          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="mt-12 border-t border-gray-200 pt-6 text-center dark:border-white/10">

            <p className="text-xs text-gray-400">
              © 2026 QuizPro. Learn. Challenge. Achieve.
            </p>

          </footer>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
