"use client";

import Link from "next/link";
import {
  ArrowRight,
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
  Code2,
  Database,
  Globe,
  Lock,
  Rocket,
  Star,
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
    title: "Timed Challenges",
    description:
      "Improve your speed and accuracy with realistic countdown-based assessments.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track your scores, accuracy, attempts and overall learning progress.",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description:
      "Challenge yourself, compare your performance and climb the leaderboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Secure authentication and assessment workflows keep your learning experience protected.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Identify your strengths and weaknesses and continuously improve your skills.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Create your free student account and start your learning journey.",
  },
  {
    number: "02",
    title: "Choose a Quiz",
    description:
      "Explore quizzes by subject, difficulty and skill level.",
  },
  {
    number: "03",
    title: "Take the Quiz",
    description:
      "Answer questions within the given time and challenge yourself.",
  },
  {
    number: "04",
    title: "See Your Result",
    description:
      "Instantly view your score and understand your performance.",
  },
];

const stats = [
  {
    value: "50K+",
    label: "Students",
  },
  {
    value: "2M+",
    label: "Questions Answered",
  },
  {
    value: "10K+",
    label: "Quiz Attempts",
  },
  {
    value: "98%",
    label: "Satisfaction",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] left-[25%] h-[450px] w-[450px] rounded-full bg-cyan-600/5 blur-[140px]" />
      </div>

      {/* NAVBAR */}

      <header className="relative z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-600/20">
              <Brain size={23} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz
                <span className="text-indigo-400">Master</span>
              </h1>

              <p className="text-[8px] font-semibold tracking-[0.25em] text-gray-600">
                LEARN • PRACTICE • WIN
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-white"
            >
              Home
            </Link>

            <Link
              href="/quiz"
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

      {/* HERO */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
            {/* HERO LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
                <Sparkles size={14} />
                Smarter way to test your knowledge
              </div>

              <h2 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Learn.
                <br />
                Practice.
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Master.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
                QuizMaster is a modern online assessment platform where you
                can practice technical skills, challenge yourself with timed
                quizzes and track your progress.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quiz"
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

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-400" />
                  Free to join
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-400" />
                  Timed assessments
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-400" />
                  Instant results
                </span>
              </div>
            </motion.div>

            {/* HERO RIGHT */}

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[35px] bg-indigo-600/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
                {/* CARD HEADER */}

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

                {/* TIMER */}

                <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.05] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      Time Remaining
                    </span>

                    <Clock3 size={17} className="text-indigo-400" />
                  </div>

                  <p className="mt-2 font-mono text-3xl font-black">
                    02:41
                  </p>
                </div>

                {/* QUESTION */}

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
                    Which keyword is used to declare a constant in JavaScript?
                  </h4>

                  <div className="mt-5 space-y-2">
                    {["var", "let", "const", "static"].map(
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
                            {String.fromCharCode(65 + index)}
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

              {/* FLOATING SCORE */}

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#0b1024] p-4 shadow-2xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <Trophy size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-600">
                      Average Score
                    </p>

                    <p className="text-lg font-black">92%</p>
                  </div>
                </div>
              </div>

              {/* FLOATING USERS */}

              <div className="absolute -right-4 top-10 hidden rounded-2xl border border-white/10 bg-[#0b1024] p-4 shadow-2xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Users size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-600">
                      Active Students
                    </p>

                    <p className="text-lg font-black">50K+</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="relative z-10 border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 py-8 sm:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <Stat
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          eyebrow="EXPLORE"
          title="Popular Categories"
          description="Build your skills with quizzes covering today's most important technologies."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/quiz?category=${encodeURIComponent(
                  category.name
                )}`}
                className={`group flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br ${category.color} p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xs font-black">
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="font-bold">{category.name}</h3>

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
          ))}
        </div>
      </section>

      {/* WHY QUIZMASTER */}

      <section
        id="features"
        className="relative z-10 border-y border-white/5 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="WHY QUIZMASTER"
            title="Everything You Need to Improve"
            description="A complete assessment experience designed for focused learning and measurable progress."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition group-hover:scale-110">
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
            })}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STRIP */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
              BUILT FOR DEVELOPERS
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Practice the technologies
              <span className="text-indigo-400">
                {" "}
                that matter.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              From JavaScript fundamentals to React, Python, databases and
              cybersecurity, QuizMaster helps you continuously test and
              improve your technical knowledge.
            </p>

            <Link
              href="/quiz"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold transition hover:bg-indigo-700"
            >
              Start Practicing
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TechCard icon={Code2} title="JavaScript" />
            <TechCard icon={Rocket} title="React" />
            <TechCard icon={Database} title="Database" />
            <TechCard icon={Globe} title="Web Development" />
            <TechCard icon={Lock} title="Cyber Security" />
            <TechCard icon={Star} title="Advanced Skills" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="Start in Four Simple Steps"
          description="Everything is designed to keep your learning journey simple and focused."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6"
            >
              <span className="text-4xl font-black text-white/5">
                {step.number}
              </span>

              <h3 className="mt-5 font-bold">{step.title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <ChevronRight
                  size={18}
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-gray-700 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

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

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              Start with easy questions, improve your accuracy, unlock harder
              levels and become a better problem solver.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Quizzes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 lg:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                  <Brain size={19} />
                </div>

                <div>
                  <p className="font-black">
                    Quiz<span className="text-indigo-400">Master</span>
                  </p>

                  <p className="text-[10px] text-gray-700">
                    Online Assessment Platform
                  </p>
                </div>
              </Link>

              <p className="mt-4 max-w-sm text-xs leading-6 text-gray-700">
                Learn, practice and master your skills through structured
                online assessments.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-gray-600">
              <Link
                href="/quiz"
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
          </div>

          <div className="border-t border-white/5 pt-6">
            <p className="text-xs text-gray-700">
              © {new Date().getFullYear()} QuizMaster. All rights reserved.
            </p>
          </div>
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

/* =========================================
   TECH CARD
========================================= */

function TechCard({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:bg-indigo-500/[0.04]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition group-hover:scale-110">
        <Icon size={19} />
      </div>

      <p className="mt-4 text-sm font-bold">
        {title}
      </p>

      <p className="mt-1 text-[11px] text-gray-700">
        Practice & improve
      </p>
    </div>
  );
}
