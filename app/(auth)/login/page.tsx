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
} from "lucide-react";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result?.message || "Invalid email or password"
        );
        return;
      }

      toast.success("Welcome back 🎉");

      router.push("/student/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        "Unable to login right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-indigo-600/30 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/25 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:px-10">
        {/* ===================================================== */}
        {/* LEFT SIDE */}
        {/* ===================================================== */}

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden text-white lg:block"
        >
          {/* Brand */}
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
            Next Generation Quiz Platform
          </div>

          {/* Heading */}
          <h2 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
            Master Your Skills.
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Win Every Challenge.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
            A powerful online assessment platform built for
            students, teachers and organizations.
          </p>

          {/* Features */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Users size={20} />
              </div>

              <p className="text-2xl font-black">50K+</p>

              <p className="mt-1 text-xs text-gray-500">
                Students
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Brain size={20} />
              </div>

              <p className="text-2xl font-black">2M+</p>

              <p className="mt-1 text-xs text-gray-500">
                Questions
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <Trophy size={20} />
              </div>

              <p className="text-2xl font-black">98%</p>

              <p className="mt-1 text-xs text-gray-500">
                Success
              </p>
            </div>
          </div>

          {/* Bottom Feature */}
          <div className="mt-8 flex items-center gap-3 text-sm text-gray-400">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <ShieldCheck size={18} />
            </div>

            <span>
              Secure & reliable learning experience
            </span>
          </div>
        </motion.section>

        {/* ===================================================== */}
        {/* RIGHT SIDE - LOGIN CARD */}
        {/* ===================================================== */}

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

            {/* Login Card */}
            <div className="rounded-[30px] border border-white/10 bg-white/[0.08] p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
              {/* Card Header */}
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <Lock size={22} />
                </div>

                <h2 className="text-3xl font-black text-white">
                  Welcome Back
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Login to continue your quiz journey.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >
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
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-200"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      autoComplete="current-password"
                      placeholder="••••••••"
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300 disabled:opacity-50"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-transparent accent-indigo-600"
                    />

                    <span className="text-sm text-gray-400">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Login Button */}
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
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
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
                  SECURE LOGIN
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Register */}
              <p className="text-center text-sm text-gray-400">
                Don't have an account?
                <Link
                  href="/register"
                  className="ml-2 font-bold text-indigo-400 transition hover:text-indigo-300"
                >
                  Create Account
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
