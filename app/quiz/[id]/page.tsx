"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";

import { getQuizById } from "@/lib/quiz-data";

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();

  const quizId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const quiz = getQuizById(quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(
    quiz ? quiz.duration * 60 : 0
  );
  const [submitted, setSubmitted] = useState(false);

  const question = quiz?.questions[currentQuestion];

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (!quiz || submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [quiz, submitted, timeLeft]);

  /* =====================================================
     FORMAT TIME
  ===================================================== */

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (timeLeft % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  /* =====================================================
     SCORE
  ===================================================== */

  const correctAnswers = quiz
    ? quiz.questions.reduce((total, item) => {
        return total + (answers[item.id] === item.answer ? 1 : 0);
      }, 0)
    : 0;

  const score = quiz
    ? Math.round(
        (correctAnswers / quiz.questions.length) * 100
      )
    : 0;

  const passed = quiz
    ? score >= quiz.passingScore
    : false;

  const progress = quiz
    ? ((currentQuestion + 1) / quiz.questions.length) * 100
    : 0;

  /* =====================================================
     INVALID QUIZ
  ===================================================== */

  if (!quiz) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-[#08090b]">
        <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-[#101114]">
          <XCircle
            size={45}
            className="mx-auto text-red-500"
          />

          <h1 className="mt-5 text-xl font-black">
            Quiz Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            The quiz you are looking for does not exist.
          </p>

          <Link
            href="/quiz"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={16} />
            Back to Quizzes
          </Link>
        </div>
      </main>
    );
  }

  /* =====================================================
     SELECT ANSWER
  ===================================================== */

  const selectAnswer = (optionIndex: number) => {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  /* =====================================================
     NEXT
  ===================================================== */

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((value) => value + 1);
    } else {
      setSubmitted(true);
    }
  };

  /* =====================================================
     PREVIOUS
  ===================================================== */

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((value) => value - 1);
    }
  };

  /* =====================================================
     RETRY
  ===================================================== */

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(quiz.duration * 60);
    setSubmitted(false);
  };

  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 dark:bg-[#08090b] dark:text-white sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/quiz"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={17} />
            Back to Quizzes
          </Link>

          <div className="overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#101114]">
            <div
              className={`p-8 text-center text-white sm:p-12 ${
                passed
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                  : "bg-gradient-to-br from-red-500 to-rose-600"
              }`}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md">
                {passed ? (
                  <Trophy size={42} />
                ) : (
                  <XCircle size={42} />
                )}
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                Quiz Completed
              </p>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                {passed
                  ? "Congratulations! 🎉"
                  : "Keep Practicing! 💪"}
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm text-white/80">
                {passed
                  ? "Excellent work! You have successfully passed this quiz."
                  : "Don't worry. Review the concepts and try the quiz again."}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Your Score"
                  value={`${score}%`}
                />

                <ResultCard
                  label="Correct Answers"
                  value={`${correctAnswers}/${quiz.questions.length}`}
                />

                <ResultCard
                  label="Passing Score"
                  value={`${quiz.passingScore}%`}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black">
                      {quiz.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {quiz.category} • {quiz.difficulty}
                    </p>
                  </div>

                  <span
                    className={`rounded-xl px-3 py-2 text-xs font-bold ${
                      passed
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {passed ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <RotateCcw size={17} />
                  Try Again
                </button>

                <Link
                  href="/quiz"
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  Explore More Quizzes
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     QUIZ SCREEN
  ===================================================== */

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      {/* TOP BAR */}

      <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/85 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090b]/85 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/quiz"
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">
                Exit Quiz
              </span>
            </Link>

            <div className="text-center">
              <p className="text-xs font-bold text-gray-400">
                {quiz.category}
              </p>

              <h1 className="text-sm font-black sm:text-base">
                {quiz.title}
              </h1>
            </div>

            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-black ${
                timeLeft <= 60
                  ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
              }`}
            >
              <Clock3 size={17} />
              {formattedTime}
            </div>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          {/* QUESTION */}

          <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#101114]">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                Question {currentQuestion + 1}
              </span>

              <span className="text-xs font-bold text-gray-400">
                {currentQuestion + 1} /{" "}
                {quiz.questions.length}
              </span>
            </div>

            <h2 className="mt-8 text-xl font-black leading-8 sm:text-2xl">
              {question.question}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map(
                (option, index) => {
                  const selected =
                    answers[question.id] === index;

                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() =>
                        selectAnswer(index)
                      }
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-indigo-600 bg-indigo-50 shadow-sm dark:border-indigo-500 dark:bg-indigo-500/10"
                          : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/10 dark:bg-[#141518] dark:hover:border-indigo-500/50"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black transition ${
                          selected
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                        }`}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <span
                        className={`text-sm font-semibold ${
                          selected
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {option}
                      </span>

                      {selected && (
                        <CheckCircle2
                          size={20}
                          className="ml-auto shrink-0 text-indigo-600"
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {/* NAVIGATION */}

            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 dark:border-white/10">
              <button
                type="button"
                disabled={currentQuestion === 0}
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-bold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
              >
                <ArrowLeft size={16} />
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                {currentQuestion ===
                quiz.questions.length - 1
                  ? "Submit Quiz"
                  : "Next Question"}

                {currentQuestion ===
                quiz.questions.length - 1 ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>
          </section>

          {/* QUESTION NAVIGATOR */}

          <aside className="h-fit rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101114] lg:sticky lg:top-28">
            <h3 className="text-sm font-black">
              Questions
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Track your progress
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {quiz.questions.map((item, index) => {
                const answered =
                  answers[item.id] !== undefined;

                const active =
                  currentQuestion === index;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setCurrentQuestion(index)
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : answered
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/15"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-[11px] font-semibold dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-indigo-600" />
                Current
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-emerald-500" />
                Answered
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-gray-200 dark:bg-white/10" />
                Not Answered
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
RESULT CARD
========================================================= */

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-xs font-semibold text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}
