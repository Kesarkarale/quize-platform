"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileText,
  Search,
  Trophy,
  Users,
  XCircle,
  Clock3,
  Filter,
} from "lucide-react";

type Result = {
  id: number;
  student: string;
  email: string;
  quiz: string;
  category: string;
  score: number;
  total: number;
  percentage: number;
  time: string;
  date: string;
  status: "Passed" | "Failed";
};

const initialResults: Result[] = [
  {
    id: 1,
    student: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    quiz: "Ultimate General Knowledge",
    category: "General Knowledge",
    score: 18,
    total: 20,
    percentage: 90,
    time: "14 min",
    date: "Aug 14, 2026",
    status: "Passed",
  },
  {
    id: 2,
    student: "Priya Patil",
    email: "priya.patil@example.com",
    quiz: "Science Challenge",
    category: "Science",
    score: 13,
    total: 15,
    percentage: 87,
    time: "11 min",
    date: "Aug 14, 2026",
    status: "Passed",
  },
  {
    id: 3,
    student: "Rahul Deshmukh",
    email: "rahul.d@example.com",
    quiz: "Advanced JavaScript",
    category: "Technology",
    score: 17,
    total: 25,
    percentage: 68,
    time: "22 min",
    date: "Aug 13, 2026",
    status: "Passed",
  },
  {
    id: 4,
    student: "Ananya Kulkarni",
    email: "ananya.k@example.com",
    quiz: "World History",
    category: "History",
    score: 9,
    total: 20,
    percentage: 45,
    time: "17 min",
    date: "Aug 13, 2026",
    status: "Failed",
  },
  {
    id: 5,
    student: "Vedant Joshi",
    email: "vedant.j@example.com",
    quiz: "Mathematics Mastery",
    category: "Mathematics",
    score: 19,
    total: 20,
    percentage: 95,
    time: "13 min",
    date: "Aug 12, 2026",
    status: "Passed",
  },
  {
    id: 6,
    student: "Sneha More",
    email: "sneha.more@example.com",
    quiz: "Science Challenge",
    category: "Science",
    score: 7,
    total: 15,
    percentage: 47,
    time: "14 min",
    date: "Aug 12, 2026",
    status: "Failed",
  },
  {
    id: 7,
    student: "Rohan Pawar",
    email: "rohan.p@example.com",
    quiz: "HTML & CSS Basics",
    category: "Technology",
    score: 16,
    total: 20,
    percentage: 80,
    time: "10 min",
    date: "Aug 11, 2026",
    status: "Passed",
  },
  {
    id: 8,
    student: "Isha Shah",
    email: "isha.shah@example.com",
    quiz: "Indian History",
    category: "History",
    score: 11,
    total: 20,
    percentage: 55,
    time: "16 min",
    date: "Aug 11, 2026",
    status: "Passed",
  },
];

export default function AdminResultsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedResult, setSelectedResult] =
    useState<Result | null>(null);

  const filteredResults = useMemo(() => {
    return initialResults.filter((result) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        result.student.toLowerCase().includes(searchText) ||
        result.email.toLowerCase().includes(searchText) ||
        result.quiz.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        result.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        result.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [search, statusFilter, categoryFilter]);

  const totalAttempts = initialResults.length;

  const passed = initialResults.filter(
    (item) => item.status === "Passed"
  ).length;

  const failed = initialResults.filter(
    (item) => item.status === "Failed"
  ).length;

  const averageScore = Math.round(
    initialResults.reduce(
      (sum, item) => sum + item.percentage,
      0
    ) / initialResults.length
  );

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Sidebar */}

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
              icon={<FileText size={18} />}
              label="Questions"
            />

            <AdminNav
              href="/admin/categories"
              icon={<FileText size={18} />}
              label="Categories"
            />

            <AdminNav
              href="/admin/difficulty"
              icon={<Filter size={18} />}
              label="Difficulty Levels"
            />

            <AdminNav
              href="/admin/attempts"
              icon={<Clock3 size={18} />}
              label="Attempts"
            />

            <AdminNav
              href="/admin/results"
              icon={<Trophy size={18} />}
              label="Results"
              active
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
            />
          </nav>

          <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            System
          </p>

          <nav className="mt-4">
            <AdminNav
              href="/admin/settings"
              icon={<Users size={18} />}
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

      {/* Main */}

      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          {/* Header */}

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/admin/dashboard"
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-indigo-600"
              >
                <ArrowLeft size={14} />
                Back to Dashboard
              </Link>

              <h1 className="text-3xl font-black">
                Student Results
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                View and analyze individual student quiz
                performance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold shadow-sm hover:bg-gray-50">
                <FileText size={17} />
                Export Results
              </button>
            </div>
          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <ResultStat
              title="Total Results"
              value={totalAttempts.toString()}
              icon={<FileText size={21} />}
              description="All submitted quizzes"
            />

            <ResultStat
              title="Passed"
              value={passed.toString()}
              icon={<CheckCircle2 size={21} />}
              description={`${Math.round(
                (passed / totalAttempts) * 100
              )}% pass rate`}
            />

            <ResultStat
              title="Failed"
              value={failed.toString()}
              icon={<XCircle size={21} />}
              description="Need improvement"
            />

            <ResultStat
              title="Average Score"
              value={`${averageScore}%`}
              icon={<Trophy size={21} />}
              description="Across all results"
            />
          </div>

          {/* Results Table */}

          <section className="mt-7 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Toolbar */}

            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-black">
                  All Student Results
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredResults.length} results found
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
                    placeholder="Search student or quiz..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white sm:w-64"
                  />
                </div>

                {/* Status */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold outline-none focus:border-indigo-500"
                >
                  <option value="All">All Status</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                </select>

                {/* Category */}

                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold outline-none focus:border-indigo-500"
                >
                  <option value="All">All Categories</option>
                  <option value="General Knowledge">
                    General Knowledge
                  </option>
                  <option value="Science">Science</option>
                  <option value="Technology">
                    Technology
                  </option>
                  <option value="History">History</option>
                  <option value="Mathematics">
                    Mathematics
                  </option>
                </select>
              </div>
            </div>

            {/* Table */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-gray-50">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4">
                      Student
                    </th>

                    <th className="px-6 py-4">
                      Quiz
                    </th>

                    <th className="px-6 py-4">
                      Score
                    </th>

                    <th className="px-6 py-4">
                      Percentage
                    </th>

                    <th className="px-6 py-4">
                      Time
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredResults.map((result) => (
                    <tr
                      key={result.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Student */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                            {result.student.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {result.student}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {result.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Quiz */}

                      <td className="px-6 py-5">
                        <p className="max-w-[220px] text-sm font-bold">
                          {result.quiz}
                        </p>

                        <span className="mt-1 inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600">
                          {result.category}
                        </span>
                      </td>

                      {/* Score */}

                      <td className="px-6 py-5">
                        <span className="text-sm font-black">
                          {result.score}
                        </span>

                        <span className="text-sm text-gray-400">
                          {" "}
                          / {result.total}
                        </span>
                      </td>

                      {/* Percentage */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full ${
                                result.percentage >= 75
                                  ? "bg-green-500"
                                  : result.percentage >=
                                    50
                                  ? "bg-orange-400"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${result.percentage}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-black">
                            {result.percentage}%
                          </span>
                        </div>
                      </td>

                      {/* Time */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                          <Clock3 size={15} />
                          {result.time}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-6 py-5 text-sm font-medium text-gray-500">
                        {result.date}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                            result.status ===
                            "Passed"
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {result.status ===
                          "Passed" ? (
                            <CheckCircle2
                              size={13}
                            />
                          ) : (
                            <XCircle
                              size={13}
                            />
                          )}

                          {result.status}
                        </span>
                      </td>

                      {/* Action */}

                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            setSelectedResult(
                              result
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredResults.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center"
                      >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                          <Search size={20} />
                        </div>

                        <p className="mt-4 font-bold text-gray-600">
                          No results found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Try changing your search or
                          filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Result Details Modal */}

      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="border-b border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                    Result Details
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {selectedResult.student}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {selectedResult.email}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedResult(null)
                  }
                  className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <XCircle size={22} />
                </button>
              </div>
            </div>

            {/* Quiz */}

            <div className="p-6">
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Quiz
                </p>

                <h3 className="mt-2 text-lg font-black">
                  {selectedResult.quiz}
                </h3>

                <span className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                  {selectedResult.category}
                </span>
              </div>

              {/* Score */}

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <DetailStat
                  label="Score"
                  value={`${selectedResult.score}/${selectedResult.total}`}
                />

                <DetailStat
                  label="Percentage"
                  value={`${selectedResult.percentage}%`}
                />

                <DetailStat
                  label="Time"
                  value={selectedResult.time}
                />

                <DetailStat
                  label="Status"
                  value={selectedResult.status}
                />
              </div>

              {/* Progress */}

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">
                    Overall Performance
                  </p>

                  <p className="text-sm font-black text-indigo-600">
                    {selectedResult.percentage}%
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${
                      selectedResult.percentage >=
                      75
                        ? "bg-green-500"
                        : selectedResult.percentage >=
                          50
                        ? "bg-orange-400"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${selectedResult.percentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Actions */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">
                  <Eye size={17} />
                  View Answer Review
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">
                  <FileText size={17} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================
   ADMIN NAV
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
   RESULT STAT
========================================= */

function ResultStat({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
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

      <p className="mt-1 text-xs font-medium text-gray-400">
        {description}
      </p>
    </div>
  );
}

/* =========================================
   DETAIL STAT
========================================= */

function DetailStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-2 truncate text-sm font-black">
        {value}
      </p>
    </div>
  );
}
