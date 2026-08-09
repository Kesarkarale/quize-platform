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
  Flag,
  Trophy,
  XCircle,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================
   TYPES
========================================= */

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
};

/* =========================================
   QUESTIONS
========================================= */

const questionBank: Record<string, Question[]> = {
  "General Knowledge": [
    {
      id: 1,
      question: "What is the capital city of India?",
      options: [
        "Mumbai",
        "New Delhi",
        "Kolkata",
        "Chennai",
      ],
      answer: 1,
    },
    {
      id: 2,
      question:
        "Who is known as the Father of the Nation in India?",
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
      question:
        "Which is the largest planet in our solar system?",
      options: [
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
      ],
      answer: 2,
    },
    {
      id: 4,
      question:
        "Which is the national animal of India?",
      options: [
        "Lion",
        "Tiger",
        "Elephant",
        "Leopard",
      ],
      answer: 1,
    },
    {
      id: 5,
      question:
        "How many continents are there in the world?",
      options: [
        "5",
        "6",
        "7",
        "8",
      ],
      answer: 2,
    },
    {
      id: 6,
      question:
        "Which ocean is the largest?",
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
      question:
        "Which planet is known as the Red Planet?",
      options: [
        "Venus",
        "Mars",
        "Mercury",
        "Neptune",
      ],
      answer: 1,
    },
    {
      id: 8,
      question:
        "Which is the fastest land animal?",
      options: [
        "Lion",
        "Horse",
        "Cheetah",
        "Tiger",
      ],
      answer: 2,
    },
    {
      id: 9,
      question:
        "Which country is famous for the Eiffel Tower?",
      options: [
        "Italy",
        "France",
        "Germany",
        "Spain",
      ],
      answer: 1,
    },
    {
      id: 10,
      question:
        "How many days are there in a leap year?",
      options: [
        "364",
        "365",
        "366",
        "367",
      ],
      answer: 2,
    },
  ],

  Science: [
    {
      id: 1,
      question:
        "What is the chemical formula of water?",
      options: [
        "CO2",
        "H2O",
        "O2",
        "NaCl",
      ],
      answer: 1,
    },
    {
      id: 2,
      question:
        "Which organ pumps blood throughout the human body?",
      options: [
        "Brain",
        "Lungs",
        "Heart",
        "Kidney",
      ],
      answer: 2,
    },
    {
      id: 3,
      question:
        "What gas do plants absorb during photosynthesis?",
      options: [
        "Oxygen",
        "Nitrogen",
        "Carbon Dioxide",
        "Hydrogen",
      ],
      answer: 2,
    },
    {
      id: 4,
      question:
        "What is the nearest star to Earth?",
      options: [
        "Moon",
        "Sun",
        "Sirius",
        "Polaris",
      ],
      answer: 1,
    },
    {
      id: 5,
      question:
        "How many bones are there in an adult human body?",
      options: [
        "196",
        "206",
        "216",
        "226",
      ],
      answer: 1,
    },
  ],

  Technology: [
    {
      id: 1,
      question:
        "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink Text Management Language",
        "Home Tool Markup Language",
      ],
      answer: 0,
    },
    {
      id: 2,
      question:
        "Which language is primarily used for styling web pages?",
      options: [
        "HTML",
        "CSS",
        "Python",
        "SQL",
      ],
      answer: 1,
    },
    {
      id: 3,
      question:
        "Which company developed the Android operating system?",
      options: [
        "Microsoft",
        "Apple",
        "Google",
        "IBM",
      ],
      answer: 2,
    },
    {
      id: 4,
      question:
        "What does CPU stand for?",
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
      question:
        "Which language is used with React?",
      options: [
        "JavaScript",
        "SQL",
        "PHP",
        "C",
      ],
      answer: 0,
    },
  ],

  Mathematics: [
    {
      id: 1,
      question:
        "What is 12 × 8?",
      options: [
        "86",
        "96",
        "108",
        "112",
      ],
      answer: 1,
    },
    {
      id: 2,
      question:
        "What is the square root of 144?",
      options: [
        "10",
        "11",
        "12",
        "14",
      ],
      answer: 2,
    },
    {
      id: 3,
      question:
        "What is 25% of 200?",
      options: [
        "25",
        "40",
        "50",
        "75",
      ],
      answer: 2,
    },
    {
      id: 4,
      question:
        "What is 15 + 27?",
      options: [
        "40",
        "41",
        "42",
        "43",
      ],
      answer: 2,
    },
    {
      id: 5,
      question:
        "What is 100 ÷ 4?",
      options: [
        "20",
        "25",
        "30",
        "40",
      ],
      answer: 1,
    },
  ],
};

/* =========================================
   CATEGORY FALLBACK
========================================= */

const defaultQuestions =
  questionBank["General Knowledge"];

/* =========================================
   QUIZ PAGE
========================================= */

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") ||
    "General Knowledge";

  const questions = useMemo(() => {
    return (
      questionBank[categoryFromUrl] ||
      defaultQuestions
    );
  }, [categoryFromUrl]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  const [timeLeft, setTimeLeft] =
    useState(15 * 60);

  const [submitted, setSubmitted] =
    useState(false);

  const question =
    questions[currentQuestion];

  /* =========================================
     TIMER
  ========================================= */

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  /* =========================================
     FORMAT TIMER
  ========================================= */

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  /* =========================================
     SELECT ANSWER
  ========================================= */

  function selectAnswer(index: number) {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: index,
    }));
  }

  /* =========================================
     NEXT
  ========================================= */

  function nextQuestion() {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
    }
  }

  /* =========================================
     PREVIOUS
  ========================================= */

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (prev) => prev - 1
      );
    }
  }

  /* =========================================
     SUBMIT
  ========================================= */

  function handleSubmit() {
    if (submitted) return;

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });

    const score = Math.round(
      (correct / questions.length) * 100
    );

    const result = {
      category: categoryFromUrl,
      total: questions.length,
      correct,
      wrong:
        questions.length - correct,
      score,
      timeLeft,
      completedAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "quizResult",
      JSON.stringify(result)
    );

    setSubmitted(true);

    router.push("/student/result");
  }

  /* =========================================
     PROGRESS
  ========================================= */

  const answeredCount =
    Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  const selectedAnswer =
    answers[question.id];

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* =====================================
          HEADER
      ===================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          {/* Logo */}

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

          {/* Timer */}

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

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Quiz Info */}

        <div className="mb-7">
          <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-400">
                {categoryFromUrl}
              </p>

              <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                Quiz Challenge
              </h2>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-400">
              <span className="font-bold text-white">
                {answeredCount}
              </span>{" "}
              / {questions.length} answered
            </div>
          </div>

          {/* Progress */}

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>
        </div>

        {/* Question Card */}

        <motion.div
          key={question.id}
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8"
        >
          {/* Question Number */}

          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-black text-indigo-400">
                {currentQuestion + 1}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Question
                </p>

                <p className="text-sm font-semibold text-gray-400">
                  {currentQuestion + 1} of{" "}
                  {questions.length}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
            >
              <Flag size={15} />
              Report
            </button>
          </div>

          {/* Question */}

          <h3 className="max-w-3xl text-xl font-bold leading-8 sm:text-2xl">
            {question.question}
          </h3>

          {/* Options */}

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
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition ${
                        selected
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-white/10 bg-white/[0.03] text-gray-500 group-hover:border-white/20 group-hover:text-gray-300"
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

          {/* Navigation */}

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
            questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/10 transition hover:scale-[1.01]"
              >
                <Trophy size={17} />
                Submit Quiz
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/10 transition hover:scale-[1.01]"
              >
                Next Question
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Question Navigator */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold">
              Questions
            </h4>

            <p className="text-xs text-gray-500">
              {answeredCount} answered
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => {
              const answered =
                answers[q.id] !== undefined;

              const active =
                currentQuestion === index;

              return (
                <button
                  key={q.id}
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
            })}
          </div>
        </div>

        {/* Warning */}

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.04] p-4 text-xs leading-5 text-gray-500">
          <Clock3
            size={16}
            className="mt-0.5 shrink-0 text-yellow-500"
          />

          <p>
            Your quiz will be submitted automatically
            when the timer reaches zero. Make sure you
            answer all questions before time runs out.
          </p>
        </div>
      </div>
    </main>
  );
}
