"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
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
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordChecks = useMemo(() => {
    const password = formData.password;

    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, [formData.password]);

  const passwordStrong =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.number;

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword =
      formData.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (name.length < 2) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!passwordStrong) {
      toast.error(
        "Password must contain 8 characters, uppercase, lowercase and a number."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        toast.error(
          result?.message ||
            "Unable to create your account."
        );
        return;
      }

      toast.success(
        "Account created successfully!"
      );

      router.replace("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      toast.error(
        "Unable to connect to the server. Please try again."
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

        <div className="absolute left-[45%] top-[35%] h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <section className="hidden flex-col justify-between border-r border-white/5 bg-white/[0.015] p-10 lg:flex xl:p-16">
          {/* Logo */}

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

              Join thousands of learners
            </div>

            <h1 className="text-5xl font-black leading-[1.08] xl:text-6xl">
              Build your
              <br />

              knowledge.
              <br />

              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                One quiz at a time.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-gray-500">
              Create your free student account and
              start taking online assessments,
              tracking your progress and improving
              your skills.
            </p>

            {/* Benefits */}

            <div className="mt-10 space-y-4">
              <Benefit
                title="Access online quizzes"
                description="Explore quizzes across multiple categories."
              />

              <Benefit
                title="Track your performance"
                description="See your scores, attempts and progress."
              />

              <Benefit
                title="Compete on leaderboard"
                description="Challenge yourself and improve your rank."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-700">
            <ShieldCheck size={15} />

            Your account is protected with secure
            authentication
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
              className="mb-8 flex items-center justify-center gap-3 lg:hidden"
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
                  Get started
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Join QuizMaster and start your
                  assessment journey.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >
                {/* Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-gray-400"
                  >
                    Full Name
                  </label>

                  <div className="flex items-center rounded-xl border border-white/10 bg-black/20 transition focus-within:border-indigo-500/50">
                    <User
                      size={18}
                      className="ml-4 shrink-0 text-gray-600"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-700"
                    />
                  </div>
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
                        updateField(
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-700"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-bold text-gray-400"
                  >
                    Password
                  </label>

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
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        updateField(
                          "password",
                          e.target.value
                        )
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

                {/* Password Rules */}

                {formData.password.length > 0 && (
                  <div className="rounded-xl border border-white/5 bg-black/10 p-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      Password requirements
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <PasswordRule
                        valid={
                          passwordChecks.length
                        }
                        text="8+ characters"
                      />

                      <PasswordRule
                        valid={
                          passwordChecks.uppercase
                        }
                        text="Uppercase"
                      />

                      <PasswordRule
                        valid={
                          passwordChecks.lowercase
                        }
                        text="Lowercase"
                      />

                      <PasswordRule
                        valid={
                          passwordChecks.number
                        }
                        text="Number"
                      />
                    </div>
                  </div>
                )}

                {/* Confirm Password */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-bold text-gray-400"
                  >
                    Confirm Password
                  </label>

                  <div className="flex items-center rounded-xl border border-white/10 bg-black/20 transition focus-within:border-indigo-500/50">
                    <Lock
                      size={18}
                      className="ml-4 shrink-0 text-gray-600"
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
                      value={
                        formData.confirmPassword
                      }
                      onChange={(e) =>
                        updateField(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-700"
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="mr-3 rounded-lg p-1.5 text-gray-600 transition hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {formData.confirmPassword &&
                    formData.password !==
                      formData.confirmPassword && (
                      <p className="mt-2 text-xs text-red-400">
                        Passwords do not match.
                      </p>
                    )}
                </div>

                {/* Terms */}

                <label className="flex cursor-pointer items-start gap-2 pt-1 text-xs leading-5 text-gray-600">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/10 bg-black/20 accent-indigo-600"
                  />

                  <span>
                    I agree to the platform's{" "}
                    <span className="font-semibold text-gray-400">
                      Terms & Conditions
                    </span>{" "}
                    and Privacy Policy.
                  </span>
                </label>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20 transition hover:scale-[1.01] hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              {/* Login */}

              <div className="mt-7 border-t border-white/5 pt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?
                </p>

                <Link
                  href="/login"
                  className="mt-2 inline-block text-sm font-bold text-indigo-400 transition hover:text-indigo-300"
                >
                  Login to your account
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-[11px] text-gray-700">
              Student accounts can access quizzes,
              results, performance and leaderboard.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

/* =========================================
   BENEFIT
========================================= */

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
        <Check size={17} />
      </div>

      <div>
        <p className="text-sm font-bold text-gray-300">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================
   PASSWORD RULE
========================================= */

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[10px] ${
        valid
          ? "text-green-400"
          : "text-gray-700"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          valid
            ? "bg-green-500/10"
            : "bg-white/5"
        }`}
      >
        <Check size={10} />
      </span>

      {text}
    </div>
  );
}
