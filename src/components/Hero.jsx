import profile from "../data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Initials avatar */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
          {profile.initials}
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          {profile.headline}
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {profile.subtext}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-slate-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-slate-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
