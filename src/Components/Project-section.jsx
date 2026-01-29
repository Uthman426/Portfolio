"use client";

import { useEffect, useMemo, useState } from "react";

const tabs = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "server", label: "Servers" },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    setLoading(true);
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [projects, activeTab]);

  return (
    <section className="w-full px-6 md:px-16 py-12 bg-black text-white">
      <div className="flex items-center justify-center gap-4 mb-10">
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-8 py-3 rounded-full border transition
                ${isActive ? "border-white text-white" : "border-slate-600 text-slate-300 hover:border-slate-400"}
              `}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center text-slate-400">Loading projects...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-slate-400">No projects yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="group bg-zinc-950/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="p-5">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded-xl opacity-90 group-hover:opacity-100 transition"
                />
              </div>

              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-slate-400 mt-2 line-clamp-2">{p.description}</p>

                <div className="flex gap-3 mt-5">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90"
                  >
                    Live
                  </a>
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    className="px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500"
                  >
                    GitHub
                  </a>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  {p.category === "web" ? "Web Project" : "Server Project"}
                  {p.isClient ? " • Client work" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
