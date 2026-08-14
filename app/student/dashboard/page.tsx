"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/theme-toggle";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  Home,
  LogOut,
  Menu,
  Play,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  User,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";

import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

/* =========================================================
   SUPABASE
========================================================= */

const supabase = createClient();

/* =========================================================
   TYPES
========================================================= */

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

type Achievement = {
  icon: ReactNode;
  title: string;
  description: string;
  unlocked: boolean;
};

/* =========================================================
   PERFORMANCE DATA
========================================================= */

const performanceData = [
  { name: "Mon", score: 62 },
  { name: "Tue", score: 70 },
  { name: "Wed", score: 68 },
  { name: "Thu", score: 78 },
  { name: "Fri", score: 74 },
  { name: "Sat", score: 88 },
  { name: "Sun", score: 92 },
];

/* =========================================================
   CATEGORY PERFORMANCE
========================================================= */

const categoryPerformance = [
  {
    name: "JavaScript",
    score: 92,
    quizzes: 8,
    icon: "JS",
  },
  {
    name: "React",
    score: 86,
    quizzes: 6,
    icon: "R",
  },
  {
    name: "Python",
    score: 78,
    quizzes: 5,
    icon: "Py",
  },
  {
    name: "HTML & CSS",
    score: 84,
    quizzes: 5,
    icon: "H",
  },
];

/* =========================================================
   DEMO QUIZZES
========================================================= */

const demoQuizzes: Quiz[] = [
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description:
      "Test your knowledge of JavaScript fundamentals, syntax, variables and core concepts.",
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
      "Challenge yourself with React components, hooks, props and state management.",
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
  {
    id: "advanced-js",
    title: "Advanced JavaScript",
    description:
      "Explore closures, promises, async programming and advanced JavaScript concepts.",
    category: "JavaScript",
    difficulty: "Hard",
    duration: 25,
    questions: 25,
    passing_score: 65,
  },
  {
    id: "hooks",
    title: "React Hooks Mastery",
    description:
      "Master useState, useEffect, useMemo, useCallback and custom React hooks.",
    category: "React",
    difficulty: "Medium",
    duration: 20,
    questions: 20,
    passing_score: 60,
  },
];

/* =========================================================
   DEMO ATTEMPTS
========================================================= */

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
  {
    id: "4",
    quiz: "HTML & CSS",
    category: "HTML",
    score: 84,
    status: "Passed",
    date: "02 Aug",
  },
];

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievements: Achievement[] = [
  {
    icon: <Flame size={20} />,
    title: "7 Day Streak",
    description: "Learned for 7 days continuously",
    unlocked: true,
  },
  {
    icon: <Trophy size={20} />,
    title: "High Scorer",
    description: "Scored above 90% in a quiz",
    unlocked: true,
  },
  {
    icon: <Target size={20} />,
    title: "Quiz Master",
    description: "Complete 25 quizzes",
    unlocked: false,
  },
  {
    icon: <Zap size={20} />,
    title: "Speed Runner",
    description: "Complete a quiz before half time",
    unlocked: false,
  },
];

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function StudentDashboard() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  /* =======================================================
     LOAD PROFILE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Auth error:", authError);
        }

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, email, role, status")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Profile error:", error);
        }

        if (!data) {
          toast.error("Profile not found.");
          router.replace("/login");
          return;
        }

        if (data.role !== "STUDENT") {
          router.replace("/admin/dashboard");
          return;
        }

        if (data.status !== "ACTIVE") {
          await supabase.auth.signOut();

          toast.error("Your account is inactive.");
          router.replace("/login");
          return;
        }

        if (mounted) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Dashboard error:", error);

        if (mounted) {
          toast.error("Unable to load dashboard.");
        }

        router.replace("/login");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [router]);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        toast.error("Unable to logout.");
        return;
      }

      toast.success("Logged out successfully.");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigateTo = (menu: string, path: string) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
    router.push(path);
  };

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = [
    "All",
    "JavaScript",
    "React",
    "Python",
    "HTML",
    "CSS",
  ];

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredQuizzes = useMemo(() => {
    const query = search.toLowerCase().trim();

    return demoQuizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(query) ||
        quiz.category.toLowerCase().includes(query) ||
        (quiz.description ?? "").toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        quiz.category === category ||
        (category === "HTML" && quiz.category === "HTML") ||
        (category === "CSS" && quiz.category === "HTML");

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#07080a]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 dark:border-indigo-500/20 dark:border-t-indigo-400" />

          <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-400">
            Preparing your learning dashboard...
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    profile?.name?.split(" ")[0] || "Student";

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-gray-900 transition-colors duration-300 dark:bg-[#07080a] dark:text-white">
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[275px]
          border-r
          border-gray-200
          bg-white
          px-5
          py-6
          transition-transform
          duration-300
          dark:border-white/10
          dark:bg-[#0e1013]

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              navigateTo("Dashboard", "/student/dashboard")
            }
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz
                <span className="text-indigo-600 dark:text-indigo-400">
                  Pro
                </span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Learning Platform
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* USER MINI PROFILE */}

        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-3 dark:border-white/5 dark:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-black text-white">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                {profile?.name || "Student"}
              </p>

              <p className="truncate text-[10px] text-gray-400">
                {profile?.email || "student@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN MENU */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            <SidebarItem
              icon={<Home size={19} />}
              label="Dashboard"
              active={activeMenu === "Dashboard"}
              onClick={() =>
                navigateTo("Dashboard", "/student/dashboard")
              }
            />

            <SidebarItem
              icon={<BookOpen size={19} />}
              label="Explore Quizzes"
              active={activeMenu === "Quizzes"}
              onClick={() => navigateTo("Quizzes", "/quiz")}
            />

            <SidebarItem
              icon={<Trophy size={19} />}
              label="Leaderboard"
              active={activeMenu === "Leaderboard"}
              onClick={() =>
                navigateTo("Leaderboard", "/leaderboard")
              }
            />

            <SidebarItem
              icon={<BarChart3 size={19} />}
              label="My Performance"
              active={activeMenu === "Performance"}
              onClick={() =>
                navigateTo(
                  "Performance",
                  "/student/performance"
                )
              }
            />

            <SidebarItem
              icon={<Activity size={19} />}
              label="Quiz History"
              active={activeMenu === "History"}
              onClick={() =>
                navigateTo("History", "/student/history")
              }
            />
          </nav>
        </div>

        {/* ACCOUNT */}

        <div className="mt-7">
          <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">
            <SidebarItem
              icon={<User size={19} />}
              label="Profile"
              active={activeMenu === "Profile"}
              onClick={() =>
                navigateTo("Profile", "/student/profile")
              }
            />

            <SidebarItem
              icon={<Settings size={19} />}
              label="Settings"
              active={activeMenu === "Settings"}
              onClick={() =>
                navigateTo("Settings", "/student/settings")
              }
            />
          </nav>
        </div>

        {/* BOTTOM */}

        <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-4 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Flame size={18} />
              </div>

              <div>
                <p className="text-xs font-black">
                  7 day streak 🔥
                </p>

                <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                  Keep your momentum!
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[275px]">
        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#07080a]/80 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-gray-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/5 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-[11px] font-semibold text-gray-400">
                  Student Portal
                </p>

                <h2 className="text-lg font-black">
                  Dashboard
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* SEARCH */}

              <div className="hidden w-[270px] items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 lg:flex dark:border-white/10 dark:bg-white/5">
                <Search
                  size={17}
                  className="text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search quizzes..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />

                <span className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[9px] text-gray-400 dark:border-white/10">
                  /
                </span>
              </div>

              <ThemeToggle />

              <div className="hidden items-center gap-3 sm:flex">
                <div className="text-right">
                  <p className="text-sm font-bold">
                    {profile?.name || "Student"}
                  </p>

                  <p className="text-[10px] font-medium text-gray-400">
                    Student Account
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-black text-white shadow-lg shadow-indigo-500/20">
                  {firstName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE SEARCH */}

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 lg:hidden dark:border-white/10 dark:bg-white/5">
            <Search
              size={16}
              className="text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search quizzes..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-[1550px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl shadow-indigo-500/10 sm:p-8 lg:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-300/10 blur-3xl" />

            <div className="absolute right-[20%] top-1/2 h-32 w-32 rounded-full bg-indigo-300/10 blur-2xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Sparkles size={13} />

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                    Keep Growing
                  </span>
                </div>

                <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Welcome back, {firstName}! 👋
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                  Your next achievement is waiting. Continue
                  learning, take a quiz and push your score
                  higher today.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo("Quizzes", "/quiz")
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    <Play size={16} />
                    Start a Quiz
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigateTo(
                        "Performance",
                        "/student/performance"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
                  >
                    <BarChart3 size={16} />
                    View Performance
                  </button>
                </div>
              </div>

              {/* DAILY GOAL */}

              <div className="rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-indigo-100">
                      Today's Goal
                    </p>

                    <p className="mt-1 text-2xl font-black">
                      3 / 5 quizzes
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Target
                      size={23}
                      className="text-yellow-300"
                    />
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[60%] rounded-full bg-white" />
                </div>

                <div className="mt-2 flex justify-between text-[10px] text-indigo-100">
                  <span>60% completed</span>
                  <span>2 remaining</span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
            <StatCard
              icon={<BookOpen size={21} />}
              title="Quizzes Attempted"
              value="24"
              description="+4 this month"
              iconClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
            />

            <StatCard
              icon={<CheckCircle2 size={21} />}
              title="Passed Quizzes"
              value="18"
              description="75% success rate"
              iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            />

            <StatCard
              icon={<Target size={21} />}
              title="Average Score"
              value="82%"
              description="+8% improvement"
              iconClass="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
            />

            <StatCard
              icon={<Trophy size={21} />}
              title="Highest Score"
              value="96%"
              description="Personal best"
              iconClass="bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            />
          </section>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <QuickAction
              icon={<Play size={20} />}
              title="Take a Quiz"
              description="Challenge yourself"
              onClick={() =>
                navigateTo("Quizzes", "/quiz")
              }
            />

            <QuickAction
              icon={<BarChart3 size={20} />}
              title="View Performance"
              description="Track your progress"
              onClick={() =>
                navigateTo(
                  "Performance",
                  "/student/performance"
                )
              }
            />

            <QuickAction
              icon={<Trophy size={20} />}
              title="Leaderboard"
              description="See your ranking"
              onClick={() =>
                navigateTo(
                  "Leaderboard",
                  "/leaderboard"
                )
              }
            />

            <QuickAction
              icon={<Activity size={20} />}
              title="Quiz History"
              description="Review your attempts"
              onClick={() =>
                navigateTo(
                  "History",
                  "/student/history"
                )
              }
            />
          </section>

          {/* =================================================
              PERFORMANCE
          ================================================= */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_350px]">
            {/* CHART */}

            <div className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e1013] sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black">
                      Performance Overview
                    </h3>

                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      +12.5%
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    Your score progress over the last 7 days
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  This Week
                </div>
              </div>

              <div className="mt-6 h-[290px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart data={performanceData}>
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
                          stopOpacity={0.3}
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
                      className="stroke-gray-200 dark:stroke-zinc-800"
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 11,
                      }}
                    />

                    <YAxis
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 11,
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "14px",
                        border: "1px solid #27272a",
                        background: "#18181b",
                        color: "#ffffff",
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

            {/* PROGRESS */}

            <div className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e1013] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black">
                    Your Progress
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Overall learning performance
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10">
                  <Flame
                    size={21}
                    className="text-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-indigo-100 dark:border-indigo-500/10">
                  <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-r-indigo-600 border-t-indigo-600" />

                  <div className="text-center">
                    <p className="text-3xl font-black">
                      82%
                    </p>

                    <p className="text-xs font-medium text-gray-400">
                      Average
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <MiniStat
                  label="Passed"
                  value="18"
                  icon={
                    <CheckCircle2
                      size={15}
                    />
                  }
                  className="text-emerald-500"
                />

                <MiniStat
                  label="Failed"
                  value="6"
                  icon={
                    <XCircle size={15} />
                  }
                  className="text-red-500"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              CONTINUE LEARNING
          ================================================= */}

          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black">
                  Continue Learning
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Pick up where you left off
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigateTo(
                    "Quizzes",
                    "/quiz"
                  )
                }
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400"
              >
                Explore all
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="rounded-[26px] border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-5 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:via-[#0e1013] dark:to-purple-500/10 sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                    <Brain size={27} />
                  </div>

                  <div>
                    <span className="rounded-md bg-indigo-100 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      Continue
                    </span>

                    <h4 className="mt-2 text-base font-black">
                      Advanced JavaScript
                    </h4>

                    <p className="mt-1 text-xs text-gray-400">
                      12 of 25 questions completed
                    </p>
                  </div>
                </div>

                <div className="w-full md:max-w-[300px]">
                  <div className="mb-2 flex justify-between text-[10px] font-bold">
                    <span className="text-gray-400">
                      Progress
                    </span>

                    <span className="text-indigo-600 dark:text-indigo-400">
                      48%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div className="h-full w-[48%] rounded-full bg-indigo-600" />
                  </div>

                  <Link
                    href="/quiz/advanced-js"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-black text-white transition hover:bg-indigo-700"
                  >
                    Continue Quiz
                    <Play size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              CATEGORY PERFORMANCE
          ================================================= */}

          <section className="mt-6 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e1013] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black">
                  Performance by Category
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Understand your strongest subjects
                </p>
              </div>

              <BarChart3
                size={21}
                className="text-indigo-500"
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {categoryPerformance.map(
                (item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-gray-100 p-4 dark:border-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          {item.icon}
                        </div>

                        <div>
                          <p className="text-xs font-black">
                            {item.name}
                          </p>

                          <p className="mt-1 text-[10px] text-gray-400">
                            {item.quizzes} quizzes
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                        {item.score}%
                      </p>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* =================================================
              EXPLORE QUIZZES
          ================================================= */}

          <section className="mt-8">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black">
                    Explore Quizzes
                  </h3>

                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {filteredQuizzes.length} available
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Find your next challenge
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigateTo(
                    "Quizzes",
                    "/quiz"
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400"
              >
                View all quizzes
                <ChevronRight size={15} />
              </button>
            </div>

            {/* FILTERS */}

            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    category === item
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "border border-gray-200 bg-white text-gray-500 hover:border-indigo-300 dark:border-white/10 dark:bg-[#0e1013] dark:text-gray-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CARDS */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredQuizzes.map(
                (quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                  />
                )
              )}
            </div>

            {filteredQuizzes.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-gray-300 bg-white py-14 text-center dark:border-white/10 dark:bg-[#0e1013]">
                <Search
                  size={32}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-4 text-sm font-black">
                  No quizzes found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try another search or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* =================================================
              RECENT + LEADERBOARD
          ================================================= */}

          <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_390px]">
            {/* RECENT ATTEMPTS */}

            <div className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e1013] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black">
                    Recent Attempts
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Your latest quiz activity
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigateTo(
                      "History",
                      "/student/history"
                    )
                  }
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400"
                >
                  View history
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {demoAttempts.map(
                  (attempt) => (
                    <div
                      key={attempt.id}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-100 p-4 transition hover:border-indigo-100 hover:bg-gray-50 dark:border-white/5 dark:hover:border-indigo-500/20 dark:hover:bg-white/[0.03]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            attempt.status ===
                            "Passed"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-red-50 text-red-500 dark:bg-red-500/10"
                          }`}
                        >
                          {attempt.status ===
                          "Passed" ? (
                            <CheckCircle2
                              size={19}
                            />
                          ) : (
                            <XCircle
                              size={19}
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black">
                            {attempt.quiz}
                          </p>

                          <p className="mt-1 text-[10px] text-gray-400">
                            {attempt.category} •{" "}
                            {attempt.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-black">
                            {attempt.score}%
                          </p>

                          <p
                            className={`text-[9px] font-black ${
                              attempt.status ===
                              "Passed"
                                ? "text-emerald-500"
                                : "text-red-500"
                            }`}
                          >
                            {attempt.status}
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                          className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* LEADERBOARD */}

            <div className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e1013] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black">
                    Weekly Leaderboard
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Top performers this week
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 dark:bg-yellow-500/10">
                  <Trophy
                    size={20}
                    className="text-yellow-500"
                  />
                </div>
              </div>

              <div className="mt-5 space-y-2">
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
                type="button"
                onClick={() =>
                  navigateTo(
                    "Leaderboard",
                    "/leaderboard"
                  )
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 text-xs font-black text-gray-600 transition hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
              >
                View Full Leaderboard
                <ChevronRight size={15} />
              </button>
            </div>
          </section>

          {/* =================================================
              ACHIEVEMENTS
          ================================================= */}

          <section className="mt-8 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e1013] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black">
                    Achievements
                  </h3>

                  <span className="rounded-full bg-yellow-50 px-2 py-1 text-[9px] font-black text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                    2 / 4 unlocked
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Milestones you have achieved
                </p>
              </div>

              <Award
                size={22}
                className="text-yellow-500"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {achievements.map(
                (achievement) => (
                  <AchievementCard
                    key={achievement.title}
                    achievement={
                      achievement
                    }
                  />
                )
              )}
            </div>
          </section>

          {/* =================================================
              LEARNING INSIGHT
          ================================================= */}

          <section className="mt-8 grid gap-5 lg:grid-cols-3">
            <InsightCard
              icon={<Flame size={21} />}
              title="7 Day Streak"
              value="7 days"
              description="You're building a strong learning habit."
              className="bg-orange-50 dark:bg-orange-500/10"
              iconClass="text-orange-500"
            />

            <InsightCard
              icon={<Target size={21} />}
              title="Daily Goal"
              value="60%"
              description="Complete 2 more quizzes to reach today's goal."
              className="bg-indigo-50 dark:bg-indigo-500/10"
              iconClass="text-indigo-500"
            />

            <InsightCard
              icon={<Users size={21} />}
              title="Your Rank"
              value="#4"
              description="You're currently in the top 10% this week."
              className="bg-purple-50 dark:bg-purple-500/10"
              iconClass="text-purple-500"
            />
          </section>

          {/* FOOTER */}

          <footer className="mt-10 border-t border-gray-200 py-7 text-center dark:border-white/10">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Sparkles size={13} />
                </div>

                <span className="text-xs font-black">
                  QuizPro
                </span>
              </div>

              <p className="text-[10px] text-gray-400">
                © 2026 QuizPro. Learn. Challenge. Achieve.
              </p>

              <div className="flex items-center gap-4 text-[10px] font-semibold text-gray-400">
                <span>Student Portal</span>
                <span>•</span>
                <span>Secure Learning</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
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

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="group rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0e1013]">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-500 dark:bg-emerald-500/10">
          <Activity size={10} />
          Active
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-medium text-gray-400">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg dark:border-white/10 dark:bg-[#0e1013] dark:hover:border-indigo-500/20"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-black">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-gray-400">
          {description}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="ml-auto text-gray-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
      />
    </button>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  className: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 dark:bg-white/[0.03]">
      <div
        className={`flex items-center gap-2 ${className}`}
      >
        {icon}

        <span className="text-[10px] font-bold">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-black">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   QUIZ CARD
========================================================= */

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

  const gradient =
    quiz.category === "React"
      ? "from-cyan-600 to-blue-700"
      : quiz.category === "Python"
      ? "from-emerald-600 to-teal-700"
      : quiz.category === "HTML"
      ? "from-orange-500 to-red-600"
      : "from-indigo-600 to-purple-700";

  return (
    <div className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0e1013]">
      {/* TOP */}

      <div
        className={`relative h-32 overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-12 left-24 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
          {quiz.category ===
          "React" ? (
            <Brain size={22} />
          ) : quiz.category ===
            "Python" ? (
            <Zap size={22} />
          ) : (
            <BookOpen size={22} />
          )}
        </div>

        <span className="absolute bottom-4 left-5 rounded-lg bg-black/20 px-2.5 py-1 text-[9px] font-black text-white backdrop-blur-md">
          {quiz.category}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-lg px-2 py-1 text-[9px] font-black ${difficultyClass}`}
          >
            {quiz.difficulty}
          </span>

          <span className="text-[10px] font-bold text-gray-400">
            Pass: {quiz.passing_score}%
          </span>
        </div>

        <h4 className="mt-4 line-clamp-1 text-sm font-black">
          {quiz.title}
        </h4>

        <p className="mt-1 line-clamp-2 min-h-[40px] text-[11px] leading-5 text-gray-400">
          {quiz.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 text-[10px] font-bold text-gray-400 dark:border-white/5">
          <span className="flex items-center gap-1.5">
            <BookOpen size={13} />
            {quiz.questions} Questions
          </span>

          <span className="flex items-center justify-end gap-1.5">
            <Clock3 size={13} />
            {quiz.duration} min
          </span>
        </div>

        <Link
          href={`/quiz/${quiz.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-black text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20"
        >
          Start Quiz
          <Play size={14} />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   LEADERBOARD ROW
========================================================= */

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
          : "hover:bg-gray-50 dark:hover:bg-white/[0.03]"
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

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[10px] font-black text-white">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="max-w-[150px] truncate text-xs font-black">
            {name}
          </p>

          {current && (
            <p className="text-[9px] font-bold text-indigo-500">
              Your position
            </p>
          )}
        </div>
      </div>

      <p className="text-xs font-black text-indigo-600 dark:text-indigo-400">
        {score}
      </p>
    </div>
  );
}

/* =========================================================
   ACHIEVEMENT CARD
========================================================= */

function AchievementCard({
  achievement,
}: {
  achievement: Achievement;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        achievement.unlocked
          ? "border-yellow-100 bg-yellow-50/50 dark:border-yellow-500/10 dark:bg-yellow-500/5"
          : "border-gray-100 bg-gray-50/50 opacity-60 dark:border-white/5 dark:bg-white/[0.02]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            achievement.unlocked
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
              : "bg-gray-100 text-gray-400 dark:bg-white/5"
          }`}
        >
          {achievement.icon}
        </div>

        {achievement.unlocked ? (
          <CheckCircle2
            size={17}
            className="text-emerald-500"
          />
        ) : (
          <span className="text-[9px] font-bold text-gray-400">
            Locked
          </span>
        )}
      </div>

      <p className="mt-4 text-xs font-black">
        {achievement.title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-gray-400">
        {achievement.description}
      </p>
    </div>
  );
}

/* =========================================================
   INSIGHT CARD
========================================================= */

function InsightCard({
  icon,
  title,
  value,
  description,
  className,
  iconClass,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  className: string;
  iconClass: string;
}) {
  return (
    <div
      className={`rounded-[24px] border border-gray-100 p-5 dark:border-white/5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 dark:bg-black/10 ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-xl font-black">
          {value}
        </span>
      </div>

      <h4 className="mt-5 text-xs font-black">
        {title}
      </h4>

      <p className="mt-1 text-[10px] leading-5 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
