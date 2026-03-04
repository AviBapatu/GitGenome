"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/user/${username.trim()}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#faf8f5] text-slate-800 font-patrick">
      {/* Paper texture overlay & faint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Vignette / dirty desk effect */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.1)]" />

      {/* Doodles & Background Elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] opacity-40 transform -rotate-12 select-none"
        animate={{ rotate: [-12, -10, -12] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
          <path d="M50 20 Q 80 10, 80 40 Q 80 80, 50 80 Q 20 80, 20 40 Q 20 10, 50 20 Z" />
          <path d="M35 45 Q 40 50, 45 45 M55 45 Q 60 50, 65 45" />
          <path d="M48 60 Q 50 65, 52 60" />
        </svg>
        <p className="font-caveat text-sm mt-2 ml-4 -rotate-6 text-slate-600">whoooo...</p>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-[15%] opacity-40 transform rotate-12 select-none"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 10 L50 30 M10 50 L30 50 M90 50 L70 50 M50 90 L50 70 M22 22 L36 36 M78 22 L64 36 M22 78 L36 64 M78 78 L64 64" />
        </svg>
        <p className="font-caveat text-sm mt-2 ml-4 text-slate-600">chaos detected!</p>
      </motion.div>

      {/* Coffee stain */}
      <div className="absolute top-[10%] right-[30%] w-32 h-32 border-[8px] border-[rgba(139,69,19,0.1)] rounded-full transform rotate-45 select-none" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Main Title */}
        <div className="text-center mb-12 relative">
          <h1 className="text-6xl md:text-8xl font-bold font-caveat text-slate-800 -rotate-2 transform">
            GitGenome
          </h1>
          <h2 className="text-2xl md:text-3xl font-patrick text-slate-600 mt-4 transform rotate-1 underline decoration-wavy decoration-slate-400 underline-offset-4">
            Mapping the DNA of Devs
          </h2>

          <div className="absolute -top-6 -right-16 transform rotate-12 font-caveat text-rose-500 text-xl hidden md:block">
            <svg className="w-8 h-8 inline absolute -left-8 top-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
            results may be chaotic
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="w-full max-w-md relative mb-16">
          <label className="block font-caveat text-2xl text-slate-600 mb-2 transform -rotate-1 group-focus-within:text-slate-800 transition-colors">
            GitHub specimen username:
          </label>
          <div className="relative flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds"
              className="w-full bg-transparent border-2 border-slate-700 rounded-lg px-4 py-3 text-xl font-patrick focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all text-center sm:text-left
              shadow-[2px_2px_0px_0px_rgba(51,65,85,1)] hover:shadow-[4px_4px_0px_0px_rgba(51,65,85,1)] hover:-translate-y-0.5"
              style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
              required
            />

            <button
              type="submit"
              className="px-6 py-3 bg-red-50 text-red-700 border-2 border-red-700 font-bold font-patrick text-xl whitespace-nowrap
              shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] hover:shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all
              active:shadow-none active:translate-x-1 active:translate-y-1 transform -rotate-2 hover:-rotate-1"
              style={{ borderRadius: '3px 15px 5px 15px/15px 5px 15px 3px' }}
            >
              [ Analyze DNA ]
            </button>
          </div>
        </form>

        {/* Example Profiles Section */}
        <div className="w-full max-w-lg mt-8 relative">
          <h3 className="font-caveat text-2xl text-slate-500 mb-6 text-center transform rotate-1">
            Try a known specimen:
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Sticky Note 1 */}
            <button
              onClick={() => setUsername("torvalds")}
              className="bg-yellow-100 hover:bg-yellow-200 text-slate-800 p-4 shadow-md font-caveat text-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all w-32 h-32 flex items-center justify-center text-center relative"
              style={{ borderRadius: '2px 14px 4px 20px / 7px 2px 13px 4px' }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-red-400/50 transform -rotate-2" />
              Linus<br />Torvalds
            </button>

            {/* Sticky Note 2 */}
            <button
              onClick={() => setUsername("gaearon")}
              className="bg-green-100 hover:bg-green-200 text-slate-800 p-4 shadow-md font-caveat text-2xl transform -rotate-2 hover:rotate-1 hover:scale-105 transition-all w-32 h-32 flex items-center justify-center text-center relative"
              style={{ borderRadius: '15px 3px 20px 4px / 4px 18px 3px 12px' }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-blue-400/50 transform rotate-1" />
              Dan<br />Abramov
            </button>

            {/* Sticky Note 3 */}
            <button
              onClick={() => setUsername("leerob")}
              className="bg-pink-100 hover:bg-pink-200 text-slate-800 p-4 shadow-md font-caveat text-2xl transform rotate-6 hover:rotate-2 hover:scale-105 transition-all w-32 h-32 flex items-center justify-center text-center relative"
              style={{ borderRadius: '4px 17px 2px 14px / 12px 2px 18px 5px' }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),1px_2px_3px_rgba(0,0,0,0.3)]" />
              Lee<br />Robinson
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
