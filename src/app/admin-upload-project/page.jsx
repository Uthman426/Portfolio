"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/libs/uploadtocloud";

export default function AdminPage() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [skillopen, setskillopen] = useState(false)

    const [form, setForm] = useState({
        title: "",
        liveUrl: "",
        repoUrl: "",
        description: "",
        category: "web",
        isClient: false,
    });

    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);


    // form for uploading of skills
    const [SkillEduExp, SetSkillEduExp] = useState("skills")
    const [skill, SetSkill] = useState(" ")
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (!img1 || !img2) return alert("Upload 2 images");

        try {
            setLoading(true);

            const url1 = await uploadToCloudinary(img1);
            const url2 = await uploadToCloudinary(img2);

            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, images: [url1, url2] }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message || "Upload failed");

            alert("Project uploaded ✅");
            setOpen(false);
            setForm({
                title: "",
                liveUrl: "",
                repoUrl: "",
                description: "",
                category: "web",
                isClient: false,
            });
            setImg1(null);
            setImg2(null);
        } catch (err) {
            alert(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    // async function handlesave(e){
    //     e.preventDefault();
    //     try {
    //        setLoading(true)
    //        const res = await fetch("/api/skills-experience", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({skill,SkillEduExp}),
    //         });
            
    //         const text = await res.text();
    //         const data = text ? JSON.parse(text) : null;
    //         if (!res.ok) throw new Error(data?.message || "skill/experience/edu upload failed");

    //         // if (!data) throw new Error(data.message || "skill/experience/edu upload failed");
    //         alert ('skill or experience or education added ')
    //         setskillopen(false)
    //         SetSkill("")
    //         SetSkillEduExp("skills");

    //     } catch (err) {
    //        alert(err.message || "Something went wrong in uploading skillExpEdu"); 
    //     }
    //     setLoading(false)
    // }
    async function handlesave(e) {
  e.preventDefault();

  if (!skill.trim()) return alert("Please type something");

  try {
    setLoading(true);

    const res = await fetch("/api/skills-experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SkillEduExp,        // enum: skills | education | experience
        TheSkill: skill.trim(), // required field
      }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) throw new Error(data?.message || "skill/experience/edu upload failed");

    alert("skill or experience or education added ");
    setskillopen(false);
    SetSkill("");
    SetSkillEduExp("skills");
  } catch (err) {
    alert(err.message || "Something went wrong in uploading skillExpEdu");
  } finally {
    setLoading(false);
  }
}


    return (
        <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">Admin Upload</h1>

                <button
                    onClick={() => setOpen(true)}
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90"
                >
                    + Upload Project
                </button>
            </div>

            {/* Adding to skills and experience */}
            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold"  >
                    Admin add to skills
                </h1>

                <button
                    onClick={() => setskillopen(true)}
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90"
                >
                    + Upload skills
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50 ">
                    <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Add New Project</h2>
                            <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none"
                                placeholder="Project name"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />

                            <select
                                className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            >
                                <option value="web">Web</option>
                                <option value="server">Server</option>
                            </select>

                            <input
                                className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none md:col-span-2"
                                placeholder="Live link (https://...)"
                                value={form.liveUrl}
                                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                                required
                            />

                            <input
                                className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none md:col-span-2"
                                placeholder="GitHub repo link (https://...)"
                                value={form.repoUrl}
                                onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                                required
                            />

                            <textarea
                                className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none md:col-span-2 min-h-[110px]"
                                placeholder="Short description..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                required
                            />

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none"
                                    onChange={(e) => setImg1(e.target.files?.[0] || null)}
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none"
                                    onChange={(e) => setImg2(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>

                            <label className="md:col-span-2 flex items-center gap-3 text-slate-300">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={form.isClient}
                                    onChange={(e) => setForm({ ...form, isClient: e.target.checked })}
                                />
                                This is a client project (counts as client)
                            </label>

                            <button
                                disabled={loading}
                                className="md:col-span-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 disabled:opacity-50"
                            >
                                {loading ? "Uploading..." : "Save Project"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {skillopen && (
                <div className="mt-10 space-y-10">
                    




                        <label
                            className=" text-2xl " >
                           Select the one you want to update  <br />
                            <select
                                className=" mb-5 p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none text-lg"
                                value={SkillEduExp}
                                onChange={(e) => SetSkillEduExp(e.target.value)}
                            >
                                <option value="skills">Skill</option>
                                <option value="education">Education</option>
                                <option value="experience">Experience</option>
                            </select>
                        </label> <br />

                        <input
                            className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none md:col-span-2"
                            value={skill}
                            onChange={(e) => SetSkill(e.target.value)} type="text"
                        />
                        
                  <div>
                        <button onClick={handlesave} className="border border-gray-400 rounded p-3">
                            Save
                        </button>
                        </div>
                    
                </div>
            )

            }
        </div>
    );
}
