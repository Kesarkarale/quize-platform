"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Lock,
  Trophy,
  Star,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================================================
   TYPES
========================================================= */

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
};

type Level = {
  level: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  questions: Question[];
};

type QuizResult = {
  category: string;
  level: number;
  difficulty: string;
  total: number;
  correct: number;
  wrong: number;
  score: number;
  passed: boolean;
  completedAt: string;
};

/* =========================================================
   QUESTION BANK
   100 LEVELS ARE GENERATED FROM THESE QUESTIONS
========================================================= */

const questionBank: Record<string, Question[]> = {
  "General Knowledge": [
    {
      id: 1,
      question: "What is the capital city of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      id: 2,
      question: "Who is known as the Father of the Nation in India?",
      options: [
        "Jawaharlal Nehru",
        "Sardar Patel",
        "Mahatma Gandhi",
        "B. R. Ambedkar",
      ],
      answer: 2,
    },
    {
      id: 3,
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 2,
    },
    {
      id: 4,
      question: "Which is the national animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Leopard"],
      answer: 1,
    },
    {
      id: 5,
      question: "How many continents are there in the world?",
      options: ["5", "6", "7", "8"],
      answer: 2,
    },
    {
      id: 6,
      question: "Which ocean is the largest?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: 2,
    },
    {
      id: 7,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Mercury", "Neptune"],
      answer: 1,
    },
    {
      id: 8,
      question: "Which is the fastest land animal?",
      options: ["Lion", "Horse", "Cheetah", "Tiger"],
      answer: 2,
    },
    {
      id: 9,
      question: "Which country is famous for the Eiffel Tower?",
      options: ["Italy", "France", "Germany", "Spain"],
      answer: 1,
    },
    {
      id: 10,
      question: "How many days are there in a leap year?",
      options: ["364", "365", "366", "367"],
      answer: 2,
    },

    {
      id: 11,
      question: "Which is the smallest continent?",
      options: ["Asia", "Europe", "Australia", "Africa"],
      answer: 2,
    },
    {
      id: 12,
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Ganga", "Yangtze"],
      answer: 1,
    },
    {
      id: 13,
      question: "Which country has the largest population?",
      options: ["India", "USA", "Russia", "Japan"],
      answer: 0,
    },
    {
      id: 14,
      question: "Who wrote the Indian national anthem?",
      options: [
        "Rabindranath Tagore",
        "Mahatma Gandhi",
        "Bankim Chandra Chatterjee",
        "Sarojini Naidu",
      ],
      answer: 0,
    },
    {
      id: 15,
      question: "What is the currency of Japan?",
      options: ["Won", "Yuan", "Yen", "Dollar"],
      answer: 2,
    },
    {
      id: 16,
      question: "Which is the highest mountain in the world?",
      options: [
        "K2",
        "Mount Everest",
        "Kangchenjunga",
        "Makalu",
      ],
      answer: 1,
    },
    {
      id: 17,
      question: "How many states are there in India?",
      options: ["26", "27", "28", "29"],
      answer: 2,
    },
    {
      id: 18,
      question: "Which is the largest desert in the world?",
      options: ["Sahara", "Gobi", "Thar", "Kalahari"],
      answer: 0,
    },
    {
      id: 19,
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "Korea", "Thailand"],
      answer: 1,
    },
    {
      id: 20,
      question: "Which is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
      answer: 1,
    },

    {
      id: 21,
      question: "Who was the first Prime Minister of India?",
      options: [
        "Sardar Patel",
        "Jawaharlal Nehru",
        "Rajendra Prasad",
        "Lal Bahadur Shastri",
      ],
      answer: 1,
    },
    {
      id: 22,
      question: "Which is the national flower of India?",
      options: ["Rose", "Lotus", "Sunflower", "Jasmine"],
      answer: 1,
    },
    {
      id: 23,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      answer: 2,
    },
    {
      id: 24,
      question: "How many hours are there in one day?",
      options: ["12", "18", "24", "48"],
      answer: 2,
    },
    {
      id: 25,
      question: "Which animal is known as the King of the Jungle?",
      options: ["Tiger", "Lion", "Elephant", "Bear"],
      answer: 1,
    },

    {
      id: 26,
      question: "Which is the largest country by area?",
      options: ["Canada", "China", "Russia", "USA"],
      answer: 2,
    },
    {
      id: 27,
      question: "Which instrument is used to measure temperature?",
      options: [
        "Barometer",
        "Thermometer",
        "Speedometer",
        "Altimeter",
      ],
      answer: 1,
    },
    {
      id: 28,
      question: "Which language has the most native speakers?",
      options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
      answer: 3,
    },
    {
      id: 29,
      question: "Which is the deepest ocean?",
      options: [
        "Indian Ocean",
        "Atlantic Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: 2,
    },
    {
      id: 30,
      question: "How many colors are traditionally found in a rainbow?",
      options: ["5", "6", "7", "8"],
      answer: 2,
    },
  ],
};

/* =========================================================
   FALLBACK QUESTIONS FOR OTHER CATEGORIES
========================================================= */

const fallbackQuestions: Question[] = [
  {
    id: 1,
    question: "What is the chemical formula of water?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: 1,
  },
  {
    id: 2,
    question: "Which organ pumps blood throughout the human body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    answer: 2,
  },
  {
    id: 3,
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "CSS", "Python", "SQL"],
    answer: 1,
  },
  {
    id: 4,
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Computer Processing Utility",
    ],
    answer: 0,
  },
  {
    id: 5,
    question: "What is 12 × 8?",
    options: ["86", "96", "108", "112"],
    answer: 1,
  },
  {
    id: 6,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    answer: 2,
  },
  {
    id: 7,
    question: "Which company developed Android?",
    options: ["Microsoft", "Apple", "Google", "IBM"],
    answer: 2,
  },
  {
    id: 8,
    question: "What is 25% of 200?",
    options: ["25", "40", "50", "75"],
    answer: 2,
  },
];

/* =========================================================
   LEVEL GENERATOR
========================================================= */

function getDifficulty(level: number): Level["difficulty"] {
  if (level <= 25) return "Easy";
  if (level <= 50) return "Medium";
  if (level <= 75) return "Hard";
  return "Expert";
}

function generateLevels(category: string): Level[] {
  const source =
    questionBank[category] ||
    questionBank["General Knowledge"] ||
    fallbackQuestions;

  return Array.from({ length: 100 }, (_, index) => {
    const level = index + 1;

    const levelQuestions = Array.from(
      { length: 5 },
      (_, questionIndex) => {
        const sourceQuestion =
          source[
            (index * 5 + questionIndex) % source.length
          ];

        return {
          ...sourceQuestion,
          id: questionIndex + 1,
        };
      }
    );

    return {
      level,
      difficulty: getDifficulty(level),
      questions: levelQuestions,
    };
  });
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function QuizPage() {
  return <QuizGame />;
}

/* =========================================================
   QUIZ GAME
========================================================= */

function QuizGame() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category =
    searchParams.get("category") || "General Knowledge";

  const levels = useMemo(
    () => generateLevels(category),
    [category]
  );

  const [screen, setScreen] = useState<
    "start" | "levels" | "quiz" | "result"
  >("start");

  const [selectedLevel, setSelectedLevel] = useState(1);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  const [timeLeft, setTimeLeft] = useState(60);

  const [lastResult, setLastResult] =
    useState<QuizResult | null>(null);

  const [unlockedLevel, setUnlockedLevel] =
    useState(1);

  /* =========================================================
     LOAD SAVED PROGRESS
  ========================================================= */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved =
      localStorage.getItem(
        `quizUnlocked_${category}`
      );

    if (saved) {
      const parsed = Number(saved);

      if (
        Number.isFinite(parsed) &&
        parsed >= 1 &&
        parsed <= 100
      ) {
        setUnlockedLevel(parsed);
      }
    }
  }, [category]);

  /* =========================================================
     CURRENT LEVEL
  ========================================================= */

  const currentLevel =
    levels[selectedLevel - 1];

  const question =
    currentLevel?.questions[currentQuestion];

  /* =========================================================
     START BUTTON
  ========================================================= */

  function startQuiz() {
    setScreen("levels");
  }

  /* =========================================================
     OPEN LEVEL
  ========================================================= */

  function openLevel(level: number) {
    if (level > unlockedLevel) return;

    setSelectedLevel(level);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(60);
    setLastResult(null);
    setScreen("quiz");
  }

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (screen !== "quiz") return;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [screen, selectedLevel]);

  /* =========================================================
     AUTO SUBMIT
  ========================================================= */

  useEffect(() => {
    if (screen === "quiz" && timeLeft === 0) {
      finishLevel();
    }
  }, [timeLeft, screen]);

  /* =========================================================
     SELECT ANSWER
  ========================================================= */

  function selectAnswer(index: number) {
    if (!question) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: index,
    }));
  }

  /* =========================================================
     NEXT QUESTION
  ========================================================= */

  function nextQuestion() {
    if (!question) return;

    const selected = answers[question.id];

    if (selected === undefined) {
      return;
    }

    if (
      currentQuestion <
      currentLevel.questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    } else {
      finishLevel();
    }
  }

  /* =========================================================
     PREVIOUS QUESTION
  ========================================================= */

  function previousQuestion() {
    if (currentQuestion === 0) return;

    setCurrentQuestion(
      (previous) => previous - 1
    );
  }

  /* =========================================================
     FINISH LEVEL
  ========================================================= */

  function finishLevel() {
    if (!currentLevel) return;

    let correct = 0;

    currentLevel.questions.forEach((item) => {
      if (answers[item.id] === item.answer) {
        correct++;
      }
    });

    const total =
      currentLevel.questions.length;

    const wrong = total - correct;

    const score = Math.round(
      (correct / total) * 100
    );

    /*
      60% किंवा त्यापेक्षा जास्त =
      Level Passed
    */
    const passed = score >= 60;

    const result: QuizResult = {
      category,
      level: selectedLevel,
      difficulty: currentLevel.difficulty,
      total,
      correct,
      wrong,
      score,
      passed,
      completedAt:
        new Date().toISOString(),
    };

    setLastResult(result);

    if (passed) {
      const nextLevel = Math.min(
        selectedLevel + 1,
        100
      );

      if (nextLevel > unlockedLevel) {
        setUnlockedLevel(nextLevel);

        if (
          typeof window !== "undefined"
        ) {
          localStorage.setItem(
            `quizUnlocked_${category}`,
            String(nextLevel)
          );
        }
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "quizResult",
        JSON.stringify(result)
      );
    }

    setScreen("result");
  }

  /* =========================================================
     NEXT LEVEL
  ========================================================= */

  function nextLevel() {
    if (selectedLevel >= 100) return;

    const next = selectedLevel + 1;

    if (next <= unlockedLevel) {
      openLevel(next);
    }
  }

  /* =========================================================
     RETRY LEVEL
  ========================================================= */

  function retryLevel() {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(60);
    setScreen("quiz");
  }

  /* =========================================================
     LEVEL COLOR
  ========================================================= */

  function difficultyStyle(
    difficulty: Level["difficulty"]
  ) {
    if (difficulty === "Easy") {
      return "text-green-400 bg-green-500/10 border-green-500/20";
    }

    if (difficulty === "Medium") {
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    }

    if (difficulty === "Hard") {
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    }

    return "text-red-400 bg-red-500/10 border-red-500/20";
  }

  /* =========================================================
     START SCREEN
  ========================================================= */

  if (screen === "start") {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/15 blur-[140px]" />
          <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-[140px]" />
        </div>

        <header className="relative z-20 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
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
              <ArrowLeft size={16} />
              <span className="hidden sm:block">
                Dashboard
              </span>
            </Link>
          </div>
        </header>

        <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="w-full max-w-2xl"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 ring-1 ring-indigo-500/20">
              <Trophy size={44} />
            </div>

            <div className="mt-7 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
                Quiz Challenge
              </p>

              <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                Test Your
                <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Knowledge
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                Complete 100 levels from Easy to
                Expert. Pass each level to unlock
                the next one.
              </p>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl sm:p-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                  <p className="text-2xl font-black">
                    100
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Levels
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                  <p className="text-2xl font-black">
                    5
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Questions
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                  <p className="text-2xl font-black">
                    4
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Difficulties
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                  <p className="text-2xl font-black">
                    60%
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Pass Mark
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.05] p-5">
                <h3 className="font-bold">
                  How to play
                </h3>

                <div className="mt-4 space-y-3 text-sm text-gray-500">
                  <p>
                    ✓ Start from Level 1
                  </p>
                  <p>
                    ✓ Answer all questions
                  </p>
                  <p>
                    ✓ Score at least 60% to pass
                  </p>
                  <p>
                    ✓ Passing unlocks the next level
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={startQuiz}
                className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:scale-[1.01]"
              >
                Start Quiz
                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     LEVEL SCREEN
  ========================================================= */

  if (screen === "levels") {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
          <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px]" />
        </div>

        <header className="relative z-20 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
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
              </div>
            </Link>

            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-400">
              {unlockedLevel}/100 Unlocked
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-10">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
              {category}
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Choose Your Level
            </h2>

            <p className="mt-2 text-gray-500">
              Complete a level to unlock the next
              challenge.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Easy", "1 - 25"],
              ["Medium", "26 - 50"],
              ["Hard", "51 - 75"],
              ["Expert", "76 - 100"],
            ].map(([name, range]) => (
              <div
                key={name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="font-bold">
                  {name}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Levels {range}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
            {levels.map((item) => {
              const unlocked =
                item.level <= unlockedLevel;

              return (
                <motion.button
                  key={item.level}
                  type="button"
                  whileHover={
                    unlocked
                      ? {
                          scale: 1.04,
                        }
                      : {}
                  }
                  whileTap={
                    unlocked
                      ? {
                          scale: 0.96,
                        }
                      : {}
                  }
                  onClick={() =>
                    openLevel(item.level)
                  }
                  disabled={!unlocked}
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl border transition ${
                    unlocked
                      ? "border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20"
                      : "cursor-not-allowed border-white/5 bg-white/[0.025] opacity-50"
                  }`}
                >
                  {unlocked ? (
                    <>
                      <Star
                        size={14}
                        className="absolute right-2 top-2 text-yellow-400"
                      />

                      <span className="text-xl font-black">
                        {item.level}
                      </span>

                      <span
                        className={`mt-1 rounded-md border px-1.5 py-0.5 text-[8px] font-bold ${difficultyStyle(
                          item.difficulty
                        )}`}
                      >
                        {item.difficulty}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock
                        size={18}
                        className="text-gray-600"
                      />

                      <span className="mt-1 text-xs font-bold text-gray-600">
                        {item.level}
                      </span>
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     RESULT SCREEN
  ========================================================= */

  if (
    screen === "result" &&
    lastResult
  ) {
    const isLastLevel =
      selectedLevel === 100;

    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-lg"
          >
            <div className="text-center">
              <div
                className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
                  lastResult.passed
                    ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
                    : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
                }`}
              >
                {lastResult.passed ? (
                  <Trophy size={42} />
                ) : (
                  <RotateCcw size={42} />
                )}
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
                Level {lastResult.level}
              </p>

              <h1 className="mt-2 text-4xl font-black">
                {lastResult.passed
                  ? "Level Complete!"
                  : "Level Failed"}
              </h1>

              <p className="mt-2 text-gray-500">
                {lastResult.difficulty} •{" "}
                {lastResult.category}
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Your Score
                </p>

                <p
                  className={`mt-2 text-6xl font-black ${
                    lastResult.passed
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {lastResult.score}%
                </p>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                  <p className="text-2xl font-black text-white">
                    {lastResult.total}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Total
                  </p>
                </div>

                <div className="rounded-2xl bg-green-500/[0.05] p-4 text-center">
                  <p className="text-2xl font-black text-green-400">
                    {lastResult.correct}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Correct
                  </p>
                </div>

                <div className="rounded-2xl bg-red-500/[0.05] p-4 text-center">
                  <p className="text-2xl font-black text-red-400">
                    {lastResult.wrong}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Wrong
                  </p>
                </div>
              </div>

              {lastResult.passed ? (
                <div className="mt-6 rounded-2xl border border-green-500/10 bg-green-500/[0.04] p-4 text-center">
                  <p className="font-bold text-green-400">
                    Level {lastResult.level} Passed 🎉
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {isLastLevel
                      ? "You completed all 100 levels!"
                      : `Level ${
                          lastResult.level + 1
                        } is now unlocked.`}
                  </p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-red-500/10 bg-red-500/[0.04] p-4 text-center">
                  <p className="font-bold text-red-400">
                    You need 60% to pass.
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Try the level again and improve
                    your score.
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                {lastResult.passed &&
                !isLastLevel ? (
                  <button
                    type="button"
                    onClick={nextLevel}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white transition hover:scale-[1.01]"
                  >
                    Next Level
                    <ArrowRight size={19} />
                  </button>
                ) : null}

                {!lastResult.passed ? (
                  <button
                    type="button"
                    onClick={retryLevel}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white transition hover:scale-[1.01]"
                  >
                    <RotateCcw size={18} />
                    Retry Level
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() =>
                    setScreen("levels")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <Trophy size={18} />
                  View All Levels
                </button>

                <Link
                  href="/student/dashboard"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 font-bold text-gray-500 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <ArrowLeft size={18} />
                  Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     QUIZ SCREEN
  ========================================================= */

  if (!currentLevel || !question) {
    return null;
  }

  const selectedAnswer =
    answers[question.id];

  const answeredCount =
    Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) /
      currentLevel.questions.length) *
    100;

  const minutes = Math.floor(
    timeLeft / 60
  )
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Brain size={21} />
            </div>

            <div>
              <h1 className="font-black">
                Level {selectedLevel}
              </h1>

              <p
                className={`text-[10px] font-bold ${difficultyStyle(
                  currentLevel.difficulty
                )
                  .split(" ")
                  .find((item) =>
                    item.startsWith("text-")
                  )}`}
              >
                {currentLevel.difficulty}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${
              timeLeft <= 10
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-white/10 bg-white/[0.04] text-gray-300"
            }`}
          >
            <Clock3 size={18} />

            <span className="font-mono font-bold">
              {minutes}:{seconds}
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-8">
        <div className="mb-7">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-400">
                {category}
              </p>

              <h2 className="mt-1 text-2xl font-black">
                Level {selectedLevel}
              </h2>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-400">
              <span className="font-bold text-white">
                {answeredCount}
              </span>{" "}
              /{" "}
              {currentLevel.questions.length}
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>
        </div>

        <motion.div
          key={`${selectedLevel}-${question.id}`}
          initial={{
            opacity: 0,
            x: 25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8"
        >
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 font-black text-indigo-400">
              {currentQuestion + 1}
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-600">
                Question
              </p>

              <p className="text-sm font-semibold text-gray-400">
                {currentQuestion + 1} of{" "}
                {currentLevel.questions.length}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold leading-8 sm:text-2xl">
            {question.question}
          </h3>

          <div className="mt-8 grid gap-3">
            {question.options.map(
              (option, index) => {
                const selected =
                  selectedAnswer === index;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      selectAnswer(index)
                    }
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/5"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${
                        selected
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-white/10 bg-white/[0.03] text-gray-500"
                      }`}
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </div>

                    <span
                      className={`font-medium ${
                        selected
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {option}
                    </span>

                    {selected && (
                      <CheckCircle2
                        size={20}
                        className="ml-auto text-indigo-400"
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>

          <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={17} />
              Previous
            </button>

            <button
              type="button"
              onClick={nextQuestion}
              disabled={
                selectedAnswer === undefined
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentQuestion ===
              currentLevel.questions.length - 1
                ? "Finish Level"
                : "Next Question"}

              {currentQuestion ===
              currentLevel.questions.length - 1 ? (
                <Trophy size={17} />
              ) : (
                <ArrowRight size={17} />
              )}
            </button>
          </div>
        </motion.div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold">
              Level Questions
            </h4>

            <p className="text-xs text-gray-500">
              {answeredCount} answered
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentLevel.questions.map(
              (item, index) => {
                const answered =
                  answers[item.id] !==
                  undefined;

                const active =
                  currentQuestion === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setCurrentQuestion(index)
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition ${
                      active
                        ? "bg-indigo-600 text-white"
                        : answered
                        ? "bg-green-500/15 text-green-400"
                        : "bg-white/[0.05] text-gray-500 hover:bg-white/10"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.04] p-4 text-xs leading-5 text-gray-500">
          <Clock3
            size={16}
            className="mt-0.5 shrink-0 text-yellow-500"
          />

          <p>
            Select one answer for each question.
            The level will be submitted
            automatically when the timer reaches
            zero.
          </p>
        </div>
      </div>
    </main>
  );
}
