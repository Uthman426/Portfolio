"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Github,
  LinkedinIcon,
  MessageCircle,
  Send,
} from "lucide-react";

export default function ContactSection() {
  const socials = {
    email: "uthmanolaleke@gmail.com", 
    phone: "+2349037132912", 
    whatsapp: "https://wa.me/2349037132912", 
    github: "https://github.com/Uthman426", 
    linkedin: "https://linkedin.com/in/olaleke-uthman", 
  };

  // TODO: replace with your background image path
  // Put the image in: /public/images/contact-bg.jpg
  const bgImage = "/images/contact-bg.jpg";

  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: "",
    // simple anti-bot honeypot (keep empty)
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    // basic validation
    if (!form.email || !form.subject || !form.message) {
      return setStatus({ type: "error", msg: "Please fill all fields." });
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message");
      }

      setStatus({ type: "success", msg: "Message sent successfully ✅" });
      setForm({ email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus({ type: "error", msg: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full bg-black text-white">
      <div
        className="relative w-full min-h-[520px] md:min-h-[560px] overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 px-6 md:px-16 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* LEFT */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s Connect
              </h2>

              <p className="text-slate-200 leading-relaxed max-w-lg">
                I am currently looking for new opportunities, my inbox is always
                open. Whether you have a question or just want to say hi, I will
                try my best to get back to you!
              </p>

              <div className="flex items-center gap-4 mt-6">
                {/* Mail */}
                <a
                  href={`mailto:${socials.email}`}
                  className="p-2 rounded-full border border-white/20 hover:border-white/50 transition"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>

                {/* Phone */}
                <a
                  href={`tel:${socials.phone}`}
                  className="p-2 rounded-full border border-white/20 hover:border-white/50 transition"
                  title="Call"
                >
                  <Phone className="w-5 h-5" />
                </a>

                {/* WhatsApp */}
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:border-white/50 transition"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                {/* GitHub */}
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:border-white/50 transition"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:border-white/50 transition"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* RIGHT FORM */}
            <form
              onSubmit={onSubmit}
              className="w-full bg-zinc-950/55 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-7"
            >
              {/* Honeypot (hidden) */}
              <input
                className="hidden"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company"
              />

              <label className="block text-sm text-slate-200 mb-2">
                Your email
              </label>
              <input
                className="w-full mb-5 p-3 rounded-xl bg-zinc-900/70 border border-white/10 outline-none focus:border-white/30"
                placeholder="example@google.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label className="block text-sm text-slate-200 mb-2">
                Subject
              </label>
              <input
                className="w-full mb-5 p-3 rounded-xl bg-zinc-900/70 border border-white/10 outline-none focus:border-white/30"
                placeholder="Just saying hi"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />

              <label className="block text-sm text-slate-200 mb-2">
                Message
              </label>
              <textarea
                className="w-full mb-6 p-3 rounded-xl bg-zinc-900/70 border border-white/10 outline-none focus:border-white/30 min-h-[120px] resize-none"
                placeholder="Let's talk about..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              {status.msg ? (
                <div
                  className={`mb-4 text-sm ${
                    status.type === "success"
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}
                >
                  {status.msg}
                </div>
              ) : null}

              <button
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 border border-white/15 hover:border-white/40 transition disabled:opacity-50"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
