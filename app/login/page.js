"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState("signin"); // or "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        if (error) throw error;
        setMessage("Account created. Please check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        setMessage("Signed in successfully.");
      }
    } catch (err) {
      setMessage(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">{mode === "signup" ? "Create an account" : "Sign in"}</h1>
      <p className="mt-2 text-neutral-600 text-sm">
        {mode === "signup"
          ? "Register with your name, email and a password."
          : "Enter your email and password to continue."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm text-neutral-700">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
              placeholder="Jane Smith"
            />
          </div>
        )}
        <div>
          <label className="block text-sm text-neutral-700">Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "signup" ? "Create Account" : "Sign In"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="w-full rounded-md border text-sm px-4 py-2 hover:bg-neutral-50"
        >
          {mode === "signup" ? "Have an account? Sign in" : "New here? Create an account"}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-sm text-neutral-700">{message}</div>
      )}
    </div>
  );
}

