"use client";

import Link from "next/link";
import {
  Brain,
  Trophy,
  Medal,
  Crown,
  ArrowLeft,
  Flame,
} from "lucide-react";

const players = [
  { rank: 1, name: "Aarav Sharma", score: 9850, quizzes: 124 },
  { rank: 2, name: "Priya Patil", score: 9420, quizzes: 118 },
  { rank: 3, name: "Rahul Deshmukh", score: 9180, quizzes: 109 },
  { rank: 4, name: "Ananya Kulkarni", score: 8840, quizzes: 101 },
  { rank: 5, name: "Rohan Joshi", score: 8560, quizzes: 96 },
  { rank: 6, name: "Sneha More", score: 8210, quizzes: 91 },
  { rank: 7, name: "Aditya Pawar", score: 7980, quizzes: 87 },
  { rank: 8, name: "Neha Shinde", score: 7650, quizzes: 83 },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fc]">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <span className="font-extrabold">
              Quiz<span className="text-indigo-600">Master</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
            <Trophy size={32} />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">
            Top Players
          </p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Global Leaderboard
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Compete with players around the world and climb your way
            to the top.
          </p>
        </div>

        {/* Top 3 */}
        <div className="mx-auto mt-12 grid max-w-4xl items-end gap-5 md:grid-cols-3">
          {/* 2nd */}
          <div className="order-2 rounded-[28px] border border-gray-100 bg-white p-6 text-center shadow-sm md:order-1">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-black text-gray-500">
              2
            </div>

            <h3 className="mt-4 font-black">
              {players[1].name}
            </h3>

            <p className="mt-1 font-bold text-indigo-600">
              {players[1].score.toLocaleString()} XP
            </p>

            <div className="mt-4 text-sm text-gray-400">
              {players[1].quizzes} quizzes
            </div>
          </div>

          {/* 1st */}
          <div className="order-1 rounded-[28px] border-2 border-yellow-200 bg-white p-7 text-center shadow-xl md:order-2 md:-translate-y-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
              <Crown size={38} />
            </div>

            <p className="mt-3 text-xs font-black uppercase tracking-widest text-yellow-500">
              Champion
            </p>

            <h3 className="mt-2 text-xl font-black">
              {players[0].name}
            </h3>

            <p className="mt-1 text-lg font-black text-indigo-600">
              {players[0].score.toLocaleString()} XP
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Flame size={16} className="text-orange-500" />
              {players[0].quizzes} quizzes completed
            </div>
          </div>

          {/* 3rd */}
          <div className="order-3 rounded-[28px] border border-gray-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-xl font-black text-orange-500">
              3
            </div>

            <h3 className="mt-4 font-black">
              {players[2].name}
            </h3>

            <p className="mt-1 font-bold text-indigo-600">
              {players[2].score.toLocaleString()} XP
            </p>

            <div className="mt-4 text-sm text-gray-400">
              {players[2].quizzes} quizzes
            </div>
          </div>
        </div>

        {/* Full Ranking */}
        <section className="mt-10 overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="font-black">All Rankings</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {players.map((player) => (
              <div
                key={player.rank}
                className="flex items-center gap-4 px-6 py-5 transition hover:bg-gray-50"
              >
                <div className="flex w-10 justify-center">
                  {player.rank <= 3 ? (
                    <Medal
                      size={22}
                      className={
                        player.rank === 1
                          ? "text-yellow-500"
                          : player.rank === 2
                          ? "text-gray-400"
                          : "text-orange-500"
                      }
                    />
                  ) : (
                    <span className="font-bold text-gray-400">
                      #{player.rank}
                    </span>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-black text-indigo-600">
                  {player.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <p className="font-bold">{player.name}</p>
                  <p className="text-xs text-gray-400">
                    {player.quizzes} quizzes completed
                  </p>
                </div>

                <p className="font-black text-indigo-600">
                  {player.score.toLocaleString()} XP
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

