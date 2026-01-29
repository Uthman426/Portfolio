"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Invalid token");

      router.push("/admin-upload-project");
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6"
      >
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-slate-400 mb-6">Enter your secret token to continue.</p>

        <input
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none mb-4"
          placeholder="Secret token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
