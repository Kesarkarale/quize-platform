"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  level: number;
  difficulty: string;
  total: number;
  correct: number;
  wrong: number;
  score: number;
  passed: boolean;
};

/* =========================================================
   QUESTION BANK
   100 LEVELS
========================================================= */

const easyQuestions: Question[] = [
  {
    question: "What is the capital city of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    answer: 1,
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    answer: 1,
  },
  {
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    question: "Which ocean is the largest?",
    options: [
      "Indian Ocean",
      "Atlantic Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: 2,
  },
  {
    question: "Which animal is known as the fastest land animal?",
    options: ["Horse", "Tiger", "Cheetah", "Lion"],
    answer: 2,
  },
  {
    question: "How many days are there in a leap year?",
    options: ["364", "365", "366", "367"],
    answer: 2,
  },
  {
    question: "Which country is famous for the Eiffel Tower?",
    options: ["Italy", "France", "Germany", "Spain"],
    answer: 1,
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Water", "Hydrogen", "Salt"],
    answer: 1,
  },
];

const mediumQuestions: Question[] = [
  {
    question: "Who wrote the Indian national anthem?",
    options: [
      "Mahatma Gandhi",
      "Rabindranath Tagore",
      "Jawaharlal Nehru",
      "Bankim Chandra Chattopadhyay",
    ],
    answer: 1,
  },
  {
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Ganga", "Godavari", "Narmada"],
    answer: 1,
  },
  {
    question: "Who was the first President of India?",
    options: [
      "Dr. Rajendra Prasad",
      "Dr. S. Radhakrishnan",
      "Jawaharlal Nehru",
      "Sardar Patel",
    ],
    answer: 0,
  },
  {
    question: "Which gas is most abundant in Earth's atmosphere?",
    options: [
      "Oxygen",
      "Carbon Dioxide",
      "Nitrogen",
      "Hydrogen",
    ],
    answer: 2,
  },
  {
    question: "Which organ pumps blood throughout the human body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    answer: 2,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Dollar"],
    answer: 2,
  },
  {
    question: "Which is the smallest continent?",
    options: ["Europe", "Australia", "Africa", "South America"],
    answer: 1,
  },
  {
    question: "Who discovered gravity?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answer: 1,
  },
  {
    question: "Which Indian city is known as the Pink City?",
    options: ["Jaipur", "Delhi", "Agra", "Udaipur"],
    answer: 0,
  },
  {
    question: "How many states are there in India?",
    options: ["26", "27", "28", "29"],
    answer: 2,
  },
];

const hardQuestions: Question[] = [
  {
    question: "Who was the first Indian to win a Nobel Prize?",
    options: [
      "C. V. Raman",
      "Rabindranath Tagore",
      "Mother Teresa",
      "Amartya Sen",
    ],
    answer: 1,
  },
  {
    question: "Which Article of the Indian Constitution deals with equality before law?",
    options: ["Article 12", "Article 14", "Article 19", "Article 21"],
    answer: 1,
  },
  {
    question: "Who founded the Maurya Empire?",
    options: [
      "Ashoka",
      "Chandragupta Maurya",
      "Bindusara",
      "Harsha",
    ],
    answer: 1,
  },
  {
    question: "Which is the largest desert in the world?",
    options: [
      "Sahara",
      "Gobi",
      "Antarctic Desert",
      "Arabian Desert",
    ],
    answer: 2,
  },
  {
    question: "What is the SI unit of electric resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    answer: 2,
  },
  {
    question: "Which Indian state has the longest coastline?",
    options: ["Maharashtra", "Gujarat", "Tamil Nadu", "Kerala"],
    answer: 1,
  },
  {
    question: "Who gave the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Stephen Hawking",
      "Galileo",
    ],
    answer: 1,
  },
  {
    question: "Which is the deepest ocean in the world?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: 2,
  },
  {
    question: "Which Mughal emperor built the Taj Mahal?",
    options: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"],
    answer: 1,
  },
  {
    question: "Which vitamin is produced in the human body through sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: 3,
  },
];

const expertQuestions: Question[] = [
  {
    question: "Which constitutional amendment lowered the voting age in India from 21 to 18?",
    options: [
      "42nd Amendment",
      "44th Amendment",
      "61st Amendment",
      "73rd Amendment",
    ],
    answer: 2,
  },
  {
    question: "Who was the first Indian Governor-General of independent India?",
    options: [
      "Lord Mountbatten",
      "C. Rajagopalachari",
      "Rajendra Prasad",
      "Jawaharlal Nehru",
    ],
    answer: 1,
  },
  {
    question: "The term 'Blue Revolution' is associated with which sector?",
    options: [
      "Agriculture",
      "Milk production",
      "Fisheries",
      "Space research",
    ],
    answer: 2,
  },
  {
    question: "Which dynasty built the Khajuraho temples?",
    options: [
      "Chola",
      "Chandela",
      "Gupta",
      "Pallava",
    ],
    answer: 1,
  },
  {
    question: "Which Indian scientist discovered the Raman Effect?",
    options: [
      "Homi Bhabha",
      "C. V. Raman",
      "Vikram Sarabhai",
      "Satyendra Nath Bose",
    ],
    answer: 1,
  },
  {
    question: "Which planet has the shortest day in the solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    question: "Who was known as the 'Grand Old Man of India'?",
    options: [
      "Dadabhai Naoroji",
      "Bal Gangadhar Tilak",
      "Gopal Krishna Gokhale",
      "Lala Lajpat Rai",
    ],
    answer: 0,
  },
  {
    question: "Which schedule of the Indian Constitution contains the list of recognized languages?",
    options: [
      "Fifth Schedule",
      "Sixth Schedule",
      "Eighth Schedule",
      "Tenth Schedule",
    ],
    answer: 2,
  },
  {
    question: "Which ancient university was located in present-day Bihar?",
    options: ["Nalanda", "Taxila", "Vikramashila", "Both A and C"],
    answer: 3,
  },
  {
    question: "Who was the first Indian woman to win an Olympic medal?",
    options: [
      "P. T. Usha",
      "Karnam Malleswari",
      "Saina Nehwal",
      "Mary Kom",
    ],
    answer: 1,
  },
];

/* =========================================================
   CREATE 100 LEVELS
========================================================= */

const levels: Level[] = Array.from(
  { length: 100 },
  (_, index) => {
    const level = index + 1;

    let difficulty: Level["difficulty"];

    if (level <= 25) {
      difficulty = "Easy";
    } else if (level <= 50) {
      difficulty = "Medium";
    } else if (level <= 75) {
      difficulty = "Hard";
    } else {
      difficulty = "Expert";
    }

    let source: Question[];

    if (difficulty === "Easy") {
      source = easyQuestions;
    } else if (difficulty === "Medium") {
      source = mediumQuestions;
    } else if (difficulty === "Hard") {
      source = hardQuestions;
    } else {
      source = expertQuestions;
    }

    /*
      प्रत्येक level ला वेगळे questions दिसावेत म्हणून
      question bank rotate केला आहे.
    */
    const questions = Array.from(
      { length: 10 },
      (_, questionIndex) =>
        source[
          (questionIndex + index) % source.length
        ]
    );

    return {
      level,
      difficulty,
      questions,
    };
  }
);

/* =========================================================
   MAIN PAGE
========================================================= */

export default function QuizPage() {
  const router = useRouter();

  const [screen, setScreen] = useState<
    "start" | "levels" | "quiz" | "result"
  >("start");

  const [currentLevel, setCurrentLevel] = useState(1);

  const [completedLevels, setCompletedLevels] =
    useState<number[]>([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const [result, setResult] =
    useState<QuizResult | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =======================================================
     LOAD PROGRESS
  ======================================================= */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved =
      localStorage.getItem("quizProgress");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCompletedLevels(parsed);
        }
      } catch {
        localStorage.removeItem("quizProgress");
      }
    }
  }, []);

  /* =======================================================
     CURRENT LEVEL
  ======================================================= */

  const levelData = useMemo(() => {
    return levels[currentLevel - 1];
  }, [currentLevel]);

  const question =
    levelData?.questions[currentQuestion];

  /* =======================================================
     START
  ======================================================= */

  function startGame() {
    setScreen("levels");
  }

  /* =======================================================
     START LEVEL
  ======================================================= */

  function startLevel(level: number) {
    if (level !== 1 && !completedLevels.includes(level - 1)) {
      return;
    }

    setCurrentLevel(level);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(15 * 60);
    setResult(null);
    setIsSubmitting(false);
    setScreen("quiz");
  }

  /* =======================================================
     TIMER
  ======================================================= */

  useEffect(() => {
    if (screen !== "quiz" || isSubmitting) {
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

    return () => {
      window.clearInterval(timer);
    };
  }, [screen, isSubmitting]);

  /* =======================================================
     AUTO SUBMIT
  ======================================================= */

  useEffect(() => {
    if (
      screen === "quiz" &&
      timeLeft === 0 &&
      !isSubmitting
    ) {
      submitQuiz();
    }
  }, [timeLeft, screen, isSubmitting]);

  /* =======================================================
     SELECT ANSWER
  ======================================================= */

  function selectAnswer(index: number) {
    if (!question || isSubmitting) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: index,
    }));
  }

  /* =======================================================
     NEXT QUESTION
  ======================================================= */

  function nextQuestion() {
    if (
      currentQuestion <
      levelData.questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  }

  /* =======================================================
     PREVIOUS QUESTION
  ======================================================= */

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  }

  /* =======================================================
     SUBMIT QUIZ
  ======================================================= */

  function submitQuiz() {
    if (isSubmitting) return;

    setIsSubmitting(true);

    let correct = 0;

    levelData.questions.forEach(
      (item, index) => {
        if (
          answers[index] === item.answer
        ) {
          correct++;
        }
      }
    );

    const total =
      levelData.questions.length;

    const wrong = total - correct;

    const score = Math.round(
      (correct / total) * 100
    );

    /*
      60% or more = level passed
    */
    const passed = score >= 60;

    const newResult: QuizResult = {
      level: currentLevel,
      difficulty: levelData.difficulty,
      total,
      correct,
      wrong,
      score,
      passed,
    };

    setResult(newResult);

    /*
      Level complete असल्यास पुढचा level unlock
    */
    if (passed) {
      setCompletedLevels((previous) => {
        const updated = previous.includes(
          currentLevel
        )
          ? previous
          : [...previous, currentLevel];

        localStorage.setItem(
          "quizProgress",
          JSON.stringify(updated)
        );

        return updated;
      });
    }

    localStorage.setItem(
      "quizResult",
      JSON.stringify(newResult)
    );

    setScreen("result");
  }

  /* =======================================================
     NEXT LEVEL
  ======================================================= */

  function nextLevel() {
    if (currentLevel >= 100) {
      return;
    }

    const next = currentLevel + 1;

    if (!completedLevels.includes(currentLevel)) {
      return;
    }

    startLevel(next);
  }

  /* =======================================================
     TIMER FORMAT
  ======================================================= */

  const minutes = Math.floor(
    timeLeft / 60
  )
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  /* =======================================================
     START SCREEN
  ======================================================= */

  if (screen === "start") {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <Background />

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
            <Logo />

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
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl text-center"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 ring-1 ring-indigo-500/20">
              <Trophy size={45} />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-indigo-400">
              Quiz Master
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-6xl">
              Test Your
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Knowledge
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Complete 100 levels from Easy to
              Expert. Pass each level to unlock
              the next challenge.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["1–25", "Easy"],
                ["26–50", "Medium"],
                ["51–75", "Hard"],
                ["76–100", "Expert"],
              ].map(([range, title]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <p className="text-lg font-black text-white">
                    {range}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={startGame}
              className="group mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:scale-[1.01]"
            >
              Start Quiz
              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =======================================================
     LEVEL SCREEN
  ======================================================= */

  if (screen === "levels") {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <Background />

        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
            <Logo />

            <Link
              href="/student/dashboard"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-5xl px-5 py-10">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
              Choose Your Challenge
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Quiz Levels
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Complete a level with 60% or more
              to unlock the next one.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {levels.map((level) => {
              const unlocked =
                level.level === 1 ||
                completedLevels.includes(
                  level.level - 1
                );

              const completed =
                completedLevels.includes(
                  level.level
                );

              return (
                <motion.button
                  key={level.level}
                  type="button"
                  whileHover={
                    unlocked
                      ? { scale: 1.03 }
                      : {}
                  }
                  onClick={() =>
                    startLevel(level.level)
                  }
                  disabled={!unlocked}
                  className={`relative min-h-[135px] overflow-hidden rounded-2xl border p-4 text-left transition ${
                    unlocked
                      ? completed
                        ? "border-green-500/30 bg-green-500/[0.08]"
                        : "border-indigo-500/30 bg-indigo-500/[0.08] hover:border-indigo-500/60"
                      : "cursor-not-allowed border-white/10 bg-white/[0.025] opacity-50"
                  }`}
                >
                  {completed && (
                    <div className="absolute right-3 top-3 text-green-400">
                      <CheckCircle2 size={18} />
                    </div>
                  )}

                  {!unlocked && (
                    <div className="absolute right-3 top-3 text-gray-600">
                      <Lock size={17} />
                    </div>
                  )}

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                      unlocked
                        ? "bg-indigo-500 text-white"
                        : "bg-white/10 text-gray-600"
                    }`}
                  >
                    {level.level}
                  </div>

                  <p className="mt-4 text-sm font-bold">
                    Level {level.level}
                  </p>

                  <p
                    className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${
                      level.difficulty ===
                      "Easy"
                        ? "text-green-400"
                        : level.difficulty ===
                          "Medium"
                        ? "text-yellow-400"
                        : level.difficulty ===
                          "Hard"
                        ? "text-orange-400"
                        : "text-red-400"
                    }`}
                  >
                    {level.difficulty}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     RESULT SCREEN
  ======================================================= */

  if (screen === "result" && result) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <Background />

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
            <Logo />

            <button
              type="button"
              onClick={() =>
                setScreen("levels")
              }
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              All Levels
            </button>
          </div>
        </header>

        <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-2xl sm:p-10"
          >
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${
                result.passed
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {result.passed ? (
                <Trophy size={38} />
              ) : (
                <RotateCcw size={38} />
              )}
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
              Level {result.level}
            </p>

            <h1 className="mt-2 text-3xl font-black">
              {result.passed
                ? "Level Complete!"
                : "Level Not Passed"}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {result.difficulty} Difficulty
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <ResultBox
                value={result.correct}
                label="Correct"
              />

              <ResultBox
                value={result.wrong}
                label="Wrong"
              />

              <ResultBox
                value={`${result.score}%`}
                label="Score"
              />
            </div>

            {result.passed ? (
              <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-green-400">
                  <Star size={17} />
                  Level {result.level + 1 <= 100
                    ? result.level + 1
                    : "100+"}{" "}
                  Unlocked
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4 text-sm text-gray-500">
                You need at least{" "}
                <span className="font-bold text-white">
                  60%
                </span>{" "}
                to unlock the next level.
              </div>
            )}

            <div className="mt-6 grid gap-3">
              {result.passed &&
              result.level < 100 ? (
                <button
                  type="button"
                  onClick={nextLevel}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white transition hover:scale-[1.01]"
                >
                  Next Level
                  <ArrowRight size={19} />
                </button>
              ) : result.level === 100 &&
                result.passed ? (
                <div className="rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 font-bold text-yellow-400">
                  🏆 Congratulations! You completed
                  all 100 levels!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    startLevel(result.level)
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white"
                >
                  <RotateCcw size={18} />
                  Try Again
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setScreen("levels")
                }
                className="rounded-2xl border border-white/10 px-6 py-4 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                View All Levels
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =======================================================
     QUIZ SCREEN
  ======================================================= */

  const selectedAnswer =
    answers[currentQuestion];

  const answeredCount =
    Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) /
      levelData.questions.length) *
    100;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Background />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Logo />

          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${
              timeLeft <= 60
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
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-indigo-400">
                LEVEL {currentLevel}
              </p>

              <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                {levelData.difficulty} Quiz
              </h1>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-400">
              <span className="font-bold text-white">
                {answeredCount}
              </span>{" "}
              / {levelData.questions.length}{" "}
              answered
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 font-black text-indigo-400">
                {currentQuestion + 1}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Question
                </p>

                <p className="text-sm font-semibold text-gray-400">
                  {currentQuestion + 1} of{" "}
                  {levelData.questions.length}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-bold text-gray-500">
              Level {currentLevel}
            </div>
          </div>

          <h2 className="mt-8 text-xl font-bold leading-8 sm:text-2xl">
            {question.question}
          </h2>

          <div className="mt-8 grid gap-3">
            {question.options.map(
              (option, index) => {
                const selected =
                  selectedAnswer === index;

                return (
                  <button
                    key={`${option}-${index}`}
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

            {currentQuestion ===
            levelData.questions.length - 1 ? (
              <button
                type="button"
                onClick={submitQuiz}
                disabled={
                  isSubmitting ||
                  selectedAnswer === undefined
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trophy size={17} />
                Submit Level
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                disabled={
                  selectedAnswer === undefined
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next Question
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </motion.div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">
              Questions
            </h3>

            <p className="text-xs text-gray-500">
              {answeredCount} answered
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {levelData.questions.map(
              (_, index) => {
                const answered =
                  answers[index] !== undefined;

                const active =
                  currentQuestion === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setCurrentQuestion(
                        index
                      )
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
            You have 15 minutes to complete
            this level. The quiz will be
            automatically submitted when the
            timer reaches zero.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   LOGO
========================================================= */

function Logo() {
  return (
    <Link
      href="/student/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
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
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />

      <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px]" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
    </div>
  );
}

/* =========================================================
   RESULT BOX
========================================================= */

function ResultBox({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-600">
        {label}
      </p>
    </div>
  );
}
