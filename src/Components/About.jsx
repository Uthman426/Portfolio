"use client"

import { useState,useEffect,useMemo } from "react"

const tabs = [
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
];


export default function About(){
    const [activeTab, setActiveTab] = useState("skills");
      const [skillInfo, setSkillinfo] = useState([]);
      const [loading, setLoading] = useState(true);
       async function loadskills() {
        try {
            setLoading(true);
          const res = await fetch("/api/skills-experience", { cache: "no-store" });
        //   const data = await res.json();
        // setSkillinfo(data.skillInfo || []);
        const text = await res.text();
      const data = text ? JSON.parse(text) : null;
       if (!res.ok) throw new Error(data?.message || "Failed to load data");
      setSkillinfo(data.skillInfo || []);
            
        } catch (error) {
            alert(error)
        }
          
          
          setLoading(false);
        }
      
        useEffect(() => {
          loadskills();
        }, []);
        const filtered = useMemo(() => {
    return skillInfo.filter((item) => item.SkillEduExp === activeTab);
  }, [skillInfo, activeTab]);
    return(
        <div>
            <div className="flex justify-between">
                <div>
                  <div>
                    <div>
                        <img src="/images/My-profile-image.jpg" alt="profile image" />
                    </div>
                  </div>
                </div>
                <div className="w-[50%] text-white">
                    <header>
                        <h1 className="text-white text-4xl font-bold mb-5">
                        About Me
                     </h1>
                    </header>
                     
                     <p className=" text-lg">
                        I am a full stack web developer with a passion for 
                        creating interactive and responsive web applications.
                         I have experience working with JavaScript, React, Redux,
                          Node.js, Express, MongoDB, HTML, CSS, and Git. 
                          I am a quick learner and I am always looking to expand 
                          my knowledge and skill set. I am a team player and I am
                         excited to work with others to create amazing applications.
                     </p>
                     <div>
                          
                            <div className="flex gap-3 mt-8">
            {tabs.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-6 py-2 rounded-full border transition
                    ${isActive ? "border-white text-white" : "border-zinc-700 text-slate-300 hover:border-zinc-500"}
                  `}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          
           <div className="mt-6 border border-zinc-800 rounded-2xl p-6 bg-zinc-950/40">
            {loading ? (
              <p className="text-slate-400">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-slate-400">No items yet. Add from admin.</p>
            ) : (
              <ul className="space-y-3">
                {filtered.map((item) => (
                  <li key={item._id} className="text-slate-200 flex gap-3">
                    <span className="text-slate-500">•</span>
                    <span>{item.TheSkill}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        
      
    
                          
                     </div>
                </div>
            </div>
        </div>
    )
}