"use client";

import Link from "next/link";
import { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation";

import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Flame,
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
  Mail,
  X,
  XCircle,
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

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  /*
   * ---------------------------------------------------------
   * THEME
   * ---------------------------------------------------------
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
   * ---------------------------------------------------------
   * LOAD PROFILE
   * ---------------------------------------------------------
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
   * ---------------------------------------------------------
   * LOGOUT
   * ---------------------------------------------------------
   */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    toast.success("Logged out successfully.");

    router.replace("/login");
    router.refresh();
  };

  /*
   * ---------------------------------------------------------
   * SAVE PROFILE
   * ---------------------------------------------------------
   */

  const handleSaveProfile = async () => {
    if (!profile) return;

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    try {
      setSaving(true);

      const { data, error } = await supabase
        .from("profiles")
        .update({
          name: trimmedName,
        })
        .eq("id", profile.id)
        .select("id, name, email, role, status")
        .single();

      if (error) {
        console.error(error);

        toast.error(
          error.message || "Unable to update profile."
        );

        return;
      }

      setProfile(data);
      setName(data.name || "");

      setEditing(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * LOADING
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] dark:bg-[#08090b]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-600" />

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * USER DATA
   * ---------------------------------------------------------
   */

  const firstName =
    profile?.name?.split(" ")[0] || "Student";

  const initials =
    profile?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "S";

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900 transition-colors duration-300 dark:bg-[#08090b] dark:text-white">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

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
            aria-label="Close sidebar"
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
            <SidebarItem
              icon={<User size={19} />}
              label="Profile"
              active
            />

            <Link
              href="/student/settings"
              onClick={() => setSidebarOpen(false)}
            >
              <SidebarItem
                icon={<Settings size={19} />}
                label="Settings"
              />
            </Link>
          </nav>
        </div>

        {/* BOTTOM */}

        <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Flame size={18} />
              </div>

              <div>
                <p className="text-xs font-bold">
                  7 Day Streak 🔥
                </p>

                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Keep learning!
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

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[270px]">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#08090b]/80">
          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-gray-200 bg-white p-2.5 lg:hidden dark:border-white/10 dark:bg-white/5"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Student Dashboard
                </p>

                <h2 className="text-lg font-bold">
                  My Profile
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
                    className="text-gray-600"
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
                  {initials}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* PROFILE HERO */}

          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl shadow-indigo-500/10 sm:p-8">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-purple-300/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* AVATAR */}

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 text-3xl font-black shadow-xl backdrop-blur-md">
                {initials}
              </div>

              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2 text-indigo-100">
                  <Sparkles size={16} />

                  <span className="text-xs font-bold uppercase tracking-[0.15em]">
                    Student Profile
                  </span>
                </div>

                <h1 className="text-2xl font-black sm:text-3xl">
                  Welcome, {firstName}! 👋
                </h1>

                <p className="mt-2 text-sm text-indigo-100">
                  Manage your profile information and
                  keep your learning account up to date.
                </p>
              </div>

              <div className="hidden h-28 w-28 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-md lg:flex">
                <User
                  size={58}
                  strokeWidth={1.5}
                  className="text-white"
                />
              </div>
            </div>
          </section>

          {/* PROFILE + ACCOUNT */}

          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

            {/* PROFILE INFORMATION */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Your basic account information
                  </p>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
                  >
                    <Edit3 size={15} />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="mt-7 space-y-5">

                {/* NAME */}

                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400"
                  >
                    Full Name
                  </label>

                  {editing ? (
                    <input
                      id="profile-name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                      <User
                        size={17}
                        className="text-gray-400"
                      />

                      <span className="text-sm font-semibold">
                        {profile?.name || "Not available"}
                      </span>
                    </div>
                  )}
                </div>

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                    <Mail
                      size={17}
                      className="text-gray-400"
                    />

                    <span className="truncate text-sm font-semibold">
                      {profile?.email || "Not available"}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-400">
                    Email address cannot be changed from
                    this page.
                  </p>
                </div>

                {/* ROLE */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400">
                      Account Role
                    </label>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                      <ShieldCheck
                        size={17}
                        className="text-indigo-500"
                      />

                      <span className="text-sm font-semibold">
                        {profile?.role || "STUDENT"}
                      </span>
                    </div>
                  </div>

                  {/* STATUS */}

                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400">
                      Account Status
                    </label>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                      <CheckCircle2
                        size={17}
                        className="text-emerald-500"
                      />

                      <span className="text-sm font-semibold">
                        {profile?.status || "ACTIVE"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SAVE */}

                {editing && (
                  <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end dark:border-white/10">

                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setName(profile?.name || "");
                      }}
                      disabled={saving}
                      className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
                )}
              </div>
            </div>

            {/* ACCOUNT OVERVIEW */}

            <div className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

              <div>
                <h3 className="font-black">
                  Account Overview
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Your learning activity
                </p>
              </div>

              <div className="mt-6 space-y-3">

                <ProfileStat
                  icon={<BookOpen size={18} />}
                  title="Quizzes Attempted"
                  value="24"
                  iconClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                />

                <ProfileStat
                  icon={<CheckCircle2 size={18} />}
                  title="Passed"
                  value="18"
                  iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                />

                <ProfileStat
                  icon={<XCircle size={18} />}
                  title="Failed"
                  value="6"
                  iconClass="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                />

                <ProfileStat
                  icon={<Trophy size={18} />}
                  title="Best Score"
                  value="96%"
                  iconClass="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                />

                <ProfileStat
                  icon={<Flame size={18} />}
                  title="Current Streak"
                  value="7 days"
                  iconClass="bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                />
              </div>

              {/* PERFORMANCE LINK */}

              <Link
                href="/student/performance"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 text-xs font-bold text-gray-600 transition hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
              >
                View Performance
                <ChevronRight size={15} />
              </Link>
            </div>
          </section>

          {/* SECURITY */}

          <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#101114]">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="font-black">
                    Account Security
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                    Your account is protected through
                    Supabase authentication. Keep your
                    account credentials secure.
                  </p>
                </div>
              </div>

              <Link
                href="/student/settings"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Account Settings
                <ChevronRight size={15} />
              </Link>
            </div>
          </section>

          {/* QUICK NAVIGATION */}

          <section className="mt-6 grid gap-4 sm:grid-cols-3">

            <QuickLink
              href="/student/dashboard"
              icon={<Home size={20} />}
              title="Dashboard"
              description="View your overview"
            />

            <QuickLink
              href="/quiz"
              icon={<BookOpen size={20} />}
              title="Explore Quizzes"
              description="Find a new challenge"
            />

            <QuickLink
              href="/student/performance"
              icon={<BarChart3 size={20} />}
              title="Performance"
              description="Track your progress"
            />
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
| PROFILE STAT
|--------------------------------------------------------------------------
*/

function ProfileStat({
  icon,
  title,
  value,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconClass: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3 dark:border-white/5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          {title}
        </span>
      </div>

      <span className="text-sm font-black">
        {value}
      </span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| QUICK LINK
|--------------------------------------------------------------------------
*/

function QuickLink({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#101114]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
          {icon}
        </div>

        <ChevronRight
          size={17}
          className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-indigo-500"
        />
      </div>

      <h3 className="mt-4 text-sm font-black">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </Link>
  );
}
