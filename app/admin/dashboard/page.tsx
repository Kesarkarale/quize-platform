"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  Menu,
  X,
  FileQuestion,
  TrendingUp,
  UserCheck,
  Target,
  ClipboardList,
  ChevronRight,
  Activity,
  BookOpen,
  ShieldCheck,
  UserX,
  RefreshCw,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
  duration_minutes: number;
  total_marks: number;
  created_at: string;
  category_id: string | null;
};

type Category = {
  id: string;
  name: string;
};

type Profile = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
};

type Attempt = {
  id: string;
  score: number;
  total_marks: number;
  percentage: number;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  created_at: string;
  student_id: string;
  quiz_id: string;
};

type DashboardData = {
  students: Profile[];
  quizzes: Quiz[];
  categories: Category[];
  attempts: Attempt[];
  questionCount: number;
};

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quizzes",
    href: "/app/quiz",
    icon: Brain,
  },
  {
    title: "Questions",
    href: "/admin/questions",
    icon: FileQuestion,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: BookOpen,
  },
  {
    title: "Difficulty",
    href: "/admin/difficulty",
    icon: Target,
  },
  {
    title: "Attempts",
    href: "/admin/attempts",
    icon: ClipboardList,
  },
  {
    title: "Results",
    href: "/admin/results",
    icon: CheckCircle2,
  },
  {
    title: "Leaderboard",
    href: "/admin/leaderboard",
    icon: Trophy,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);

const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export default function AdminPage() {
  const supabase = createClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [adminName, setAdminName] = useState("Admin");

  const [data, setData] = useState<DashboardData>({
    students: [],
    quizzes: [],
    categories: [],
    attempts: [],
    questionCount: 0,
  });

  const loadDashboard = async (showRefresh = false) => {
    try {
      setError("");

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, email, role, status")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (!profile) {
        setError("Admin profile was not found.");
        return;
      }

      if (profile.role !== "ADMIN") {
        window.location.href = "/student/dashboard";
        return;
      }

      if (profile.status !== "ACTIVE") {
        await supabase.auth.signOut();
        window.location.href = "/login";
        return;
      }

      setAdminName(profile.name || "Admin");

      const [
        studentsResult,
        quizzesResult,
        categoriesResult,
        attemptsResult,
        questionsResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select(
            "id, name, email, role, status, created_at",
            { count: "exact" }
          )
          .eq("role", "STUDENT")
          .order("created_at", { ascending: false }),

        supabase
          .from("quizzes")
          .select(
            "id, title, description, status, duration_minutes, total_marks, created_at, category_id"
          )
          .order("created_at", { ascending: false }),

        supabase
          .from("categories")
          .select("id, name")
          .order("name", { ascending: true }),

        supabase
          .from("quiz_attempts")
          .select(
            "id, score, total_marks, percentage, status, created_at, student_id, quiz_id"
          )
          .order("created_at", { ascending: false }),

        supabase
          .from("questions")
          .select("id", { count: "exact", head: true }),
      ]);

      if (studentsResult.error) throw studentsResult.error;
      if (quizzesResult.error) throw quizzesResult.error;
      if (categoriesResult.error) throw categoriesResult.error;
      if (attemptsResult.error) throw attemptsResult.error;
      if (questionsResult.error) throw questionsResult.error;

      setData({
        students: (studentsResult.data || []) as Profile[],
        quizzes: (quizzesResult.data || []) as Quiz[],
        categories: (categoriesResult.data || []) as Category[],
        attempts: (attemptsResult.data || []) as Attempt[],
        questionCount: questionsResult.count || 0,
      });
    } catch (err: any) {
      console.error("Admin dashboard error:", err);

      setError(
        err?.message ||
          "Something went wrong while loading the admin dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const totalStudents = data.students.length;

    const activeStudents = data.students.filter(
      (student) => student.status === "ACTIVE"
    ).length;

    const totalQuizzes = data.quizzes.length;

    const publishedQuizzes = data.quizzes.filter(
      (quiz) => quiz.status === "PUBLISHED"
    ).length;

    const draftQuizzes = data.quizzes.filter(
      (quiz) => quiz.status === "DRAFT"
    ).length;

    const unpublishedQuizzes = data.quizzes.filter(
      (quiz) => quiz.status === "UNPUBLISHED"
    ).length;

    const completedAttempts = data.attempts.filter(
      (attempt) => attempt.status === "COMPLETED"
    );

    const totalAttempts = data.attempts.length;

    const averageScore =
      completedAttempts.length > 0
        ? completedAttempts.reduce(
            (sum, attempt) => sum + Number(attempt.percentage || 0),
            0
          ) / completedAttempts.length
        : 0;

    const passedAttempts = completedAttempts.filter(
      (attempt) => Number(attempt.percentage || 0) >= 40
    ).length;

    const passRate =
      completedAttempts.length > 0
        ? (passedAttempts / completedAttempts.length) * 100
        : 0;

    return {
      totalStudents,
      activeStudents,
      totalQuizzes,
      publishedQuizzes,
      draftQuizzes,
      unpublishedQuizzes,
      totalAttempts,
      averageScore,
      passRate,
    };
  }, [data]);

  const filteredQuizzes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return data.quizzes.slice(0, 8);
    }

    return data.quizzes
      .filter((quiz) =>
        quiz.title.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [data.quizzes, searchQuery]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();

    data.categories.forEach((category) => {
      map.set(category.id, category.name);
    });

    return map;
  }, [data.categories]);

  const recentAttempts = data.attempts.slice(0, 5);

  const studentMap = useMemo(() => {
    const map = new Map<string, Profile>();

    data.students.forEach((student) => {
      map.set(student.id, student);
    });

    return map;
  }, [data.students]);

  const quizMap = useMemo(() => {
    const map = new Map<string, Quiz>();

    data.quizzes.forEach((quiz) => {
      map.set(quiz.id, quiz);
    });

    return map;
  }, [data.quizzes]);

  const activityData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const now = new Date();

    return days.map((day, index) => {
      const date = new Date(now);

      const currentDay = date.getDay();

      const mondayOffset =
        currentDay === 0 ? -6 : 1 - currentDay;

      date.setDate(
        now.getDate() + mondayOffset + index
      );

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const count = data.attempts.filter((attempt) => {
        const attemptDate = new Date(attempt.created_at);

        return (
          attemptDate >= start &&
          attemptDate <= end
        );
      }).length;

      return {
        day,
        count,
      };
    });
  }, [data.attempts]);

  const maxActivity = Math.max(
    ...activityData.map((item) => item.count),
    1
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* MOBILE HEADER */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl p-2 hover:bg-gray-100"
          aria-label="Open menu"
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
          {adminName.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
              <Brain size={21} />
            </div>

            <div>
              <p className="font-extrabold">
                Quiz<span className="text-indigo-600">Master</span>
              </p>

              <p className="text-[10px] font-semibold tracking-widest text-gray-400">
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

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active = item.href === "/admin";

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <p className="mt-8 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            System
          </p>

          <nav className="mt-4 space-y-1">
            <Link
              href="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings size={19} />
              Settings
            </Link>
          </nav>
        </div>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* TOP HEADER */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Admin Control Center
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Dashboard Overview
              </h1>

              <p className="mt-1 text-gray-400">
                Welcome back, {adminName}. Here's what's happening
                on your platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => loadDashboard(true)}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
              >
                <RefreshCw
                  size={17}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <Link
                href="/admin/quizzes/create"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Quiz
              </Link>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700">
              <X size={18} className="mt-0.5 shrink-0" />

              <div>
                <p className="font-bold">
                  Unable to load dashboard
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
                  />
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div className="h-80 animate-pulse rounded-2xl bg-white" />
                <div className="h-80 animate-pulse rounded-2xl bg-white" />
              </div>
            </div>
          ) : (
            <>
              {/* STATS */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Students"
                  value={formatNumber(stats.totalStudents)}
                  change={`${formatNumber(
                    stats.activeStudents
                  )} active`}
                  icon={Users}
                  iconClass="bg-indigo-50 text-indigo-600"
                  changeClass="bg-green-50 text-green-600"
                />

                <StatCard
                  title="Total Quizzes"
                  value={formatNumber(stats.totalQuizzes)}
                  change={`${formatNumber(
                    stats.publishedQuizzes
                  )} published`}
                  icon={Brain}
                  iconClass="bg-purple-50 text-purple-600"
                  changeClass="bg-green-50 text-green-600"
                />

                <StatCard
                  title="Quiz Attempts"
                  value={formatNumber(stats.totalAttempts)}
                  change={`${stats.averageScore.toFixed(
                    1
                  )}% avg score`}
                  icon={TrendingUp}
                  iconClass="bg-blue-50 text-blue-600"
                  changeClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                  title="Questions"
                  value={formatNumber(data.questionCount)}
                  change={`${stats.passRate.toFixed(
                    1
                  )}% pass rate`}
                  icon={FileQuestion}
                  iconClass="bg-orange-50 text-orange-600"
                  changeClass="bg-orange-50 text-orange-600"
                />
              </div>

              {/* SECONDARY STATS */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MiniStat
                  icon={UserCheck}
                  title="Active Students"
                  value={formatNumber(stats.activeStudents)}
                  className="text-green-600 bg-green-50"
                />

                <MiniStat
                  icon={CheckCircle2}
                  title="Published Quizzes"
                  value={formatNumber(stats.publishedQuizzes)}
                  className="text-indigo-600 bg-indigo-50"
                />

                <MiniStat
                  icon={Clock3}
                  title="Draft Quizzes"
                  value={formatNumber(stats.draftQuizzes)}
                  className="text-orange-600 bg-orange-50"
                />

                <MiniStat
                  icon={UserX}
                  title="Inactive Students"
                  value={formatNumber(
                    stats.totalStudents -
                      stats.activeStudents
                  )}
                  className="text-red-600 bg-red-50"
                />
              </div>

              {/* ANALYTICS */}
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Activity size={18} />
                        </div>

                        <h2 className="font-black">
                          Quiz Activity
                        </h2>
                      </div>

                      <p className="mt-2 text-sm text-gray-400">
                        Quiz attempts during the current week.
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500">
                      This Week
                    </div>
                  </div>

                  <div className="mt-8 flex h-56 items-end gap-2 sm:gap-5">
                    {activityData.map((item) => {
                      const height =
                        item.count === 0
                          ? 4
                          : Math.max(
                              (item.count / maxActivity) *
                                100,
                              8
                            );

                      return (
                        <div
                          key={item.day}
                          className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                        >
                          <div className="flex h-44 w-full items-end">
                            <div
                              className="group relative w-full cursor-pointer rounded-t-xl bg-indigo-500 transition hover:bg-indigo-600"
                              style={{
                                height: `${height}%`,
                              }}
                            >
                              <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                                {item.count}
                              </span>
                            </div>
                          </div>

                          <span className="text-xs font-semibold text-gray-400">
                            {item.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* PLATFORM HEALTH */}
                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <h2 className="font-black">
                        Platform Overview
                      </h2>

                      <p className="text-xs text-gray-400">
                        Current platform health
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <ProgressRow
                      title="Active Students"
                      value={stats.activeStudents}
                      total={Math.max(
                        stats.totalStudents,
                        1
                      )}
                    />

                    <ProgressRow
                      title="Published Quizzes"
                      value={stats.publishedQuizzes}
                      total={Math.max(
                        stats.totalQuizzes,
                        1
                      )}
                    />

                    <ProgressRow
                      title="Pass Rate"
                      value={stats.passRate}
                      total={100}
                      suffix="%"
                    />
                  </div>

                  <div className="mt-6 rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400">
                        Total Categories
                      </span>

                      <span className="font-black">
                        {data.categories.length}
                      </span>
                    </div>
                  </div>
                </section>
              </div>

              {/* RECENT ATTEMPTS */}
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
                <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <div>
                      <h2 className="font-black">
                        Recent Quiz Attempts
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        Latest student quiz activity.
                      </p>
                    </div>

                    <Link
                      href="/admin/attempts"
                      className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      View All
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    {recentAttempts.length > 0 ? (
                      <table className="w-full min-w-[650px] text-left">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                          <tr>
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
                              Status
                            </th>

                            <th className="px-6 py-4">
                              Time
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                          {recentAttempts.map(
                            (attempt) => {
                              const student =
                                studentMap.get(
                                  attempt.student_id
                                );

                              const quiz =
                                quizMap.get(
                                  attempt.quiz_id
                                );

                              return (
                                <tr
                                  key={attempt.id}
                                  className="transition hover:bg-gray-50"
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-sm font-black text-indigo-600">
                                        {(
                                          student?.name ||
                                          "S"
                                        )
                                          .charAt(0)
                                          .toUpperCase()}
                                      </div>

                                      <div>
                                        <p className="text-sm font-bold">
                                          {student?.name ||
                                            "Unknown Student"}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                          {student?.email ||
                                            "No email"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-6 py-4">
                                    <p className="max-w-[180px] truncate text-sm font-semibold">
                                      {quiz?.title ||
                                        "Unknown Quiz"}
                                    </p>
                                  </td>

                                  <td className="px-6 py-4">
                                    <span className="font-black text-gray-800">
                                      {Number(
                                        attempt.percentage ||
                                          0
                                      ).toFixed(0)}
                                      %
                                    </span>
                                  </td>

                                  <td className="px-6 py-4">
                                    <span
                                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                        attempt.status ===
                                        "COMPLETED"
                                          ? "bg-green-50 text-green-600"
                                          : attempt.status ===
                                            "IN_PROGRESS"
                                          ? "bg-blue-50 text-blue-600"
                                          : "bg-red-50 text-red-600"
                                      }`}
                                    >
                                      {attempt.status.replace(
                                        "_",
                                        " "
                                      )}
                                    </span>
                                  </td>

                                  <td className="px-6 py-4 text-xs font-semibold text-gray-400">
                                    {formatTimeAgo(
                                      attempt.created_at
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <EmptyState
                        icon={ClipboardList}
                        title="No attempts yet"
                        description="Student quiz attempts will appear here."
                      />
                    )}
                  </div>
                </section>

                {/* RECENT STUDENTS */}
                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-black">
                        Recent Students
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        Newly registered students.
                      </p>
                    </div>

                    <Link
                      href="/admin/students"
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <MoreHorizontal size={20} />
                    </Link>
                  </div>

                  <div className="mt-6 space-y-4">
                    {data.students.length > 0 ? (
                      data.students
                        .slice(0, 5)
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-black text-indigo-600">
                                {student.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold">
                                  {student.name}
                                </p>

                                <p className="truncate text-xs text-gray-400">
                                  {formatTimeAgo(
                                    student.created_at
                                  )}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                student.status ===
                                "ACTIVE"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {student.status}
                            </span>
                          </div>
                        ))
                    ) : (
                      <EmptyState
                        icon={Users}
                        title="No students"
                        description="Registered students will appear here."
                      />
                    )}
                  </div>
                </section>
              </div>

              {/* QUIZ MANAGEMENT */}
              <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-black">
                      Quiz Management
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Manage quizzes, status and content.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(
                            e.target.value
                          )
                        }
                        placeholder="Search quizzes..."
                        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                      />
                    </div>

                    <Link
                      href="/admin/quizzes"
                      className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
                    >
                      Manage
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {filteredQuizzes.length > 0 ? (
                    <table className="w-full min-w-[850px] text-left">
                      <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                        <tr>
                          <th className="px-6 py-4">
                            Quiz
                          </th>

                          <th className="px-6 py-4">
                            Category
                          </th>

                          <th className="px-6 py-4">
                            Duration
                          </th>

                          <th className="px-6 py-4">
                            Marks
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
                        {filteredQuizzes.map(
                          (quiz) => (
                            <tr
                              key={quiz.id}
                              className="transition hover:bg-gray-50"
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <Brain size={18} />
                                  </div>

                                  <div>
                                    <p className="font-bold">
                                      {quiz.title}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                      {quiz.id.slice(
                                        0,
                                        8
                                      )}
                                      ...
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                                  {quiz.category_id
                                    ? categoryMap.get(
                                        quiz.category_id
                                      ) ||
                                      "Uncategorized"
                                    : "Uncategorized"}
                                </span>
                              </td>

                              <td className="px-6 py-5 font-semibold text-gray-600">
                                {
                                  quiz.duration_minutes
                                }{" "}
                                min
                              </td>

                              <td className="px-6 py-5 font-semibold text-gray-600">
                                {quiz.total_marks}
                              </td>

                              <td className="px-6 py-5">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                                    quiz.status ===
                                    "PUBLISHED"
                                      ? "bg-green-50 text-green-600"
                                      : quiz.status ===
                                        "DRAFT"
                                      ? "bg-orange-50 text-orange-600"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {quiz.status ===
                                  "PUBLISHED" ? (
                                    <CheckCircle2
                                      size={14}
                                    />
                                  ) : (
                                    <Clock3
                                      size={14}
                                    />
                                  )}

                                  {quiz.status}
                                </span>
                              </td>

                              <td className="px-6 py-5">
                                <Link
                                  href={`/admin/quizzes/${quiz.id}`}
                                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                >
                                  <MoreHorizontal
                                    size={20}
                                  />
                                </Link>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyState
                      icon={Brain}
                      title={
                        searchQuery
                          ? "No quizzes found"
                          : "No quizzes created yet"
                      }
                      description={
                        searchQuery
                          ? "Try a different search term."
                          : "Create your first quiz to get started."
                      }
                      actionHref="/admin/quizzes/create"
                      actionText="Create Quiz"
                    />
                  )}
                </div>
              </section>

              {/* BOTTOM CARDS */}
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <BottomCard
                  icon={CheckCircle2}
                  title="Published Quizzes"
                  value={stats.publishedQuizzes}
                  description="Currently available to students"
                  className="bg-green-50 text-green-600"
                />

                <BottomCard
                  icon={Clock3}
                  title="Draft Quizzes"
                  value={stats.draftQuizzes}
                  description="Quizzes waiting to be published"
                  className="bg-orange-50 text-orange-600"
                />

                <BottomCard
                  icon={BarChart3}
                  title="Average Score"
                  value={`${stats.averageScore.toFixed(
                    1
                  )}%`}
                  description="Across completed attempts"
                  className="bg-indigo-50 text-indigo-600"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconClass,
  changeClass,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  iconClass: string;
  changeClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${changeClass}`}
        >
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  title,
  value,
  className,
}: {
  icon: any;
  title: string;
  value: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${className}`}
      >
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400">
          {title}
        </p>

        <p className="mt-0.5 font-black">{value}</p>
      </div>
    </div>
  );
}

function ProgressRow({
  title,
  value,
  total,
  suffix = "",
}: {
  title: string;
  value: number;
  total: number;
  suffix?: string;
}) {
  const percentage = Math.min(
    Math.max((value / total) * 100, 0),
    100
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500">
          {title}
        </span>

        <span className="text-xs font-black text-gray-800">
          {typeof value === "number"
            ? value.toFixed(
                suffix === "%" ? 1 : 0
              )
            : value}
          {suffix}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionText,
}: {
  icon: any;
  title: string;
  description: string;
  actionHref?: string;
  actionText?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
        <Icon size={24} />
      </div>

      <h3 className="mt-4 font-black">{title}</h3>

      <p className="mt-1 max-w-sm text-sm text-gray-400">
        {description}
      </p>

      {actionHref && actionText && (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
        >
          <Plus size={16} />
          {actionText}
        </Link>
      )}
    </div>
  );
}

function BottomCard({
  icon: Icon,
  title,
  value,
  description,
  className,
}: {
  icon: any;
  title: string;
  value: number | string;
  description: string;
  className: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${className}`}
        >
          <Icon size={21} />
        </div>

        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <p className="text-2xl font-black">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-gray-400">
        {description}
      </p>
    </div>
  );
}
