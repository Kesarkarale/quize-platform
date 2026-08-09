"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Brain,
  Users,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  XCircle,
  Menu,
  X,
  FileQuestion,
  TrendingUp,
} from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "Ultimate General Knowledge",
    category: "General Knowledge",
    questions: 20,
    attempts: 1240,
    status: "Published",
  },
  {
    id: 2,
    title: "Science Challenge",
    category: "Science",
    questions: 15,
    attempts: 982,
    status: "Published",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    category: "Technology",
    questions: 25,
    attempts: 756,
    status: "Draft",
  },
  {
    id: 4,
    title: "World History",
    category: "History",
    questions: 20,
    attempts: 621,
    status: "Published",
  },
];

const activities = [
  {
    name: "Aarav Sharma",
    action: "completed General Knowledge Quiz",
    time: "2 min ago",
  },
  {
    name: "Priya Patil",
    action: "registered a new account",
    time: "8 min ago",
  },
  {
    name: "Rahul Deshmukh",
    action: "completed Science Challenge",
    time: "15 min ago",
  },
  {
    name: "Ananya Kulkarni",
    action: "completed Technology Quiz",
    time: "22 min ago",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="h-9 w-9 rounded-full bg-indigo-100 text-center font-black leading-9 text-indigo-600">
          A
        </div>
      </header>

      {/* Mobile Overlay */}
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
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link href="/" className="flex items-center gap-3">
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

        <div className="flex-1 px-4 py-6">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>

          <nav className="mt-4 space-y-1">
            {[
              {
                icon: LayoutDashboard,
                title: "Dashboard",
                active: true,
              },
              {
                icon: Brain,
                title: "Quizzes",
              },
              {
                icon: FileQuestion,
                title: "Questions",
              },
              {
                icon: Users,
                title: "Users",
              },
              {
                icon: Trophy,
                title: "Leaderboard",
              },
              {
                icon: BarChart3,
                title: "Analytics",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    item.active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={19} />
                  {item.title}
                </button>
              );
            })}
          </nav>

          <p className="mt-8 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            System
          </p>

          <nav className="mt-4 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50">
              <Settings size={19} />
              Settings
            </button>
          </nav>
        </div>

        <div className="border-t border-gray-100 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Sunday, August 9, 2026
              </p>

              <h1 className="mt-1 text-3xl font-black">
                Dashboard Overview
              </h1>

              <p className="mt-1 text-gray-400">
                Welcome back, Admin. Here's what's happening today.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700">
              <Plus size={18} />
              Create Quiz
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Total Quizzes",
                value: "524",
                change: "+12.5%",
                icon: Brain,
              },
              {
                title: "Total Users",
                value: "12,840",
                change: "+8.2%",
                icon: Users,
              },
              {
                title: "Quiz Attempts",
                value: "58,420",
                change: "+18.4%",
                icon: TrendingUp,
              },
              {
                title: "Questions",
                value: "8,650",
                change: "+6.8%",
                icon: FileQuestion,
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon size={21} />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Analytics */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-black">Quiz Activity</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Quiz attempts over the last 7 days
                  </p>
                </div>

                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>

              <div className="mt-8 flex h-56 items-end gap-3 sm:gap-6">
                {[45, 65, 50, 80, 70, 92, 76].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center gap-3"
                    >
                      <div className="flex h-44 w-full items-end">
                        <div
                          className="w-full rounded-t-xl bg-indigo-500 transition hover:bg-indigo-600"
                          style={{ height: `${height}%` }}
                        />
                      </div>

                      <span className="text-xs font-semibold text-gray-400">
                        {
                          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                            index
                          ]
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-black">Recent Activity</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Latest platform activity
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {activities.map((activity) => (
                  <div
                    key={activity.name}
                    className="flex gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                      {activity.name.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        {activity.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {activity.action}
                      </p>

                      <p className="mt-1 text-[11px] text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Quiz Management */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-black">Quiz Management</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Create, edit and manage your quizzes.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search quizzes..."
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 sm:w-64"
                  />
                </div>

                <button className="hidden rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold sm:block">
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Quiz</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Questions</th>
                    <th className="px-6 py-4">Attempts</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredQuizzes.map((quiz) => (
                    <tr
                      key={quiz.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold">{quiz.title}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          Quiz #{quiz.id.toString().padStart(3, "0")}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                          {quiz.category}
                        </span>
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-600">
                        {quiz.questions}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-600">
                        {quiz.attempts.toLocaleString()}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                            quiz.status === "Published"
                              ? "bg-green-50 text-green-600"
                              : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {quiz.status === "Published" ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock3 size={14} />
                          )}

                          {quiz.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredQuizzes.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        No quizzes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Cards */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Published Quizzes
                  </p>
                  <p className="text-2xl font-black">486</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Clock3 size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Draft Quizzes
                  </p>
                  <p className="text-2xl font-black">38</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
