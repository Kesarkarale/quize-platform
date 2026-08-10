"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  Home,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sparkles,
  Sun,
  Target,
  Trophy,
  User,
  X,
  XCircle,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const weeklyData = [
  { name: "Mon", score: 68 },
  { name: "Tue", score: 74 },
  { name: "Wed", score: 71 },
  { name: "Thu", score: 82 },
  { name: "Fri", score: 78 },
  { name: "Sat", score: 88 },
  { name: "Sun", score: 92 },
];

const categoryData = [
  {
    name: "JavaScript",
    score: 88,
    attempts: 8,
  },
  {
    name: "React",
    score: 92,
    attempts: 6,
  },
  {
    name: "Python",
    score: 76,
    attempts: 5,
  },
  {
    name: "HTML",
    score: 94,
    attempts: 4,
  },
  {
    name: "CSS",
    score: 81,
    attempts: 3,
  },
];

const recentAttempts = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    category: "JavaScript",
    score: 92,
    correct: 18,
    total: 20,
    time: "16:42",
    date: "Today",
    status: "Passed",
  },
  {
    id: "2",
    title: "React Development",
    category: "React",
    score: 86,
    correct: 26,
    total: 30,
    time: "24:18",
    date: "Yesterday",
    status: "Passed",
  },
  {
    id: "3",
    title: "Python Basics",
    category: "Python",
    score: 74,
    correct: 11,
    total: 15,
    time: "12:04",
    date: "04 Aug",
    status: "Passed",
  },
  {
    id: "4",
    title: "CSS Advanced",
    category: "CSS",
    score: 48,
    correct: 10,
    total: 20,
    time: "13:55",
    date: "02 Aug",
    status: "Failed",
  },
];

export default function PerformancePage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
const [darkMode, setDarkMode] = useState(false);
const [themeLoaded, setThemeLoaded] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("quiz-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

useEffect(() => {
  const savedTheme = localStorage.getItem("quiz-theme");

  const isDark = savedTheme === "dark";

  setDarkMode(isDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  setThemeLoaded(true);
}, []);

useEffect(() => {
  if (!themeLoaded) return;

  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("quiz-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("quiz-theme", "light");
  }
}, [darkMode, themeLoaded]);
  
  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, email, role, status")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          toast.error("Unable to load profile.");
          router.replace("/login");
          return;
        }

        if (data.role !== "STUDENT") {
          router.replace("/admin/dashboard");
          return;
        }

        if (data.status !== "ACTIVE") {
          await supabase.auth.signOut();
          router.replace("/login");
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error(error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    toast.success("Logged out successfully.");

    router.replace("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] dark:bg-[#08090b]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-600" />

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading performance...
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    profile?.name?.split(" ")[0] || "Student";

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900 transition-colors duration-300 dark:bg-[#08090b] dark:text-white">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

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
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-black">
                Quiz<span className="text-indigo-600">Pro</span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                Learning Platform
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-white/10"
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
            <Link href="/student/dashboard">
              <SidebarItem
                icon={<Home size={19} />}
                label="Dashboard"
              />
            </Link>

            <Link href="/quiz">
              <SidebarItem
                icon={<BookOpen size={19} />}
                label="Explore Quizzes"
              />
            </Link>

            <Link href="/leaderboard">
              <SidebarItem
                icon={<Trophy size={19} />}
                label="Leaderboard"
              />
            </Link>

            <SidebarItem
              icon={<BarChart3 size={19} />}
              label="My Performance"
              active
            />
          </nav>
        </div>

        {/* ACCOUNT */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">
            <Link href="/student/profile">
              <SidebarItem
                icon={<User size={19} />}
                label="Profile"
              />
            </Link>

            <Link href="/student/settings">
              <SidebarItem
                icon={<Settings size={19} />}
                label="Settings"
              />
            </Link>
          </nav>
        </div>

        {/* BOTTOM */}

        <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Flame size={18} />
              </div>

              <div>
                <p className="text-xs font-bold">
                  7 Day Streak 🔥
                </p>

                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Keep learning!
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="lg:ml-[270px]">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#08090b]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-gray-200 bg-white p-2.5 lg:hidden dark:border-white/10 dark:bg-white/5"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Student Dashboard
                </p>

                <h2 className="text-lg font-bold">
                  My Performance
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
<button
  type="button"
  aria-label={
    darkMode
      ? "Switch to light mode"
      : "Switch to dark mode"
  }
  onClick={() => setDarkMode((prev) => !prev)}
  className="
    relative
    flex
    h-10
    w-10
    items-center
    justify-center
    overflow-hidden
    rounded-xl
    border
    border-gray-200
    bg-white
    text-gray-700
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-md
    dark:border-white/10
    dark:bg-white/5
    dark:text-white
  "
>
  {darkMode ? (
    <Sun
      size={19}
      className="text-yellow-400"
    />
  ) : (
    <Moon
      size={19}
      className="text-indigo-600"
    />
  )}
</button>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="text-right">
                  <p className="text-sm font-bold">
                    {profile?.name || "Student"}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Student
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* BACK */}

          <Link
            href="/student/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          {/* HERO */}

          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl sm:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-purple-300/10 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-indigo-100">
                  <BarChart3 size={17} />

                  <span className="text-xs font-bold uppercase tracking-[0.15em]">
                    Performance Analytics
                  </span>
                </div>

                <h1 className="text-2xl font-black sm:text-3xl">
                  Your Learning Performance 📊
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                  Track your quiz scores, identify your strengths,
                  and improve your performance with every challenge.
                </p>
              </div>

              <div className="hidden h-32 w-32 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-md lg:flex">
                <Trophy
                  size={65}
                  strokeWidth={1.5}
                  className="text-yellow-300"
                />
              </div>
            </div>
          </section>

          {/* STATISTICS */}

          <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <PerformanceStat
              icon={<BookOpen size={21} />}
              title="Quizzes Attempted"
              value="24"
              description="+4 this month"
              className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
            />

            <PerformanceStat
              icon={<CheckCircle2 size={21} />}
              title="Passed"
              value="18"
              description="75% success rate"
              className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            />

            <PerformanceStat
              icon={<Target size={21} />}
              title="Average Score"
              value="82%"
              description="+8% improvement"
              className="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
            />

            <PerformanceStat
              icon={<Trophy size={21} />}
              title="Best Score"
              value="96%"
              description="Personal best"
              className="bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            />
          </section>

          {/* PERFORMANCE CHART */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-black">
                  Weekly Performance
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Your average quiz score over the last 7 days
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                Average: 82%
              </div>
            </div>

            <div className="mt-6 h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient
                      id="performanceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#6366f1"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopColor="#6366f1"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={
                      darkMode
                        ? "#27272a"
                        : "#e5e7eb"
                    }
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: darkMode
                        ? "#9ca3af"
                        : "#6b7280",
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: darkMode
                        ? "#9ca3af"
                        : "#6b7280",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: darkMode
                        ? "1px solid #27272a"
                        : "1px solid #e5e7eb",
                      background: darkMode
                        ? "#18181b"
                        : "#ffffff",
                      color: darkMode
                        ? "#ffffff"
                        : "#111827",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#performanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* CATEGORY + OVERALL */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">

            {/* CATEGORY */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">
              <div>
                <h3 className="font-black">
                  Category Performance
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Compare your performance across subjects
                </p>
              </div>

              <div className="mt-6 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={
                        darkMode
                          ? "#27272a"
                          : "#e5e7eb"
                      }
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: darkMode
                          ? "#9ca3af"
                          : "#6b7280",
                        fontSize: 10,
                      }}
                    />

                    <YAxis
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: darkMode
                          ? "#9ca3af"
                          : "#6b7280",
                        fontSize: 10,
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: darkMode
                          ? "1px solid #27272a"
                          : "1px solid #e5e7eb",
                        background: darkMode
                          ? "#18181b"
                          : "#ffffff",
                      }}
                    />

                    <Bar
                      dataKey="score"
                      fill="#6366f1"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* OVERALL SCORE */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101114]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black">
                    Overall Progress
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Your current standing
                  </p>
                </div>

                <Flame
                  size={22}
                  className="text-orange-500"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-indigo-100 dark:border-indigo-500/10">
                  <div className="absolute inset-0 rotate-45 rounded-full border-[16px] border-transparent border-r-indigo-600 border-t-indigo-600" />

                  <div className="text-center">
                    <p className="text-4xl font-black">
                      82%
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Average Score
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <ProgressItem
                  label="Passed Quizzes"
                  value="18"
                  percentage="75%"
                  icon={<CheckCircle2 size={16} />}
                />

                <ProgressItem
                  label="Failed Quizzes"
                  value="6"
                  percentage="25%"
                  icon={<XCircle size={16} />}
                />

                <ProgressItem
                  label="Current Streak"
                  value="7 days"
                  percentage="🔥"
                  icon={<Flame size={16} />}
                />
              </div>
            </div>
          </section>

          {/* CATEGORY DETAILS */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">
            <div>
              <h3 className="font-black">
                Subject Breakdown
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Detailed performance by category
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryData.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-gray-100 p-4 dark:border-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[11px] text-gray-400">
                        {item.attempts} quizzes attempted
                      </p>
                    </div>

                    <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {item.score}%
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT ATTEMPTS */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black">
                  Recent Attempts
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Your latest quiz results
                </p>
              </div>

              <Link
                href="/student/history"
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400"
              >
                View History
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {recentAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between dark:border-white/5 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <BookOpen size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">
                        {attempt.title}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-gray-400">
                        <span>{attempt.category}</span>
                        <span>•</span>
                        <span>{attempt.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock3 size={11} />
                          {attempt.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div>
                      <p className="text-xs text-gray-400">
                        Correct
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {attempt.correct}/{attempt.total}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {attempt.score}%
                      </p>

                      <p
                        className={`text-[10px] font-bold ${
                          attempt.status === "Passed"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {attempt.status}
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-gray-400"
                    />
                  </div>
                </div>
              ))}
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

/* SIDEBAR ITEM */

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

/* PERFORMANCE STAT */

function PerformanceStat({
  icon,
  title,
  value,
  description,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  className: string;
}) {
  return (
    <div className="rounded-[22px] border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5 dark:border-white/10 dark:bg-[#101114]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${className}`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-bold text-emerald-500">
          ↑
        </span>
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

/* PROGRESS ITEM */

function ProgressItem({
  label,
  value,
  percentage,
  icon,
}: {
  label: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-indigo-500">
          {icon}
        </div>

        <span className="text-xs font-semibold">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-black">
          {value}
        </span>

        <span className="text-[10px] text-gray-400">
          {percentage}
        </span>
      </div>
    </div>
  );
}
