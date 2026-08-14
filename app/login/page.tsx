"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type LoginRole = "STUDENT" | "ADMIN";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginRole, setLoginRole] =
    useState<LoginRole>("STUDENT");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      toast.error(
        "Please enter email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();

      /*
       * Sign in with Supabase
       */
      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(
          "LOGIN ERROR:",
          error
        );

        toast.error(
          error.message ||
            "Invalid email or password."
        );

        return;
      }

      if (!data.user) {
        toast.error(
          "Login failed."
        );

        return;
      }

      console.log(
        "Logged in user:",
        data.user
      );

      console.log(
        "Session:",
        data.session
      );

      /*
       * Get role and status from profiles table
       */
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role,status,name,email")
        .eq("id", data.user.id)
        .maybeSingle();

      /*
       * Profile error
       */
      if (profileError) {
        console.error(
          "PROFILE ERROR:",
          profileError
        );

        toast.error(
          "Unable to load your account profile."
        );

        await supabase.auth.signOut();

        return;
      }

      /*
       * Profile not found
       */
      if (!profile) {
        toast.error(
          "User profile not found."
        );

        await supabase.auth.signOut();

        return;
      }

      /*
       * Check account status
       */
      if (
        profile.status &&
        profile.status !== "ACTIVE"
      ) {
        await supabase.auth.signOut();

        toast.error(
          "Your account is inactive. Please contact the administrator."
        );

        return;
      }

      /*
       * Normalize role
       */
      const actualRole =
        String(profile.role || "")
          .toUpperCase();

      /*
       * Check selected login type
       *
       * Example:
       * User selects ADMIN
       * but database says STUDENT
       * => block login
       */
      if (actualRole !== loginRole) {
        await supabase.auth.signOut();

        if (loginRole === "ADMIN") {
          toast.error(
            "This account is not registered as an Admin."
          );
        } else {
          toast.error(
            "This account is not registered as a Student."
          );
        }

        return;
      }

      /*
       * Successful login
       */
      toast.success(
        loginRole === "ADMIN"
          ? "Admin login successful! 🎉"
          : "Student login successful! 🎉"
      );

      /*
       * Give Supabase auth state
       * a moment to persist.
       */
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 300)
      );

      /*
       * Redirect according to role
       */
      if (actualRole === "ADMIN") {
        window.location.href =
          "/admin";

        return;
      }

      if (actualRole === "STUDENT") {
        window.location.href =
          "/student/dashboard";

        return;
      }

      /*
       * Unknown role
       */
      await supabase.auth.signOut();

      toast.error(
        "Invalid user role."
      );
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <section className="hidden flex-col justify-between border-r border-white/5 bg-white/[0.015] p-10 lg:flex xl:p-16">
          <Link
            href="/"
            className="flex w-fit items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Brain size={23} />
            </div>

            <div>
              <p className="text-lg font-black">
                Quiz
                <span className="text-indigo-400">
                  Master
                </span>
              </p>

              <p className="text-[8px] font-semibold tracking-[0.25em] text-gray-600">
                ONLINE ASSESSMENT
              </p>
            </div>
          </Link>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

              Smart learning starts here
            </div>

            <h1 className="text-5xl font-black leading-[1.08] xl:text-6xl">
              Test your
              <br />
              knowledge.
              <br />

              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Track your growth.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-gray-500">
              Take online assessments, monitor your
              performance, review your answers and
              compete with other students on the
              leaderboard.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              <InfoCard
                icon={<Trophy size={18} />}
                value="50K+"
                label="Students"
              />

              <InfoCard
                icon={<Brain size={18} />}
                value="2M+"
                label="Questions"
              />

              <InfoCard
                icon={<Users size={18} />}
                value="10K+"
                label="Attempts"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-700">
            <ShieldCheck size={15} />

            Secure online assessment platform
          </div>
        </section>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
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
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                <Brain size={20} />
              </div>

              <p className="text-lg font-black">
                Quiz
                <span className="text-indigo-400">
                  Master
                </span>
              </p>
            </Link>

            {/* Card */}

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                  Welcome back
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Login to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Choose your account type and
                  continue to QuizMaster.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* =====================================
                    LOGIN AS
                ===================================== */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-400">
                    Login As
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Student */}

                    <button
                      type="button"
                      onClick={() =>
                        setLoginRole("STUDENT")
                      }
                      className={`relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                        loginRole === "STUDENT"
                          ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                          : "border-white/10 bg-black/20 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          loginRole === "STUDENT"
                            ? "bg-indigo-500/20"
                            : "bg-white/5"
                        }`}
                      >
                        <Users size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Student
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-600">
                          Take quizzes
                        </p>
                      </div>

                      {loginRole === "STUDENT" && (
                        <Check
                          size={16}
                          className="ml-auto text-indigo-400"
                        />
                      )}
                    </button>

                    {/* Admin */}

                    <button
                      type="button"
                      onClick={() =>
                        setLoginRole("ADMIN")
                      }
                      className={`relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                        loginRole === "ADMIN"
                          ? "border-purple-500 bg-purple-500/10 text-purple-300"
                          : "border-white/10 bg-black/20 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          loginRole === "ADMIN"
                            ? "bg-purple-500/20"
                            : "bg-white/5"
                        }`}
                      >
                        <ShieldCheck size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Admin
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-600">
                          Manage platform
                        </p>
                      </div>

                      {loginRole === "ADMIN" && (
                        <Check
                          size={16}
                          className="ml-auto text-purple-400"
                        />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-600">
                    Selected login type:{" "}
                    <span className="font-bold text-gray-400">
                      {loginRole === "ADMIN"
                        ? "Administrator"
                        : "Student"}
                    </span>
                  </p>
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold text-gray-400"
                  >
                    Email Address
                  </label>

                  <div className="flex items-center rounded-xl border border-white/10 bg-black/20 transition focus-within:border-indigo-500/50">
                    <Mail
                      size={18}
                      className="ml-4 shrink-0 text-gray-600"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-700"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold text-gray-400"
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

                  <div className="flex items-center rounded-xl border border-white/10 bg-black/20 transition focus-within:border-indigo-500/50">
                    <Lock
                      size={18}
                      className="ml-4 shrink-0 text-gray-600"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password:
                            e.target.value,
                        }))
                      }
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-700"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="mr-3 rounded-lg p-1.5 text-gray-600 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}

                <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/10 bg-black/20 accent-indigo-600"
                  />

                  Remember me on this device
                </label>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20 transition hover:scale-[1.01] hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Login as{" "}
                      {loginRole === "ADMIN"
                        ? "Admin"
                        : "Student"}

                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}

              <div className="mt-7 border-t border-white/5 pt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                </p>

                <Link
                  href="/register"
                  className="mt-2 inline-block text-sm font-bold text-indigo-400 transition hover:text-indigo-300"
                >
                  Create a New Account
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-[11px] text-gray-700">
              {loginRole === "ADMIN"
                ? "Admin access is limited to authorized administrators."
                : "Students can access quizzes, results, performance and leaderboard."}
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="text-indigo-400">
        {icon}
      </div>

      <p className="mt-3 text-lg font-black">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-700">
        {label}
      </p>
    </div>
  );
}
