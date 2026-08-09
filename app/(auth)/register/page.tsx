"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Chrome,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    console.log("Register:", formData);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <section className="relative hidden overflow-hidden bg-gray-950 lg:flex lg:order-2">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
                <Brain size={23} />
              </div>

              <span className="text-xl font-extrabold">
                Quiz<span className="text-indigo-400">Master</span>
              </span>
            </Link>

            <div className="max-w-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-indigo-300">
                <Brain size={32} />
              </div>

              <h1 className="text-5xl font-black leading-tight text-white">
                Start your
                <span className="block text-indigo-400">
                  Quiz Journey.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                Create your free account and unlock a world of
                quizzes, challenges, achievements and competitions.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "500+ exciting quizzes",
                  "Global leaderboard",
                  "Track your learning progress",
                  "Earn points and achievements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-indigo-400"
                    />

                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-500">
              © 2026 QuizMaster. Learn. Play. Win.
            </p>
          </div>
        </section>

        {/* Form Side */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:order-1">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Brain size={22} />
              </div>

              <span className="text-xl font-extrabold">
                Quiz<span className="text-indigo-600">Master</span>
              </span>
            </Link>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                Get Started
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-gray-500">
                Join QuizMaster and start challenging yourself.
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              <Chrome size={19} />
              Sign up with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-400">
                OR USE EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showConfirm ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) =>
                    setAgree(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-indigo-600"
                />

                <span className="text-sm leading-6 text-gray-500">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-bold text-indigo-600"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-bold text-indigo-600"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
              >
                Create Account
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
