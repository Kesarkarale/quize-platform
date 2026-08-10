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
  RotateCcw,
  Star,
  Crown,
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

type LevelResult = {
  level: number;
  correct: number;
  total: number;
  score: number;
};

const TOTAL_LEVELS = 100;
const QUESTIONS_PER_LEVEL = 5;
const TIME_PER_LEVEL = 5 * 60;

/* =========================================================
   GK QUESTION BANK
========================================================= */

const gkQuestions: Question[] = [
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
    question: "What is the chemical formula of water?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: 1,
  },
  {
    id: 12,
    question: "Which organ pumps blood throughout the human body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    answer: 2,
  },
  {
    id: 13,
    question: "What gas do plants absorb during photosynthesis?",
    options: [
      "Oxygen",
      "Nitrogen",
      "Carbon Dioxide",
      "Hydrogen",
    ],
    answer: 2,
  },
  {
    id: 14,
    question: "What is the nearest star to Earth?",
    options: ["Moon", "Sun", "Sirius", "Polaris"],
    answer: 1,
  },
  {
    id: 15,
    question: "How many bones are there in an adult human body?",
    options: ["196", "206", "216", "226"],
    answer: 1,
  },
  {
    id: 16,
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
    id: 17,
    question: "Which part of a plant carries out photosynthesis?",
    options: ["Root", "Stem", "Leaf", "Flower"],
    answer: 2,
  },
  {
    id: 18,
    question: "What force keeps us on the ground?",
    options: [
      "Magnetism",
      "Gravity",
      "Friction",
      "Electricity",
    ],
    answer: 1,
  },
  {
    id: 19,
    question: "Which is the largest mammal in the world?",
    options: [
      "Elephant",
      "Giraffe",
      "Blue Whale",
      "Hippopotamus",
    ],
    answer: 2,
  },
  {
    id: 20,
    question: "Which bird is known for its ability to mimic human speech?",
    options: ["Eagle", "Parrot", "Penguin", "Ostrich"],
    answer: 1,
  },
  {
    id: 21,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    id: 22,
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "CSS", "Python", "SQL"],
    answer: 1,
  },
  {
    id: 23,
    question: "Which company developed the Android operating system?",
    options: ["Microsoft", "Apple", "Google", "IBM"],
    answer: 2,
  },
  {
    id: 24,
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
    id: 25,
    question: "Which language is commonly used with React?",
    options: ["JavaScript", "SQL", "PHP", "C"],
    answer: 0,
  },
  {
    id: 26,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Program Integration",
      "Application Process Internet",
      "Automated Programming Interface",
    ],
    answer: 0,
  },
  {
    id: 27,
    question: "Which planet is closest to the Sun?",
    options: ["Earth", "Mercury", "Venus", "Mars"],
    answer: 1,
  },
  {
    id: 28,
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    answer: 1,
  },
  {
    id: 29,
    question: "What is 12 × 8?",
    options: ["86", "96", "108", "112"],
    answer: 1,
  },
  {
    id: 30,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    answer: 2,
  },
  {
    id: 31,
    question: "What is 25% of 200?",
    options: ["25", "40", "50", "75"],
    answer: 2,
  },
  {
    id: 32,
    question: "What is 15 + 27?",
    options: ["40", "41", "42", "43"],
    answer: 2,
  },
  {
    id: 33,
    question: "What is the national flower of India?",
    options: ["Rose", "Lotus", "Lily", "Sunflower"],
    answer: 1,
  },
  {
    id: 34,
    question: "Which is the national bird of India?",
    options: ["Parrot", "Peacock", "Eagle", "Sparrow"],
    answer: 1,
  },
  {
    id: 35,
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Godavari", "Ganga", "Narmada"],
    answer: 2,
  },
  {
    id: 36,
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
    id: 37,
    question: "Which is the smallest continent?",
    options: ["Europe", "Australia", "Asia", "Africa"],
    answer: 1,
  },
  {
    id: 38,
    question: "Which is the largest continent?",
    options: ["Africa", "Europe", "Asia", "North America"],
    answer: 2,
  },
  {
    id: 39,
    question: "How many colors are there in a rainbow?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    id: 40,
    question: "Which instrument is used to measure temperature?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Compass"],
    answer: 1,
  },
  {
    id: 41,
    question: "Which instrument is used to measure atmospheric pressure?",
    options: ["Barometer", "Thermometer", "Compass", "Ammeter"],
    answer: 0,
  },
  {
    id: 42,
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Gold", "Mercury", "Silver"],
    answer: 2,
  },
  {
    id: 43,
    question: "What is the boiling point of water at sea level?",
    options: ["50°C", "75°C", "100°C", "150°C"],
    answer: 2,
  },
  {
    id: 44,
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: 3,
  },
  {
    id: 45,
    question: "Which is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Silver"],
    answer: 2,
  },
  {
    id: 46,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "Thailand"],
    answer: 1,
  },
  {
    id: 47,
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
    id: 48,
    question: "Which is the largest hot desert in the world?",
    options: [
      "Sahara Desert",
      "Gobi Desert",
      "Kalahari Desert",
      "Thar Desert",
    ],
    answer: 0,
  },
  {
    id: 49,
    question: "How many players are there in a cricket team?",
    options: ["9", "10", "11", "12"],
    answer: 2,
  },
  {
    id: 50,
    question: "How many players are there in a football team on the field?",
    options: ["9", "10", "11", "12"],
    answer: 2,
  },
  {
    id: 51,
    question: "Which sport uses a shuttlecock?",
    options: ["Tennis", "Badminton", "Cricket", "Hockey"],
    answer: 1,
  },
  {
    id: 52,
    question: "How many rings are there in the Olympic symbol?",
    options: ["4", "5", "6", "7"],
    answer: 1,
  },
  {
    id: 53,
    question: "Which country hosted the first modern Olympic Games?",
    options: ["France", "Greece", "Italy", "USA"],
    answer: 1,
  },
  {
    id: 54,
    question: "Which is the largest ocean on Earth?",
    options: [
      "Atlantic",
      "Indian",
      "Pacific",
      "Arctic",
    ],
    answer: 2,
  },
  {
    id: 55,
    question: "Which planet has the most prominent ring system?",
    options: ["Mars", "Saturn", "Earth", "Venus"],
    answer: 1,
  },
  {
    id: 56,
    question: "What is the center of an atom called?",
    options: ["Electron", "Nucleus", "Proton", "Shell"],
    answer: 1,
  },
  {
    id: 57,
    question: "Which particle has a negative charge?",
    options: ["Proton", "Neutron", "Electron", "Nucleus"],
    answer: 2,
  },
  {
    id: 58,
    question: "Which particle has no electrical charge?",
    options: ["Electron", "Proton", "Neutron", "Ion"],
    answer: 2,
  },
  {
    id: 59,
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: 1,
  },
  {
    id: 60,
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Watt", "Ampere", "Ohm"],
    answer: 2,
  },
  {
    id: 61,
    question: "Which organ is responsible for breathing?",
    options: ["Heart", "Lungs", "Kidney", "Stomach"],
    answer: 1,
  },
  {
    id: 62,
    question: "Which organ filters waste from the blood?",
    options: ["Heart", "Liver", "Kidney", "Lungs"],
    answer: 2,
  },
  {
    id: 63,
    question: "Which is the largest organ of the human body?",
    options: ["Heart", "Skin", "Liver", "Brain"],
    answer: 1,
  },
  {
    id: 64,
    question: "How many chambers does the human heart have?",
    options: ["2", "3", "4", "5"],
    answer: 2,
  },
  {
    id: 65,
    question: "Which blood cells fight infections?",
    options: [
      "Red blood cells",
      "White blood cells",
      "Platelets",
      "Plasma",
    ],
    answer: 1,
  },
  {
    id: 66,
    question: "Which vitamin is commonly associated with citrus fruits?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin K"],
    answer: 2,
  },
  {
    id: 67,
    question: "Which gas do humans need for respiration?",
    options: [
      "Carbon dioxide",
      "Oxygen",
      "Nitrogen",
      "Hydrogen",
    ],
    answer: 1,
  },
  {
    id: 68,
    question: "Which is the largest internal organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Kidney"],
    answer: 1,
  },
  {
    id: 69,
    question: "What is the study of plants called?",
    options: ["Zoology", "Botany", "Geology", "Ecology"],
    answer: 1,
  },
  {
    id: 70,
    question: "What is the study of animals called?",
    options: ["Botany", "Zoology", "Physics", "Astronomy"],
    answer: 1,
  },
  {
    id: 71,
    question: "Which is the closest planet to Earth in size?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    answer: 1,
  },
  {
    id: 72,
    question: "Which planet is famous for its Great Red Spot?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    answer: 1,
  },
  {
    id: 73,
    question: "How many planets are in our solar system?",
    options: ["7", "8", "9", "10"],
    answer: 1,
  },
  {
    id: 74,
    question: "What is Earth's natural satellite?",
    options: ["Sun", "Moon", "Mars", "Venus"],
    answer: 1,
  },
  {
    id: 75,
    question: "What causes day and night on Earth?",
    options: [
      "Earth's rotation",
      "Earth's revolution",
      "Moon's rotation",
      "Sun's movement",
    ],
    answer: 0,
  },
  {
    id: 76,
    question: "What causes seasons on Earth?",
    options: [
      "Earth's tilt and revolution",
      "Moon's movement",
      "Sun's rotation",
      "Ocean currents",
    ],
    answer: 0,
  },
  {
    id: 77,
    question: "Which country is famous for the Great Wall?",
    options: ["Japan", "China", "India", "Mongolia"],
    answer: 1,
  },
  {
    id: 78,
    question: "Where are the pyramids of Giza located?",
    options: ["India", "Egypt", "Mexico", "Greece"],
    answer: 1,
  },
  {
    id: 79,
    question: "Which city is known as the City of Canals?",
    options: ["Rome", "Venice", "Paris", "London"],
    answer: 1,
  },
  {
    id: 80,
    question: "Which country is shaped like a boot?",
    options: ["France", "Italy", "Spain", "Portugal"],
    answer: 1,
  },
  {
    id: 81,
    question: "Which is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Dollar"],
    answer: 2,
  },
  {
    id: 82,
    question: "Which is the currency of the United Kingdom?",
    options: ["Euro", "Pound Sterling", "Dollar", "Franc"],
    answer: 1,
  },
  {
    id: 83,
    question: "Which is the currency of India?",
    options: ["Rupee", "Dollar", "Pound", "Euro"],
    answer: 0,
  },
  {
    id: 84,
    question: "What is the capital of France?",
    options: ["Madrid", "Paris", "Rome", "Berlin"],
    answer: 1,
  },
  {
    id: 85,
    question: "What is the capital of Japan?",
    options: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
    answer: 1,
  },
  {
    id: 86,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: 2,
  },
  {
    id: 87,
    question: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    answer: 1,
  },
  {
    id: 88,
    question: "What is the capital of Germany?",
    options: ["Munich", "Berlin", "Hamburg", "Frankfurt"],
    answer: 1,
  },
  {
    id: 89,
    question: "Which language has the most native speakers worldwide?",
    options: ["English", "Hindi", "Mandarin Chinese", "Spanish"],
    answer: 2,
  },
  {
    id: 90,
    question: "Which is the largest country by land area?",
    options: ["Canada", "China", "Russia", "USA"],
    answer: 2,
  },
  {
    id: 91,
    question: "Which is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "Malta", "Singapore"],
    answer: 1,
  },
  {
    id: 92,
    question: "Which mountain is the highest above sea level?",
    options: [
      "K2",
      "Mount Everest",
      "Kangchenjunga",
      "Lhotse",
    ],
    answer: 1,
  },
  {
    id: 93,
    question: "Which is the longest river in the world according to common geographic references?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: 1,
  },
  {
    id: 94,
    question: "Which continent is known as the Dark Continent?",
    options: ["Asia", "Africa", "Europe", "Australia"],
    answer: 1,
  },
  {
    id: 95,
    question: "Which animal is known as the Ship of the Desert?",
    options: ["Horse", "Camel", "Elephant", "Donkey"],
    answer: 1,
  },
  {
    id: 96,
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Leopard"],
    answer: 1,
  },
  {
    id: 97,
    question: "Which is the largest land animal?",
    options: ["Giraffe", "African Elephant", "Rhino", "Hippopotamus"],
    answer: 1,
  },
  {
    id: 98,
    question: "Which animal is famous for changing its color?",
    options: ["Chameleon", "Tiger", "Zebra", "Panda"],
    answer: 0,
  },
  {
    id: 99,
    question: "Which insect produces honey?",
    options: ["Ant", "Butterfly", "Honeybee", "Mosquito"],
    answer: 2,
  },
  {
    id: 100,
    question: "Which animal is the fastest in the world?",
    options: ["Cheetah", "Horse", "Lion", "Wolf"],
    answer: 0,
  },
];

/* =========================================================
   CREATE 100 LEVELS
   Each level contains 5 questions.
========================================================= */

function getLevelQuestions(level: number): Question[] {
  const start = ((level - 1) * QUESTIONS_PER_LEVEL) % gkQuestions.length;

  const result: Question[] = [];

  for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
    const question =
      gkQuestions[(start + i) % gkQuestions.length];

    result.push({
      ...question,
      id: i + 1,
    });
  }

  return result;
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

  const requestedLevel = Number(
    searchParams.get("level") || "1"
  );

  const [unlockedLevel, setUnlockedLevel] =
    useState(1);

  const [selectedLevel, setSelectedLevel] =
    useState(requestedLevel);

  const [quizStarted, setQuizStarted] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<number, number>>({});

  const [timeLeft, setTimeLeft] =
    useState(TIME_PER_LEVEL);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [levelComplete, setLevelComplete] =
    useState(false);

  const [levelResult, setLevelResult] =
    useState<LevelResult | null>(null);

  /* =========================================================
     LOAD PROGRESS
  ========================================================= */

  useEffect(() => {
    const saved =
      localStorage.getItem("quizUnlockedLevel");

    if (saved) {
      const value = Number(saved);

      if (
        Number.isFinite(value) &&
        value >= 1 &&
        value <= TOTAL_LEVELS
      ) {
        setUnlockedLevel(value);
      }
    }
  }, []);

  /* =========================================================
     SAVE UNLOCKED LEVEL
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "quizUnlockedLevel",
      String(unlockedLevel)
    );
  }, [unlockedLevel]);

  /* =========================================================
     CURRENT LEVEL QUESTIONS
  ========================================================= */

  const questions = useMemo(
    () => getLevelQuestions(selectedLevel),
    [selectedLevel]
  );

  const question =
    questions[currentQuestion];

  /* =========================================================
     START LEVEL
  ========================================================= */

  function startLevel(level: number) {
    if (level > unlockedLevel) return;

    setSelectedLevel(level);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(TIME_PER_LEVEL);
    setIsSubmitting(false);
    setLevelComplete(false);
    setLevelResult(null);
    setQuizStarted(true);
  }

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (
      !quizStarted ||
      isSubmitting ||
      levelComplete
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
  }, [
    quizStarted,
    isSubmitting,
    levelComplete,
  ]);

  /* =========================================================
     AUTO SUBMIT
  ========================================================= */

  useEffect(() => {
    if (
      quizStarted &&
      timeLeft === 0 &&
      !isSubmitting &&
      !levelComplete
    ) {
      submitQuiz();
    }
  }, [
    timeLeft,
    quizStarted,
    isSubmitting,
    levelComplete,
  ]);

  /* =========================================================
     TIMER FORMAT
  ========================================================= */

  const minutes = Math.floor(
    timeLeft / 60
  )
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  /* =========================================================
     SELECT ANSWER
  ========================================================= */

  function selectAnswer(index: number) {
    if (!question || isSubmitting) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: index,
    }));
  }

  /* =========================================================
     NEXT QUESTION
  ========================================================= */

  function nextQuestion() {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  }

  /* =========================================================
     PREVIOUS QUESTION
  ========================================================= */

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  }

  /* =========================================================
     SUBMIT LEVEL
  ========================================================= */

  function submitQuiz() {
    if (isSubmitting) return;

    setIsSubmitting(true);

    let correct = 0;

    questions.forEach((item) => {
      if (
        answers[item.id] ===
        item.answer
      ) {
        correct++;
      }
    });

    const score = Math.round(
      (correct / questions.length) *
        100
    );

    const result: LevelResult = {
      level: selectedLevel,
      correct,
      total: questions.length,
      score,
    };

    setLevelResult(result);

    /* Save level result */

    const previousResults =
      JSON.parse(
        localStorage.getItem(
          "quizLevelResults"
        ) || "{}"
      );

    previousResults[
      String(selectedLevel)
    ] = result;

    localStorage.setItem(
      "quizLevelResults",
      JSON.stringify(previousResults)
    );

    /* Unlock next level */

    if (
      selectedLevel === unlockedLevel &&
      selectedLevel < TOTAL_LEVELS
    ) {
      setUnlockedLevel(
        selectedLevel + 1
      );
    }

    setLevelComplete(true);
  }

  /* =========================================================
     LEVEL SELECT SCREEN
  ========================================================= */

  if (!quizStarted) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        {/* Background */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[140px]" />

          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[130px]" />
        </div>

        {/* Header */}

        <header className="relative z-20 border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl">
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

        {/* Content */}

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-10">
          {/* Hero */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 ring-1 ring-indigo-500/20">
              <Trophy size={38} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
              Quiz Challenge
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              GK
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Master
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Complete all 100 levels and become
              the ultimate Quiz Master.
            </p>
          </motion.div>

          {/* Stats */}

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
              <p className="text-2xl font-black text-white">
                100
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Levels
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
              <p className="text-2xl font-black text-white">
                5
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Questions / Level
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
              <p className="text-2xl font-black text-white">
                {unlockedLevel}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Current Level
              </p>
            </div>
          </div>

          {/* Level Grid */}

          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">
                  Choose Level
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Complete a level to unlock
                  the next one.
                </p>
              </div>

              <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs font-bold text-green-400">
                {unlockedLevel - 1} Completed
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
              {Array.from(
                { length: TOTAL_LEVELS },
                (_, index) => {
                  const level =
                    index + 1;

                  const locked =
                    level >
                    unlockedLevel;

                  const completed =
                    level <
                    unlockedLevel;

                  return (
                    <motion.button
                      key={level}
                      whileHover={
                        !locked
                          ? {
                              scale: 1.05,
                            }
                          : undefined
                      }
                      whileTap={
                        !locked
                          ? {
                              scale: 0.95,
                            }
                          : undefined
                      }
                      type="button"
                      disabled={locked}
                      onClick={() =>
                        startLevel(level)
                      }
                      className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm font-black transition ${
                        locked
                          ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-gray-700"
                          : completed
                          ? "border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "border-indigo-500/40 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 text-white shadow-lg shadow-indigo-500/5"
                      }`}
                    >
                      {locked ? (
                        <Lock size={16} />
                      ) : completed ? (
                        <CheckCircle2
                          size={16}
                        />
                      ) : (
                        <Star
                          size={16}
                          className="text-indigo-400"
                        />
                      )}

                      <span className="mt-1">
                        {level}
                      </span>
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     LEVEL COMPLETE SCREEN
  ========================================================= */

  if (levelComplete && levelResult) {
    const passed =
      levelResult.score >= 60;

    const hasNextLevel =
      selectedLevel <
      TOTAL_LEVELS;

    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-2xl sm:p-10"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 text-yellow-400 ring-1 ring-yellow-400/20">
              {selectedLevel ===
              TOTAL_LEVELS ? (
                <Crown size={48} />
              ) : (
                <Trophy size={45} />
              )}
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
              {selectedLevel ===
              TOTAL_LEVELS
                ? "Quiz Master"
                : "Level Complete"}
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Level {selectedLevel}
            </h1>

            <p className="mt-2 text-gray-500">
              {selectedLevel ===
              TOTAL_LEVELS
                ? "Amazing! You completed all 100 levels."
                : passed
                ? "Excellent! The next level is unlocked."
                : "Level completed. Keep improving your score!"}
            </p>

            {/* Score */}

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-5xl font-black">
                {levelResult.score}%
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Your Score
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-500/10 p-4">
                  <p className="text-2xl font-black text-green-400">
                    {levelResult.correct}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Correct
                  </p>
                </div>

                <div className="rounded-xl bg-red-500/10 p-4">
                  <p className="text-2xl font-black text-red-400">
                    {levelResult.total -
                      levelResult.correct}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Wrong
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  startLevel(
                    selectedLevel
                  )
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 font-bold text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw size={17} />
                Play Again
              </button>

              {hasNextLevel ? (
                <button
                  type="button"
                  onClick={() =>
                    startLevel(
                      selectedLevel + 1
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 font-bold text-white transition hover:scale-[1.01]"
                >
                  Level{" "}
                  {selectedLevel + 1}
                  <ArrowRight size={17} />
                </button>
              ) : (
                <Link
                  href="/student/dashboard"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-3 font-bold text-white"
                >
                  <Crown size={17} />
                  Finish
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setQuizStarted(false);
                setLevelComplete(false);
              }}
              className="mt-5 text-xs font-semibold text-gray-600 transition hover:text-gray-300"
            >
              Back to Levels
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     QUIZ SCREEN
  ========================================================= */

  const answeredCount =
    Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  const selectedAnswer =
    question
      ? answers[question.id]
      : undefined;

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
            <button
              type="button"
              onClick={() => {
                setQuizStarted(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-xs text-indigo-400">
                GK MASTER
              </p>

              <h1 className="font-black">
                Level {selectedLevel}
              </h1>
            </div>
          </div>

          {/* Timer */}

          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${
              timeLeft <= 30
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : timeLeft <= 60
                ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
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
              <p className="text-sm font-semibold text-indigo-400">
                Level {selectedLevel}
              </p>

              <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                GK Challenge
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
              transition={{
                duration: 0.25,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>
        </div>

        {/* Question Card */}

        {question && (
          <motion.div
            key={`${selectedLevel}-${question.id}`}
            initial={{
              opacity: 0,
              x: 20,
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
            {/* Question Number */}

            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-black text-indigo-400">
                  {currentQuestion +
                    1}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600">
                    Question
                  </p>

                  <p className="text-sm font-semibold text-gray-400">
                    {currentQuestion +
                      1}{" "}
                    of{" "}
                    {questions.length}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-400">
                Level{" "}
                {selectedLevel}
              </div>
            </div>

            {/* Question */}

            <h3 className="max-w-3xl text-xl font-bold leading-8 sm:text-2xl">
              {question.question}
            </h3>

            {/* Options */}

            <div className="mt-8 grid gap-3">
              {question.options.map(
                (
                  option,
                  index
                ) => {
                  const selected =
                    selectedAnswer ===
                    index;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        selectAnswer(
                          index
                        )
                      }
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/5"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${
                          selected
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : "border-white/10 bg-white/[0.03] text-gray-500"
                        }`}
                      >
                        {String.fromCharCode(
                          65 +
                            index
                        )}
                      </div>

                      <span
                        className={`font-medium ${
                          selected
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {
                          option
                        }
                      </span>

                      {selected && (
                        <CheckCircle2
                          size={
                            20
                          }
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
                onClick={
                  previousQuestion
                }
                disabled={
                  currentQuestion ===
                  0
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft
                  size={17}
                />
                Previous
              </button>

              {currentQuestion ===
              questions.length -
                1 ? (
                <button
                  type="button"
                  onClick={
                    submitQuiz
                  }
                  disabled={
                    isSubmitting
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trophy
                    size={17}
                  />

                  {isSubmitting
                    ? "Checking..."
                    : "Complete Level"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={
                    nextQuestion
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01]"
                >
                  Next Question
                  <ArrowRight
                    size={17}
                  />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Question Navigator */}

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
            {questions.map(
              (item, index) => {
                const answered =
                  answers[
                    item.id
                  ] !== undefined;

                const active =
                  currentQuestion ===
                  index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setCurrentQuestion(
                        index
                      )
                    }
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold transition ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
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
            This level has a 5-minute
            timer. When the timer reaches
            zero, the level will be
            submitted automatically.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   LOADING SCREEN
========================================================= */

function QuizLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
          <Brain size={25} />
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-500">
          Loading Quiz Master...
        </p>
      </div>
    </main>
  );
}
