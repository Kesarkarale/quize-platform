"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Lock,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

import {
  getLevelDifficulty,
  getLevelDuration,
  getLevelQuestionsCount,
  getQuizById,
  getQuestionsForLevel,
} from "@/lib/quiz-data";

type Answers = Record<number, number>;

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();

  const quizId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const quiz = quizId ? getQuizById(quizId) : undefined;

  const [selectedLevel, setSelectedLevel] = useState<number | null>(
    null
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Answers>({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(1);

  /* =====================================================
     LOAD UNLOCKED LEVEL
  ===================================================== */

  useEffect(() => {
    if (!quiz) return;

    const storageKey = `quiz-progress-${quiz.id}`;

    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      setMaxUnlockedLevel(1);
      return;
    }

    const parsed = Number(saved);

    if (Number.isFinite(parsed) && parsed >= 1) {
      setMaxUnlockedLevel(Math.min(parsed, 100));
    }
  }, [quiz]);

  /* =====================================================
     CURRENT QUESTIONS
  ===================================================== */

  const levelQuestions = useMemo(() => {
    if (!quiz || !selectedLevel) return [];

    return getQuestionsForLevel(quiz, selectedLevel);
  }, [quiz, selectedLevel]);

  const question = levelQuestions[currentQuestion];

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (
      !selectedLevel ||
      submitted ||
      levelQuestions.length === 0
    ) {
      return;
    }

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    selectedLevel,
    submitted,
    levelQuestions.length,
    timeLeft,
  ]);

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

  const correctAnswers = levelQuestions.reduce(
    (total, item) => {
      return total + (answers[item.id] === item.answer ? 1 : 0);
    },
    0
  );

  const score =
    levelQuestions.length > 0
      ? Math.round(
          (correctAnswers / levelQuestions.length) * 100
        )
      : 0;

  const passed = score >= (quiz?.passingScore ?? 60);

  const progress =
    levelQuestions.length > 0
      ? ((currentQuestion + 1) / levelQuestions.length) * 100
      : 0;

  /* =====================================================
     INVALID QUIZ
  ===================================================== */

  if (!quiz) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#08090b]">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-[#101114]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
            <XCircle size={32} />
          </div>

          <h1 className="mt-5 text-2xl font-black">
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
     START LEVEL
  ===================================================== */

  const startLevel = (level: number) => {
    if (level > maxUnlockedLevel) return;

    const questions = getQuestionsForLevel(quiz, level);

    setSelectedLevel(level);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(getLevelDuration(level) * 60);

    if (questions.length === 0) {
      return;
    }
  };

  /* =====================================================
     SELECT ANSWER
  ===================================================== */

  const selectAnswer = (optionIndex: number) => {
    if (submitted || !question) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  /* =====================================================
     NEXT
  ===================================================== */

  const handleNext = () => {
    if (!question) return;

    if (currentQuestion < levelQuestions.length - 1) {
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
    if (!selectedLevel) return;

    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(getLevelDuration(selectedLevel) * 60);
    setSubmitted(false);
  };

  /* =====================================================
     RESULT
  ===================================================== */

  if (selectedLevel && submitted) {
    const nextLevel = selectedLevel + 1;

    const unlockNextLevel = () => {
      if (!passed) return;

      if (nextLevel > maxUnlockedLevel) {
        const newMax = Math.min(nextLevel, 100);

        setMaxUnlockedLevel(newMax);

        localStorage.setItem(
          `quiz-progress-${quiz.id}`,
          String(newMax)
        );
      }
    };

    unlockNextLevel();

    return (
      <main className="min-h-screen bg-gray-50 dark:bg-[#08090b]">
        <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#101114]">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <Link
              href={`/quiz/${quiz.id}`}
              onClick={() => {
                setSelectedLevel(null);
                setSubmitted(false);
              }}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600"
            >
              <ArrowLeft size={18} />
              Levels
            </Link>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Level {selectedLevel}
              </p>

              <h1 className="text-sm font-black">
                {quiz.title}
              </h1>
            </div>

            <div className="w-[70px]" />
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
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
                Level {selectedLevel} Completed
              </p>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                {passed
                  ? "Level Passed! 🎉"
                  : "Keep Practicing! 💪"}
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm text-white/80">
                {passed
                  ? `Great job! Level ${
                      selectedLevel + 1
                    } is now unlocked.`
                  : "You need 60% to unlock the next level."}
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
                  value={`${correctAnswers}/${levelQuestions.length}`}
                />

                <ResultCard
                  label="Time"
                  value={formattedTime}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black">
                      {quiz.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Level {selectedLevel} •{" "}
                      {getLevelDifficulty(selectedLevel)}
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

                {passed ? (
                  <button
                    type="button"
                    onClick={() => startLevel(nextLevel)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    Next Level
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevel(null);
                      setSubmitted(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    Back to Levels
                    <ArrowRight size={17} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     QUESTION SCREEN
  ===================================================== */

  if (selectedLevel && question) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-[#08090b]">
        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090b]/90 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedLevel(null);
                  setSubmitted(false);
                }}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">
                  Levels
                </span>
              </button>

              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Level {selectedLevel}
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

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
            {/* QUESTION */}

            <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101114] sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  Question {currentQuestion + 1}
                </span>

                <span className="text-xs font-bold text-gray-400">
                  {currentQuestion + 1} /{" "}
                  {levelQuestions.length}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500 dark:bg-white/10 dark:text-gray-400">
                  Level {selectedLevel}
                </span>

                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {getLevelDifficulty(selectedLevel)}
                </span>
              </div>

              <h2 className="mt-6 text-xl font-black leading-8 sm:text-2xl">
                {question.question}
              </h2>

              <div className="mt-8 space-y-3">
                {question.options.map((option, index) => {
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
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
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
                })}
              </div>

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
                  levelQuestions.length - 1
                    ? "Submit Level"
                    : "Next Question"}

                  {currentQuestion ===
                  levelQuestions.length - 1 ? (
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
                {levelQuestions.map((item, index) => {
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
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400"
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

  /* =====================================================
     LEVEL SELECTION SCREEN
  ===================================================== */

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#08090b]">
      <header className="border-b border-gray-200 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090b]/90 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/quiz"
            className="flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={18} />
            Back to Quizzes
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Sparkles size={17} />
            </div>

            <span className="hidden text-sm font-black sm:block">
              QuizPro
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* HERO */}

        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl shadow-indigo-500/20 sm:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-300/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-md">
                  <Zap size={15} />
                  LEVEL BASED CHALLENGE
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  {quiz.title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                  {quiz.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <InfoPill
                    icon={<BookOpen size={15} />}
                    text="100+ Levels"
                  />

                  <InfoPill
                    icon={<Clock3 size={15} />}
                    text="Timed Challenge"
                  />

                  <InfoPill
                    icon={<Trophy size={15} />}
                    text="Progressive Difficulty"
                  />
                </div>
              </div>

              <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-md md:flex">
                <Trophy
                  size={55}
                  className="text-yellow-300"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROGRESS */}

        <div className="mt-8 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101114] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                Your Progress
              </p>

              <h2 className="mt-1 text-lg font-black">
                Level {maxUnlockedLevel} Unlocked
              </h2>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {Math.min(maxUnlockedLevel, 100)}
              </p>

              <p className="text-[10px] font-semibold text-gray-400">
                / 100 Levels
              </p>
            </div>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
              style={{
                width: `${Math.min(
                  (maxUnlockedLevel / 100) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* LEVELS */}

        <div className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-black">
              Choose Your Level
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Complete each level to unlock the next challenge.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 100 }, (_, index) => {
              const level = index + 1;

              const unlocked =
                level <= maxUnlockedLevel;

              const difficulty =
                getLevelDifficulty(level);

              const questions =
                getLevelQuestionsCount(level);

              const duration =
                getLevelDuration(level);

              return (
                <button
                  key={level}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => startLevel(level)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                    unlocked
                      ? "border-gray-200 bg-white hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-white/10 dark:bg-[#101114] dark:hover:border-indigo-500/50"
                      : "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60 dark:border-white/10 dark:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                        unlocked
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "bg-gray-200 text-gray-400 dark:bg-white/10"
                      }`}
                    >
                      {level}
                    </div>

                    {!unlocked ? (
                      <Lock
                        size={17}
                        className="text-gray-400"
                      />
                    ) : (
                      <CheckCircle2
                        size={17}
                        className="text-emerald-500"
                      />
                    )}
                  </div>

                  <h3 className="mt-4 text-sm font-black">
                    Level {level}
                  </h3>

                  <p className="mt-1 text-[10px] font-semibold text-gray-400">
                    {difficulty}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="rounded-lg bg-gray-100 px-2 py-1 text-[9px] font-bold text-gray-500 dark:bg-white/10 dark:text-gray-400">
                      {questions} Q
                    </span>

                    <span className="rounded-lg bg-gray-100 px-2 py-1 text-[9px] font-bold text-gray-500 dark:bg-white/10 dark:text-gray-400">
                      {duration} min
                    </span>
                  </div>

                  {unlocked && (
                    <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-indigo-600 dark:text-indigo-400">
                      Start Level
                      <ArrowRight size={12} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   INFO PILL
========================================================= */

function InfoPill({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-md">
      {icon}
      {text}
    </div>
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
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-xs font-semibold text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}
