"use client";

import { LockKeyhole, LogIn } from "lucide-react";
import { type FormEvent, useState } from "react";

type AdminLoginFormProps = {
  nextPath: string;
};

export function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to sign in.");
      }

      window.location.assign(nextPath);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper-100 text-navy-950">
      <section className="container-px flex min-h-[calc(100vh-12rem)] items-center justify-center py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-xl border border-navy-200 bg-paper-50 p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-navy-200 pb-5">
            <span className="inline-flex size-12 items-center justify-center border border-navy-950 bg-navy-950 text-paper-50">
              <LockKeyhole aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="section-label">Secure admin</p>
              <h1 className="mt-1 text-xl font-semibold text-navy-950">Blog dashboard login</h1>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-navy-900">
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="form-input"
                autoComplete="username"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-navy-900">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-input"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-navy-950 bg-navy-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper-50 transition hover:bg-paper-50 hover:text-navy-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn aria-hidden="true" className="size-4" />
              {loading ? "Signing in" : "Sign in"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
