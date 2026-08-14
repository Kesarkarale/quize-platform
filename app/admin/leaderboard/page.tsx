"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Brain,
  ChevronRight,
  Crown,
  Filter,
  Medal,
  Search,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
  TrendingUp,
  Award,
  ChevronDown,
} from "lucide-react";

type LeaderboardUser = {
  rank: number;
  name: string;
  email: string;
  points: number;
  quizzes: number;
  wins: number;
  average: number;
  category: string;
  trend: "up" | "down" | "same";
};

const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    points: 9840,
    quizzes: 86,
    wins: 42,
    average: 94,
    category: "General Knowledge",
    trend: "up",
  },
  {
    rank: 2,
    name: "Priya Patil",
    email: "priya.patil@example.com",
    points: 9210,
    quizzes: 79,
    wins: 38,
    average: 91,
    category: "Science",
    trend: "up",
  },
  {
    rank: 3,
    name: "Vedant Joshi",
    email: "vedant.j@example.com",
    points: 8950,
    quizzes: 74,
    wins: 35,
    average: 89,
    category: "Mathematics",
    trend: "same",
  },
  {
    rank: 4,
    name: "Ananya Kulkarni",
    email: "ananya.k@example.com",
    points: 8420,
    quizzes: 71,
    wins: 31,
    average: 87,
    category: "History",
    trend: "up",
  },
  {
    rank: 5,
    name: "Rahul Deshmukh",
    email: "rahul.d@example.com",
    points: 8170,
    quizzes: 68,
    wins: 29,
    average: 84,
    category: "Technology",
    trend: "down",
  },
  {
    rank: 6,
    name: "Sneha More",
    email: "sneha.more@example.com",
    points: 7830,
    quizzes: 65,
    wins: 27,
    average: 82,
    category: "Science",
    trend: "up",
  },
  {
    rank: 7,
    name: "Rohan Pawar",
    email: "rohan.p@example.com",
    points: 7520,
    quizzes: 61,
    wins: 25,
    average: 80,
    category: "Technology",
    trend: "same",
  },
  {
    rank: 8,
    name: "Isha Shah",
    email: "isha.shah@example.com",
    points: 7240,
    quizzes: 58,
    wins: 22,
    average: 78,
    category: "History",
    trend: "up",
  },
  {
    rank: 9,
    name: "Kunal Mehta",
    email: "kunal.m@example.com",
    points: 6910,
    quizzes: 55,
    wins: 20,
    average: 76,
    category: "Mathematics",
    trend: "down",
  },
  {
    rank: 10,
    name: "Neha Desai",
    email: "neha.desai@example.com",
    points: 6580,
    quizzes: 51,
    wins: 18,
    average: 74,
    category: "General Knowledge",
    trend: "up",
  },
];

export default function AdminLeaderboardPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [period, setPeriod] = useState("All Time");
  const [sortBy, setSortBy] = useState("Points");

  const filteredUsers = useMemo(() => {
    let users = leaderboardData.filter((user) => {
      const query = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        user.category === category;

      return matchesSearch && matchesCategory;
    });

    users = [...users].sort((a, b) => {
      if (sortBy === "Average") {
        return b.average - a.average;
      }

      if (sortBy === "Quizzes") {
        return b.quizzes - a.quizzes;
      }

      if (sortBy === "Wins") {
        return b.wins - a.wins;
      }

      return b.points - a.points;
    });

    return users;
  }, [search, category, sortBy]);

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        {/* Logo */}

        <div className="flex h-20 items-center border-b border-gray-100 px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <div>
              <p className="font-extrabold">
                Quiz
                <span className="text-indigo-600">
                  Master
                </span>
              </p>

              <p className="text-[9px] font-bold tracking-widest text-gray-400">
                ADMIN PANEL
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}

        <div className="flex-1 px-4 py-6">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Management
          </p>

          <nav className="mt-4 space-y-1">
            <AdminNav
              href="/admin/dashboard"
              icon={<BarChart3 size={18} />}
              label="Dashboard"
            />

            <AdminNav
              href="/admin/quizzes"
              icon={<Brain size={18} />}
              label="Quizzes"
            />

            <AdminNav
              href="/admin/questions"
              icon={<Award size={18} />}
              label="Questions"
            />

            <AdminNav
              href="/admin/categories"
              icon={<Award size={18} />}
              label="Categories"
            />

            <AdminNav
              href="/admin/difficulty"
              icon={<Filter size={18} />}
              label="Difficulty Levels"
            />

            <AdminNav
              href="/admin/attempts"
              icon={<Users size={18} />}
              label="Attempts"
            />

            <AdminNav
              href="/admin/results"
              icon={<Trophy size={18} />}
              label="Results"
            />

            <AdminNav
              href="/admin/analytics"
              icon={<BarChart3 size={18} />}
              label="Analytics"
            />

            <AdminNav
              href="/admin/leaderboard"
              icon={<Trophy size={18} />}
              label="Leaderboard"
              active
            />
          </nav>

          <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            System
          </p>

          <nav className="mt-4">
            <AdminNav
              href="/admin/settings"
              icon={<Settings size={18} />}
              label="Settings"
            />
          </nav>
        </div>

        {/* Admin */}

        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
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

      {/* =========================================
          MAIN
      ========================================= */}

      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          {/* Header */}

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/admin/dashboard"
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-gray-400 transition hover:text-indigo-600"
              >
                <ArrowLeft size={14} />
                Back to Dashboard
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                  <Trophy size={24} />
                </div>

                <div>
                  <h1 className="text-3xl font-black">
                    Leaderboard
                  </h1>

                  <p className="mt-1 text-sm text-gray-400">
                    Monitor top-performing students across
                    the platform.
                  </p>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold shadow-sm transition hover:bg-gray-50">
              <ShieldCheck size={17} />
              Leaderboard Settings
            </button>
          </div>

          {/* =========================================
              TOP 3 PODIUM
          ========================================= */}

          <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 p-6 text-white shadow-xl sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
                  Top Performers
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  QuizMaster Champions
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100/70">
                  The students with the highest points and
                  strongest quiz performance.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-bold">
                <Trophy size={15} />
                {period}
              </div>
            </div>

            {/* Podium */}

            <div className="mt-10 grid items-end gap-5 md:grid-cols-3">
              {/* Second */}

              <PodiumCard
                user={leaderboardData[1]}
                position={2}
                height="h-40"
              />

              {/* First */}

              <PodiumCard
                user={leaderboardData[0]}
                position={1}
                height="h-52"
                winner
              />

              {/* Third */}

              <PodiumCard
                user={leaderboardData[2]}
                position={3}
                height="h-32"
              />
            </div>
          </section>

          {/* =========================================
              STATS
          ========================================= */}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <LeaderboardStat
              icon={<Users size={21} />}
              title="Ranked Students"
              value="12,840"
              description="Active participants"
            />

            <LeaderboardStat
              icon={<Trophy size={21} />}
              title="Total Points"
              value="8.4M"
              description="Earned by students"
            />

            <LeaderboardStat
              icon={<TrendingUp size={21} />}
              title="Average Score"
              value="82%"
              description="Platform average"
            />

            <LeaderboardStat
              icon={<Award size={21} />}
              title="Top Score"
              value="9,840"
              description="Current #1 student"
            />
          </div>

          {/* =========================================
              LEADERBOARD TABLE
          ========================================= */}

          <section className="mt-7 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Toolbar */}

            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-black">
                  Student Rankings
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredUsers.length} students shown
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}

                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search student..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white sm:w-56"
                  />
                </div>

                {/* Category */}

                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-9 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    <option value="All">
                      All Categories
                    </option>
                    <option value="General Knowledge">
                      General Knowledge
                    </option>
                    <option value="Science">
                      Science
                    </option>
                    <option value="Technology">
                      Technology
                    </option>
                    <option value="History">
                      History
                    </option>
                    <option value="Mathematics">
                      Mathematics
                    </option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* Period */}

                <div className="relative">
                  <select
                    value={period}
                    onChange={(e) =>
                      setPeriod(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-9 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    <option>All Time</option>
                    <option>This Month</option>
                    <option>This Week</option>
                    <option>Today</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* Sort */}

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-9 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    <option>Points</option>
                    <option>Average</option>
                    <option>Quizzes</option>
                    <option>Wins</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Table */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-gray-50">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4">
                      Rank
                    </th>

                    <th className="px-6 py-4">
                      Student
                    </th>

                    <th className="px-6 py-4">
                      Points
                    </th>

                    <th className="px-6 py-4">
                      Quizzes
                    </th>

                    <th className="px-6 py-4">
                      Wins
                    </th>

                    <th className="px-6 py-4">
                      Average
                    </th>

                    <th className="px-6 py-4">
                      Category
                    </th>

                    <th className="px-6 py-4">
                      Trend
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => {
                    const displayRank = index + 1;

                    return (
                      <tr
                        key={user.email}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Rank */}

                        <td className="px-6 py-5">
                          {displayRank <= 3 ? (
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl font-black ${
                                displayRank === 1
                                  ? "bg-amber-50 text-amber-600"
                                  : displayRank === 2
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-orange-50 text-orange-600"
                              }`}
                            >
                              {displayRank === 1 ? (
                                <Crown size={17} />
                              ) : (
                                displayRank
                              )}
                            </div>
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-sm font-black text-gray-500">
                              {displayRank}
                            </div>
                          )}
                        </td>

                        {/* Student */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                              {user.name.charAt(0)}
                            </div>

                            <div>
                              <p className="text-sm font-bold">
                                {user.name}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Points */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <Trophy
                              size={15}
                              className="text-amber-500"
                            />

                            <span className="text-sm font-black">
                              {user.points.toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* Quizzes */}

                        <td className="px-6 py-5">
                          <span className="text-sm font-bold text-gray-600">
                            {user.quizzes}
                          </span>
                        </td>

                        {/* Wins */}

                        <td className="px-6 py-5">
                          <span className="text-sm font-bold text-gray-600">
                            {user.wins}
                          </span>
                        </td>

                        {/* Average */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-indigo-500"
                                style={{
                                  width: `${user.average}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-black">
                              {user.average}%
                            </span>
                          </div>
                        </td>

                        {/* Category */}

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold text-indigo-600">
                            {user.category}
                          </span>
                        </td>

                        {/* Trend */}

                        <td className="px-6 py-5">
                          <Trend
                            type={user.trend}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <Search size={20} />
                  </div>

                  <p className="mt-4 font-bold text-gray-600">
                    No students found
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Try another search or category.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =========================================
              ACHIEVEMENTS
          ========================================= */}

          <section className="mt-6 grid gap-6 md:grid-cols-3">
            <AchievementCard
              icon={<Crown size={22} />}
              title="Highest Scorer"
              name="Aarav Sharma"
              value="9,840 points"
            />

            <AchievementCard
              icon={<Medal size={22} />}
              title="Most Quiz Wins"
              name="Aarav Sharma"
              value="42 wins"
            />

            <AchievementCard
              icon={<Award size={22} />}
              title="Best Average"
              name="Aarav Sharma"
              value="94% average"
            />
          </section>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   SIDEBAR NAV
========================================= */

function AdminNav({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}

      {label}

      {active && (
        <ChevronRight
          size={15}
          className="ml-auto"
        />
      )}
    </Link>
  );
}

/* =========================================
   PODIUM
========================================= */

function PodiumCard({
  user,
  position,
  height,
  winner = false,
}: {
  user: LeaderboardUser;
  position: number;
  height: string;
  winner?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {winner && (
          <div className="absolute -right-2 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white shadow-lg">
            <Crown size={14} />
          </div>
        )}

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full border-4 ${
            winner
              ? "border-amber-300 bg-amber-100 text-amber-700"
              : position === 2
              ? "border-gray-200 bg-gray-100 text-gray-600"
              : "border-orange-200 bg-orange-100 text-orange-600"
          } text-xl font-black shadow-lg`}
        >
          {user.name.charAt(0)}
        </div>
      </div>

      <p className="mt-3 text-sm font-black">
        {user.name}
      </p>

      <p className="mt-1 text-xs text-indigo-100/60">
        {user.points.toLocaleString()} points
      </p>

      <div
        className={`mt-4 flex w-full ${height} items-start justify-center rounded-t-3xl border border-white/10 bg-white/10 pt-5`}
      >
        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-black">
            {position}
          </div>

          <p className="mt-3 text-xs font-bold text-indigo-100/70">
            {user.average}% average
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   STAT
========================================= */

function LeaderboardStat({
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
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
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
   TREND
========================================= */

function Trend({
  type,
}: {
  type: "up" | "down" | "same";
}) {
  if (type === "up") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1.5 text-[10px] font-bold text-green-600">
        ↑ Rising
      </span>
    );
  }

  if (type === "down") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1.5 text-[10px] font-bold text-red-600">
        ↓ Falling
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1.5 text-[10px] font-bold text-gray-500">
      — Stable
    </span>
  );
}

/* =========================================
   ACHIEVEMENT
========================================= */

function AchievementCard({
  icon,
  title,
  name,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  name: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
          {icon}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {title}
          </p>

          <p className="mt-1 text-sm font-black">
            {name}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">
          Achievement
        </span>

        <span className="text-sm font-black text-indigo-600">
          {value}
        </span>
      </div>
    </div>
  );
}
