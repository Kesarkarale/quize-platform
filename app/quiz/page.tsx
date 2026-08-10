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
  Flag,
  Lock,
  Trophy,
  XCircle,
  Zap,
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

/* =========================================================
   100 LEVEL GENERAL KNOWLEDGE QUESTION BANK
========================================================= */

const questionBank: Question[] = [
  // =========================
  // EASY — LEVEL 1-25
  // =========================

  {
    id: 1,
    question: "What is the capital city of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    answer: 1,
  },
  {
    id: 2,
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    answer: 1,
  },
  {
    id: 3,
    question: "What is the national bird of India?",
    options: ["Eagle", "Peacock", "Sparrow", "Parrot"],
    answer: 1,
  },
  {
    id: 4,
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Neptune"],
    answer: 1,
  },
  {
    id: 6,
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    id: 7,
    question: "Which is the largest ocean in the world?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: 2,
  },
  {
    id: 8,
    question: "Which animal is known as the fastest land animal?",
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
    question: "Which is the largest continent?",
    options: ["Africa", "Asia", "Europe", "North America"],
    answer: 1,
  },
  {
    id: 13,
    question: "What is the currency of India?",
    options: ["Dollar", "Rupee", "Euro", "Pound"],
    answer: 1,
  },
  {
    id: 14,
    question: "Which festival is known as the Festival of Lights?",
    options: ["Holi", "Diwali", "Eid", "Pongal"],
    answer: 1,
  },
  {
    id: 15,
    question: "Who wrote the Indian national anthem?",
    options: [
      "Mahatma Gandhi",
      "Rabindranath Tagore",
      "Jawaharlal Nehru",
      "Sarojini Naidu",
    ],
    answer: 1,
  },
  {
    id: 16,
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Ganga", "Godavari", "Narmada"],
    answer: 1,
  },
  {
    id: 17,
    question: "Which city is known as the Pink City of India?",
    options: ["Jaipur", "Delhi", "Mumbai", "Pune"],
    answer: 0,
  },
  {
    id: 18,
    question: "Which city is known as the City of Lakes?",
    options: ["Udaipur", "Mumbai", "Kolkata", "Chennai"],
    answer: 0,
  },
  {
    id: 19,
    question: "How many colors are there in a rainbow?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    id: 20,
    question: "Which gas do humans need for breathing?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: 1,
  },
  {
    id: 21,
    question: "What is the boiling point of water at sea level?",
    options: ["50°C", "75°C", "100°C", "120°C"],
    answer: 2,
  },
  {
    id: 22,
    question: "Which organ pumps blood through the human body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    answer: 2,
  },
  {
    id: 23,
    question: "Which is the nearest star to Earth?",
    options: ["Moon", "Sun", "Sirius", "Polaris"],
    answer: 1,
  },
  {
    id: 24,
    question: "How many bones are there in an adult human body?",
    options: ["196", "206", "216", "226"],
    answer: 1,
  },
  {
    id: 25,
    question: "Which is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: 1,
  },

  // =========================
  // MEDIUM — LEVEL 26-50
  // =========================

  {
    id: 26,
    question: "Who was the first President of India?",
    options: [
      "Dr. Rajendra Prasad",
      "Jawaharlal Nehru",
      "Sardar Patel",
      "Dr. B. R. Ambedkar",
    ],
    answer: 0,
  },
  {
    id: 27,
    question: "Who was the first Prime Minister of India?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Sardar Patel",
      "Lal Bahadur Shastri",
    ],
    answer: 1,
  },
  {
    id: 28,
    question: "In which year did India gain independence?",
    options: ["1945", "1946", "1947", "1950"],
    answer: 2,
  },
  {
    id: 29,
    question: "Who is known as the Father of the Indian Constitution?",
    options: [
      "Mahatma Gandhi",
      "Dr. B. R. Ambedkar",
      "Rajendra Prasad",
      "Jawaharlal Nehru",
    ],
    answer: 1,
  },
  {
    id: 30,
    question: "Which is the highest civilian award in India?",
    options: [
      "Padma Shri",
      "Padma Bhushan",
      "Padma Vibhushan",
      "Bharat Ratna",
    ],
    answer: 3,
  },
  {
    id: 31,
    question: "Which Indian state has the longest coastline?",
    options: ["Maharashtra", "Gujarat", "Tamil Nadu", "Kerala"],
    answer: 1,
  },
  {
    id: 32,
    question: "Which is the largest state in India by area?",
    options: ["Maharashtra", "Madhya Pradesh", "Rajasthan", "Uttar Pradesh"],
    answer: 2,
  },
  {
    id: 33,
    question: "Which is the smallest state in India by area?",
    options: ["Goa", "Sikkim", "Tripura", "Manipur"],
    answer: 0,
  },
  {
    id: 34,
    question: "Which Indian city is known as the Silicon Valley of India?",
    options: ["Hyderabad", "Pune", "Bengaluru", "Chennai"],
    answer: 2,
  },
  {
    id: 35,
    question: "Where is the headquarters of the Reserve Bank of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: 1,
  },
  {
    id: 36,
    question: "Which is the largest desert in India?",
    options: ["Thar Desert", "Sahara Desert", "Gobi Desert", "Kalahari Desert"],
    answer: 0,
  },
  {
    id: 37,
    question: "Which mountain range separates India from the Tibetan Plateau?",
    options: ["Alps", "Himalayas", "Andes", "Rockies"],
    answer: 1,
  },
  {
    id: 38,
    question: "Which is the deepest ocean in the world?",
    options: [
      "Indian Ocean",
      "Atlantic Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: 2,
  },
  {
    id: 39,
    question: "Which country gifted the Statue of Liberty to the USA?",
    options: ["Germany", "France", "Italy", "Spain"],
    answer: 1,
  },
  {
    id: 40,
    question: "Who discovered gravity according to the famous apple story?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answer: 1,
  },
  {
    id: 41,
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Stephen Hawking",
      "Galileo Galilei",
    ],
    answer: 1,
  },
  {
    id: 42,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    answer: 1,
  },
  {
    id: 43,
    question: "What is the chemical symbol for silver?",
    options: ["Si", "Ag", "Au", "Sr"],
    answer: 1,
  },
  {
    id: 44,
    question: "Which planet has the most prominent ring system?",
    options: ["Mars", "Earth", "Saturn", "Venus"],
    answer: 2,
  },
  {
    id: 45,
    question: "Which instrument is used to measure atmospheric pressure?",
    options: ["Thermometer", "Barometer", "Hygrometer", "Altimeter"],
    answer: 1,
  },
  {
    id: 46,
    question: "Which instrument measures earthquakes?",
    options: ["Barometer", "Seismograph", "Thermometer", "Compass"],
    answer: 1,
  },
  {
    id: 47,
    question: "Which vitamin is mainly produced by sunlight exposure?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: 3,
  },
  {
    id: 48,
    question: "Which blood group is known as the universal donor?",
    options: ["A+", "B+", "AB+", "O−"],
    answer: 3,
  },
  {
    id: 49,
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Copper", "Aluminium"],
    answer: 1,
  },
  {
    id: 50,
    question: "Which is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: 2,
  },

  // =========================
  // HARD — LEVEL 51-75
  // =========================

  {
    id: 51,
    question: "Who was the first Indian to win a Nobel Prize?",
    options: [
      "C. V. Raman",
      "Rabindranath Tagore",
      "Amartya Sen",
      "Mother Teresa",
    ],
    answer: 1,
  },
  {
    id: 52,
    question: "In which year was the Constitution of India adopted?",
    options: ["1947", "1948", "1949", "1950"],
    answer: 2,
  },
  {
    id: 53,
    question: "When did the Constitution of India come into effect?",
    options: [
      "15 August 1947",
      "26 January 1950",
      "26 November 1949",
      "2 October 1950",
    ],
    answer: 1,
  },
  {
    id: 54,
    question: "Which Article of the Indian Constitution deals with equality before law?",
    options: ["Article 12", "Article 14", "Article 19", "Article 21"],
    answer: 1,
  },
  {
    id: 55,
    question: "Which Article is associated with the Right to Life and Personal Liberty?",
    options: ["Article 14", "Article 19", "Article 21", "Article 32"],
    answer: 2,
  },
  {
    id: 56,
    question: "Who was the first woman President of India?",
    options: [
      "Indira Gandhi",
      "Pratibha Patil",
      "Sarojini Naidu",
      "Sushma Swaraj",
    ],
    answer: 1,
  },
  {
    id: 57,
    question: "Who was the first woman Prime Minister of India?",
    options: [
      "Indira Gandhi",
      "Pratibha Patil",
      "Sarojini Naidu",
      "Vijaya Lakshmi Pandit",
    ],
    answer: 0,
  },
  {
    id: 58,
    question: "Which is the oldest mountain range in India?",
    options: ["Himalayas", "Aravalli Range", "Western Ghats", "Vindhyas"],
    answer: 1,
  },
  {
    id: 59,
    question: "Which Indian river is known as the Sorrow of Bihar?",
    options: ["Ganga", "Kosi", "Yamuna", "Son"],
    answer: 1,
  },
  {
    id: 60,
    question: "Which river is known as the Sorrow of Bengal?",
    options: ["Damodar", "Ganga", "Hooghly", "Teesta"],
    answer: 0,
  },
  {
    id: 61,
    question: "Which is the largest freshwater lake in India?",
    options: [
      "Dal Lake",
      "Wular Lake",
      "Chilika Lake",
      "Loktak Lake",
    ],
    answer: 1,
  },
  {
    id: 62,
    question: "Which is the largest brackish water lagoon in India?",
    options: [
      "Wular Lake",
      "Chilika Lake",
      "Dal Lake",
      "Sambhar Lake",
    ],
    answer: 1,
  },
  {
    id: 63,
    question: "Which Indian state is known as the Land of Rising Sun?",
    options: [
      "Assam",
      "Arunachal Pradesh",
      "Sikkim",
      "Nagaland",
    ],
    answer: 1,
  },
  {
    id: 64,
    question: "Which Indian state is famous for Kaziranga National Park?",
    options: ["Assam", "Kerala", "Gujarat", "Rajasthan"],
    answer: 0,
  },
  {
    id: 65,
    question: "Which national park is famous for Asiatic lions?",
    options: [
      "Jim Corbett",
      "Gir National Park",
      "Kanha National Park",
      "Bandipur",
    ],
    answer: 1,
  },
  {
    id: 66,
    question: "Which planet rotates in the opposite direction to most planets?",
    options: ["Mars", "Venus", "Jupiter", "Neptune"],
    answer: 1,
  },
  {
    id: 67,
    question: "Which planet has the shortest year?",
    options: ["Earth", "Mercury", "Venus", "Mars"],
    answer: 1,
  },
  {
    id: 68,
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Watt", "Ampere", "Ohm"],
    answer: 2,
  },
  {
    id: 69,
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Pascal", "Watt"],
    answer: 1,
  },
  {
    id: 70,
    question: "What is the SI unit of power?",
    options: ["Watt", "Joule", "Newton", "Volt"],
    answer: 0,
  },
  {
    id: 71,
    question: "What is the study of earthquakes called?",
    options: [
      "Seismology",
      "Geology",
      "Meteorology",
      "Ecology",
    ],
    answer: 0,
  },
  {
    id: 72,
    question: "What is the study of birds called?",
    options: [
      "Ornithology",
      "Entomology",
      "Botany",
      "Zoology",
    ],
    answer: 0,
  },
  {
    id: 73,
    question: "What is the study of insects called?",
    options: [
      "Entomology",
      "Ornithology",
      "Ecology",
      "Mycology",
    ],
    answer: 0,
  },
  {
    id: 74,
    question: "What is the study of fungi called?",
    options: [
      "Botany",
      "Mycology",
      "Zoology",
      "Ecology",
    ],
    answer: 1,
  },
  {
    id: 75,
    question: "Which is the largest internal organ in the human body?",
    options: ["Heart", "Liver", "Lungs", "Kidney"],
    answer: 1,
  },

  // =========================
  // EXPERT — LEVEL 76-100
  // =========================

  {
    id: 76,
    question: "Who was the first Indian Governor-General of independent India?",
    options: [
      "Rajendra Prasad",
      "C. Rajagopalachari",
      "Jawaharlal Nehru",
      "Sardar Patel",
    ],
    answer: 1,
  },
  {
    id: 77,
    question: "Who was the first Governor-General of independent India?",
    options: [
      "Lord Mountbatten",
      "C. Rajagopalachari",
      "Warren Hastings",
      "Lord Curzon",
    ],
    answer: 0,
  },
  {
    id: 78,
    question: "Which Act introduced provincial autonomy in British India?",
    options: [
      "Government of India Act 1909",
      "Government of India Act 1919",
      "Government of India Act 1935",
      "Indian Independence Act 1947",
    ],
    answer: 2,
  },
  {
    id: 79,
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
    id: 80,
    question: "Who wrote Arthashastra?",
    options: [
      "Kalidasa",
      "Kautilya",
      "Banabhatta",
      "Panini",
    ],
    answer: 1,
  },
  {
    id: 81,
    question: "Which ancient university was located in present-day Bihar?",
    options: [
      "Takshashila",
      "Nalanda",
      "Vikramashila",
      "Both B and C",
    ],
    answer: 3,
  },
  {
    id: 82,
    question: "Which language is the oldest among the classical languages of India?",
    options: [
      "Hindi",
      "Tamil",
      "Bengali",
      "Marathi",
    ],
    answer: 1,
  },
  {
    id: 83,
    question: "Which Veda is mainly associated with music and chants?",
    options: [
      "Rigveda",
      "Samaveda",
      "Yajurveda",
      "Atharvaveda",
    ],
    answer: 1,
  },
  {
    id: 84,
    question: "Who wrote the epic Ramcharitmanas?",
    options: [
      "Tulsidas",
      "Valmiki",
      "Kalidasa",
      "Kabir",
    ],
    answer: 0,
  },
  {
    id: 85,
    question: "Who wrote the ancient Sanskrit drama Abhijnanasakuntalam?",
    options: [
      "Kalidasa",
      "Tulsidas",
      "Banabhatta",
      "Chanakya",
    ],
    answer: 0,
  },
  {
    id: 86,
    question: "Which is the largest gland in the human body?",
    options: ["Pancreas", "Liver", "Thyroid", "Pituitary"],
    answer: 1,
  },
  {
    id: 87,
    question: "Which part of the brain controls balance and coordination?",
    options: [
      "Cerebrum",
      "Cerebellum",
      "Medulla",
      "Hypothalamus",
    ],
    answer: 1,
  },
  {
    id: 88,
    question: "Which blood cells are mainly responsible for immunity?",
    options: [
      "Red blood cells",
      "White blood cells",
      "Platelets",
      "Plasma",
    ],
    answer: 1,
  },
  {
    id: 89,
    question: "Which molecule carries genetic information?",
    options: ["RNA", "DNA", "ATP", "Glucose"],
    answer: 1,
  },
  {
    id: 90,
    question: "Which gas is primarily responsible for the greenhouse effect among these?",
    options: [
      "Oxygen",
      "Carbon dioxide",
      "Nitrogen",
      "Helium",
    ],
    answer: 1,
  },
  {
    id: 91,
    question: "What is the approximate speed of light in vacuum?",
    options: [
      "3 × 10⁶ m/s",
      "3 × 10⁷ m/s",
      "3 × 10⁸ m/s",
      "3 × 10⁹ m/s",
    ],
    answer: 2,
  },
  {
    id: 92,
    question: "Which particle has a negative electric charge?",
    options: ["Proton", "Neutron", "Electron", "Photon"],
    answer: 2,
  },
  {
    id: 93,
    question: "Which fundamental force is responsible for keeping planets in orbit?",
    options: [
      "Electromagnetic force",
      "Gravitational force",
      "Strong nuclear force",
      "Weak nuclear force",
    ],
    answer: 1,
  },
  {
    id: 94,
    question: "Which country has the largest land area in the world?",
    options: ["Canada", "China", "Russia", "USA"],
    answer: 2,
  },
  {
    id: 95,
    question: "Which is the deepest known point in Earth's oceans?",
    options: [
      "Mariana Trench",
      "Java Trench",
      "Tonga Trench",
      "Puerto Rico Trench",
    ],
    answer: 0,
  },
  {
    id: 96,
    question: "Which desert is the largest hot desert in the world?",
    options: [
      "Gobi",
      "Sahara",
      "Kalahari",
      "Arabian",
    ],
    answer: 1,
  },
  {
    id: 97,
    question: "Which international organization has its headquarters in New York City?",
    options: [
      "UN",
      "WHO",
      "WTO",
      "IMF",
    ],
    answer: 0,
  },
  {
    id: 98,
    question: "What does UNESCO stand for?",
    options: [
      "United Nations Educational, Scientific and Cultural Organization",
      "United Nations Economic and Social Cultural Organization",
      "Universal Nations Education and Science Council Organization",
      "United Nations Environment Science Council Organization",
    ],
    answer: 0,
  },
  {
    id: 99,
    question: "Which country was the first to launch an artificial satellite?",
    options: ["USA", "Russia (USSR)", "China", "Japan"],
    answer: 1,
  },
  {
    id: 100,
    question: "What was the name of the first artificial satellite launched into space?",
    options: ["Apollo 1", "Sputnik 1", "Vostok 1", "Explorer 1"],
    answer: 1,
  },
];

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

  const questions = useMemo(() => {
    return questionBank;
  }, []);

  const [quizStarted, setQuizStarted] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(1);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState(30);

  const [isAnswering, setIsAnswering] =
    useState(false);

  const [correctAnswers, setCorrectAnswers] =
    useState(0);

  const [wrongAnswers, setWrongAnswers] =
    useState(0);

  const [showCorrect, setShowCorrect] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const question =
    questions[currentLevel - 1];

  /* =========================================================
     LEVEL DIFFICULTY
  ========================================================= */

  function getDifficulty(level: number) {
    if (level <= 25) return "EASY";
    if (level <= 50) return "MEDIUM";
    if (level <= 75) return "HARD";
    return "EXPERT";
  }

  const difficulty = getDifficulty(currentLevel);

  /* =========================================================
     START GAME
  ========================================================= */

  function startGame() {
    setQuizStarted(true);
    setCurrentLevel(1);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setShowCorrect(false);
    setGameOver(false);
    setCompleted(false);
  }

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (
      !quizStarted ||
      gameOver ||
      completed ||
      isAnswering ||
      showCorrect
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);

          setGameOver(true);

          const result = {
            category,
            level: currentLevel,
            totalLevels: 100,
            correct: correctAnswers,
            wrong: wrongAnswers + 1,
            score: correctAnswers,
            reason: "Time Up",
            completedAt: new Date().toISOString(),
          };

          localStorage.setItem(
            "quizResult",
            JSON.stringify(result)
          );

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
    gameOver,
    completed,
    isAnswering,
    showCorrect,
    currentLevel,
    category,
    correctAnswers,
    wrongAnswers,
  ]);

  /* =========================================================
     SELECT ANSWER
  ========================================================= */

  function chooseAnswer(index: number) {
    if (
      isAnswering ||
      showCorrect ||
      gameOver ||
      completed
    ) {
      return;
    }

    setSelectedAnswer(index);
  }

  /* =========================================================
     CHECK ANSWER
  ========================================================= */

  function checkAnswer() {
    if (
      selectedAnswer === null ||
      isAnswering ||
      gameOver ||
      completed
    ) {
      return;
    }

    setIsAnswering(true);

    const isCorrect =
      selectedAnswer === question.answer;

    if (isCorrect) {
      setCorrectAnswers(
        (previous) => previous + 1
      );

      setShowCorrect(true);

      window.setTimeout(() => {
        if (currentLevel >= 100) {
          const result = {
            category,
            level: 100,
            totalLevels: 100,
            correct: correctAnswers + 1,
            wrong: wrongAnswers,
            score: 100,
            reason: "Completed",
            completedAt:
              new Date().toISOString(),
          };

          localStorage.setItem(
            "quizResult",
            JSON.stringify(result)
          );

          setCompleted(true);
          setIsAnswering(false);
          setShowCorrect(false);
          return;
        }

        setCurrentLevel(
          (previous) => previous + 1
        );

        setSelectedAnswer(null);
        setTimeLeft(30);
        setShowCorrect(false);
        setIsAnswering(false);
      }, 900);
    } else {
      setWrongAnswers(
        (previous) => previous + 1
      );

      setShowCorrect(true);

      window.setTimeout(() => {
        const result = {
          category,
          level: currentLevel,
          totalLevels: 100,
          correct: correctAnswers,
          wrong: wrongAnswers + 1,
          score: Math.round(
            (correctAnswers / currentLevel) *
              100
          ),
          reason: "Wrong Answer",
          completedAt:
            new Date().toISOString(),
        };

        localStorage.setItem(
          "quizResult",
          JSON.stringify(result)
        );

        setGameOver(true);
        setIsAnswering(false);
        setShowCorrect(false);
      }, 1200);
    }
  }

  /* =========================================================
     RESTART
  ========================================================= */

  function restartGame() {
    startGame();
  }

  /* =========================================================
     TIMER FORMAT
  ========================================================= */

  const timerText = `00:${timeLeft
    .toString()
    .padStart(2, "0")}`;

  /* =========================================================
     START SCREEN
  ========================================================= */

  if (!quizStarted) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        {/* Background */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[140px]" />

          <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />
        </div>

        {/* Header */}

        <header className="relative z-20 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
            <Link
              href="/student/dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <Brain size={22} />
              </div>

              <div>
                <h1 className="text-lg font-black">
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

        {/* Start */}

        <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-full max-w-3xl"
          >
            {/* Icon */}

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 ring-1 ring-indigo-500/30 shadow-2xl shadow-indigo-500/10">
              <Trophy size={44} />
            </div>

            {/* Title */}

            <div className="mt-7 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-400">
                100 Level Challenge
              </p>

              <h1 className="mt-3 text-4xl font-black sm:text-6xl">
                General
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Knowledge Quiz
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                Start from Level 1 and prove your
                knowledge all the way to Level 100.
                Questions become harder as you
                progress.
              </p>
            </div>

            {/* Main Card */}

            <div className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] shadow-2xl">
              {/* Level Preview */}

              <div className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-4">
                <div className="border-b border-white/10 p-5 text-center sm:border-b-0 sm:border-r">
                  <p className="text-2xl font-black text-white">
                    100
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Levels
                  </p>
                </div>

                <div className="border-b border-white/10 p-5 text-center sm:border-b-0 sm:border-r">
                  <p className="text-2xl font-black text-green-400">
                    1
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Start Level
                  </p>
                </div>

                <div className="border-r border-white/10 p-5 text-center">
                  <p className="text-2xl font-black text-yellow-400">
                    30s
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Per Question
                  </p>
                </div>

                <div className="p-5 text-center">
                  <p className="text-2xl font-black text-purple-400">
                    100
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Max Score
                  </p>
                </div>
              </div>

              {/* Difficulty */}

              <div className="p-6 sm:p-8">
                <h2 className="font-bold">
                  Your Journey
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.06] p-4">
                    <p className="text-xs font-bold text-green-400">
                      LEVEL 1–25
                    </p>

                    <p className="mt-1 font-bold">
                      Easy
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Warm up
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
                    <p className="text-xs font-bold text-blue-400">
                      LEVEL 26–50
                    </p>

                    <p className="mt-1 font-bold">
                      Medium
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Challenge begins
                    </p>
                  </div>

                  <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-4">
                    <p className="text-xs font-bold text-orange-400">
                      LEVEL 51–75
                    </p>

                    <p className="mt-1 font-bold">
                      Hard
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Think carefully
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-4">
                    <p className="text-xs font-bold text-purple-400">
                      LEVEL 76–100
                    </p>

                    <p className="mt-1 font-bold">
                      Expert
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Master level
                    </p>
                  </div>
                </div>

                {/* Rules */}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-4">
                    <Clock3
                      size={19}
                      className="text-indigo-400"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        30 seconds
                      </p>

                      <p className="text-xs text-gray-600">
                        Every level has a timer
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-4">
                    <Zap
                      size={19}
                      className="text-yellow-400"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        One chance
                      </p>

                      <p className="text-xs text-gray-600">
                        Wrong answer ends game
                      </p>
                    </div>
                  </div>
                </div>

                {/* Start Button */}

                <button
                  type="button"
                  onClick={startGame}
                  className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-indigo-600/20 transition duration-300 hover:scale-[1.01] hover:shadow-indigo-600/40"
                >
                  Start Quiz Game

                  <ArrowRight
                    size={21}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-3 text-center text-xs text-gray-600">
                  Your journey starts at Level 1
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     GAME OVER
  ========================================================= */

  if (gameOver) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[150px]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-xl rounded-[30px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl sm:p-10"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
              <XCircle size={42} />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Game Over
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Better Luck Next Time
            </h1>

            <p className="mt-4 text-gray-500">
              You reached Level{" "}
              <span className="font-bold text-white">
                {currentLevel}
              </span>
              .
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-3xl font-black text-green-400">
                  {correctAnswers}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Correct
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-3xl font-black text-red-400">
                  {wrongAnswers}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Wrong
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={restartGame}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold transition hover:scale-[1.01]"
            >
              Play Again
              <ArrowRight size={19} />
            </button>

            <Link
              href="/student/dashboard"
              className="mt-3 flex w-full items-center justify-center rounded-2xl border border-white/10 px-6 py-4 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     COMPLETED
  ========================================================= */

  if (completed) {
    return (
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="w-full max-w-xl rounded-[30px] border border-yellow-500/20 bg-white/[0.04] p-8 text-center shadow-2xl sm:p-10"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/30">
              <Trophy size={50} />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
              Quiz Master
            </p>

            <h1 className="mt-2 text-4xl font-black sm:text-5xl">
              You Did It!
            </h1>

            <p className="mt-4 text-gray-500">
              Congratulations! You completed all
              <span className="font-bold text-white">
                {" "}
                100 Levels
              </span>
              .
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.04] p-6">
              <p className="text-5xl font-black text-yellow-400">
                {correctAnswers}/100
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Final Score
              </p>
            </div>

            <Link
              href="/student/dashboard"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold transition hover:scale-[1.01]"
            >
              Back to Dashboard
              <ArrowRight size={19} />
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ACTIVE QUIZ
  ========================================================= */

  const progress =
    (currentLevel / 100) * 100;

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
                LEVEL 1 — 100
              </p>
            </div>
          </Link>

          {/* Timer */}

          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${
              timeLeft <= 10
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-white/10 bg-white/[0.04] text-gray-300"
            }`}
          >
            <Clock3 size={18} />

            <span className="font-mono font-bold">
              {timerText}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-8">
        {/* Level Header */}

        <div className="mb-7">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-400">
                  {difficulty}
                </span>

                <span className="text-xs text-gray-600">
                  {category}
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Level {currentLevel}
                <span className="text-gray-700">
                  {" "}
                  / 100
                </span>
              </h2>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
              <span className="text-sm text-gray-500">
                Score
              </span>

              <span className="ml-2 font-black text-green-400">
                {correctAnswers}
              </span>
            </div>
          </div>

          {/* Progress */}

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.3,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
          </div>

          <div className="mt-2 flex justify-between text-[10px] font-bold text-gray-600">
            <span>LEVEL 1</span>
            <span>
              {currentLevel}% COMPLETE
            </span>
            <span>LEVEL 100</span>
          </div>
        </div>

        {/* Question Card */}

        <motion.div
          key={currentLevel}
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-9"
        >
          {/* Question Top */}

          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-black text-indigo-400">
                {currentLevel}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Question
                </p>

                <p className="text-sm font-semibold text-gray-400">
                  Level {currentLevel} of 100
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

          <h3 className="max-w-4xl text-xl font-bold leading-8 sm:text-2xl">
            {question.question}
          </h3>

          {/* Options */}

          <div className="mt-8 grid gap-3">
            {question.options.map(
              (option, index) => {
                const selected =
                  selectedAnswer === index;

                const correct =
                  index === question.answer;

                let optionClass =
                  "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]";

                if (showCorrect && correct) {
                  optionClass =
                    "border-green-500/40 bg-green-500/10";
                } else if (
                  showCorrect &&
                  selected &&
                  !correct
                ) {
                  optionClass =
                    "border-red-500/40 bg-red-500/10";
                } else if (selected) {
                  optionClass =
                    "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/5";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      chooseAnswer(index)
                    }
                    disabled={
                      showCorrect ||
                      isAnswering
                    }
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${optionClass}`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${
                        showCorrect && correct
                          ? "border-green-500 bg-green-500 text-white"
                          : showCorrect &&
                            selected &&
                            !correct
                          ? "border-red-500 bg-red-500 text-white"
                          : selected
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

                    {showCorrect &&
                      correct && (
                        <CheckCircle2
                          size={20}
                          className="ml-auto text-green-400"
                        />
                      )}

                    {showCorrect &&
                      selected &&
                      !correct && (
                        <XCircle
                          size={20}
                          className="ml-auto text-red-400"
                        />
                      )}
                  </button>
                );
              }
            )}
          </div>

          {/* Check Answer */}

          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={checkAnswer}
              disabled={
                selectedAnswer === null ||
                isAnswering ||
                showCorrect
              }
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentLevel === 100
                ? "Finish Quiz"
                : "Lock Answer"}

              <ArrowRight size={19} />
            </button>
          </div>
        </motion.div>

        {/* Bottom Stats */}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className="text-xl font-black text-green-400">
              {correctAnswers}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
              Correct
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className="text-xl font-black text-red-400">
              {wrongAnswers}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
              Wrong
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className="text-xl font-black text-indigo-400">
              {currentLevel}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
              Current Level
            </p>
          </div>
        </div>

        {/* Level Roadmap */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold">
              Level Roadmap
            </h4>

            <span className="text-xs text-gray-600">
              {currentLevel} / 100
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {Array.from(
              { length: 100 },
              (_, index) => {
                const level = index + 1;

                const active =
                  level === currentLevel;

                const passed =
                  level < currentLevel;

                return (
                  <div
                    key={level}
                    className={`flex h-8 items-center justify-center rounded-lg text-[10px] font-bold ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : passed
                        ? "bg-green-500/15 text-green-400"
                        : level >
                          currentLevel
                        ? "bg-white/[0.04] text-gray-700"
                        : "bg-white/[0.04] text-gray-600"
                    }`}
                  >
                    {level}
                  </div>
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
            Choose your answer carefully. You
            have 30 seconds for each level.
            One wrong answer ends the game.
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
        <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
          <Brain size={25} />
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-500">
          Loading Quiz...
        </p>
      </div>
    </main>
  );
}
