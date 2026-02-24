import { useState, useEffect } from "react";
import profile from "../data/profile";

function useTypingEffect(text, speed = 50) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypingEffect(profile.headline, 40);

  return (
    <section
      id="home"
      className="hero-gradient flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Photo */}
        <img
          src={profile.photo}
          alt={profile.name}
          className="mx-auto mb-6 h-32 w-32 rounded-full object-cover object-top shadow-xl ring-4 ring-indigo-200 dark:ring-indigo-800"
        />

        {/* Currently badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          {profile.currentStatus}
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          {displayed}
          <span className={`typing-cursor ${done ? "opacity-0" : ""}`}>|</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {profile.subtext}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-md transition-all hover:shadow-lg hover:text-indigo-600 dark:bg-slate-800 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-600 dark:text-gray-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
          >
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}
