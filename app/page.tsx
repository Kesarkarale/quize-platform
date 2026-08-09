"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Trophy,
  Users,
  Zap,
  Star,
  Play,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "General Knowledge",
    description: "Test your knowledge of the world.",
    icon: "🌍",
    quizzes: "120+ Quizzes",
  },
  {
    title: "Science",
    description: "Explore science and discover more.",
    icon: "🔬",
    quizzes: "85+ Quizzes",
  },
  {
    title: "Technology",
    description: "Challenge yourself with tech questions.",
    icon: "💻",
    quizzes: "95+ Quizzes",
  },
  {
    title: "History",
    description: "Travel through important moments.",
    icon: "🏛️",
    quizzes: "70+ Quizzes",
  },
];

const popularQuizzes = [
  {
    title: "Ultimate General Knowledge",
    category: "General Knowledge",
    questions: 20,
    time: "10 min",
    difficulty: "Medium",
    rating: "4.9",
    icon: "🌍",
  },
  {
    title: "Science Challenge",
    category: "Science",
    questions: 15,
    time: "8 min",
    difficulty: "Easy",
    rating: "4.8",
    icon: "🔬",
  },
  {
    title: "Tech Master Quiz",
    category: "Technology",
    questions: 25,
    time: "12 min",
    difficulty: "Hard",
    rating: "4.9",
    icon: "💻",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
              <Brain size={23} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Quiz<span className="text-indigo-600">Master</span>
              </h1>
              <p className="text-[10px] font-medium text-gray-400">
                PLAY • LEARN • WIN
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="font-semibold text-indigo-600"
            >
              Home
            </Link>

            <Link
              href="/quizzes"
              className="font-medium text-gray-600 transition hover:text-indigo-600"
            >
              Quizzes
            </Link>

            <Link
              href="/categories"
              className="font-medium text-gray-600 transition hover:text-indigo-600"
            >
              Categories
            </Link>

            <Link
              href="/leaderboard"
              className="font-medium text-gray-600 transition hover:text-indigo-600"
            >
              Leaderboard
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100 sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gray-900 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-indigo-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
              <Sparkles size={16} />
              Learn something new every day
            </div>

            <h2 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl">
              Challenge Your
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Mind. Win More.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-500">
              Test your knowledge, challenge your friends and climb the
              leaderboard with fun and engaging quizzes.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/quizzes"
                className="group flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-700"
              >
                Start Quiz
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/categories"
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-7 py-4 font-bold text-gray-800 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200"
              >
                Explore Quizzes
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="text-2xl font-black">10K+</p>
                <p className="text-sm text-gray-400">Active Players</p>
              </div>

              <div>
                <p className="text-2xl font-black">500+</p>
                <p className="text-sm text-gray-400">Quizzes</p>
              </div>

              <div>
                <p className="text-2xl font-black">50K+</p>
                <p className="text-sm text-gray-400">Questions</p>
              </div>
            </div>
          </div>

          {/* Hero Quiz Card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-r from-indigo-300/30 to-purple-300/30 blur-2xl" />

            <div className="relative rounded-[32px] border border-white bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">
                    QUICK QUIZ
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold">
                    Test Your Knowledge
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Brain size={22} />
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm font-medium text-gray-400">
                  QUESTION 01 / 10
                </p>

                <h4 className="mt-3 text-lg font-bold leading-7">
                  Which planet is known as the Red Planet?
                </h4>

                <div className="mt-5 space-y-3">
                  {["Earth", "Mars", "Jupiter", "Venus"].map(
                    (option, index) => (
                      <div
                        key={option}
                        className={`flex items-center justify-between rounded-xl border p-3.5 ${
                          index === 1
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>

                          <span className="font-semibold">{option}</span>
                        </div>

                        {index === 1 && (
                          <CheckCircle2
                            size={20}
                            className="text-indigo-600"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock3 size={17} />
                  02:45
                </div>

                <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-bold text-white">
                  Next
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-100 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Brain,
              title: "500+ Quizzes",
              text: "Unlimited challenges",
            },
            {
              icon: Trophy,
              title: "Global Ranking",
              text: "Compete with players",
            },
            {
              icon: Zap,
              title: "Instant Results",
              text: "Know your score instantly",
            },
            {
              icon: Users,
              title: "Play Together",
              text: "Challenge your friends",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-bold uppercase tracking-widest text-indigo-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Find Your Category
            </h2>

            <p className="mt-3 text-gray-500">
              Pick a topic and start testing your knowledge.
            </p>
          </div>

          <Link
            href="/categories"
            className="flex items-center gap-2 font-bold text-indigo-600"
          >
            View All
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.title
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              key={category.title}
              className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:border-indigo-100 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-3xl transition group-hover:scale-110">
                {category.icon}
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {category.description}
              </p>

              <div className="mt-5 text-sm font-bold text-indigo-600">
                {category.quizzes}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Quizzes */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-bold uppercase tracking-widest text-indigo-600">
                Trending Now
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Popular Quizzes
              </h2>
            </div>

            <Link
              href="/quizzes"
              className="flex items-center gap-2 font-bold text-indigo-600"
            >
              See All Quizzes
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {popularQuizzes.map((quiz) => (
              <div
                key={quiz.title}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-7xl">
                  {quiz.icon}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                      {quiz.category}
                    </span>

                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {quiz.rating}
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-extrabold">
                    {quiz.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
                    <span>{quiz.questions} Questions</span>
                    <span>•</span>
                    <span>{quiz.time}</span>
                    <span>•</span>
                    <span>{quiz.difficulty}</span>
                  </div>

                  <Link
                    href="/quiz"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 font-bold text-white transition hover:bg-indigo-600"
                  >
                    <Play size={17} />
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[32px] bg-gray-950 px-8 py-14 text-center text-white sm:px-16">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Trophy size={27} />
            </div>

            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              Ready to Challenge Yourself?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Join thousands of players, test your knowledge and become the
              next QuizMaster.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-gray-900 transition hover:scale-105"
            >
              Start Playing
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={18} />
            </div>

            <span className="font-extrabold">
              Quiz<span className="text-indigo-600">Master</span>
            </span>
          </div>

          <p className="text-sm text-gray-400">
            © 2026 QuizMaster. Learn. Play. Win.
          </p>

          <div className="flex gap-5 text-sm font-medium text-gray-500">
            <Link href="/about" className="hover:text-indigo-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-indigo-600">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-indigo-600">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
