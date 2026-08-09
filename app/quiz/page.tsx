"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flag,
  Brain,
  AlertCircle,
} from "lucide-react";

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Who invented the World Wide Web?",
    options: [
      "Bill Gates",
      "Tim Berners-Lee",
      "Steve Jobs",
      "Mark Zuckerberg",
    ],
    answer: "Tim Berners-Lee",
  },
  {
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: "CSS",
  },
  {
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (option: string) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, item, index) => {
      return selectedAnswers[index] === item.answer
        ? score + 1
        : score;
    }, 0);
  };

  if (submitted) {
    const score = calculateScore();
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <main className="min-h-screen bg-[#f7f8fc] px-6 py-10">
        <div className="mx-auto flex min-h-[85vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
              <CheckCircle2
                size={42}
                className="text-indigo-600"
              />
            </div>

            <p className="mt-6 font-bold uppercase tracking-widest text-indigo-600">
              Quiz Completed
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Great Job! 🎉
            </h1>

            <p className="mt-3 text-gray-500">
              You have successfully completed the quiz.
            </p>

            <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-3xl font-black text-indigo-600">
                  {score}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Correct
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-3xl font-black">
                  {questions.length - score}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Wrong
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-3xl font-black text-indigo-600">
                  {percentage}%
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Score
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setSubmitted(false);
                }}
                className="rounded-xl bg-indigo-600 px-7 py-3.5 font-bold text-white transition hover:bg-indigo-700"
              >
                Try Again
              </button>

              <Link
                href="/"
                className="rounded-xl border border-gray-200 px-7 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <span className="font-extrabold">
              Quiz<span className="text-indigo-600">Master</span>
            </span>
          </Link>

          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
            <Flag size={16} />
            Report
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Quiz top section */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-indigo-600"
            >
              <ArrowLeft size={16} />
              Exit Quiz
            </Link>

            <h1 className="text-2xl font-black sm:text-3xl">
              General Knowledge Challenge
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Test your knowledge and complete all questions.
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Clock3 size={20} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400">
                TIME LEFT
              </p>

              <p className="font-black">08:42</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="font-bold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main quiz layout */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Question */}
          <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                General Knowledge
              </span>

              <span className="text-sm font-semibold text-gray-400">
                1 Point
              </span>
            </div>

            <h2 className="mt-8 max-w-3xl text-2xl font-black leading-9 sm:text-3xl">
              {question.question}
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Select the correct answer from the options below.
            </p>

            {/* Options */}
            <div className="mt-8 space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span
                        className={`font-bold ${
                          isSelected
                            ? "text-indigo-700"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2
                        size={22}
                        className="text-indigo-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Warning */}
            {!selectedAnswer && (
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-600">
                <AlertCircle size={17} />
                Please select an answer before moving forward.
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit Quiz
                  <CheckCircle2 size={18} />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </section>

          {/* Question Navigator */}
          <aside className="h-fit rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-black">Questions</h3>

            <p className="mt-1 text-sm text-gray-400">
              Navigate between questions
            </p>

            <div className="mt-6 grid grid-cols-5 gap-3 lg:grid-cols-4">
              {questions.map((_, index) => {
                const answered =
                  selectedAnswers[index] !== undefined;

                const active = currentQuestion === index;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black transition ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                        : answered
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 space-y-3 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="h-3 w-3 rounded-full bg-indigo-600" />
                Current
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="h-3 w-3 rounded-full bg-indigo-100" />
                Answered
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="h-3 w-3 rounded-full bg-gray-200" />
                Not Answered
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                PROGRESS
              </p>

              <p className="mt-1 text-xl font-black">
                {Object.keys(selectedAnswers).length}/
                {questions.length}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                questions answered
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
