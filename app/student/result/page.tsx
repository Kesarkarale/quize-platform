"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock3,
  Home,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

type QuizResult = {
  category: string;
  total: number;
  correct: number;
  wrong: number;
  score: number;
  timeLeft: number;
  completedAt: string;
};

export default function ResultPage() {
  const [result, setResult] =
    useState<QuizResult | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedResult =
      localStorage.getItem("quizResult");

    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch {
        setResult(null);
      }
    }
  }, []);

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          Loading result...
        </div>
      </main>
    );
  }

  /* =========================================
     NO RESULT
  ========================================= */

  if (!result) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-5 text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[130px]" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
            <Trophy size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-black">
            No Result Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Complete a quiz first to see your result
            here.
          </p>

          <Link
            href="/quiz"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 font-bold"
          >
            Start Quiz
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/student/dashboard"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <Home size={16} />
            Dashboard
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================
     CALCULATIONS
  ========================================= */

  const percentage =
    result.total > 0
      ? Math.round(
          (result.correct / result.total) * 100
        )
      : 0;

  const points = result.correct * 100;

  const minutes = Math.floor(
    result.timeLeft / 60
  );

  const seconds = result.timeLeft % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  let performance = "Keep Practicing!";
  let performanceText =
    "Every attempt makes you better. Keep learning and try again.";

  if (percentage >= 90) {
    performance = "Outstanding! 🏆";
    performanceText =
      "Excellent performance! You really mastered this quiz.";
  } else if (percentage >= 75) {
    performance = "Great Job! 🎉";
    performanceText =
      "Great performance! You are getting really good at this.";
  } else if (percentage >= 50) {
    performance = "Good Effort! 💪";
    performanceText =
      "Nice work! A little more practice will take you even higher.";
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[140px]" />

        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="relative z-20 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Brain size={21} />
            </div>

            <div>
              <h1 className="font-black">
                Quiz
                <span className="text-indigo-400">
                  Master
                </span>
              </h1>

              <p className="hidden text-[9px] tracking-[0.2em] text-gray-600 sm:block">
                PLAY • LEARN • WIN
              </p>
            </div>
          </Link>

          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.08] hover:text-white"
          >
            <Home size={16} />

            <span className="hidden sm:block">
              Dashboard
            </span>
          </Link>
        </div>
      </header>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10">
        {/* TOP */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 text-yellow-400 shadow-lg shadow-yellow-500/10">
            <Trophy size={31} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Quiz Completed
          </p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            {performance}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            {performanceText}
          </p>
        </motion.div>

        {/* =====================================
            SCORE CARD
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.15,
          }}
          className="relative mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] p-7 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          {/* Glow */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[90px]" />

          <div className="relative">
            <div className="grid items-center gap-10 md:grid-cols-2">
              {/* SCORE */}

              <div className="text-center">
                <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border-[12px] border-indigo-500/20">
                  <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-indigo-500 border-r-purple-500" />

                  <div>
                    <p className="text-5xl font-black">
                      {percentage}%
                    </p>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Score
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-lg font-bold">
                    {result.category}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {result.correct} correct out of{" "}
                    {result.total} questions
                  </p>
                </div>
              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-3">
                <ResultStat
                  icon={CheckCircle2}
                  title="Correct"
                  value={String(result.correct)}
                  className="text-green-400"
                  bg="bg-green-500/10"
                />

                <ResultStat
                  icon={XCircle}
                  title="Wrong"
                  value={String(result.wrong)}
                  className="text-red-400"
                  bg="bg-red-500/10"
                />

                <ResultStat
                  icon={Trophy}
                  title="Points"
                  value={`+${points}`}
                  className="text-yellow-400"
                  bg="bg-yellow-500/10"
                />

                <ResultStat
                  icon={Clock3}
                  title="Time Left"
                  value={formattedTime}
                  className="text-blue-400"
                  bg="bg-blue-500/10"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================
            PERFORMANCE
        ===================================== */}

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Performance Summary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Here is how you performed in this quiz.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <PerformanceCard
              icon={Target}
              title="Accuracy"
              value={`${percentage}%`}
              description="Answer accuracy"
              iconClass="text-indigo-400"
              bgClass="bg-indigo-500/10"
            />

            <PerformanceCard
              icon={Zap}
              title="Points Earned"
              value={`+${points}`}
              description="Added to your score"
              iconClass="text-yellow-400"
              bgClass="bg-yellow-500/10"
            />

            <PerformanceCard
              icon={Award}
              title="Rank Progress"
              value="+4"
              description="Places climbed"
              iconClass="text-purple-400"
              bgClass="bg-purple-500/10"
            />
          </div>
        </section>

        {/* =====================================
            ANSWER SUMMARY
        ===================================== */}

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <BarChart3 size={20} />
            </div>

            <div>
              <h3 className="font-bold">
                Answer Summary
              </h3>

              <p className="text-xs text-gray-500">
                Your quiz performance breakdown.
              </p>
            </div>
          </div>

          {/* Correct */}

          <div className="space-y-4">
            <ProgressRow
              label="Correct Answers"
              value={result.correct}
              total={result.total}
              percentage={percentage}
              type="correct"
            />

            <ProgressRow
              label="Wrong Answers"
              value={result.wrong}
              total={result.total}
              percentage={
                result.total > 0
                  ? Math.round(
                      (result.wrong /
                        result.total) *
                        100
                    )
                  : 0
              }
              type="wrong"
            />
          </div>
        </section>

        {/* =====================================
            ACTIONS
        ===================================== */}

        <section className="mt-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/quiz"
              onClick={() =>
                localStorage.removeItem(
                  "quizResult"
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 font-bold shadow-lg shadow-indigo-600/10 transition hover:scale-[1.01]"
            >
              <RotateCcw size={17} />
              Try Again
            </Link>

            <Link
              href="/leaderboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-bold text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <Trophy size={17} />
              Leaderboard
            </Link>

            <Link
              href="/student/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-bold text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <Home size={17} />
              Dashboard
            </Link>
          </div>
        </section>

        {/* BACK */}

        <div className="mt-7 text-center">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-300"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   RESULT STAT
========================================= */

function ResultStat({
  icon: Icon,
  title,
  value,
  className,
  bg,
}: {
  icon: typeof Trophy;
  title: string;
  value: string;
  className: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${className}`}
      >
        <Icon size={19} />
      </div>

      <p className="text-xs text-gray-600">
        {title}
      </p>

      <p className="mt-1 text-lg font-black">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   PERFORMANCE CARD
========================================= */

function PerformanceCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
  bgClass,
}: {
  icon: typeof Trophy;
  title: string;
  value: string;
  description: string;
  iconClass: string;
  bgClass: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${bgClass} ${iconClass}`}
      >
        <Icon size={21} />
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-600">
        {description}
      </p>
    </div>
  );
}

/* =========================================
   PROGRESS ROW
========================================= */

function ProgressRow({
  label,
  value,
  total,
  percentage,
  type,
}: {
  label: string;
  value: number;
  total: number;
  percentage: number;
  type: "correct" | "wrong";
}) {
  const isCorrect = type === "correct";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle2
              size={16}
              className="text-green-400"
            />
          ) : (
            <XCircle
              size={16}
              className="text-red-400"
            />
          )}

          <span className="text-sm font-semibold text-gray-300">
            {label}
          </span>
        </div>

        <span className="text-xs font-semibold text-gray-500">
          {value} / {total} ({percentage}%)
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className={`h-full rounded-full ${
            isCorrect
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
      </div>
    </div>
  );
}

