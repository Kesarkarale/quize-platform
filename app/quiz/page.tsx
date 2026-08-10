"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  Target,
  ChevronRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
TYPES
========================================================= */

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
};

type LevelResult = {
  level: number;
  correct: number;
  total: number;
  score: number;
  completed: boolean;
};

/* =========================================================
QUESTION BANK
========================================================= */

const questionBank: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question: "What is the capital city of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      id: 2,
      question: "Which is the national animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Leopard"],
      answer: 1,
    },
    {
      id: 3,
      question: "How many days are there in a week?",
      options: ["5", "6", "7", "8"],
      answer: 2,
    },
    {
      id: 4,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
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
      question: "Which is the largest ocean?",
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
      question: "Which animal is known as the King of the Jungle?",
      options: ["Tiger", "Lion", "Elephant", "Bear"],
      answer: 1,
    },
    {
      id: 8,
      question: "How many months are there in a year?",
      options: ["10", "11", "12", "13"],
      answer: 2,
    },
    {
      id: 9,
      question: "Which is the fastest land animal?",
      options: ["Horse", "Lion", "Cheetah", "Tiger"],
      answer: 2,
    },
    {
      id: 10,
      question: "Which country is famous for the Eiffel Tower?",
      options: ["Italy", "France", "Germany", "Spain"],
      answer: 1,
    },
  ],

  2: [
    {
      id: 1,
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
      id: 2,
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 2,
    },
    {
      id: 3,
      question: "Which is the smallest continent?",
      options: ["Asia", "Europe", "Australia", "Africa"],
      answer: 2,
    },
    {
      id: 4,
      question: "Which is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Dollar"],
      answer: 2,
    },
    {
      id: 5,
      question: "Which river is known as the longest river in the world?",
      options: ["Amazon", "Nile", "Ganga", "Yangtze"],
      answer: 1,
    },
    {
      id: 6,
      question: "Who wrote the Indian national anthem?",
      options: [
        "Rabindranath Tagore",
        "Bankim Chandra Chatterjee",
        "Sarojini Naidu",
        "Subhash Chandra Bose",
      ],
      answer: 0,
    },
    {
      id: 7,
      question: "Which is the largest desert in the world?",
      options: [
        "Sahara Desert",
        "Gobi Desert",
        "Antarctic Desert",
        "Thar Desert",
      ],
      answer: 2,
    },
    {
      id: 8,
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: 1,
    },
    {
      id: 9,
      question: "How many states are there in India?",
      options: ["26", "27", "28", "29"],
      answer: 2,
    },
    {
      id: 10,
      question: "Which is the highest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
      answer: 1,
    },
  ],

  3: [
    {
      id: 1,
      question: "Who was the first President of India?",
      options: [
        "Dr. Rajendra Prasad",
        "Jawaharlal Nehru",
        "Sardar Patel",
        "Dr. Radhakrishnan",
      ],
      answer: 0,
    },
    {
      id: 2,
      question: "Which Indian city is known as the Pink City?",
      options: ["Delhi", "Jaipur", "Udaipur", "Jodhpur"],
      answer: 1,
    },
    {
      id: 3,
      question: "Which is the largest state of India by area?",
      options: ["Maharashtra", "Rajasthan", "Madhya Pradesh", "Gujarat"],
      answer: 1,
    },
    {
      id: 4,
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
      id: 5,
      question: "Which country gifted the Statue of Liberty to the USA?",
      options: ["Germany", "France", "Italy", "Spain"],
      answer: 1,
    },
    {
      id: 6,
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
      id: 7,
      question: "Who was the first man to walk on the Moon?",
      options: [
        "Buzz Aldrin",
        "Neil Armstrong",
        "Yuri Gagarin",
        "Michael Collins",
      ],
      answer: 1,
    },
    {
      id: 8,
      question: "Which vitamin is mainly obtained from sunlight?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      answer: 3,
    },
    {
      id: 9,
      question: "Which country has the largest population?",
      options: ["USA", "India", "China", "Russia"],
      answer: 1,
    },
    {
      id: 10,
      question: "Which instrument is used to measure temperature?",
      options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
      answer: 1,
    },
  ],

  4: [
    {
      id: 1,
      question: "Who founded the Maurya Empire?",
      options: [
        "Ashoka",
        "Chandragupta Maurya",
        "Bindusara",
        "Samudragupta",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "Which Indian state has the longest coastline?",
      options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Kerala"],
      answer: 2,
    },
    {
      id: 3,
      question: "Who wrote the book 'Discovery of India'?",
      options: [
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "B. R. Ambedkar",
        "Sardar Patel",
      ],
      answer: 1,
    },
    {
      id: 4,
      question: "Which planet has the most prominent ring system?",
      options: ["Mars", "Jupiter", "Saturn", "Neptune"],
      answer: 2,
    },
    {
      id: 5,
      question: "Which is the largest internal organ in the human body?",
      options: ["Heart", "Liver", "Lungs", "Kidney"],
      answer: 1,
    },
    {
      id: 6,
      question: "Which Indian freedom movement was launched in 1942?",
      options: [
        "Non-Cooperation Movement",
        "Civil Disobedience Movement",
        "Quit India Movement",
        "Swadeshi Movement",
      ],
      answer: 2,
    },
    {
      id: 7,
      question: "Which metal is liquid at room temperature?",
      options: ["Iron", "Mercury", "Copper", "Silver"],
      answer: 1,
    },
    {
      id: 8,
      question: "Which is the largest island in the world?",
      options: ["Madagascar", "Greenland", "Borneo", "New Guinea"],
      answer: 1,
    },
    {
      id: 9,
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
      id: 10,
      question: "Which line divides Earth into Northern and Southern Hemispheres?",
      options: [
        "Tropic of Cancer",
        "Prime Meridian",
        "Equator",
        "Tropic of Capricorn",
      ],
      answer: 2,
    },
  ],

  5: [
    {
      id: 1,
      question: "Which Article of the Indian Constitution deals with equality before law?",
      options: ["Article 12", "Article 14", "Article 19", "Article 21"],
      answer: 1,
    },
    {
      id: 2,
      question: "Who was the first woman Prime Minister of India?",
      options: [
        "Sarojini Naidu",
        "Indira Gandhi",
        "Pratibha Patil",
        "Sushma Swaraj",
      ],
      answer: 1,
    },
    {
      id: 3,
      question: "Which is the longest river in India?",
      options: ["Yamuna", "Ganga", "Godavari", "Narmada"],
      answer: 1,
    },
    {
      id: 4,
      question: "Which Indian state is famous for the Hornbill Festival?",
      options: ["Assam", "Nagaland", "Manipur", "Mizoram"],
      answer: 1,
    },
    {
      id: 5,
      question: "Which scientist is associated with the theory of relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Stephen Hawking",
        "Niels Bohr",
      ],
      answer: 1,
    },
    {
      id: 6,
      question: "Which is the hardest natural substance?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      answer: 2,
    },
    {
      id: 7,
      question: "Which Indian city is called the Silicon Valley of India?",
      options: ["Mumbai", "Hyderabad", "Bengaluru", "Pune"],
      answer: 2,
    },
    {
      id: 8,
      question: "Who is known as the Missile Man of India?",
      options: [
        "Homi Bhabha",
        "Vikram Sarabhai",
        "A. P. J. Abdul Kalam",
        "C. V. Raman",
      ],
      answer: 2,
    },
    {
      id: 9,
      question: "Which is the largest freshwater lake in India?",
      options: [
        "Wular Lake",
        "Dal Lake",
        "Chilika Lake",
        "Loktak Lake",
      ],
      answer: 0,
    },
    {
      id: 10,
      question: "Which organ produces insulin?",
      options: ["Liver", "Pancreas", "Kidney", "Heart"],
      answer: 1,
    },
  ],
};

/* =========================================================
CREATE FALLBACK QUESTIONS FOR LEVELS 6-100
========================================================= */

const baseQuestions: Question[] = [
  {
    id: 1,
    question: "Which is the smallest planet in our solar system?",
    options: ["Earth", "Mercury", "Mars", "Venus"],
    answer: 1,
  },
  {
    id: 2,
    question: "Which is the national flower of India?",
    options: ["Rose", "Lotus", "Lily", "Sunflower"],
    answer: 1,
  },
  {
    id: 3,
    question: "Who invented the telephone?",
    options: [
      "Alexander Graham Bell",
      "Thomas Edison",
      "Nikola Tesla",
      "James Watt",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "Which is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: 1,
  },
  {
    id: 5,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "Thailand"],
    answer: 1,
  },
  {
    id: 6,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    answer: 1,
  },
  {
    id: 7,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: 2,
  },
  {
    id: 8,
    question: "Which is the largest continent?",
    options: ["Africa", "Europe", "Asia", "North America"],
    answer: 2,
  },
  {
    id: 9,
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Dollar", "Pound Sterling", "Yen"],
    answer: 2,
  },
  {
    id: 10,
    question: "Which gas is essential for humans to breathe?",
    options: ["Nitrogen", "Oxygen", "Hydrogen", "Carbon Dioxide"],
    answer: 1,
  },
];

function getQuestions(level: number): Question[] {
  if (questionBank[level]) {
    return questionBank[level];
  }

  return baseQuestions.map((question, index) => ({
    ...question,
    id: index + 1,
  }));
}

/* =========================================================
MAIN PAGE
========================================================= */

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizContent />
    </Suspense>
  );
}

/* =========================================================
QUIZ CONTENT
========================================================= */

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category =
    searchParams.get("category") || "General Knowledge";

  /* -------------------------------------------------------
  STATE
  ------------------------------------------------------- */

  const [quizStarted, setQuizStarted] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState<number | null>(
    null
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<number, number>>(
    {}
  );

  const [timeLeft, setTimeLeft] = useState(5 * 60);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [completedLevels, setCompletedLevels] = useState<number[]>(
    []
  );

  /* -------------------------------------------------------
  LOAD COMPLETED LEVELS
  ------------------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(
      "quizCompletedLevels"
    );

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCompletedLevels(parsed);
        }
      } catch {
        setCompletedLevels([]);
      }
    }
  }, []);

  /* -------------------------------------------------------
  CURRENT QUESTIONS
  ------------------------------------------------------- */

  const questions = useMemo(() => {
    if (!selectedLevel) return [];
    return getQuestions(selectedLevel);
  }, [selectedLevel]);

  const question = questions[currentQuestion];

  /* -------------------------------------------------------
  START QUIZ
  ------------------------------------------------------- */

  function startQuiz() {
    setQuizStarted(true);
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setAnswers({});
    setIsSubmitting(false);
  }

  /* -------------------------------------------------------
  START LEVEL
  ------------------------------------------------------- */

  function startLevel(level: number) {
    const previousLevel = level - 1;

    if (
      level !== 1 &&
      !completedLevels.includes(previousLevel)
    ) {
      return;
    }

    setSelectedLevel(level);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(5 * 60);
    setIsSubmitting(false);
  }

  /* -------------------------------------------------------
  TIMER
  ------------------------------------------------------- */

  useEffect(() => {
    if (
      !quizStarted ||
      selectedLevel === null ||
      isSubmitting
    ) {
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
  }, [quizStarted, selectedLevel, isSubmitting]);

  /* -------------------------------------------------------
  AUTO SUBMIT
  ------------------------------------------------------- */

  useEffect(() => {
    if (
      selectedLevel !== null &&
      timeLeft === 0 &&
      !isSubmitting
    ) {
      submitLevel();
    }
  }, [timeLeft, selectedLevel, isSubmitting]);

  /* -------------------------------------------------------
  TIMER FORMAT
  ------------------------------------------------------- */

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  /* -------------------------------------------------------
  SELECT ANSWER
  ------------------------------------------------------- */

  function selectAnswer(index: number) {
    if (!question || isSubmitting) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: index,
    }));
  }

  /* -------------------------------------------------------
  NEXT QUESTION
  ------------------------------------------------------- */

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  }

  /* -------------------------------------------------------
  PREVIOUS QUESTION
  ------------------------------------------------------- */

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  }

  /* -------------------------------------------------------
  SUBMIT LEVEL
  ------------------------------------------------------- */

  function submitLevel() {
    if (
      isSubmitting ||
      selectedLevel === null
    ) {
      return;
    }

    setIsSubmitting(true);

    let correct = 0;

    questions.forEach((item) => {
      if (answers[item.id] === item.answer) {
        correct++;
      }
    });

    const total = questions.length;

    const score =
      total > 0
        ? Math.round((correct / total) * 100)
        : 0;

    const newCompletedLevels = completedLevels.includes(
      selectedLevel
    )
      ? completedLevels
      : [...completedLevels, selectedLevel];

    setCompletedLevels(newCompletedLevels);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "quizCompletedLevels",
        JSON.stringify(newCompletedLevels)
      );

      const result: LevelResult = {
        level: selectedLevel,
        correct,
        total,
        score,
        completed: true,
      };

      localStorage.setItem(
        "quizResult",
        JSON.stringify(result)
      );
    }

    router.push(
      `/student/result?level=${selectedLevel}`
    );
  }

  /* =========================================================
  START SCREEN
  ========================================================= */

  if (!quizStarted) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        {/* Background */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/15 blur-[140px]" />

          <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
        </div>

        {/* Header */}

        <header className="relative z-20 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
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

        {/* Start Content */}

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
            transition={{
              duration: 0.5,
            }}
            className="w-full max-w-2xl"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 ring-1 ring-indigo-500/20">
              <Trophy size={38} />
            </div>

            <div className="mt-7 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
                General Knowledge
              </p>

              <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                Ready to Test
                <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Your Knowledge?
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Complete 100 levels and become the
                ultimate Quiz Master.
              </p>
            </div>

            {/* Start Card */}

            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl">
              <div className="border-b border-white/10 px-6 py-6 sm:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Target size={23} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      100 Level Quiz
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Easy → Medium → Hard → Expert
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/10">
                <div className="p-5 text-center">
                  <p className="text-2xl font-black">
                    100
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Levels
                  </p>
                </div>

                <div className="p-5 text-center">
                  <p className="text-2xl font-black">
                    10
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Questions
                  </p>
                </div>

                <div className="p-5 text-center">
                  <p className="text-2xl font-black">
                    100%
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Max Score
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-6 sm:p-8">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:scale-[1.01]"
                >
                  Start Quiz

                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
  LEVEL SCREEN
  ========================================================= */

  if (selectedLevel === null) {
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

            <button
              type="button"
              onClick={() => setQuizStarted(false)}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-10">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">
              Quiz Progress
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Choose Your Level
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Complete each level to unlock the next one.
            </p>
          </div>

          {/* Progress */}

          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">
                Overall Progress
              </span>

              <span className="text-sm font-bold text-indigo-400">
                {completedLevels.length} / 100
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${completedLevels.length}%`,
                }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </div>

          {/* Levels */}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
            {Array.from(
              { length: 100 },
              (_, index) => index + 1
            ).map((level) => {
              const completed =
                completedLevels.includes(level);

              const unlocked =
                level === 1 ||
                completedLevels.includes(level - 1);

              const difficulty =
                level <= 25
                  ? "Easy"
                  : level <= 50
                  ? "Medium"
                  : level <= 75
                  ? "Hard"
                  : "Expert";

              return (
                <motion.button
                  key={level}
                  type="button"
                  whileHover={
                    unlocked
                      ? { scale: 1.04 }
                      : undefined
                  }
                  whileTap={
                    unlocked
                      ? { scale: 0.96 }
                      : undefined
                  }
                  onClick={() =>
                    unlocked &&
                    startLevel(level)
                  }
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl border transition ${
                    completed
                      ? "border-green-500/30 bg-green-500/10"
                      : unlocked
                      ? "border-indigo-500/30 bg-indigo-500/10 hover:border-indigo-500/60 hover:bg-indigo-500/15"
                      : "cursor-not-allowed border-white/5 bg-white/[0.025] opacity-60"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2
                      size={20}
                      className="absolute right-2 top-2 text-green-400"
                    />
                  ) : !unlocked ? (
                    <Lock
                      size={18}
                      className="absolute right-2 top-2 text-gray-600"
                    />
                  ) : (
                    <Star
                      size={16}
                      className="absolute right-2 top-2 text-indigo-400"
                    />
                  )}

                  <span
                    className={`text-2xl font-black ${
                      completed
                        ? "text-green-400"
                        : unlocked
                        ? "text-indigo-400"
                        : "text-gray-600"
                    }`}
                  >
                    {level}
                  </span>

                  <span className="mt-1 text-[9px] uppercase tracking-wider text-gray-600">
                    {difficulty}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
  QUIZ QUESTION SCREEN
  ========================================================= */

  const answeredCount = Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const selectedAnswer =
    question?.id !== undefined
      ? answers[question.id]
      : undefined;

  const levelDifficulty =
    selectedLevel <= 25
      ? "Easy"
      : selectedLevel <= 50
      ? "Medium"
      : selectedLevel <= 75
      ? "Hard"
      : "Expert";

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
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
                LEVEL {selectedLevel} • {levelDifficulty.toUpperCase()}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${
              timeLeft <= 30
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

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-8">
        {/* Level Info */}

        <div className="mb-7">
          <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
                  LEVEL {selectedLevel}
                </span>

                <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400">
                  {levelDifficulty}
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                General Knowledge
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

        {/* Question */}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedLevel}-${currentQuestion}`}
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8"
          >
            {/* Question Header */}

            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-black text-indigo-400">
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

              <div className="hidden items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 text-xs text-gray-500 sm:flex">
                <Target size={14} />
                Level {selectedLevel}
              </div>
            </div>

            {/* Question */}

            <h3 className="max-w-3xl text-xl font-bold leading-8 sm:text-2xl">
              {question?.question}
            </h3>

            {/* Options */}

            <div className="mt-8 grid gap-3">
              {question?.options.map(
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
                  onClick={submitLevel}
                  disabled={
                    isSubmitting ||
                    selectedAnswer === undefined
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trophy size={17} />

                  {isSubmitting
                    ? "Submitting..."
                    : "Finish Level"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextQuestion}
                  disabled={
                    selectedAnswer === undefined
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next Question
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

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
            {questions.map(
              (item, index) => {
                const answered =
                  answers[item.id] !== undefined;

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

        {/* Warning */}

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.04] p-4 text-xs leading-5 text-gray-500">
          <Clock3
            size={16}
            className="mt-0.5 shrink-0 text-yellow-500"
          />

          <p>
            This level will be submitted automatically
            when the timer reaches zero.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
LOADING
========================================================= */

function QuizLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
          <Brain size={26} />
        </div>

        <p className="mt-4 text-sm font-medium text-gray-500">
          Loading Quiz...
        </p>
      </div>
    </main>
  );
}
