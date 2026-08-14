"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileQuestion,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Target,
  Trophy,
  UserCheck,
  Users,
  UserX,
  X,
  BookOpen,
  ClipboardList,
} from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/client";

/* =========================================================
   TYPES
========================================================= */

type Profile = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
};

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
  duration_minutes: number;
  total_marks: number;
  category_id: string | null;
  created_at: string;
};

type Category = {
  id: string;
  name: string;
};

type Attempt = {
  id: string;
  student_id: string;
  quiz_id: string;
  score: number;
  total_marks: number;
  percentage: number;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  created_at: string;
};

type DashboardData = {
  students: Profile[];
  quizzes: Quiz[];
  categories: Category[];
  attempts: Attempt[];
  questionCount: number;
};

/* =========================================================
   NAVIGATION
========================================================= */

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

/* =========================================================
   HELPERS
========================================================= */

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);

  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminDashboardPage() {
  const supabase = createClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [adminName, setAdminName] = useState("Admin");
  const [search, setSearch] = useState("");

  const [data, setData] = useState<DashboardData>({
    students: [],
    quizzes: [],
    categories: [],
    attempts: [],
    questionCount: 0,
  });

  /* =======================================================
     LOAD DASHBOARD
  ======================================================= */

  const loadDashboard = async (refresh = false) => {
    try {
      setError("");

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select(
            "id, name, email, role, status, created_at"
          )
          .eq("id", user.id)
          .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        throw new Error("Admin profile was not found.");
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
        students,
        quizzes,
        categories,
        attempts,
        questions,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select(
            "id, name, email, role, status, created_at"
          )
          .eq("role", "STUDENT")
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("quizzes")
          .select(
            "id, title, description, status, duration_minutes, total_marks, category_id, created_at"
          )
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("categories")
          .select("id, name")
          .order("name"),

        supabase
          .from("quiz_attempts")
          .select(
            "id, student_id, quiz_id, score, total_marks, percentage, status, created_at"
          )
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("questions")
          .select("id", {
            count: "exact",
            head: true,
          }),
      ]);

      if (students.error) throw students.error;
      if (quizzes.error) throw quizzes.error;
      if (categories.error) throw categories.error;
      if (attempts.error) throw attempts.error;
      if (questions.error) throw questions.error;

      setData({
        students: (students.data || []) as Profile[],
        quizzes: (quizzes.data || []) as Quiz[],
        categories: (categories.data ||
          []) as Category[],
        attempts: (attempts.data ||
          []) as Attempt[],
        questionCount: questions.count || 0,
      });
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
          "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const totalStudents = data.students.length;

    const activeStudents = data.students.filter(
      (student) => student.status === "ACTIVE"
    ).length;

    const totalQuizzes = data.quizzes.length;

    const publishedQuizzes =
      data.quizzes.filter(
        (quiz) => quiz.status === "PUBLISHED"
      ).length;

    const draftQuizzes =
      data.quizzes.filter(
        (quiz) => quiz.status === "DRAFT"
      ).length;

    const completedAttempts =
      data.attempts.filter(
        (attempt) =>
          attempt.status === "COMPLETED"
      );

    const totalAttempts = data.attempts.length;

    const averageScore =
      completedAttempts.length > 0
        ? completedAttempts.reduce(
            (sum, item) =>
              sum + Number(item.percentage || 0),
            0
          ) / completedAttempts.length
        : 0;

    const passed =
      completedAttempts.filter(
        (attempt) =>
          Number(attempt.percentage || 0) >= 40
      ).length;

    const passRate =
      completedAttempts.length > 0
        ? (passed / completedAttempts.length) * 100
        : 0;

    return {
      totalStudents,
      activeStudents,
      inactiveStudents:
        totalStudents - activeStudents,
      totalQuizzes,
      publishedQuizzes,
      draftQuizzes,
      totalAttempts,
      averageScore,
      passRate,
    };
  }, [data]);

  /* =======================================================
     MAPS
  ======================================================= */

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();

    data.categories.forEach((category) => {
      map.set(category.id, category.name);
    });

    return map;
  }, [data.categories]);

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

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredQuizzes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return data.quizzes.slice(0, 6);
    }

    return data.quizzes
      .filter((quiz) =>
        quiz.title
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 6);
  }, [data.quizzes, search]);

  /* =======================================================
     WEEK ACTIVITY
  ======================================================= */

  const weeklyActivity = useMemo(() => {
    const result: {
      label: string;
      count: number;
    }[] = [];

    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(today.getDate() - i);

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const count = data.attempts.filter(
        (attempt) => {
          const created = new Date(
            attempt.created_at
          );

          return (
            created >= start &&
            created <= end
          );
        }
      ).length;

      result.push({
        label: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),
        count,
      });
    }

    return result;
  }, [data.attempts]);

  const maxActivity = Math.max(
    ...weeklyActivity.map(
      (item) => item.count
    ),
    1
  );

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900 dark:bg-[#050816] dark:text-gray-100">
      {/* MOBILE HEADER */}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur dark:border-white/10 dark:bg-[#080b18]/95 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Brain size={18} />
          </div>

          <span className="font-black">
            Quiz<span className="text-indigo-500">
              Master
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            {adminName
              .charAt(0)
              .toUpperCase()}
          </div>
        </div>
      </header>

      {/* OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-[#080b18] ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-5 dark:border-white/10">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <Brain size={21} />
            </div>

            <div>
              <p className="font-black">
                Quiz
                <span className="text-indigo-500">
                  Master
                </span>
              </p>

              <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                ADMIN PANEL
              </p>
            </div>
          </Link>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Main Menu
          </p>

          <nav className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                item.href ===
                "/admin/dashboard";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <p className="mt-8 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            System
          </p>

          <Link
            href="/admin/settings"
            className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
          >
            <Settings size={18} />
            Settings
          </Link>
        </div>

        <div className="border-t border-gray-100 p-4 dark:border-white/10">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="lg:ml-64">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
          {/* TOP BAR */}

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                <ShieldCheck size={16} />
                Admin Control Center
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Dashboard Overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Monitor students, quizzes, attempts,
                performance and platform activity from
                one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ThemeToggle />

              <button
                onClick={() =>
                  loadDashboard(true)
                }
                disabled={refreshing}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold shadow-sm transition hover:bg-gray-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <RefreshCw
                  size={17}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
                Refresh
              </button>

              <Link
                href="/admin/quizzes/create"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Quiz
              </Link>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              <X size={18} />

              <div>
                <p className="font-black">
                  Dashboard Error
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* LOADING */}

          {loading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* STAT CARDS */}

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Students"
                  value={formatNumber(
                    stats.totalStudents
                  )}
                  subtitle={`${formatNumber(
                    stats.activeStudents
                  )} active students`}
                  icon={Users}
                  iconStyle="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                />

                <StatCard
                  title="Total Quizzes"
                  value={formatNumber(
                    stats.totalQuizzes
                  )}
                  subtitle={`${formatNumber(
                    stats.publishedQuizzes
                  )} published`}
                  icon={Brain}
                  iconStyle="bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
                />

                <StatCard
                  title="Quiz Attempts"
                  value={formatNumber(
                    stats.totalAttempts
                  )}
                  subtitle={`${stats.averageScore.toFixed(
                    1
                  )}% average score`}
                  icon={Activity}
                  iconStyle="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                />

                <StatCard
                  title="Questions"
                  value={formatNumber(
                    data.questionCount
                  )}
                  subtitle={`${stats.passRate.toFixed(
                    1
                  )}% overall pass rate`}
                  icon={FileQuestion}
                  iconStyle="bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                />
              </div>

              {/* SMALL STATS */}

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MiniStat
                  title="Active Students"
                  value={stats.activeStudents}
                  icon={UserCheck}
                  style="text-green-600 bg-green-50 dark:bg-green-500/10"
                />

                <MiniStat
                  title="Published Quizzes"
                  value={
                    stats.publishedQuizzes
                  }
                  icon={CheckCircle2}
                  style="text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10"
                />

                <MiniStat
                  title="Draft Quizzes"
                  value={stats.draftQuizzes}
                  icon={Clock3}
                  style="text-orange-600 bg-orange-50 dark:bg-orange-500/10"
                />

                <MiniStat
                  title="Inactive Students"
                  value={
                    stats.inactiveStudents
                  }
                  icon={UserX}
                  style="text-red-600 bg-red-50 dark:bg-red-500/10"
                />
              </div>

              {/* ANALYTICS */}

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
                {/* ACTIVITY */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          <Activity size={19} />
                        </div>

                        <div>
                          <h2 className="font-black">
                            Quiz Activity
                          </h2>

                          <p className="text-xs text-gray-400">
                            Last 7 days
                          </p>
                        </div>
                      </div>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500 dark:bg-white/5 dark:text-gray-400">
                      Weekly
                    </span>
                  </div>

                  <div className="mt-8 flex h-60 items-end gap-3 sm:gap-5">
                    {weeklyActivity.map(
                      (item) => {
                        const height =
                          item.count === 0
                            ? 5
                            : Math.max(
                                (item.count /
                                  maxActivity) *
                                  100,
                                10
                              );

                        return (
                          <div
                            key={`${item.label}-${item.count}`}
                            className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                          >
                            <div className="flex h-48 w-full items-end">
                              <div
                                className="group relative w-full rounded-t-xl bg-indigo-500 transition-all hover:bg-indigo-600"
                                style={{
                                  height: `${height}%`,
                                }}
                              >
                                <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[10px] font-black text-white group-hover:block">
                                  {item.count}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs font-bold text-gray-400">
                              {item.label}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </section>

                {/* PLATFORM HEALTH */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <h2 className="font-black">
                        Platform Health
                      </h2>

                      <p className="text-xs text-gray-400">
                        Current overview
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-6">
                    <ProgressRow
                      title="Active Students"
                      value={
                        stats.activeStudents
                      }
                      total={Math.max(
                        stats.totalStudents,
                        1
                      )}
                    />

                    <ProgressRow
                      title="Published Quizzes"
                      value={
                        stats.publishedQuizzes
                      }
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

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
                      <p className="text-xs font-bold text-gray-400">
                        Categories
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {data.categories.length}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
                      <p className="text-xs font-bold text-gray-400">
                        Avg. Score
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {stats.averageScore.toFixed(
                          1
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* RECENT ACTIVITY */}

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-white/10">
                    <div>
                      <h2 className="font-black">
                        Recent Quiz Attempts
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        Latest student activity
                      </p>
                    </div>

                    <Link
                      href="/admin/attempts"
                      className="flex items-center gap-1 text-sm font-black text-indigo-600 dark:text-indigo-400"
                    >
                      View all
                      <ChevronRight
                        size={16}
                      />
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    {data.attempts.length ===
                    0 ? (
                      <EmptyState
                        icon={ClipboardList}
                        title="No attempts yet"
                        description="Student attempts will appear here."
                      />
                    ) : (
                      <table className="w-full min-w-[700px] text-left">
                        <thead className="bg-gray-50 dark:bg-white/[0.02]">
                          <tr className="text-xs font-black uppercase tracking-wider text-gray-400">
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

                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                          {data.attempts
                            .slice(0, 6)
                            .map(
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
                                    key={
                                      attempt.id
                                    }
                                    className="transition hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                                  >
                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                          {(
                                            student?.name ||
                                            "S"
                                          )
                                            .charAt(
                                              0
                                            )
                                            .toUpperCase()}
                                        </div>

                                        <div>
                                          <p className="text-sm font-bold">
                                            {student?.name ||
                                              "Unknown"}
                                          </p>

                                          <p className="text-xs text-gray-400">
                                            {student?.email ||
                                              "No email"}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-6 py-4">
                                      <p className="max-w-[180px] truncate text-sm font-bold">
                                        {quiz?.title ||
                                          "Unknown Quiz"}
                                      </p>
                                    </td>

                                    <td className="px-6 py-4">
                                      <span className="font-black">
                                        {Number(
                                          attempt.percentage ||
                                            0
                                        ).toFixed(
                                          0
                                        )}
                                        %
                                      </span>
                                    </td>

                                    <td className="px-6 py-4">
                                      <StatusBadge
                                        status={
                                          attempt.status
                                        }
                                      />
                                    </td>

                                    <td className="px-6 py-4 text-xs font-semibold text-gray-400">
                                      {timeAgo(
                                        attempt.created_at
                                      )}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </section>

                {/* STUDENTS */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-black">
                        Recent Students
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        Latest registrations
                      </p>
                    </div>

                    <Link
                      href="/admin/students"
                      className="text-sm font-black text-indigo-600 dark:text-indigo-400"
                    >
                      View
                    </Link>
                  </div>

                  <div className="mt-6 space-y-4">
                    {data.students
                      .slice(0, 5)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                              {student.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-black">
                                {student.name}
                              </p>

                              <p className="truncate text-xs text-gray-400">
                                {timeAgo(
                                  student.created_at
                                )}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
                              student.status ===
                              "ACTIVE"
                                ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                            }`}
                          >
                            {student.status}
                          </span>
                        </div>
                      ))}

                    {data.students.length ===
                      0 && (
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

              <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-col gap-4 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between dark:border-white/10">
                  <div>
                    <h2 className="font-black">
                      Quiz Management
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Manage your latest quizzes.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        value={search}
                        onChange={(e) =>
                          setSearch(
                            e.target.value
                          )
                        }
                        placeholder="Search quiz..."
                        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-white/10 dark:bg-white/5 dark:focus:ring-indigo-500/10 sm:w-64"
                      />
                    </div>

                    <Link
                      href="/admin/quizzes"
                      className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
                    >
                      Manage
                      <ChevronRight
                        size={16}
                      />
                    </Link>
                  </div>
                </div>

                {filteredQuizzes.length ===
                0 ? (
                  <EmptyState
                    icon={Brain}
                    title={
                      search
                        ? "No quizzes found"
                        : "No quizzes yet"
                    }
                    description={
                      search
                        ? "Try another search term."
                        : "Create your first quiz to get started."
                    }
                    actionHref="/admin/quizzes/create"
                    actionText="Create Quiz"
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                      <thead className="bg-gray-50 dark:bg-white/[0.02]">
                        <tr className="text-xs font-black uppercase tracking-wider text-gray-400">
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

                      <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                        {filteredQuizzes.map(
                          (quiz) => (
                            <tr
                              key={quiz.id}
                              className="transition hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <Brain
                                      size={18}
                                    />
                                  </div>

                                  <div>
                                    <p className="font-black">
                                      {quiz.title}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                      ID:{" "}
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
                                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                  {quiz.category_id
                                    ? categoryMap.get(
                                        quiz.category_id
                                      ) ||
                                      "Uncategorized"
                                    : "Uncategorized"}
                                </span>
                              </td>

                              <td className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400">
                                {
                                  quiz.duration_minutes
                                }{" "}
                                min
                              </td>

                              <td className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400">
                                {quiz.total_marks}
                              </td>

                              <td className="px-6 py-5">
                                <QuizStatus
                                  status={
                                    quiz.status
                                  }
                                />
                              </td>

                              <td className="px-6 py-5">
                                <Link
                                  href={`/admin/quizzes/${quiz.id}`}
                                  className="inline-flex rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                                >
                                  <ChevronRight
                                    size={18}
                                  />
                                </Link>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* BOTTOM SUMMARY */}

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <SummaryCard
                  icon={CheckCircle2}
                  title="Published Quizzes"
                  value={
                    stats.publishedQuizzes
                  }
                  description="Available to students"
                  style="bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                />

                <SummaryCard
                  icon={Clock3}
                  title="Draft Quizzes"
                  value={stats.draftQuizzes}
                  description="Waiting to be published"
                  style="bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                />

                <SummaryCard
                  icon={BarChart3}
                  title="Average Score"
                  value={`${stats.averageScore.toFixed(
                    1
                  )}%`}
                  description="Across completed attempts"
                  style="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconStyle,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  iconStyle: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={21} />
        </div>

        <div className="h-2 w-2 rounded-full bg-green-500" />
      </div>

      <p className="mt-5 text-sm font-bold text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black">
        {value}
      </p>

      <p className="mt-2 text-xs font-semibold text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

function MiniStat({
  title,
  value,
  icon: Icon,
  style,
}: {
  title: string;
  value: number;
  icon: any;
  style: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${style}`}
      >
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-bold text-gray-400">
          {title}
        </p>

        <p className="mt-0.5 text-lg font-black">
          {formatNumber(value)}
        </p>
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
    100,
    Math.max(
      0,
      (value / Math.max(total, 1)) * 100
    )
  );

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          {title}
        </span>

        <span className="text-xs font-black">
          {value.toFixed(
            suffix === "%" ? 1 : 0
          )}
          {suffix}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
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

function StatusBadge({
  status,
}: {
  status:
    | "IN_PROGRESS"
    | "COMPLETED"
    | "ABANDONED";
}) {
  const styles =
    status === "COMPLETED"
      ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
      : status === "IN_PROGRESS"
      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
      : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${styles}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function QuizStatus({
  status,
}: {
  status:
    | "DRAFT"
    | "PUBLISHED"
    | "UNPUBLISHED";
}) {
  const styles =
    status === "PUBLISHED"
      ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
      : status === "DRAFT"
      ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
      : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${styles}`}
    >
      {status === "PUBLISHED" ? (
        <CheckCircle2 size={13} />
      ) : (
        <Clock3 size={13} />
      )}

      {status}
    </span>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
  style,
}: {
  icon: any;
  title: string;
  value: number | string;
  description: string;
  style: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${style}`}
        >
          <Icon size={21} />
        </div>

        <div>
          <p className="text-sm font-bold text-gray-400">
            {title}
          </p>

          <p className="text-2xl font-black">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-400">
        {description}
      </p>
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
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5">
        <Icon size={24} />
      </div>

      <h3 className="mt-4 font-black">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-400">
        {description}
      </p>

      {actionHref && actionText && (
        <Link
          href={actionHref}
          className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white hover:bg-indigo-700"
        >
          <Plus size={16} />
          {actionText}
        </Link>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-2xl bg-white dark:bg-white/5"
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="h-80 animate-pulse rounded-2xl bg-white dark:bg-white/5" />

        <div className="h-80 animate-pulse rounded-2xl bg-white dark:bg-white/5" />
      </div>

      <div className="h-96 animate-pulse rounded-2xl bg-white dark:bg-white/5" />
    </div>
  );
}
