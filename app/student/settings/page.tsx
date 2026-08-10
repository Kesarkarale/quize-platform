"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BarChart3,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Home,
  LogOut,
  Menu,
  Moon,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  User,
  X,
} from "lucide-react";

import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /*
   * LOAD THEME
   */

  useEffect(() => {
    const savedTheme = localStorage.getItem("quiz-theme");

    const isDark = savedTheme === "dark";

    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setThemeLoaded(true);
  }, []);

  /*
   * APPLY THEME
   */

  useEffect(() => {
    if (!themeLoaded) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("quiz-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("quiz-theme", "light");
    }
  }, [darkMode, themeLoaded]);

  /*
   * LOAD PROFILE
   */

  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, email, role, status")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          console.error(error);

          toast.error("Unable to load your profile.");
          router.replace("/login");
          return;
        }

        if (data.role !== "STUDENT") {
          router.replace("/admin/dashboard");
          return;
        }

        if (data.status !== "ACTIVE") {
          await supabase.auth.signOut();

          router.replace("/login");
          return;
        }

        setProfile(data);
        setName(data.name || "");
      } catch (error) {
        console.error(error);

        toast.error("Something went wrong.");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router, supabase]);

  /*
   * UPDATE NAME
   */

  const handleSaveProfile = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (!profile) {
      toast.error("Profile not loaded.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: trimmedName,
        })
        .eq("id", profile.id);

      if (error) {
        console.error(error);

        toast.error(
          error.message || "Unable to update profile."
        );

        return;
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: trimmedName,
            }
          : prev
      );

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  /*
   * CHANGE PASSWORD
   */

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill both password fields.");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        console.error(error);

        toast.error(
          error.message || "Unable to change password."
        );

        return;
      }

      setPassword("");
      setConfirmPassword("");

      toast.success(
        "Password changed successfully."
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setPasswordLoading(false);
    }
  };

  /*
   * LOGOUT
   */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    toast.success("Logged out successfully.");

    router.replace("/login");
    router.refresh();
  };

  /*
   * LOADING
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] dark:bg-[#08090b]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-600" />

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    profile?.name?.split(" ")[0] || "Student";

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900 transition-colors duration-300 dark:bg-[#08090b] dark:text-white">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[270px] border-r border-gray-200 bg-white px-5 py-6 transition-transform duration-300 dark:border-white/10 dark:bg-[#101114] ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* LOGO */}

        <div className="flex items-center justify-between">

          <Link
            href="/student/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Quiz<span className="text-indigo-600">Pro</span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                Learning Platform
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* MAIN MENU */}

        <div className="mt-10">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-1">

            <Link
              href="/student/dashboard"
              onClick={() => setSidebarOpen(false)}
            >
              <SidebarItem
                icon={<Home size={19} />}
                label="Dashboard"
              />
            </Link>

            <Link
              href="/quiz"
              onClick={() => setSidebarOpen(false)}
            >
              <SidebarItem
                icon={<BookOpen size={19} />}
                label="Explore Quizzes"
              />
            </Link>

            <Link
              href="/leaderboard"
              onClick={() => setSidebarOpen(false)}
            >
              <SidebarItem
                icon={<Trophy size={19} />}
                label="Leaderboard"
              />
            </Link>

            <Link
              href="/student/performance"
              onClick={() => setSidebarOpen(false)}
            >
              <SidebarItem
                icon={<BarChart3 size={19} />}
                label="My Performance"
              />
            </Link>

          </nav>
        </div>

        {/* ACCOUNT */}

        <div className="mt-8">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">

            <Link
              href="/student/profile"
              onClick={() => setSidebarOpen(false)}
            >
              <SidebarItem
                icon={<User size={19} />}
                label="Profile"
              />
            </Link>

            <SidebarItem
              icon={<Settings size={19} />}
              label="Settings"
              active
            />

          </nav>
        </div>

        {/* BOTTOM */}

        <div className="absolute bottom-5 left-5 right-5">

          <div className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-xs font-bold">
                  Account Secure
                </p>

                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Keep your account safe
                </p>
              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN */}

      <main className="lg:ml-[270px]">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#08090b]/80">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-gray-200 bg-white p-2.5 lg:hidden dark:border-white/10 dark:bg-white/5"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Student Dashboard
                </p>

                <h2 className="text-lg font-bold">
                  Settings
                </h2>
              </div>

            </div>

            <div className="flex items-center gap-3">

              {/* THEME */}

              <button
                type="button"
                aria-label={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                onClick={() =>
                  setDarkMode((prev) => !prev)
                }
                className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {darkMode ? (
                  <Sun
                    size={19}
                    className="text-yellow-400"
                  />
                ) : (
                  <Moon
                    size={19}
                    className="text-gray-600 dark:text-gray-300"
                  />
                )}
              </button>

              {/* USER */}

              <div className="hidden items-center gap-3 sm:flex">

                <div className="text-right">

                  <p className="text-sm font-bold">
                    {profile?.name || "Student"}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Student
                  </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-lg">
                  {firstName.charAt(0).toUpperCase()}
                </div>

              </div>

            </div>

          </div>
        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* PAGE INTRO */}

          <div className="mb-6">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Settings size={23} />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  Account Settings
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Manage your account preferences and security.
                </p>
              </div>

            </div>

          </div>

          {/* PROFILE SETTINGS */}

          <section className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-[#101114]">

            <div className="flex items-center gap-3 border-b border-gray-100 pb-5 dark:border-white/10">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <User size={19} />
              </div>

              <div>
                <h2 className="font-black">
                  Profile Information
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Update your personal information.
                </p>
              </div>

            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                />

                <p className="mt-2 text-[10px] text-gray-400">
                  Email address cannot be changed here.
                </p>

              </div>

            </div>

            <div className="mt-6 flex justify-end">

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </section>

          {/* PASSWORD */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-[#101114]">

            <div className="flex items-center gap-3 border-b border-gray-100 pb-5 dark:border-white/10">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2 className="font-black">
                  Password & Security
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Keep your account protected with a strong password.
                </p>
              </div>

            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* PASSWORD */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  New Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-white"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-bold text-gray-600 dark:text-gray-300"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-white"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

            </div>

            <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:flex-row sm:items-center dark:border-indigo-500/20 dark:bg-indigo-500/10">

              <div>

                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  Password requirements
                </p>

                <p className="mt-1 text-[11px] text-indigo-600/70 dark:text-indigo-300/70">
                  Use at least 6 characters for your new password.
                </p>

              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={passwordLoading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {passwordLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    Change Password
                  </>
                )}
              </button>

            </div>

          </section>

          {/* ACCOUNT STATUS */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-[#101114]">

            <div className="flex items-center gap-3 border-b border-gray-100 pb-5 dark:border-white/10">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Check size={19} />
              </div>

              <div>
                <h2 className="font-black">
                  Account Status
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Current account information.
                </p>
              </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <InfoBox
                label="Account Status"
                value={profile?.status || "ACTIVE"}
                positive
              />

              <InfoBox
                label="Account Role"
                value={profile?.role || "STUDENT"}
              />

              <InfoBox
                label="Member"
                value="Student"
              />

            </div>

          </section>

          {/* THEME */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-[#101114]">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  {darkMode ? (
                    <Moon size={19} />
                  ) : (
                    <Sun size={19} />
                  )}
                </div>

                <div>

                  <h2 className="font-black">
                    Appearance
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Choose between light and dark mode.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setDarkMode((prev) => !prev)
                }
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-bold transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10"
              >

                {darkMode ? (
                  <>
                    <Sun
                      size={17}
                      className="text-yellow-400"
                    />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon
                      size={17}
                      className="text-gray-600 dark:text-gray-300"
                    />
                    Dark Mode
                  </>
                )}

              </button>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="mt-10 border-t border-gray-200 py-6 text-center dark:border-white/10">

            <p className="text-xs text-gray-400">
              © 2026 QuizPro. Learn. Challenge. Achieve.
            </p>

          </footer>

        </div>
      </main>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SIDEBAR ITEM
|--------------------------------------------------------------------------
*/

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INFO BOX
|--------------------------------------------------------------------------
*/

function InfoBox({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/[0.03]">

      <p className="text-[11px] font-medium text-gray-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">

        {positive && (
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        )}

        <p
          className={`text-sm font-black ${
            positive
              ? "text-emerald-600 dark:text-emerald-400"
              : ""
          }`}
        >
          {value}
        </p>

      </div>

    </div>
  );
}

