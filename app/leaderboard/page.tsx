"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  Brain,
  ChevronDown,
  Flame,
  Medal,
  Search,
  Trophy,
  Zap,
  Crown,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Settings,
  Target,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

type Player = {
  rank: number;
  name: string;
  points: number;
  quizzes: number;
  score: number;
  streak: number;
  avatar: string;
  current?: boolean;
};

const initialPlayers: Player[] = [
  {
    rank: 1,
    name: "Aarav Sharma",
    points: 12850,
    quizzes: 74,
    score: 96,
    streak: 18,
    avatar: "AS",
  },
  {
    rank: 2,
    name: "Priya Patil",
    points: 11920,
    quizzes: 69,
    score: 94,
    streak: 14,
    avatar: "PP",
  },
  {
    rank: 3,
    name: "Rahul Singh",
    points: 11450,
    quizzes: 66,
    score: 92,
    streak: 12,
    avatar: "RS",
  },
  {
    rank: 4,
    name: "Kesar",
    points: 10980,
    quizzes: 48,
    score: 87,
    streak: 7,
    avatar: "K",
    current: true,
  },
  {
    rank: 5,
    name: "Sneha Joshi",
    points: 10340,
    quizzes: 58,
    score: 89,
    streak: 9,
    avatar: "SJ",
  },
  {
    rank: 6,
    name: "Aditya Kulkarni",
    points: 9780,
    quizzes: 52,
    score: 86,
    streak: 6,
    avatar: "AK",
  },
  {
    rank: 7,
    name: "Riya Deshmukh",
    points: 9420,
    quizzes: 49,
    score: 85,
    streak: 5,
    avatar: "RD",
  },
  {
    rank: 8,
    name: "Vikram More",
    points: 9010,
    quizzes: 46,
    score: 83,
    streak: 4,
    avatar: "VM",
  },
  {
    rank: 9,
    name: "Neha Shah",
    points: 8740,
    quizzes: 44,
    score: 82,
    streak: 3,
    avatar: "NS",
  },
  {
    rank: 10,
    name: "Rohan Pawar",
    points: 8420,
    quizzes: 41,
    score: 80,
    streak: 3,
    avatar: "RP",
  },
];

const categories = [
  "All Categories",
  "General Knowledge",
  "Science",
  "Technology",
  "Mathematics",
];

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [period, setPeriod] = useState("This Week");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================
     NAVIGATION
  ========================================= */

  const navigateTo = (href: string) => {
    setSidebarOpen(false);
    window.location.href = href;
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("quizResult");
    localStorage.removeItem("leaderboardResultUpdated");

    navigateTo("/login");
  };

  /* =========================================
     UPDATE USER SCORE FROM QUIZ RESULT
  ========================================= */

  useEffect(() => {
    const savedResult = localStorage.getItem("quizResult");

    if (!savedResult) return;

    try {
      const result = JSON.parse(savedResult);

      if (!result || typeof result.score !== "number") {
        return;
      }

      setPlayers((currentPlayers) => {
        const currentUser = currentPlayers.find(
          (player) => player.current
        );

        if (!currentUser) {
          return currentPlayers;
        }

        const alreadyUpdated = localStorage.getItem(
          "leaderboardResultUpdated"
        );

        if (alreadyUpdated === savedResult) {
          return currentPlayers;
        }

        const updatedPlayers = currentPlayers.map((player) => {
          if (!player.current) {
            return player;
          }

          return {
            ...player,
            points:
              player.points +
              (typeof result.correct === "number"
                ? result.correct * 100
                : 0),
            quizzes: player.quizzes + 1,
            score: result.score,
          };
        });

        const sortedPlayers = [...updatedPlayers]
          .sort((a, b) => b.points - a.points)
          .map((player, index) => ({
            ...player,
            rank: index + 1,
          }));

        localStorage.setItem(
          "leaderboardResultUpdated",
          savedResult
        );

        return sortedPlayers;
      });
    } catch (error) {
      console.error("Leaderboard result error:", error);
    }
  }, []);

  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredPlayers = useMemo(() => {
    return players.filter((player) =>
      player.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [players, search]);

  const topThree = players.slice(0, 3);

  const currentUser =
    players.find((player) => player.current) ?? players[3];

  /* =========================================
     CLOSE SIDEBAR
  ========================================= */

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/15 blur-[140px]" />

        <div className="absolute right-[-180px] top-[30%] h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[100]
          h-screen
          w-[270px]
          border-r
          border-white/10
          bg-[#101114]
          px-5
          py-6
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex items-center justify-between">
          <Link
            href="/student/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz
                <span className="text-indigo-400">
                  Pro
                </span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                Learning Platform
              </p>
            </div>
          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-xl p-2 text-gray-500 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================
            MAIN MENU
        ===================================== */}

        <div className="mt-10">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Main Menu
          </p>

          <nav className="space-y-1">
            <SidebarItem
              href="/student/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
              onClick={closeSidebar}
            />

            <SidebarItem
              href="/quiz"
              icon={BookOpen}
              label="Explore Quizzes"
              onClick={closeSidebar}
            />

            {/* CURRENT PAGE */}

            <SidebarItem
              href="/leaderboard"
              icon={Trophy}
              label="Leaderboard"
              active
              onClick={closeSidebar}
            />

            <SidebarItem
              href="/student/performance"
              icon={BarChart3}
              label="My Performance"
              onClick={closeSidebar}
            />
          </nav>
        </div>

        {/* =====================================
            ACCOUNT
        ===================================== */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Account
          </p>

          <nav className="space-y-1">
            <SidebarItem
              href="/student/profile"
              icon={User}
              label="Profile"
              onClick={closeSidebar}
            />

            <SidebarItem
              href="/student/settings"
              icon={Settings}
              label="Settings"
              onClick={closeSidebar}
            />
          </nav>
        </div>

        {/* =====================================
            BOTTOM
        ===================================== */}

        <div className="absolute bottom-5 left-5 right-5">
          {/* STREAK */}

          <div className="mb-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Target size={18} />
              </div>

              <div>
                <p className="text-xs font-bold">
                  Keep learning!
                </p>

                <p className="text-[11px] text-gray-400">
                  Your streak is 7 days
                </p>
              </div>
            </div>
          </div>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================
          MAIN AREA
      ===================================== */}

      <div className="relative z-10 lg:pl-[270px]">
        {/* =====================================
            HEADER
        ===================================== */}

        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>

            {/* DESKTOP TITLE */}

            <div className="hidden lg:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                Student Portal
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-400">
                Leaderboard
              </p>
            </div>

            {/* HEADER RIGHT */}

            <div className="ml-auto flex items-center gap-3">
              <Link
                href="/student/dashboard"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-gray-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <ArrowLeft size={16} />

                <span className="hidden sm:block">
                  Dashboard
                </span>
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold shadow-lg shadow-indigo-600/20">
                K
              </div>
            </div>
          </div>
        </header>

        {/* =====================================
            CONTENT
        ===================================== */}

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          {/* HERO */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 shadow-lg shadow-yellow-500/5">
              <Trophy size={31} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
              Top Performers
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Leaderboard
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
              Compete with other students, earn points,
              maintain your streak and become the quiz
              champion.
            </p>
          </motion.section>

          {/* PODIUM */}

          <section className="mt-12">
            <div className="grid items-end gap-5 md:grid-cols-3">
              <PodiumCard
                player={topThree[1]}
                position={2}
                delay={0.15}
              />

              <PodiumCard
                player={topThree[0]}
                position={1}
                delay={0}
                first
              />

              <PodiumCard
                player={topThree[2]}
                position={3}
                delay={0.3}
              />
            </div>
          </section>

          {/* USER RANK */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/[0.10] to-purple-500/[0.06] p-5 shadow-xl shadow-indigo-950/10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Medal size={23} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-400">
                    Your Current Rank
                  </p>

                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-2xl font-black">
                      #{currentUser.rank}
                    </span>

                    <span className="text-sm font-semibold text-gray-300">
                      {currentUser.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 sm:flex sm:items-center sm:gap-8">
                <MiniStat
                  value={currentUser.points.toLocaleString()}
                  label="Points"
                />

                <MiniStat
                  value={String(currentUser.quizzes)}
                  label="Quizzes"
                />

                <MiniStat
                  value={`${currentUser.score}%`}
                  label="Avg Score"
                />
              </div>
            </div>
          </motion.section>

          {/* FILTERS */}

          <section className="mt-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search player..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500/60 focus:bg-white/[0.06]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FilterSelect
                  value={period}
                  options={[
                    "This Week",
                    "This Month",
                    "All Time",
                  ]}
                  onChange={setPeriod}
                />

                <FilterSelect
                  value={category}
                  options={categories}
                  onChange={setCategory}
                />
              </div>
            </div>
          </section>

          {/* TABLE */}

          <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/10">
            <div className="hidden grid-cols-12 gap-4 border-b border-white/10 bg-white/[0.02] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 md:grid">
              <div className="col-span-1">
                Rank
              </div>

              <div className="col-span-4">
                Player
              </div>

              <div className="col-span-2 text-center">
                Points
              </div>

              <div className="col-span-2 text-center">
                Quizzes
              </div>

              <div className="col-span-2 text-center">
                Avg. Score
              </div>

              <div className="col-span-1 text-center">
                Streak
              </div>
            </div>

            {filteredPlayers.length === 0 ? (
              <div className="p-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                  <Search
                    size={28}
                    className="text-gray-700"
                  />
                </div>

                <p className="mt-4 font-semibold text-gray-400">
                  No player found
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Try another name.
                </p>
              </div>
            ) : (
              filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.03,
                  }}
                  className={`border-b border-white/[0.06] p-4 transition last:border-b-0 md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6 ${
                    player.current
                      ? "bg-indigo-500/[0.07]"
                      : "hover:bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-center gap-4 md:contents">
                    {/* RANK */}

                    <div className="flex w-8 shrink-0 items-center justify-center md:col-span-1 md:w-auto">
                      {player.rank <= 3 ? (
                        <RankIcon rank={player.rank} />
                      ) : (
                        <span className="text-sm font-bold text-gray-500">
                          {player.rank}
                        </span>
                      )}
                    </div>

                    {/* PLAYER */}

                    <div className="flex min-w-0 flex-1 items-center gap-3 md:col-span-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold shadow-lg shadow-indigo-600/10">
                        {player.avatar}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {player.name}

                          {player.current && (
                            <span className="ml-2 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold text-indigo-400">
                              YOU
                            </span>
                          )}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-600 md:hidden">
                          {player.quizzes} quizzes
                        </p>
                      </div>
                    </div>

                    {/* MOBILE POINTS */}

                    <div className="text-right md:hidden">
                      <p className="text-sm font-black">
                        {player.points.toLocaleString()}
                      </p>

                      <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-gray-600">
                        <Zap size={10} />
                        points
                      </p>
                    </div>
                  </div>

                  {/* DESKTOP POINTS */}

                  <div className="hidden text-center text-sm font-bold md:col-span-2 md:block">
                    {player.points.toLocaleString()}
                  </div>

                  {/* DESKTOP QUIZZES */}

                  <div className="hidden text-center text-sm text-gray-400 md:col-span-2 md:block">
                    {player.quizzes}
                  </div>

                  {/* DESKTOP SCORE */}

                  <div className="hidden text-center md:col-span-2 md:block">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                        player.score >= 90
                          ? "bg-green-500/10 text-green-400"
                          : player.score >= 75
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {player.score}%
                    </span>
                  </div>

                  {/* DESKTOP STREAK */}

                  <div className="hidden items-center justify-center gap-1 text-sm text-orange-400 md:col-span-1 md:flex">
                    <Flame size={15} />
                    {player.streak}
                  </div>

                  {/* MOBILE STATS */}

                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4 md:hidden">
                    <MobileStat
                      label="Score"
                      value={`${player.score}%`}
                    />

                    <MobileStat
                      label="Quizzes"
                      value={String(player.quizzes)}
                    />

                    <MobileStat
                      label="Streak"
                      value={`${player.streak} 🔥`}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </section>

          {/* INFO CARDS */}

          <section className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoCard
              icon={Trophy}
              title="Earn Points"
              description="Get points for every correct answer."
              iconClass="text-yellow-400"
              bgClass="bg-yellow-500/10"
            />

            <InfoCard
              icon={Flame}
              title="Build Streaks"
              description="Play every day to maintain your streak."
              iconClass="text-orange-400"
              bgClass="bg-orange-500/10"
            />

            <InfoCard
              icon={Award}
              title="Climb Higher"
              description="Compete with students and reach #1."
              iconClass="text-purple-400"
              bgClass="bg-purple-500/10"
            />
          </section>

          {/* CTA */}

          <section className="mt-10 pb-10">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/15 to-purple-600/10 p-7 text-center shadow-2xl shadow-indigo-950/10 sm:p-10">
              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

              <div className="relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Zap size={23} />
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  Ready to climb the leaderboard?
                </h2>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                  Take another quiz, earn more points and
                  move one step closer to the #1 spot.
                </p>

                <Link
                  href="/quiz"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:shadow-indigo-600/30"
                >
                  Start New Quiz
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   SIDEBAR ITEM
========================================= */

function SidebarItem({
  href,
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-500/10 text-indigo-400 shadow-sm"
          : "text-gray-500 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
          active
            ? "bg-indigo-500/10 text-indigo-400"
            : "text-gray-600 group-hover:text-gray-300"
        }`}
      >
        <Icon size={17} />
      </div>

      <span>{label}</span>

      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
      )}
    </Link>
  );
}

/* =========================================
   PODIUM CARD
========================================= */

function PodiumCard({
  player,
  position,
  delay,
  first = false,
}: {
  player: Player;
  position: number;
  delay: number;
  first?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.5,
      }}
      className={`relative overflow-hidden rounded-3xl border p-6 text-center ${
        first
          ? "border-yellow-500/30 bg-gradient-to-b from-yellow-500/[0.10] to-white/[0.03] shadow-xl shadow-yellow-950/10 md:-translate-y-5"
          : position === 2
          ? "border-gray-400/10 bg-white/[0.035]"
          : "border-orange-500/10 bg-white/[0.035]"
      }`}
    >
      {first && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-yellow-400">
          <Crown size={11} />
          Champion
        </div>
      )}

      <div className="relative">
        <div className="mx-auto mb-4 flex items-center justify-center">
          <RankIcon rank={position} large />
        </div>

        <div
          className={`mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-black ring-4 ${
            first
              ? "h-20 w-20 text-xl ring-yellow-500/20"
              : "h-16 w-16 text-base ring-white/5"
          }`}
        >
          {player.avatar}
        </div>

        <h3 className="mt-4 font-bold">
          {player.name}
        </h3>

        <p className="mt-1 text-xs text-gray-600">
          {player.quizzes} quizzes completed
        </p>

        <div className="mt-5 flex items-center justify-center gap-2">
          <Trophy
            size={16}
            className={
              first
                ? "text-yellow-400"
                : "text-gray-500"
            }
          />

          <span className="text-lg font-black">
            {player.points.toLocaleString()}
          </span>

          <span className="text-xs text-gray-600">
            pts
          </span>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-500">
          <Flame
            size={13}
            className="text-orange-400"
          />

          {player.streak} day streak
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================
   RANK ICON
========================================= */

function RankIcon({
  rank,
  large = false,
}: {
  rank: number;
  large?: boolean;
}) {
  const size = large ? 28 : 20;

  if (rank === 1) {
    return (
      <div className="flex items-center justify-center text-yellow-400">
        <Crown size={size} />
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="flex items-center justify-center text-gray-300">
        <Medal size={size} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center text-orange-400">
      <Medal size={size} />
    </div>
  );
}

/* =========================================
   MINI STAT
========================================= */

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center sm:text-right">
      <p className="text-base font-black sm:text-lg">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>
    </div>
  );
}

/* =========================================
   FILTER SELECT
========================================= */

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-4 pr-10 text-sm font-semibold text-gray-300 outline-none transition focus:border-indigo-500/50 focus:bg-white/[0.06] sm:w-auto"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#101426] text-white"
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
      />
    </div>
  );
}

/* =========================================
   MOBILE STAT
========================================= */

function MobileStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <p className="text-sm font-black">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>
    </div>
  );
}

/* =========================================
   INFO CARD
========================================= */

function InfoCard({
  icon: Icon,
  title,
  description,
  iconClass,
  bgClass,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconClass: string;
  bgClass: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass} ${iconClass}`}
      >
        <Icon size={21} />
      </div>

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-gray-600">
        {description}
      </p>
    </div>
  );
}
