"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Lock,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";

import { getQuizById } from "@/lib/quiz-data";

type Answers = Record<number, number>;

export default function QuizAttemptPage() {
  const params = useParams();

const quizId = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

const quiz = quizId ? getQuizById(quizId) : undefined;
  /* =====================================================
     LEVEL SETTINGS
  ===================================================== */

  const TOTAL_LEVELS = 100;

  const getQuestionsForLevel = (level: number) => {
    if (level <= 5) return 5;
    if (level <= 10) return 7;
    if (level <= 15) return 10;
    if (level <= 20) return 12;
    if (level <= 30) return 15;
    if (level <= 50) return 20;
    if (level <= 75) return 25;

    return 30;
  };

  const getTimeForLevel = (level: number) => {
    if (level <= 4) return 3;
    if (level <= 7) return 5;
    if (level <= 10) return 7;
    if (level <= 15) return 10;

    return 15;
  };

  const getDifficultyForLevel = (level: number) => {
    if (level <= 5) return "Easy";
    if (level <= 15) return "Medium";

    return "Hard";
  };

  /* =====================================================
     STATE
  ===================================================== */

  const [selectedLevel, setSelectedLevel] = useState<number | null>(
    null
  );

  const [unlockedLevel, setUnlockedLevel] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Answers>({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [started, setStarted] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [showResultPopup, setShowResultPopup] = useState(false);

  const [levelPassed, setLevelPassed] = useState(false);

  /* =====================================================
     LOAD UNLOCKED LEVEL
  ===================================================== */

  useEffect(() => {
    if (!quizId) return;

    const savedLevel = localStorage.getItem(
      `quiz-${quizId}-unlocked-level`
    );

    if (savedLevel) {
      const parsed = Number(savedLevel);

      if (
        Number.isFinite(parsed) &&
        parsed >= 1 &&
        parsed <= TOTAL_LEVELS
      ) {
        setUnlockedLevel(parsed);
      }
    }
  }, [quizId]);

  /* =====================================================
     SAVE UNLOCKED LEVEL
  ===================================================== */

  useEffect(() => {
    if (!quizId) return;

    localStorage.setItem(
      `quiz-${quizId}-unlocked-level`,
      String(unlockedLevel)
    );
  }, [quizId, unlockedLevel]);

  /* =====================================================
     SOUND
  ===================================================== */

  const playWinSound = () => {
    try {
      const audio = new Audio("/sounds/win.mp3");

      audio.volume = 0.7;

      audio.currentTime = 0;

      void audio.play().catch((error) => {
        console.log("Win sound could not play:", error);
      });
    } catch (error) {
      console.log("Win sound error:", error);
    }
  };

  const playLostSound = () => {
    try {
      const audio = new Audio("/sounds/lost.mp3");

      audio.volume = 0.7;

      audio.currentTime = 0;

      void audio.play().catch((error) => {
        console.log("Lost sound could not play:", error);
      });
    } catch (error) {
      console.log("Lost sound error:", error);
    }
  };

  /* =====================================================
     QUESTIONS FOR CURRENT LEVEL
  ===================================================== */

  const levelQuestionCount = selectedLevel
    ? getQuestionsForLevel(selectedLevel)
    : 5;

  const levelQuestions = useMemo(() => {
    if (!quiz) return [];

    const sourceQuestions = quiz.questions;

    if (!sourceQuestions.length) return [];

    /*
      First 5 questions for Level 1.
      Higher levels use more questions.

      If the quiz has fewer questions than required,
      questions are reused safely.
    */

    return Array.from(
      { length: Math.min(levelQuestionCount, 30) },
      (_, index) => {
        return sourceQuestions[index % sourceQuestions.length];
      }
    );
  }, [quiz, levelQuestionCount]);

  const question = levelQuestions[currentQuestion];

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (!started || submitted || !selectedLevel) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      setLevelPassed(false);
      setShowResultPopup(true);
      playLostSound();

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

    return () => {
      window.clearInterval(timer);
    };
  }, [
    started,
    submitted,
    selectedLevel,
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
      return (
        total +
        (answers[item.id] === item.answer ? 1 : 0)
      );
    },
    0
  );

  const score =
    levelQuestions.length > 0
      ? Math.round(
          (correctAnswers /
            levelQuestions.length) *
            100
        )
      : 0;

  /*
    Passing requirement:
    Level 1-5 = 50%
    Level 6+ = 60%
  */

  const passingScore =
    selectedLevel && selectedLevel <= 5
      ? 50
      : 60;

  /* =====================================================
     PROGRESS
  ===================================================== */

  const progress =
    levelQuestions.length > 0
      ? ((currentQuestion + 1) /
          levelQuestions.length) *
        100
      : 0;

  /* =====================================================
     INVALID QUIZ
  ===================================================== */

  if (!quiz) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-[#08090b]">
        <div className="mx-auto max-w-xl rounded-[28px] border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-[#101114]">
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
    if (level > unlockedLevel) return;

    setSelectedLevel(level);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setShowResultPopup(false);
    setLevelPassed(false);

    setTimeLeft(getTimeForLevel(level) * 60);

    setStarted(true);
  };

  /* =====================================================
     SELECT ANSWER
  ===================================================== */

  const selectAnswer = (optionIndex: number) => {
    if (
      submitted ||
      !question
    ) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  /* =====================================================
     COMPLETE LEVEL
  ===================================================== */

  const completeLevel = () => {
    const passed = score >= passingScore;

    setSubmitted(true);
    setLevelPassed(passed);
    setShowResultPopup(true);

    if (passed) {
      playWinSound();

      if (
        selectedLevel &&
        selectedLevel >= unlockedLevel &&
        selectedLevel < TOTAL_LEVELS
      ) {
        const nextLevel = selectedLevel + 1;

        setUnlockedLevel((previous) =>
          Math.max(previous, nextLevel)
        );
      }
    } else {
      playLostSound();
    }
  };

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const handleNext = () => {
    if (!question) return;

    if (
      currentQuestion <
      levelQuestions.length - 1
    ) {
      setCurrentQuestion(
        (value) => value + 1
      );

      return;
    }

    completeLevel();
  };

  /* =====================================================
     PREVIOUS
  ===================================================== */

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (value) => value - 1
      );
    }
  };

  /* =====================================================
     RETRY
  ===================================================== */

  const handleRetry = () => {
    if (!selectedLevel) return;

    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setShowResultPopup(false);
    setLevelPassed(false);

    setTimeLeft(
      getTimeForLevel(selectedLevel) * 60
    );

    setStarted(true);
  };

  /* =====================================================
     BACK TO LEVELS
  ===================================================== */

  const backToLevels = () => {
    setStarted(false);
    setSubmitted(false);
    setShowResultPopup(false);
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setAnswers({});
  };

  /* =====================================================
     LEVEL SELECT SCREEN
  ===================================================== */

  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-[#faf9ff] to-[#f5f3ff] text-gray-900 dark:from-[#08090b] dark:via-[#0c0d10] dark:to-[#101114] dark:text-white">

        <header className="border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090b]/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft size={18} />
              Back to Quizzes
            </Link>

            <div className="text-right">
              <p className="text-xs text-gray-400">
                {quiz.category}
              </p>

              <h1 className="text-sm font-black sm:text-base">
                {quiz.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">

          {/* HERO */}

          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-7 text-white shadow-2xl shadow-indigo-500/20 sm:p-10">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-300/10 blur-3xl" />

            <div className="relative z-10">

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                  <Trophy size={24} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
                    Challenge Mode
                  </p>

                  <h2 className="text-xl font-black sm:text-2xl">
                    Choose Your Level
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                Start from Level 1 and keep progressing.
                Complete a level to unlock the next challenge.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-wider text-indigo-200">
                    Level 1–5
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    5 Questions
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-wider text-indigo-200">
                    Timer
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    3–15 Minutes
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-wider text-indigo-200">
                    Total
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    100 Levels
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* LEVEL GRID */}

          <section className="mt-8">

            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-black">
                  Levels
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Complete the current level to unlock the next one.
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {unlockedLevel - 1} / {TOTAL_LEVELS} Completed
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">

              {Array.from(
                { length: TOTAL_LEVELS },
                (_, index) => {
                  const level = index + 1;

                  const unlocked =
                    level <= unlockedLevel;

                  const current =
                    level === unlockedLevel;

                  return (
                    <button
                      key={level}
                      type="button"
                      disabled={!unlocked}
                      onClick={() =>
                        startLevel(level)
                      }
                      className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border transition ${
                        unlocked
                          ? current
                            ? "border-indigo-500 bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 hover:-translate-y-1 hover:bg-indigo-700"
                            : "border-indigo-100 bg-white text-gray-900 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg dark:border-indigo-500/20 dark:bg-[#101114] dark:text-white"
                          : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:border-white/5 dark:bg-white/[0.03]"
                      }`}
                    >

                      {!unlocked ? (
                        <Lock size={20} />
                      ) : (
                        <>
                          <span className="text-xl font-black">
                            {level}
                          </span>

                          <span className={`mt-1 text-[9px] font-bold ${
                            current
                              ? "text-indigo-100"
                              : "text-gray-400"
                          }`}>
                            {level <= 5
                              ? "EASY"
                              : level <= 15
                              ? "MEDIUM"
                              : "HARD"}
                          </span>
                        </>
                      )}

                    </button>
                  );
                }
              )}

            </div>

          </section>
        </div>
      </main>
    );
  }

  /* =====================================================
     RESULT POPUP
  ===================================================== */

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">

      {/* TOP BAR */}

      <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/85 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090b]/85 sm:px-6">
        <div className="mx-auto max-w-5xl">

          <div className="flex items-center justify-between gap-4">

            <button
              type="button"
              onClick={backToLevels}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft size={18} />

              <span className="hidden sm:inline">
                Levels
              </span>
            </button>

            <div className="text-center">
              <p className="text-xs font-bold text-gray-400">
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
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>
      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        <div className="mb-5 flex flex-wrap items-center gap-2">

          <span className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            Level {selectedLevel}
          </span>

          <span className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-500 dark:bg-white/5 dark:text-gray-400">
            {getDifficultyForLevel(
              selectedLevel ?? 1
            )}
          </span>

          <span className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-500 dark:bg-white/5 dark:text-gray-400">
            {levelQuestions.length} Questions
          </span>

          <span className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-500 dark:bg-white/5 dark:text-gray-400">
            {getTimeForLevel(
              selectedLevel ?? 1
            )} Minutes
          </span>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">

          {/* QUESTION */}

          <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#101114]">

            {question ? (
              <>
                <div className="flex items-center justify-between">

                  <span className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    Question {currentQuestion + 1}
                  </span>

                  <span className="text-xs font-bold text-gray-400">
                    {currentQuestion + 1} /{" "}
                    {levelQuestions.length}
                  </span>

                </div>

                <h2 className="mt-8 text-xl font-black leading-8 sm:text-2xl">
                  {question.question}
                </h2>

                <div className="mt-8 space-y-3">

                  {question.options.map(
                    (option, index) => {
                      const selected =
                        answers[question.id] ===
                        index;

                      return (
                        <button
                          type="button"
                          key={`${question.id}-${index}`}
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
                    }
                  )}

                </div>

                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 dark:border-white/10">

                  <button
                    type="button"
                    disabled={
                      currentQuestion === 0
                    }
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
              </>
            ) : (
              <div className="py-16 text-center">
                <XCircle
                  size={35}
                  className="mx-auto text-red-500"
                />

                <p className="mt-4 text-sm font-bold">
                  Questions are not available.
                </p>
              </div>
            )}

          </section>

          {/* QUESTION NAVIGATOR */}

          <aside className="h-fit rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101114] lg:sticky lg:top-28">

            <h3 className="text-sm font-black">
              Level {selectedLevel}
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Track your progress
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2">

              {levelQuestions.map(
                (item, index) => {
                  const answered =
                    answers[item.id] !==
                    undefined;

                  const active =
                    currentQuestion === index;

                  return (
                    <button
                      type="button"
                      key={`${item.id}-${index}`}
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
                }
              )}

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

      {/* =================================================
          RESULT POPUP
      ================================================= */}

      {showResultPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">

          <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-2xl dark:bg-[#101114]">

            <div
              className={`p-8 text-center text-white ${
                levelPassed
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                  : "bg-gradient-to-br from-red-500 to-rose-600"
              }`}
            >

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-white/15 text-5xl backdrop-blur-md">

                {levelPassed ? (
                  <span className="animate-bounce">
                    🎉
                  </span>
                ) : (
                  <span className="animate-pulse">
                    😔
                  </span>
                )}

              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                Level {selectedLevel}
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {levelPassed
                  ? "Level Complete! 🎉"
                  : "Level Failed"}
              </h2>

              <p className="mt-3 text-sm text-white/80">
                {levelPassed
                  ? "Amazing! You unlocked the next level."
                  : "Don't worry. Try again and improve your score."}
              </p>

            </div>

            <div className="p-6">

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-2xl bg-gray-50 p-4 text-center dark:bg-white/[0.04]">
                  <p className="text-[10px] font-bold uppercase text-gray-400">
                    Score
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {score}%
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4 text-center dark:bg-white/[0.04]">
                  <p className="text-[10px] font-bold uppercase text-gray-400">
                    Correct
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {correctAnswers}/
                    {levelQuestions.length}
                  </p>
                </div>

              </div>

              {levelPassed && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-500/20 dark:bg-emerald-500/10">
                  <div className="flex items-center justify-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-400">
                    <Trophy size={18} />

                    {selectedLevel &&
                    selectedLevel < TOTAL_LEVELS
                      ? `Level ${
                          selectedLevel + 1
                        } Unlocked!`
                      : "You completed all levels!"}
                  </div>
                </div>
              )}

              <div className="mt-6 grid gap-3">

                {!levelPassed && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <RotateCcw size={17} />
                    Try Again
                  </button>
                )}

                {levelPassed &&
                  selectedLevel &&
                  selectedLevel <
                    TOTAL_LEVELS && (
                    <button
                      type="button"
                      onClick={() =>
                        startLevel(
                          selectedLevel + 1
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                      Next Level
                      <ArrowRight size={17} />
                    </button>
                  )}

                <button
                  type="button"
                  onClick={backToLevels}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3.5 text-sm font-bold transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <BookOpen size={17} />
                  Back to Levels
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
