"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "JavaScript",
    icon: "JS",
    quizzes: 24,
    color: "from-yellow-400/20 to-yellow-600/5",
  },
  {
    name: "React",
    icon: "⚛",
    quizzes: 18,
    color: "from-cyan-400/20 to-cyan-600/5",
  },
  {
    name: "Python",
    icon: "PY",
    quizzes: 21,
    color: "from-blue-400/20 to-blue-600/5",
  },
  {
    name: "Database",
    icon: "DB",
    quizzes: 16,
    color: "from-emerald-400/20 to-emerald-600/5",
  },
  {
    name: "HTML & CSS",
    icon: "</>",
    quizzes: 19,
    color: "from-orange-400/20 to-orange-600/5",
  },
  {
    name: "Cyber Security",
    icon: "SEC",
    quizzes: 12,
    color: "from-purple-400/20 to-purple-600/5",
  },
];

const features = [
  {
    icon: Brain,
    title: "Smart Assessments",
    description:
      "Practice with carefully structured quizzes designed to test your real understanding.",
  },
  {
    icon: Clock3,
    title: "Timed Quizzes",
    description:
      "Challenge yourself with realistic countdown-based online assessments.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track scores, accuracy, attempts and overall performance over time.",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description:
      "Compete with other students and see where you stand on the leaderboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Role-based authentication and secure assessment workflows keep everything protected.",
  },
  {
    icon: Target,
    title: "Track Progress",
    description:
      "Review your previous attempts and identify areas where you can improve.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Register as a student and create your secure account.",
  },
  {
    number: "02",
    title: "Choose a Quiz",
    description:
      "Browse quizzes by category, difficulty and duration.",
  },
  {
    number: "03",
    title: "Take the Assessment",
    description:
      "Answer questions within the given time limit.",
  },
  {
    number: "04",
    title: "Check Your Result",
    description:
      "View your score, performance and detailed answer review.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-cyan-600/5 blur-[140px]" />
      </div>

      {/* =====================================
          NAVBAR
      ===================================== */}

      <header className="relative z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-600/20">
              <Brain size={23} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz
                <span className="text-indigo-400">
                  Master
                </span>
              </h1>

              <p className="text-[8px] font-semibold tracking-[0.25em] text-gray-600">
                LEARN • PRACTICE • WIN
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-white"
            >
              Home
            </Link>

            <Link
              href="/quizzes"
              className="text-sm font-semibold text-gray-500 transition hover:text-white"
            >
              Quizzes
            </Link>

            <Link
              href="/leaderboard"
              className="text-sm font-semibold text-gray-500 transition hover:text-white"
            >
              Leaderboard
            </Link>

            <a
              href="#features"
              className="text-sm font-semibold text-gray-500 transition hover:text-white"
            >
              Features
            </a>
          </nav>

          {/* Auth */}

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-400 transition hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================
          HERO
      ===================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            {/* Left */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
                <Sparkles size={14} />

                Smarter way to test your knowledge
              </div>

              <h2 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Learn.
                <br />

                Practice.
                <br />

                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Master.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
                A modern online assessment platform
                where students can discover quizzes,
                challenge themselves, track their
                performance and compete on the
                leaderboard.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quizzes"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold shadow-xl shadow-indigo-600/20 transition hover:scale-[1.02]"
                >
                  Explore Quizzes

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
                >
                  Create Free Account
                </Link>
              </div>

              {/* Trust */}

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-green-400"
                  />
                  Free to join
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-green-400"
                  />
                  Timed assessments
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-green-400"
                  />
                  Detailed results
                </span>
              </div>
            </motion.div>

            {/* Right Preview */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="relative"
            >
              {/* Main Card */}

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
                {/* Top */}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                      Active Assessment
                    </p>

                    <h3 className="mt-2 text-xl font-black">
                      JavaScript Fundamentals
                    </h3>
                  </div>

                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs font-bold text-green-400">
                    LIVE
                  </div>
                </div>

                {/* Timer */}

                <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.05] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      Time Remaining
                    </span>

                    <Clock3
                      size={17}
                      className="text-indigo-400"
                    />
                  </div>

                  <p className="mt-2 font-mono text-3xl font-black">
                    14:32
                  </p>
                </div>

                {/* Question */}

                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400">
                      Question 5 of 20
                    </span>

                    <span className="text-xs text-gray-600">
                      25%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/4 rounded-full bg-indigo-500" />
                  </div>

                  <h4 className="mt-6 text-base font-bold leading-6">
                    Which keyword is used to
                    declare a constant in
                    JavaScript?
                  </h4>

                  <div className="mt-5 space-y-2">
                    {[
                      "var",
                      "let",
                      "const",
                      "static",
                    ].map(
                      (option, index) => (
                        <div
                          key={option}
                          className={`flex items-center gap-3 rounded-xl border p-3 ${
                            index === 2
                              ? "border-indigo-500/40 bg-indigo-500/10"
                              : "border-white/5 bg-white/[0.02]"
                          }`}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-[10px] font-bold text-gray-500">
                            {String.fromCharCode(
                              65 + index
                            )}
                          </span>

                          <span className="text-xs font-medium text-gray-400">
                            {option}
                          </span>

                          {index === 2 && (
                            <CheckCircle2
                              size={15}
                              className="ml-auto text-indigo-400"
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-5 flex justify-between">
                  <div className="rounded-xl border border-white/5 px-4 py-2 text-xs text-gray-600">
                    Previous
                  </div>

                  <div className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold">
                    Next
                  </div>
                </div>
              </div>

              {/* Floating Stats */}

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#0b1024] p-4 shadow-2xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <Trophy size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-600">
                      Average Score
                    </p>

                    <p className="text-lg font-black">
                      92%
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-10 hidden rounded-2xl border border-white/10 bg-[#0b1024] p-4 shadow-2xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Users size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-600">
                      Students
                    </p>

                    <p className="text-lg font-black">
                      50K+
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================
          STATS
      ===================================== */}

      <section className="relative z-10 border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-8 sm:grid-cols-4 lg:px-8">
          <Stat
            value="50K+"
            label="Students"
          />

          <Stat
            value="2M+"
            label="Questions Answered"
          />

          <Stat
            value="10K+"
            label="Quiz Attempts"
          />

          <Stat
            value="98%"
            label="Platform Satisfaction"
          />
        </div>
      </section>

      {/* =====================================
          CATEGORIES
      ===================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          eyebrow="EXPLORE"
          title="Popular Categories"
          description="Choose a subject and challenge yourself with quizzes created to improve your skills."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(
            (category, index) => (
              <motion.div
                key={category.name}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                }}
              >
                <Link
                  href={`/quizzes?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className={`group flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br ${category.color} p-5 transition hover:-translate-y-1 hover:border-white/20`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xs font-black">
                      {category.icon}
                    </div>

                    <div>
                      <h3 className="font-bold">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-600">
                        {category.quizzes} quizzes
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-700 transition group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* =====================================
          FEATURES
      ===================================== */}

      <section
        id="features"
        className="relative z-10 border-y border-white/5 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="WHY QUIZMASTER"
            title="Everything You Need to Improve"
            description="A complete assessment experience for learning, practice and performance tracking."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(
              (feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 font-bold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          HOW IT WORKS
      ===================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="Start in Four Simple Steps"
          description="From creating your account to tracking your results, everything is simple and organized."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(
            (step, index) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <span className="text-4xl font-black text-white/5">
                  {step.number}
                </span>

                <h3 className="mt-5 font-bold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>

                {index <
                  steps.length - 1 && (
                  <ChevronRight
                    size={18}
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-gray-700 lg:block"
                  />
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* =====================================
          CTA
      ===================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent p-8 sm:p-12 lg:p-16">
          <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

          <div className="relative max-w-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Zap size={22} />
            </div>

            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              Ready to test your knowledge?
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              Join QuizMaster and start taking
              assessments, tracking your progress and
              competing with other students.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200"
            >
              Get Started

              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <Brain size={18} />
            </div>

            <div>
              <p className="text-sm font-bold">
                QuizMaster
              </p>

              <p className="text-[10px] text-gray-700">
                Online Assessment Platform
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-xs text-gray-600">
            <Link
              href="/quizzes"
              className="transition hover:text-white"
            >
              Quizzes
            </Link>

            <Link
              href="/leaderboard"
              className="transition hover:text-white"
            >
              Leaderboard
            </Link>

            <Link
              href="/login"
              className="transition hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="transition hover:text-white"
            >
              Register
            </Link>
          </div>

          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} QuizMaster
          </p>
        </div>
      </footer>
    </main>
  );
}

/* =========================================
   STAT
========================================= */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-r border-white/5 px-4 text-center last:border-r-0">
      <p className="text-2xl font-black sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-700 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

/* =========================================
   SECTION HEADING
========================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

