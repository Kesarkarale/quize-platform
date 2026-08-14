"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Flame,
  Home,
  Menu,
  Search,
  Settings,
  Sparkles,
  Trophy,
  User,
  X,
  XCircle,
  RotateCcw,
} from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";

/* =========================================================
   TYPES
========================================================= */

type QuizAttempt = {
  id: string;
  quizId: string;
  title: string;
  category: string;
  score: number;
  status: "Passed" | "Failed";
  questions: number;
  correct: number;
  duration: number;
  timeTaken: number;
  date: string;
};

/* =========================================================
   DEMO HISTORY
========================================================= */

const attempts: QuizAttempt[] = [
  {
    id: "attempt-1",
    quizId: "javascript",
    title: "JavaScript Fundamentals",
    category: "JavaScript",
    score: 86,
    status: "Passed",
    questions: 20,
    correct: 17,
    duration: 20,
    timeTaken: 16,
    date: "14 Aug 2026",
  },
  {
    id: "attempt-2",
    quizId: "react",
    title: "React Development",
    category: "React",
    score: 92,
    status: "Passed",
    questions: 30,
    correct: 28,
    duration: 30,
    timeTaken: 24,
    date: "13 Aug 2026",
  },
  {
    id: "attempt-3",
    quizId: "python",
    title: "Python Basics",
    category: "Python",
    score: 48,
    status: "Failed",
    questions: 15,
    correct: 7,
    duration: 15,
    timeTaken: 14,
    date: "04 Aug 2026",
  },
  {
    id: "attempt-4",
    quizId: "html-css",
    title: "HTML & CSS",
    category: "HTML",
    score: 78,
    status: "Passed",
    questions: 20,
    correct: 16,
    duration: 15,
    timeTaken: 11,
    date: "02 Aug 2026",
  },
  {
    id: "attempt-5",
    quizId: "javascript",
    title: "Advanced JavaScript",
    category: "JavaScript",
    score: 74,
    status: "Passed",
    questions: 25,
    correct: 18,
    duration: 25,
    timeTaken: 21,
    date: "29 Jul 2026",
  },
  {
    id: "attempt-6",
    quizId: "react",
    title: "React Hooks Challenge",
    category: "React",
    score: 56,
    status: "Failed",
    questions: 25,
    correct: 14,
    duration: 25,
    timeTaken: 22,
    date: "25 Jul 2026",
  },
  {
    id: "attempt-7",
    quizId: "python",
    title: "Python Functions",
    category: "Python",
    score: 88,
    status: "Passed",
    questions: 20,
    correct: 18,
    duration: 20,
    timeTaken: 15,
    date: "21 Jul 2026",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function QuizHistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  /* =======================================================
     STATS
  ======================================================= */

  const totalAttempts = attempts.length;

  const passedAttempts = attempts.filter(
    (item) => item.status === "Passed"
  ).length;

  const failedAttempts = attempts.filter(
    (item) => item.status === "Failed"
  ).length;

  const averageScore = Math.round(
    attempts.reduce((sum, item) => sum + item.score, 0) /
      attempts.length
  );

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = [
    "All",
    "JavaScript",
    "React",
    "Python",
    "HTML",
  ];

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredAttempts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return attempts.filter((attempt) => {
      const matchesSearch =
        attempt.title.toLowerCase().includes(query) ||
        attempt.category.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || attempt.status === status;

      const matchesCategory =
        category === "All" ||
        attempt.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [search, status, category]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">

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
        className={`fixed left-0 top-0 z-50 h-screen w-[270px] border-r border-gray-200 bg-white px-5 py-6 transition-transform duration-300 dark:border-white/10 dark:bg-[#101114] ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* LOGO */}

        <div className="flex items-center justify-between">

          <Link
            href="/student/dashboard"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
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
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* MAIN MENU */}

        <div className="mt-10">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">

            <SidebarLink
              href="/student/dashboard"
              icon={<Home size={19} />}
              label="Dashboard"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarLink
              href="/quiz"
              icon={<BookOpen size={19} />}
              label="Explore Quizzes"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarLink
              href="/leaderboard"
              icon={<Trophy size={19} />}
              label="Leaderboard"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarLink
              href="/student/performance"
              icon={<BarChart3 size={19} />}
              label="My Performance"
              onClick={() => setSidebarOpen(false)}
            />

          </nav>
        </div>

        {/* ACCOUNT */}

        <div className="mt-8">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">

            <SidebarLink
              href="/student/profile"
              icon={<User size={19} />}
              label="Profile"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarLink
              href="/student/settings"
              icon={<Settings size={19} />}
              label="Settings"
              onClick={() => setSidebarOpen(false)}
            />

          </nav>
        </div>

        {/* BOTTOM CARD */}

        <div className="absolute bottom-6 left-5 right-5">

          <div className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Flame size={18} />
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

          <Link
            href="/student/dashboard"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <ArrowLeft size={19} />
            Back to Dashboard
          </Link>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[270px]">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090b]/80 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-gray-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/5 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Student Dashboard
                </p>

                <h2 className="text-lg font-bold">
                  Quiz History
                </h2>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <ThemeToggle />

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white sm:flex">
                K
              </div>

            </div>

          </div>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* PAGE TITLE */}

          <section className="mb-7">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">

                  <BookOpen size={17} />

                  <span className="text-xs font-bold uppercase tracking-[0.15em]">
                    Learning Activity
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Quiz History
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Review your previous quiz attempts, scores,
                  performance and progress over time.
                </p>

              </div>

              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Take a New Quiz
                <ChevronRight size={17} />
              </Link>

            </div>

          </section>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <HistoryStat
              icon={<BookOpen size={21} />}
              title="Total Attempts"
              value={String(totalAttempts)}
              description="All quizzes completed"
              iconClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
            />

            <HistoryStat
              icon={<CheckCircle2 size={21} />}
              title="Passed"
              value={String(passedAttempts)}
              description={`${Math.round(
                (passedAttempts / totalAttempts) * 100
              )}% success rate`}
              iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            />

            <HistoryStat
              icon={<XCircle size={21} />}
              title="Failed"
              value={String(failedAttempts)}
              description="Keep improving"
              iconClass="bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
            />

            <HistoryStat
              icon={<Target size={21} />}
              title="Average Score"
              value={`${averageScore}%`}
              description="+8% from last month"
              iconClass="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
            />

          </section>

          {/* =================================================
              FILTER PANEL
          ================================================= */}

          <section className="mt-7 rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101114] sm:p-5">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* SEARCH */}

              <div className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/5 xl:max-w-[420px]">

                <Search
                  size={18}
                  className="shrink-0 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search quiz history..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />

              </div>

              {/* FILTERS */}

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* STATUS */}

                <div className="flex items-center gap-2 overflow-x-auto">

                  <Filter
                    size={16}
                    className="shrink-0 text-gray-400"
                  />

                  {["All", "Passed", "Failed"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() =>
                          setStatus(item)
                        }
                        className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                          status === item
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                            : "border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="mt-4 flex gap-2 overflow-x-auto border-t border-gray-100 pt-4 dark:border-white/5">

              <span className="mr-1 flex items-center text-xs font-bold text-gray-400">
                Category:
              </span>

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold transition ${
                    category === item
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </section>

          {/* =================================================
              HISTORY LIST
          ================================================= */}

          <section className="mt-6">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h3 className="text-lg font-black">
                  Your Attempts
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredAttempts.length} result
                  {filteredAttempts.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>

              </div>

              <div className="hidden items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500 dark:bg-white/5 dark:text-gray-400 sm:flex">
                <CalendarDays size={14} />
                All Time
              </div>

            </div>

            <div className="space-y-4">

              {filteredAttempts.map((attempt) => (
                <HistoryCard
                  key={attempt.id}
                  attempt={attempt}
                />
              ))}

            </div>

            {/* EMPTY */}

            {filteredAttempts.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#101114]">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5">
                  <Search size={25} />
                </div>

                <h3 className="mt-4 text-sm font-black">
                  No quiz attempts found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-400">
                  We couldn't find any quiz attempts matching
                  your current filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatus("All");
                    setCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Clear Filters
                </button>

              </div>
            )}

          </section>

          {/* =================================================
              INSIGHT
          ================================================= */}

          <section className="mt-7 overflow-hidden rounded-[24px] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-5 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 sm:p-6">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles size={20} />
                </div>

                <div>

                  <h3 className="text-sm font-black">
                    Great progress!
                  </h3>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Your average score is{" "}
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      {averageScore}%
                    </strong>
                    . Keep practicing consistently to reach
                    your next personal best.
                  </p>

                </div>

              </div>

              <Link
                href="/student/performance"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-indigo-600 shadow-sm transition hover:shadow-md dark:bg-white/10 dark:text-indigo-400"
              >
                View Performance
                <ChevronRight size={15} />
              </Link>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="mt-10 border-t border-gray-200 py-6 text-center dark:border-white/10">

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
   SIDEBAR LINK
========================================================= */

function SidebarLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}

/* =========================================================
   STAT
========================================================= */

function HistoryStat({
  icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#101114]">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-xs font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-gray-400">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   HISTORY CARD
========================================================= */

function HistoryCard({
  attempt,
}: {
  attempt: QuizAttempt;
}) {
  const passed = attempt.status === "Passed";

  return (
    <div className="group rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#101114] sm:p-5">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        {/* LEFT */}

        <div className="flex min-w-0 flex-1 items-center gap-4">

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              passed
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {passed ? (
              <CheckCircle2 size={23} />
            ) : (
              <XCircle size={23} />
            )}
          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="truncate text-sm font-black sm:text-base">
                {attempt.title}
              </h3>

              <span
                className={`rounded-lg px-2 py-1 text-[9px] font-bold ${
                  passed
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {attempt.status}
              </span>

            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold text-gray-400">

              <span className="flex items-center gap-1">
                <BookOpen size={13} />
                {attempt.category}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={13} />
                {attempt.date}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {attempt.timeTaken}m / {attempt.duration}m
              </span>

            </div>

          </div>

        </div>

        {/* DETAILS */}

        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4 dark:border-white/5 lg:w-[360px] lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">

          <div>
            <p className="text-[10px] text-gray-400">
              Score
            </p>

            <p
              className={`mt-1 text-lg font-black ${
                passed
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {attempt.score}%
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-400">
              Correct
            </p>

            <p className="mt-1 text-sm font-black">
              {attempt.correct}/{attempt.questions}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-400">
              Result
            </p>

            <p
              className={`mt-1 text-xs font-black ${
                passed
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {passed ? "Passed" : "Try Again"}
            </p>
          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2 lg:ml-2">

          <Link
            href={`/quiz/result/${attempt.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:text-gray-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-400 sm:flex-none"
          >
            View Result
            <ChevronRight size={14} />
          </Link>

          <Link
            href={`/quiz/${attempt.quizId}`}
            className="flex items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700"
            title="Retry Quiz"
          >
            <RotateCcw size={15} />
          </Link>

        </div>

      </div>

      {/* SCORE PROGRESS */}

      <div className="mt-4">

        <div className="mb-1.5 flex items-center justify-between">

          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Performance
          </span>

          <span className="text-[9px] font-bold text-gray-400">
            {attempt.score}%
          </span>

        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">

          <div
            className={`h-full rounded-full transition-all ${
              passed
                ? "bg-emerald-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${attempt.score}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}
