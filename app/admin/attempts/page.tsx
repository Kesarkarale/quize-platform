"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Search,
  Trophy,
  Users,
  XCircle,
} from "lucide-react";

type AttemptStatus = "Completed" | "In Progress" | "Abandoned";

type Attempt = {
  id: number;
  student: string;
  email: string;
  quiz: string;
  category: string;
  score: number;
  total: number;
  percentage: number;
  duration: string;
  date: string;
  status: AttemptStatus;
};

const initialAttempts: Attempt[] = [
  {
    id: 1001,
    student: "Aarav Sharma",
    email: "aarav@example.com",
    quiz: "Ultimate General Knowledge",
    category: "General Knowledge",
    score: 18,
    total: 20,
    percentage: 90,
    duration: "12m 42s",
    date: "Aug 14, 2026",
    status: "Completed",
  },
  {
    id: 1002,
    student: "Priya Patil",
    email: "priya@example.com",
    quiz: "Science Challenge",
    category: "Science",
    score: 13,
    total: 15,
    percentage: 87,
    duration: "09m 18s",
    date: "Aug 14, 2026",
    status: "Completed",
  },
  {
    id: 1003,
    student: "Rahul Deshmukh",
    email: "rahul@example.com",
    quiz: "Advanced JavaScript",
    category: "Technology",
    score: 20,
    total: 25,
    percentage: 80,
    duration: "21m 05s",
    date: "Aug 13, 2026",
    status: "Completed",
  },
  {
    id: 1004,
    student: "Ananya Kulkarni",
    email: "ananya@example.com",
    quiz: "World History",
    category: "History",
    score: 16,
    total: 20,
    percentage: 80,
    duration: "14m 36s",
    date: "Aug 13, 2026",
    status: "Completed",
  },
  {
    id: 1005,
    student: "Rohan Mehta",
    email: "rohan@example.com",
    quiz: "Mathematics Basics",
    category: "Mathematics",
    score: 0,
    total: 20,
    percentage: 0,
    duration: "04m 12s",
    date: "Aug 13, 2026",
    status: "Abandoned",
  },
  {
    id: 1006,
    student: "Sneha Joshi",
    email: "sneha@example.com",
    quiz: "English Grammar",
    category: "English",
    score: 0,
    total: 25,
    percentage: 0,
    duration: "08m 41s",
    date: "Aug 12, 2026",
    status: "In Progress",
  },
  {
    id: 1007,
    student: "Vikram Singh",
    email: "vikram@example.com",
    quiz: "Science Challenge",
    category: "Science",
    score: 11,
    total: 15,
    percentage: 73,
    duration: "11m 29s",
    date: "Aug 12, 2026",
    status: "Completed",
  },
  {
    id: 1008,
    student: "Neha Shah",
    email: "neha@example.com",
    quiz: "Ultimate General Knowledge",
    category: "General Knowledge",
    score: 17,
    total: 20,
    percentage: 85,
    duration: "13m 10s",
    date: "Aug 11, 2026",
    status: "Completed",
  },
];

export default function AdminAttemptsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AttemptStatus>(
    "All"
  );
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedAttempt, setSelectedAttempt] =
    useState<Attempt | null>(null);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(initialAttempts.map((item) => item.category))),
    ];
  }, []);

  const filteredAttempts = useMemo(() => {
    return initialAttempts.filter((attempt) => {
      const searchMatch =
        attempt.student.toLowerCase().includes(search.toLowerCase()) ||
        attempt.email.toLowerCase().includes(search.toLowerCase()) ||
        attempt.quiz.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || attempt.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" || attempt.category === categoryFilter;

      return searchMatch && statusMatch && categoryMatch;
    });
  }, [search, statusFilter, categoryFilter]);

  const completed = initialAttempts.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = initialAttempts.filter(
    (item) => item.status === "In Progress"
  ).length;

  const abandoned = initialAttempts.filter(
    (item) => item.status === "Abandoned"
  ).length;

  const averageScore = Math.round(
    initialAttempts
      .filter((item) => item.status === "Completed")
      .reduce((sum, item) => sum + item.percentage, 0) /
      completed
  );

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Sidebar */}

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-20 items-center border-b border-gray-100 px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <div>
              <p className="font-extrabold">
                Quiz<span className="text-indigo-600">Master</span>
              </p>

              <p className="text-[10px] font-bold tracking-widest text-gray-400">
                ADMIN PANEL
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-4 py-6">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Management
          </p>

          <nav className="mt-4 space-y-1">
            <AdminLink
              href="/admin/dashboard"
              icon={<BarChart3 size={18} />}
              label="Dashboard"
            />

            <AdminLink
              href="/admin/quizzes"
              icon={<Brain size={18} />}
              label="Quizzes"
            />

            <AdminLink
              href="/admin/questions"
              icon={<FileText size={18} />}
              label="Questions"
            />

            <AdminLink
              href="/admin/categories"
              icon={<FileText size={18} />}
              label="Categories"
            />

            <AdminLink
              href="/admin/difficulty"
              icon={<Trophy size={18} />}
              label="Difficulty Levels"
            />

            <AdminLink
              href="/admin/attempts"
              icon={<Clock3 size={18} />}
              label="Attempts"
              active
            />

            <AdminLink
              href="/admin/results"
              icon={<CheckCircle2 size={18} />}
              label="Results"
            />

            <AdminLink
              href="/admin/leaderboard"
              icon={<Trophy size={18} />}
              label="Leaderboard"
            />

            <AdminLink
              href="/admin/analytics"
              icon={<BarChart3 size={18} />}
              label="Analytics"
            />
          </nav>
        </div>

        <div className="border-t border-gray-100 p-4">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Users size={18} />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main */}

      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* Header */}

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <Link
                href="/admin/dashboard"
                className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-indigo-600"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>

              <h1 className="text-3xl font-black tracking-tight">
                Quiz Attempts
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Monitor and review all quiz attempts made by students.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
                <CalendarDays size={17} className="text-gray-400" />

                <span className="text-sm font-semibold">
                  Aug 2026
                </span>

                <ChevronDown size={15} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Attempts"
              value={initialAttempts.length.toString()}
              subtitle="All quiz submissions"
              icon={<FileText size={21} />}
              iconBg="bg-indigo-50"
              iconColor="text-indigo-600"
            />

            <StatCard
              title="Completed"
              value={completed.toString()}
              subtitle="Successfully submitted"
              icon={<CheckCircle2 size={21} />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

            <StatCard
              title="In Progress"
              value={inProgress.toString()}
              subtitle="Currently active"
              icon={<Clock3 size={21} />}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
            />

            <StatCard
              title="Average Score"
              value={`${averageScore}%`}
              subtitle="Across completed attempts"
              icon={<Trophy size={21} />}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />
          </div>

          {/* Filters */}

          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-black">All Attempts</h2>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredAttempts.length} attempts found
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
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search student or quiz..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 sm:w-64"
                  />
                </div>

                {/* Status */}

                <div className="relative">
                  <Filter
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value as "All" | AttemptStatus
                      )
                    }
                    className="h-11 appearance-none rounded-xl border border-gray-200 bg-white pl-9 pr-10 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Abandoned">Abandoned</option>
                  </select>
                </div>

                {/* Category */}

                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "All"
                          ? "All Categories"
                          : category}
                      </option>
                    ))}
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
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-y border-gray-100 bg-gray-50">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Quiz</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredAttempts.map((attempt) => (
                    <tr
                      key={attempt.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Student */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                            {attempt.student.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {attempt.student}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {attempt.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Quiz */}

                      <td className="px-6 py-5">
                        <p className="max-w-[220px] truncate text-sm font-bold">
                          {attempt.quiz}
                        </p>

                        <span className="mt-1 inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600">
                          {attempt.category}
                        </span>
                      </td>

                      {/* Score */}

                      <td className="px-6 py-5">
                        {attempt.status === "Completed" ? (
                          <div>
                            <p className="text-sm font-black">
                              {attempt.score}/{attempt.total}
                            </p>

                            <p
                              className={`mt-1 text-xs font-bold ${
                                attempt.percentage >= 80
                                  ? "text-green-600"
                                  : attempt.percentage >= 50
                                    ? "text-orange-600"
                                    : "text-red-500"
                              }`}
                            >
                              {attempt.percentage}%
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-gray-400">
                            —
                          </span>
                        )}
                      </td>

                      {/* Duration */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                          <Clock3 size={15} className="text-gray-400" />
                          {attempt.duration}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-6 py-5 text-sm font-semibold text-gray-500">
                        {attempt.date}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">
                        <StatusBadge status={attempt.status} />
                      </td>

                      {/* Action */}

                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setSelectedAttempt(attempt)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="View attempt"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            title="More options"
                          >
                            <MoreHorizontal size={19} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredAttempts.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-16 text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                          <Search size={24} />
                        </div>

                        <p className="mt-4 font-bold">
                          No attempts found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Abandoned / Info */}

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <XCircle size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Abandoned Attempts
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {abandoned}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Unique Students
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {
                      new Set(
                        initialAttempts.map((attempt) => attempt.email)
                      ).size
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Attempt Modal */}

      {selectedAttempt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
          onClick={() => setSelectedAttempt(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Attempt #{selectedAttempt.id}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Attempt Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedAttempt(null)}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
              >
                <XCircle size={21} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-black text-indigo-600">
                  {selectedAttempt.student.charAt(0)}
                </div>

                <div>
                  <p className="font-black">
                    {selectedAttempt.student}
                  </p>

                  <p className="text-sm text-gray-400">
                    {selectedAttempt.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Quiz
              </p>

              <p className="mt-1 font-bold">
                {selectedAttempt.quiz}
              </p>

              <p className="mt-1 text-sm text-gray-400">
                {selectedAttempt.category}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ModalStat
                label="Score"
                value={
                  selectedAttempt.status === "Completed"
                    ? `${selectedAttempt.score}/${selectedAttempt.total}`
                    : "—"
                }
              />

              <ModalStat
                label="Percentage"
                value={
                  selectedAttempt.status === "Completed"
                    ? `${selectedAttempt.percentage}%`
                    : "—"
                }
              />

              <ModalStat
                label="Duration"
                value={selectedAttempt.duration}
              />

              <ModalStat
                label="Status"
                value={selectedAttempt.status}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/admin/results?attempt=${selectedAttempt.id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700"
              >
                <Eye size={17} />
                View Result
              </Link>

              <button
                onClick={() => setSelectedAttempt(null)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================
   ADMIN LINK
========================================= */

function AdminLink({
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
    </Link>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({
  status,
}: {
  status: AttemptStatus;
}) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">
        <CheckCircle2 size={13} />
        Completed
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
        <Clock3 size={13} />
        In Progress
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500">
      <XCircle size={13} />
      Abandoned
    </span>
  );
}

/* =========================================
   MODAL STAT
========================================= */

function ModalStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black">
        {value}
      </p>
    </div>
  );
}
