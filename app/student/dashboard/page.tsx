"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock3,
  Home,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  Trophy,
  User,
  Users,
  X,
  CheckCircle2,
  XCircle,
  Target,
  Flame,
  Play,
  Sparkles,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  questions: number;
  passing_score: number;
};

type Attempt = {
  id: string;
  quiz: string;
  category: string;
  score: number;
  status: "Passed" | "Failed";
  date: string;
};

const performanceData = [
  {
    name: "Mon",
    score: 62,
  },
  {
    name: "Tue",
    score: 70,
  },
  {
    name: "Wed",
    score: 68,
  },
  {
    name: "Thu",
    score: 78,
  },
  {
    name: "Fri",
    score: 74,
  },
  {
    name: "Sat",
    score: 88,
  },
  {
    name: "Sun",
    score: 92,
  },
];

const demoQuizzes: Quiz[] = [
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description:
      "Test your knowledge of JavaScript fundamentals, syntax and concepts.",
    category: "JavaScript",
    difficulty: "Medium",
    duration: 20,
    questions: 20,
    passing_score: 60,
  },
  {
    id: "react",
    title: "React Development",
    description:
      "Challenge yourself with React components, hooks and state management.",
    category: "React",
    difficulty: "Hard",
    duration: 30,
    questions: 30,
    passing_score: 60,
  },
  {
    id: "python",
    title: "Python Basics",
    description:
      "Learn and test your understanding of Python programming fundamentals.",
    category: "Python",
    difficulty: "Easy",
    duration: 15,
    questions: 15,
    passing_score: 50,
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    description:
      "Test your frontend fundamentals with HTML structure and CSS styling.",
    category: "HTML",
    difficulty: "Easy",
    duration: 15,
    questions: 20,
    passing_score: 60,
  },
];

const demoAttempts: Attempt[] = [
  {
    id: "1",
    quiz: "JavaScript Fundamentals",
    category: "JavaScript",
    score: 86,
    status: "Passed",
    date: "Today",
  },
  {
    id: "2",
    quiz: "React Development",
    category: "React",
    score: 92,
    status: "Passed",
    date: "Yesterday",
  },
  {
    id: "3",
    quiz: "Python Basics",
    category: "Python",
    score: 48,
    status: "Failed",
    date: "04 Aug",
  },
];

export default function StudentDashboard() {
  const router = useRouter();

  const supabase = createClient();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  /*
   * Load theme
   */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "quiz-theme"
      );

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  /*
   * Apply theme
   */

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "quiz-theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "quiz-theme",
        "light"
      );
    }
  }, [darkMode]);

  /*
   * Load authenticated profile
   */

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

        const { data, error } =
          await supabase
            .from("profiles")
            .select(
              "id, name, email, role, status"
            )
            .eq("id", user.id)
            .single();

        if (error || !data) {
          toast.error(
            "Unable to load your profile."
          );

          router.replace("/login");
          return;
        }

        if (data.role !== "STUDENT") {
          router.replace(
            "/admin/dashboard"
          );

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

  /*
   * Logout
   */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    toast.success(
      "Logged out successfully."
    );

    router.replace("/login");
    router.refresh();
  };

  /*
   * Categories
   */

  const categories = [
    "All",
    "JavaScript",
    "React",
    "Python",
    "HTML",
    "CSS",
  ];

  /*
   * Filter quizzes
   */

  const filteredQuizzes = useMemo(() => {
    return demoQuizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        quiz.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        quiz.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [search, category]);

  /*
   * Loading
   */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8] dark:bg-[#080808]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    profile?.name?.split(" ")[0] ||
    "Student";

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900 transition-colors duration-300 dark:bg-[#08090b] dark:text-white">

      {/* Mobile Overlay */}

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
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[270px]
          border-r
          border-gray-200
          bg-white
          px-5
          py-6
          transition-transform
          duration-300
          dark:border-white/10
          dark:bg-[#101114]
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}

        <div className="flex items-center justify-between">

          <Link
            href="/student/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles
                size={21}
              />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz<span className="text-indigo-600">Pro</span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                Learning Platform
              </p>
            </div>

          </Link>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-white/10"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}

        <div className="mt-10">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">

            <SidebarItem
              icon={<Home size={19} />}
              label="Dashboard"
              active={
                activeMenu ===
                "Dashboard"
              }
              onClick={() =>
                setActiveMenu(
                  "Dashboard"
                )
              }
            />

            <Link
              href="/quiz"
              onClick={() =>
                setActiveMenu("Quizzes")
              }
            >
              <SidebarItem
                icon={
                  <BookOpen size={19} />
                }
                label="Explore Quizzes"
                active={
                  activeMenu ===
                  "Quizzes"
                }
              />
            </Link>

            <SidebarItem
              icon={
                <Trophy size={19} />
              }
              label="Leaderboard"
              active={
                activeMenu ===
                "Leaderboard"
              }
              onClick={() =>
                setActiveMenu(
                  "Leaderboard"
                )
              }
            />
                        <Link
              href="/leaderboard"
              onClick={() =>
                setActiveMenu("leaderboard")
              }
            >
                          
            <SidebarItem
              icon={
                <BarChart3 size={19} />
              }
              label="My Performance"
              active={
                activeMenu ===
                "Performance"
              }
              onClick={() =>
                setActiveMenu(
                  "Performance"
                )
              }
            />

          </nav>

        </div>

        {/* Account */}

        <div className="mt-8">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">

            <SidebarItem
              icon={
                <User size={19} />
              }
              label="Profile"
              active={
                activeMenu ===
                "Profile"
              }
              onClick={() =>
                setActiveMenu(
                  "Profile"
                )
              }
            />

            <SidebarItem
              icon={
                <Settings size={19} />
              }
              label="Settings"
              active={
                activeMenu ===
                "Settings"
              }
              onClick={() =>
                setActiveMenu(
                  "Settings"
                )
              }
            />

          </nav>

        </div>

        {/* Bottom */}

        <div className="absolute bottom-5 left-5 right-5">

          <div className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Target size={18} />
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

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="rounded-xl border border-gray-200 bg-white p-2.5 lg:hidden dark:border-white/10 dark:bg-white/5"
              >
                <Menu size={20} />
              </button>

              <div className="hidden sm:block">

                <p className="text-xs font-medium text-gray-400">
                  Student Dashboard
                </p>

                <h2 className="text-lg font-bold">
                  Overview
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-3">

              {/* Search */}

              <div className="hidden w-[250px] items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 md:flex dark:border-white/10 dark:bg-white/5">

                <Search
                  size={17}
                  className="text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search quizzes..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />

              </div>

              {/* Theme */}

              <button
                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:scale-105 dark:border-white/10 dark:bg-white/5"
              >
                {darkMode ? (
                  <Sun
                    size={19}
                    className="text-yellow-400"
                  />
                ) : (
                  <Moon
                    size={19}
                    className="text-gray-600"
                  />
                )}
              </button>

              {/* Avatar */}

              <div className="hidden items-center gap-3 sm:flex">

                <div className="text-right">

                  <p className="text-sm font-bold">
                    {profile?.name ||
                      "Student"}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Student
                  </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-lg">
                  {firstName
                    .charAt(0)
                    .toUpperCase()}
                </div>

              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* Welcome */}

          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl shadow-indigo-500/10 sm:p-8">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-purple-300/10 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="mb-3 flex items-center gap-2 text-indigo-100">

                  <Sparkles
                    size={16}
                  />

                  <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                    Keep Growing
                  </span>

                </div>

                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Welcome back,{" "}
                  {firstName}! 👋
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                  Ready to challenge
                  yourself? Continue
                  learning and improve
                  your score today.
                </p>

                <Link
                  href="/quiz"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Explore Quizzes

                  <ChevronRight
                    size={17}
                  />
                </Link>

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

            <StatCard
              icon={
                <BookOpen
                  size={21}
                />
              }
              title="Quizzes Attempted"
              value="24"
              description="+4 this month"
              iconClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
            />

            <StatCard
              icon={
                <CheckCircle2
                  size={21}
                />
              }
              title="Passed"
              value="18"
              description="75% success rate"
              iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            />

            <StatCard
              icon={
                <Target size={21} />
              }
              title="Average Score"
              value="82%"
              description="+8% improvement"
              iconClass="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
            />

            <StatCard
              icon={
                <Trophy size={21} />
              }
              title="Highest Score"
              value="96%"
              description="Personal best"
              iconClass="bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            />

          </section>

          {/* CHART + QUICK STATS */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_330px]">

            {/* Performance */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-bold">
                    Performance Overview
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Your score progress over
                    the last 7 days
                  </p>

                </div>

                <div className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  This Week
                </div>

              </div>

              <div className="mt-6 h-[280px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={
                      performanceData
                    }
                  >

                    <defs>

                      <linearGradient
                        id="scoreGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                          stopOpacity={
                            0.3
                          }
                        />

                        <stop
                          offset="100%"
                          stopColor="#6366f1"
                          stopOpacity={
                            0
                          }
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
                      domain={[
                        0,
                        100,
                      ]}
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
                        borderRadius:
                          "12px",
                        border: darkMode
                          ? "1px solid #27272a"
                          : "1px solid #e5e7eb",
                        background:
                          darkMode
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
                      fill="url(#scoreGradient)"
                    />

                  </AreaChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* Quick Stats */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-bold">
                    Your Progress
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Overall performance
                  </p>

                </div>

                <Flame
                  size={22}
                  className="text-orange-500"
                />

              </div>

              <div className="mt-6 flex items-center justify-center">

                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-indigo-100 dark:border-indigo-500/10">

                  <div className="absolute inset-0 rounded-full border-[14px] border-transparent border-t-indigo-600 border-r-indigo-600 rotate-45" />

                  <div className="text-center">

                    <p className="text-3xl font-black">
                      82%
                    </p>

                    <p className="text-xs text-gray-400">
                      Average
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <ProgressRow
                  label="Passed"
                  value="18"
                  percent="75%"
                  icon={
                    <CheckCircle2
                      size={16}
                    />
                  }
                />

                <ProgressRow
                  label="Failed"
                  value="6"
                  percent="25%"
                  icon={
                    <XCircle
                      size={16}
                    />
                  }
                />

              </div>

            </div>

          </section>

          {/* AVAILABLE QUIZZES */}

          <section className="mt-6">

            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>

                <h3 className="text-lg font-black">
                  Explore Quizzes
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Find your next challenge
                </p>

              </div>

              <Link
                href="/quiz"
                className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400"
              >
                View all

                <ChevronRight
                  size={16}
                />
              </Link>

            </div>

            {/* Category filters */}

            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">

              {categories.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setCategory(
                        item
                      )
                    }
                    className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                      category === item
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : "border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 dark:border-white/10 dark:bg-[#101114] dark:text-gray-400"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              {filteredQuizzes.map(
                (quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                  />
                )
              )}

            </div>

            {filteredQuizzes.length ===
              0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center dark:border-white/10">

                <Search
                  size={30}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 text-sm font-semibold">
                  No quizzes found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try another search or
                  category.
                </p>

              </div>
            )}

          </section>

          {/* RECENT + LEADERBOARD */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">

            {/* Recent Attempts */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-bold">
                    Recent Attempts
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Your latest quiz activity
                  </p>

                </div>

                <Link
                  href="/student/history"
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400"
                >
                  View history
                </Link>

              </div>

              <div className="mt-5 space-y-3">

                {demoAttempts.map(
                  (attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/[0.03]"
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          <BookOpen
                            size={18}
                          />
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold">
                            {
                              attempt.quiz
                            }
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            {
                              attempt.category
                            }{" "}
                            •{" "}
                            {
                              attempt.date
                            }
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3">

                        <div className="text-right">

                          <p className="text-sm font-black">
                            {
                              attempt.score
                            }%
                          </p>

                          <span
                            className={`text-[10px] font-bold ${
                              attempt.status ===
                              "Passed"
                                ? "text-emerald-500"
                                : "text-red-500"
                            }`}
                          >
                            {
                              attempt.status
                            }
                          </span>

                        </div>

                        <ChevronRight
                          size={17}
                          className="text-gray-400"
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* Leaderboard */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-bold">
                    Leaderboard
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Top performers this week
                  </p>

                </div>

                <Trophy
                  size={21}
                  className="text-yellow-500"
                />

              </div>

              <div className="mt-5 space-y-3">

                <LeaderboardRow
                  rank={1}
                  name="Rahul Sharma"
                  score="96%"
                />

                <LeaderboardRow
                  rank={2}
                  name="Priya Patil"
                  score="93%"
                />

                <LeaderboardRow
                  rank={3}
                  name="Amit Kumar"
                  score="91%"
                />

                <LeaderboardRow
                  rank={4}
                  name={
                    profile?.name ||
                    "You"
                  }
                  score="82%"
                  current
                />

              </div>

              <button
                onClick={() =>
                  setActiveMenu(
                    "Leaderboard"
                  )
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 text-xs font-bold text-gray-600 transition hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
              >
                View Full Leaderboard

                <ChevronRight
                  size={15}
                />
              </button>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="mt-10 border-t border-gray-200 pt-6 text-center dark:border-white/10">

            <p className="text-xs text-gray-400">
              © 2026 QuizPro. Learn.
              Challenge. Achieve.
            </p>

          </footer>

        </div>

      </main>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Sidebar Item
|--------------------------------------------------------------------------
*/

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      {icon}

      {label}
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

function StatCard({
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
    <div className="rounded-[22px] border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5 dark:border-white/10 dark:bg-[#101114]">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
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

      <div className="mt-1 flex items-end justify-between gap-2">

        <p className="text-2xl font-black tracking-tight">
          {value}
        </p>

      </div>

      <p className="mt-1 text-[10px] text-gray-400">
        {description}
      </p>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Progress Row
|--------------------------------------------------------------------------
*/

function ProgressRow({
  label,
  value,
  percent,
  icon,
}: {
  label: string;
  value: string;
  percent: string;
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

        <span className="text-xs font-bold">
          {value}
        </span>

        <span className="text-[10px] text-gray-400">
          ({percent})
        </span>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Quiz Card
|--------------------------------------------------------------------------
*/

function QuizCard({
  quiz,
}: {
  quiz: Quiz;
}) {
  const difficultyClass =
    quiz.difficulty === "Easy"
      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      : quiz.difficulty === "Medium"
      ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
      : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";

  return (
    <div className="group overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#101114]">

      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">

        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />

        <div className="absolute bottom-3 left-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
            <BookOpen
              size={21}
            />
          </div>

        </div>

      </div>

      <div className="p-4">

        <div className="flex items-center justify-between gap-2">

          <span
            className={`rounded-lg px-2 py-1 text-[9px] font-bold ${difficultyClass}`}
          >
            {quiz.difficulty}
          </span>

          <span className="text-[10px] font-semibold text-gray-400">
            {quiz.category}
          </span>

        </div>

        <h4 className="mt-3 line-clamp-1 text-sm font-black">
          {quiz.title}
        </h4>

        <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-gray-400">
          {quiz.description}
        </p>

        <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3 text-[10px] font-semibold text-gray-400 dark:border-white/5">

          <span className="flex items-center gap-1">
            <BookOpen
              size={13}
            />
            {quiz.questions}
          </span>

          <span className="flex items-center gap-1">
            <Clock3
              size={13}
            />
            {quiz.duration}m
          </span>

        </div>

        <Link
          href={`/quiz/${quiz.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          Start Quiz

          <Play size={14} />
        </Link>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Leaderboard Row
|--------------------------------------------------------------------------
*/

function LeaderboardRow({
  rank,
  name,
  score,
  current,
}: {
  rank: number;
  name: string;
  score: string;
  current?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-3 py-3 ${
        current
          ? "border border-indigo-200 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10"
          : ""
      }`}
    >

      <div className="flex items-center gap-3">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black ${
            rank === 1
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
              : rank === 2
              ? "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
              : rank === 3
              ? "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
              : "bg-gray-50 text-gray-400 dark:bg-white/5"
          }`}
        >
          {rank}
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white">
          {name
            .charAt(0)
            .toUpperCase()}
        </div>

        <p className="text-xs font-bold">
          {name}
        </p>

      </div>

      <p className="text-xs font-black text-indigo-600 dark:text-indigo-400">
        {score}
      </p>

    </div>
  );
}

