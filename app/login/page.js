"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.error) {
      setError(res.error || "Invalid credentials");
      return;
    }
    // Successful sign in
    router.push("/");
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />

      <div className="w-[92%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-white text-3xl font-bold tracking-tight">Welcome to Dayflow</h2>
            <p className="text-slate-300 mt-2 text-sm">Your modern HR hub for attendance, time off and more.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/20">
                <p className="text-indigo-300 font-semibold">Smart Attendance</p>
                <p className="text-slate-300 mt-1">Beautiful yearly view and insights.</p>
              </div>
              <div className="p-4 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/20">
                <p className="text-fuchsia-300 font-semibold">Time Off</p>
                <p className="text-slate-300 mt-1">Plan leaves with confidence.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-100">
          <div className="mb-6">
            <h1 className="text-slate-900 text-2xl font-bold">Sign in</h1>
            <p className="text-slate-500 text-sm mt-1">Enter your details to access your dashboard.</p>
          </div>
          {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Email or Login ID</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-900 placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-900 placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-600">
            New to Dayflow? <a href="/register" className="text-indigo-600 hover:underline">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
