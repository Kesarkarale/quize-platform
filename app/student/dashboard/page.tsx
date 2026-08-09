"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Trophy,
  Target,
  Brain,
  Clock3,
  ArrowRight,
  Play,
  ChevronRight,
  Flame,
  Award,
  BarChart3,
  BookOpen,
  Medal,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================
   DATA
========================================= */

const categories = [
  {
    name: "General Knowledge",
    questions: 120,
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
  },
  {
    name: "Science",
    questions: 85,
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },
  {
    name: "Technology",
    questions: 95,
    icon: BarChart3,
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  {
    name: "Mathematics",
    questions: 110,
    icon: Target,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
    text: "text-orange-400",
  },
];

const recentQuizzes = [
  {
    title: "General Knowledge Challenge",
    category: "General Knowledge",
    score: 85,
    total: 100,
    date: "Today",
  },
  {
    title: "Science Master Quiz",
    category: "Science",
    score: 72,
    total: 100,
    date: "Yesterday",
  },
  {
    title: "Technology Basics",
    category: "Technology",
    score: 91,
    total: 100,
    date: "2 days ago",
  },
];

const leaderboard = [
  {
    rank: 1,
    name: "Aarav Sharma",
    points: "12,850",
  },
  {
    rank: 2,
    name: "Priya Patil",
    points: "11,920",
  },
  {
    rank: 3,
    name: "Rahul Singh",
    points: "11,450",
  },
  {
    rank: 4,
    name: "Kesar",
    points: "10,980",
    current: true,
  },
];

/* =========================================
   DASHBOARD
========================================= */

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Brain size={23} />
            </div>

            <div>
              <h1 className="text-xl font-black">
                Quiz
                <span className="text-indigo-400">
                  Master
                </span>
              </h1>

              <p className="text-[9px] tracking-[0.22em] text-gray-500">
                PLAY • LEARN • WIN
              </p>
            </div>
          </Link>

          {/* Right */}

          <div className="flex items-center gap-3">
            <Link
              href="/leaderboard"
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white sm:flex"
            >
              <Trophy size={17} />

              Leaderboard
            </Link>

            <Link
              href="/student/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold"
            >
              K
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Welcome */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-400">
                <SparkleIcon />

                Welcome back, Kesar 👋
              </p>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Ready for your next
                <span className="ml-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  challenge?
                </span>
              </h2>

              <p className="mt-2 text-gray-500">
                Keep learning and climb the leaderboard.
              </p>
            </div>

            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 font-bold shadow-lg shadow-indigo-600/20 transition hover:scale-[1.02]"
            >
              <Play size={18} />

              Start New Quiz

              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>

        {/* =====================================
            STATS
        ===================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Points"
            value="10,980"
            subtitle="+12% this week"
            icon={Trophy}
            iconClass="text-yellow-400"
            bgClass="bg-yellow-500/10"
          />

          <StatCard
            title="Quizzes Completed"
            value="48"
            subtitle="+6 this month"
            icon={CheckCircle2}
            iconClass="text-green-400"
            bgClass="bg-green-500/10"
          />

          <StatCard
            title="Average Score"
            value="87%"
            subtitle="+5% improvement"
            icon={TrendingUp}
            iconClass="text-indigo-400"
            bgClass="bg-indigo-500/10"
          />

          <StatCard
            title="Current Streak"
            value="7 Days"
            subtitle="Keep it going 🔥"
            icon={Flame}
            iconClass="text-orange-400"
            bgClass="bg-orange-500/10"
          />
        </div>

        {/* =====================================
            CONTINUE QUIZ
        ===================================== */}

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">
                Continue Learning
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Pick up where you left off.
              </p>
            </div>

            <Link
              href="/quiz"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View all
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-purple-600/10 to-transparent p-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                  <BookOpen size={29} />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Continue Quiz
                  </p>

                  <h4 className="text-xl font-bold">
                    General Knowledge Challenge
                  </h4>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Brain size={15} />
                      20 Questions
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={15} />
                      15 Minutes
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Target size={15} />
                      Medium
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/quiz/general-knowledge"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-gray-900 transition hover:bg-gray-100"
              >
                Continue
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Progress */}

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-gray-500">
                  Progress
                </span>

                <span className="font-semibold text-indigo-400">
                  8 / 20
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            CATEGORIES
        ===================================== */}

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold">
                Explore Categories
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Test your knowledge across different
                subjects.
              </p>
            </div>

            <Link
              href="/categories"
              className="hidden items-center gap-1 text-sm font-semibold text-indigo-400 sm:flex"
            >
              View all
              <ChevronRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  href={`/quiz?category=${encodeURIComponent(
                    category.name
                  )}`}
                  key={category.name}
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06]"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${category.bg} ${category.text}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h4 className="font-bold">
                    {category.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    {category.questions} Questions
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span
                      className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${category.color}`}
                    />

                    <ArrowRight
                      size={17}
                      className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* =====================================
            BOTTOM GRID
        ===================================== */}

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* RECENT RESULTS */}

          <section className="lg:col-span-3">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  Recent Results
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest quiz performance.
                </p>
              </div>

              <Link
                href="/student/results"
                className="text-sm font-semibold text-indigo-400"
              >
                View all
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
              {recentQuizzes.map(
                (quiz, index) => (
                  <div
                    key={quiz.title}
                    className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between ${
                      index !==
                      recentQuizzes.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                        <Award size={20} />
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          {quiz.title}
                        </h4>

                        <p className="mt-1 text-xs text-gray-500">
                          {quiz.category} •{" "}
                          {quiz.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <p className="text-lg font-black">
                          {quiz.score}%
                        </p>

                        <p className="text-xs text-gray-600">
                          Score
                        </p>
                      </div>

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          quiz.score >= 80
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        <CheckCircle2 size={18} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* LEADERBOARD */}

          <section className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  Leaderboard
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Top performers this week.
                </p>
              </div>

              <Link
                href="/leaderboard"
                className="text-sm font-semibold text-indigo-400"
              >
                View all
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="space-y-2">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      player.current
                        ? "border border-indigo-500/20 bg-indigo-500/10"
                        : "bg-white/[0.02]"
                    }`}
                  >
                    <div className="w-6 text-center text-sm font-bold text-gray-500">
                      {player.rank === 1 ? (
                        <Medal
                          size={19}
                          className="mx-auto text-yellow-400"
                        />
                      ) : player.rank === 2 ? (
                        <Medal
                          size={19}
                          className="mx-auto text-gray-300"
                        />
                      ) : player.rank === 3 ? (
                        <Medal
                          size={19}
                          className="mx-auto text-orange-400"
                        />
                      ) : (
                        player.rank
                      )}
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold">
                      {player.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {player.name}
                        {player.current && (
                          <span className="ml-2 text-[10px] font-bold text-indigo-400">
                            YOU
                          </span>
                        )}
                      </p>
                    </div>

                    <p className="text-sm font-bold">
                      {player.points}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/leaderboard"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Trophy size={16} />
                Open Full Leaderboard
              </Link>
            </div>
          </section>
        </div>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <section className="mt-10 pb-10">
          <h3 className="mb-5 text-xl font-bold">
            Quick Actions
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <QuickAction
              href="/quiz"
              icon={Play}
              title="Take a Quiz"
              description="Challenge yourself"
            />

            <QuickAction
              href="/student/results"
              icon={BarChart3}
              title="View Results"
              description="Track your performance"
            />

            <QuickAction
              href="/leaderboard"
              icon={Trophy}
              title="Leaderboard"
              description="See your ranking"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
  bgClass,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Trophy;
  iconClass: string;
  bgClass: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass} ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1 text-xs text-gray-500">
        <TrendingUp
          size={13}
          className="text-green-400"
        />

        {subtitle}
      </p>
    </motion.div>
  );
}

/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof Play;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
        <Icon size={21} />
      </div>

      <div className="flex-1">
        <h4 className="font-bold">
          {title}
        </h4>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <ArrowRight
        size={17}
        className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-white"
      />
    </Link>
  );
}

/* =========================================
   SMALL ICON
========================================= */

function SparkleIcon() {
  return (
    <SparklesIconInner />
  );
}

function SparklesIconInner() {
  return (
    <span className="text-indigo-400">
      ✦
    </span>
  );
}
