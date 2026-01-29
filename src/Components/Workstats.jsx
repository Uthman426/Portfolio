"use client";

import { useEffect, useState } from "react";

export default function StatsBar() {
  const [stats, setStats] = useState(null);

  async function loadStats() {
    const res = await fetch("/api/stats", { cache: "no-store" });
    const data = await res.json();
    setStats({
      totalProjects: data.totalProjects ?? 0,
      totalClients: data.totalClients ?? 0,
      years: data.years ?? 0,
    });
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="w-full px-6 md:px-16 py-10 bg-black text-white">
      <div className="border border-zinc-800 rounded-2xl p-10 flex items-center justify-between">
        <div>
          <div className="text-5xl font-bold">{stats ? `${stats.totalProjects}+` : "..."}</div>
          <div className="text-slate-400 mt-2">Projects</div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold">{stats ? `~${stats.totalClients}` : "..."}</div>
          <div className="text-slate-400 mt-2">Clients</div>
        </div>

        <div className="text-right">
          <div className="text-5xl font-bold">{stats ? stats.years : "..."}</div>
          <div className="text-slate-400 mt-2">Years</div>
        </div>
      </div>
    </div>
  );
}
