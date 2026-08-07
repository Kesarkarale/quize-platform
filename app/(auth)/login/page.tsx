"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login Successful");

      router.push("/student/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            Quiz Platform
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="font-medium">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4">

              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-3 outline-none"

                value={formData.email}

                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

            </div>

          </div>

          <div>

            <label className="font-medium">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4">

              <Lock size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full p-3 outline-none"

                value={formData.password}

                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
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

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex justify-center items-center gap-2 transition"
          >

            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Login
                <ArrowRight size={18} />
              </>
            )}

          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            href="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

        <div className="text-center mt-5">

          <p className="text-gray-600">
            Don't have an account?

            <Link
              href="/register"
              className="text-indigo-600 ml-2 font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}
