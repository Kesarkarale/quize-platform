"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent, ChangeEvent } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sparkles,
  Trophy,
  Users,
  Brain,
  ShieldCheck,
  User,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agree) {
      toast.error(
        "Please accept the Terms & Conditions"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result?.message || "Registration failed"
        );
        return;
      }

      toast.success(
        "Account created successfully 🎉"
      );

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/30 blur-[130px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/25 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Main */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:px-10">
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden text-white lg:block"
        >
          {/* Logo */}
          <Link
            href="/"
            className="mb-14 inline-flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Brain size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Quiz
                <span className="text-indigo-400">
                  Master
                </span>
              </h1>

              <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-500">
                PLAY • LEARN • WIN
              </p>
            </div>
          </Link>

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
            <Sparkles size={16} />
            Join the QuizMaster Community
          </div>

          {/* Heading */}
          <h2 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
            Start Your
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quiz Journey.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
            Create your free account and start learning,
            competing and climbing the leaderboard.
          </p>

          {/* Stats */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Users size={20} />
              </div>

              <p className="text-2xl font-black">
                50K+
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Students
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Brain size={20} />
              </div>

              <p className="text-2xl font-black">
                2M+
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Questions
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                <Trophy size={20} />
              </div>

              <p className="text-2xl font-black">
                98%
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Success
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-3">
            {[
              "Access hundreds of quizzes",
              "Compete on the leaderboard",
              "Track your learning progress",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-gray-400"
              >
                <CheckCircle2
                  size={17}
                  className="text-indigo-400"
                />

                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================================================= */}
        {/* REGISTER CARD */}
        {/* ================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full justify-center"
        >
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-3 text-white"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Brain size={22} />
                </div>

                <div>
                  <h1 className="text-xl font-black">
                    Quiz
                    <span className="text-indigo-400">
                      Master
                    </span>
                  </h1>

                  <p className="text-[9px] tracking-[0.2em] text-gray-500">
                    PLAY • LEARN • WIN
                  </p>
                </div>
              </Link>
            </div>

            {/* Card */}
            <div className="rounded-[30px] border border-white/10 bg-white/[0.08] p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
              {/* Header */}
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <User size={22} />
                </div>

                <h2 className="text-3xl font-black text-white">
                  Create Account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Join QuizMaster and start your journey.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleRegister}
                className="mt-8 space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-200"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 outline-none transition focus:border-indigo-500 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-200"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 outline-none transition focus:border-indigo-500 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-200"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-12 text-white placeholder:text-gray-600 outline-none transition focus:border-indigo-500 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      disabled={loading}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
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
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-gray-200"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-12 text-white placeholder:text-gray-600 outline-none transition focus:border-indigo-500 focus:bg-black/30 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      disabled={loading}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) =>
                      setAgree(e.target.checked)
                    }
                    disabled={loading}
                    className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-600 bg-transparent accent-indigo-600"
                  />

                  <span className="text-xs leading-5 text-gray-500">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:scale-[1.01] hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs font-medium text-gray-600">
                  ALREADY A MEMBER?
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Login */}
              <p className="text-center text-sm text-gray-400">
                Already have an account?
                <Link
                  href="/login"
                  className="ml-2 font-bold text-indigo-400 transition hover:text-indigo-300"
                >
                  Login
                </Link>
              </p>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
                <ShieldCheck size={14} />
                Your account information is protected
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

