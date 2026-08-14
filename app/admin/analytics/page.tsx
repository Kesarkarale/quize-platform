"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileQuestion,
  LayoutDashboard,
  Menu,
  Settings,
  Target,
  Trophy,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const weeklyData = [
  { day: "Mon", attempts: 420, completed: 356 },
  { day: "Tue", attempts: 560, completed: 478 },
  { day: "Wed", attempts: 490, completed: 421 },
  { day: "Thu", attempts: 680, completed: 592 },
  { day: "Fri", attempts: 760, completed: 665 },
  { day: "Sat", attempts: 890, completed: 784 },
  { day: "Sun", attempts: 720, completed: 631 },
];

const categoryData = [
  {
    name: "General Knowledge",
    attempts: 8420,
    avgScore: 82,
    completion: 94,
  },
  {
    name: "Science",
    attempts: 7280,
    avgScore: 78,
    completion: 91,
  },
  {
    name: "Technology",
    attempts: 6540,
    avgScore: 85,
    completion: 89,
  },
  {
    name: "History",
    attempts: 5120,
    avgScore: 74,
    completion: 86,
  },
  {
    name: "Mathematics",
    attempts: 4680,
    avgScore: 71,
    completion: 83,
  },
];

const difficultyData = [
  {
    level: "Easy",
    attempts: 18420,
    score: 89,
    percentage: 62,
  },
  {
    level: "Medium",
    attempts: 22680,
    score: 76,
    percentage: 77,
  },
  {
    level: "Hard",
    attempts: 12320,
    score: 64,
    percentage: 42,
  },
];

const topQuizzes = [
  {
    rank: 1,
    title: "Ultimate General Knowledge",
    category: "General Knowledge",
    attempts: 12480,
    avgScore: 86,
  },
  {
    rank: 2,
    title: "Science Challenge",
    category: "Science",
    attempts: 10820,
    avgScore: 81,
  },
  {
    rank: 3,
    title: "Advanced JavaScript",
    category: "Technology",
    attempts: 9460,
    avgScore: 78,
  },
  {
    rank: 4,
    title: "World History",
    category: "History",
    attempts: 8240,
    avgScore: 74,
  },
  {
    rank: 5,
    title: "Mathematics Mastery",
    category: "Mathematics",
    attempts: 7160,
    avgScore: 72,
  },
];

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Quizzes",
    href: "/admin/quizzes",
    icon: Brain,
  },
  {
    title: "Questions",
    href: "/admin/questions",
    icon: FileQuestion,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Attempts",
    href: "/admin/attempts",
    icon: Clock3,
  },
  {
    title: "Results",
    href: "/admin/results",
    icon: Target,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Leaderboard",
    href: "/admin/leaderboard",
    icon: Trophy,
  },
];

export default function AdminAnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState("Last 7 days");

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Mobile Header */}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl p-2 hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Brain size={18} />
          </div>

          <span className="font-extrabold">
            Quiz<span className="text-indigo-600">Master</span>
          </span>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-600">
          A
        </div>
      </header>

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <div>
              <p className="font-extrabold">
                Quiz<span className="text-indigo-600">Master</span>
              </p>

              <p className="text-[10px] font-semibold text-gray-400">
                ADMIN PANEL
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active = item.title === "Analytics";

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={19} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <p className="mt-8 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            System
          </p>

          <Link
            href="/admin/settings"
            className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings size={19} />
            Settings
          </Link>
        </div>

        {/* Admin */}

        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                Administrator
              </p>

              <p className="truncate text-xs text-gray-400">
                admin@quizmaster.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}

      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* Header */}

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Platform Insights
              </p>

              <h1 className="mt-1 text-3xl font-black">
                Analytics
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-gray-400">
                Monitor quiz activity, student performance,
                engagement and overall platform growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold outline-none focus:border-indigo-500"
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
                <Download size={17} />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Attempts"
              value="58,420"
              change="+18.4%"
              positive
              icon={<TrendingUp size={21} />}
              description="vs previous period"
            />

            <StatCard
              title="Completion Rate"
              value="91.8%"
              change="+4.6%"
              positive
              icon={<CheckCircle2 size={21} />}
              description="of started quizzes"
            />

            <StatCard
              title="Average Score"
              value="78.4%"
              change="+2.8%"
              positive
              icon={<Target size={21} />}
              description="across all quizzes"
            />

            <StatCard
              title="Active Students"
              value="9,842"
              change="+12.1%"
              positive
              icon={<Users size={21} />}
              description="monthly active users"
            />
          </div>

          {/* Main Chart */}

          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-black">
                  Quiz Activity
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Attempts and completed quizzes for {period.toLowerCase()}.
                </p>
              </div>

              <div className="flex items-center gap-5 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  Attempts
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                  Completed
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex h-72 items-end gap-2 sm:gap-5">
                {weeklyData.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 items-end justify-center gap-1"
                  >
                    <div className="group relative flex h-full w-full items-end justify-center">
                      <div
                        className="w-[42%] rounded-t-lg bg-indigo-500 transition hover:bg-indigo-600"
                        style={{
                          height: `${(item.attempts / 900) * 100}%`,
                        }}
                      />

                      <div
                        className="w-[42%] rounded-t-lg bg-purple-400 transition hover:bg-purple-500"
                        style={{
                          height: `${(item.completed / 900) * 100}%`,
                        }}
                      />

                      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-lg group-hover:block">
                        {item.attempts.toLocaleString()} attempts
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2 sm:gap-5">
                {weeklyData.map((item) => (
                  <div
                    key={item.day}
                    className="flex-1 text-center text-xs font-semibold text-gray-400"
                  >
                    {item.day}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Category + Difficulty */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Category */}

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div>
                <h2 className="font-black">
                  Category Performance
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Student performance by quiz category.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                {categoryData.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-bold">
                        {category.name}
                      </p>

                      <span className="shrink-0 text-sm font-black text-indigo-600">
                        {category.avgScore}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${category.avgScore}%`,
                        }}
                      />
                    </div>

                    <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                      <span>
                        {category.attempts.toLocaleString()} attempts
                      </span>

                      <span>
                        {category.completion}% completion
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Difficulty */}

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div>
                <h2 className="font-black">
                  Difficulty Analysis
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Performance across different difficulty levels.
                </p>
              </div>

              <div className="mt-7 space-y-7">
                {difficultyData.map((item) => (
                  <div key={item.level}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DifficultyIcon level={item.level} />

                        <div>
                          <p className="text-sm font-bold">
                            {item.level}
                          </p>

                          <p className="text-xs text-gray-400">
                            {item.attempts.toLocaleString()} attempts
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-black">
                          {item.score}%
                        </p>

                        <p className="text-[11px] text-gray-400">
                          avg. score
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <MiniMetric
                  label="Easy"
                  value="89%"
                />

                <MiniMetric
                  label="Medium"
                  value="76%"
                />

                <MiniMetric
                  label="Hard"
                  value="64%"
                />
              </div>
            </section>
          </div>

          {/* Top Quizzes */}

          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-black">
                  Top Performing Quizzes
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Most attempted quizzes on the platform.
                </p>
              </div>

              <Link
                href="/admin/quizzes"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                View all quizzes →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-6 py-4">
                      Rank
                    </th>

                    <th className="px-6 py-4">
                      Quiz
                    </th>

                    <th className="px-6 py-4">
                      Category
                    </th>

                    <th className="px-6 py-4">
                      Attempts
                    </th>

                    <th className="px-6 py-4">
                      Average Score
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {topQuizzes.map((quiz) => (
                    <tr
                      key={quiz.rank}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${
                            quiz.rank === 1
                              ? "bg-yellow-50 text-yellow-600"
                              : quiz.rank === 2
                              ? "bg-gray-100 text-gray-600"
                              : quiz.rank === 3
                              ? "bg-orange-50 text-orange-600"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          {quiz.rank}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-bold">
                          {quiz.title}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                          {quiz.category}
                        </span>
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-600">
                        {quiz.attempts.toLocaleString()}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-indigo-500"
                              style={{
                                width: `${quiz.avgScore}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-black">
                            {quiz.avgScore}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Insight Cards */}

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <InsightCard
              icon={<Zap size={20} />}
              title="Peak Activity"
              value="Saturday"
              description="890 quiz attempts recorded."
            />

            <InsightCard
              icon={<Trophy size={20} />}
              title="Best Category"
              value="Technology"
              description="85% average student score."
            />

            <InsightCard
              icon={<Clock3 size={20} />}
              title="Engagement"
              value="14m 32s"
              description="Average quiz completion time."
            />
          </div>
        </div>
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
  change,
  positive,
  icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
            positive
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}

          {change}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

/* =========================================
   DIFFICULTY ICON
========================================= */

function DifficultyIcon({
  level,
}: {
  level: string;
}) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
        level === "Easy"
          ? "bg-green-50 text-green-600"
          : level === "Medium"
          ? "bg-orange-50 text-orange-600"
          : "bg-red-50 text-red-600"
      }`}
    >
      <BarChart3 size={18} />
    </div>
  );
}

/* =========================================
   MINI METRIC
========================================= */

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 text-center">
      <p className="text-xs font-semibold text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-black">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   INSIGHT CARD
========================================= */

function InsightCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-xl font-black">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
}
