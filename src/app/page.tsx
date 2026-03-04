"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50">
      {/* Playful background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="relative z-10 text-center max-w-2xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 inline-block text-transparent bg-clip-text">
          Decode Your GitHub Developer DNA
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Enter a username to run a full genome scan on their commit history, traits, and weird habits.
        </p>

        <form onSubmit={handleAnalyze} className="max-w-md mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex bg-white shadow-xl rounded-xl items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="flex-1 px-6 py-4 rounded-l-xl focus:outline-none text-lg bg-transparent"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-r-xl hover:bg-indigo-700 transition-colors"
            >
              Scan
            </button>
          </div>
        </form>

        <div className="mt-8 text-sm text-slate-500">
          Try:{" "}
          <button onClick={() => setUsername("torvalds")} className="font-semibold text-indigo-600 hover:underline">torvalds</button> |{" "}
          <button onClick={() => setUsername("gaearon")} className="font-semibold text-pink-600 hover:underline">gaearon</button> |{" "}
          <button onClick={() => setUsername("leerob")} className="font-semibold text-purple-600 hover:underline">leerob</button>
        </div>
      </div>
    </main>
  );
}
