import profile from "../data/profile";

const { reading, travel, fitness, sports, journaling, languages, funDetail } =
  profile.beyondCode;

/* ── tiny reusable card wrapper ── */
function Card({ title, icon, children }) {
  return (
    <div className="rounded-lg border border-gray-300 p-6 dark:border-slate-700 dark:bg-slate-800/50">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function BeyondCode() {
  return (
    <section id="beyond-code" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Beyond Code
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* ── READING ── */}
          <Card
            title="Reading"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          >
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {reading.intro}
            </p>
            <ul className="mb-3 space-y-1.5">
              {reading.books.map((b) => (
                <li
                  key={b.title}
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="font-medium">{b.title}</span>{" "}
                  <span className="text-gray-500 dark:text-gray-500">
                    by {b.author}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs italic text-gray-500 dark:text-gray-500">
              {reading.note}
            </p>
          </Card>

          {/* ── TRAVEL ── */}
          <Card
            title="Travel"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {travel.intro}
            </p>
            <div className="space-y-3">
              {Object.entries(travel.places).map(([country, cities]) => (
                <div key={country}>
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                    {country}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cities.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-slate-700 dark:text-gray-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View my travel moments on Instagram
            </a>
          </Card>

          {/* ── FITNESS & LIFESTYLE ── */}
          <Card
            title="Fitness & Lifestyle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          >
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {fitness.intro}
            </p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {fitness.activities.map((a) => (
                <span
                  key={a}
                  className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-slate-700 dark:text-gray-300"
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="text-xs italic text-gray-500 dark:text-gray-500">
              {fitness.note}
            </p>
          </Card>

          {/* ── SPORTS & STRATEGY ── */}
          <Card
            title="Sports & Strategy"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <div className="mb-3 flex flex-wrap gap-1.5">
              {sports.items.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-slate-700 dark:text-gray-300"
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href={sports.chessLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Chess.com Profile
            </a>
          </Card>
        </div>

        {/* ── LANGUAGES & JOURNALING row ── */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* ── LANGUAGES ── */}
          <Card
            title="Languages"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            }
          >
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lang.name}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    lang.level === "Fluent"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : lang.level === "Moderate"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* ── JOURNALING & HABIT TRACKING ── */}
          <Card
            title="Journaling & Habit Tracking"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          >
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {journaling.note}
            </p>
            <div className="mx-auto max-w-[10rem]">
              {journaling.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Journal snapshot ${i + 1}`}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700"
                />
              ))}
            </div>
          </Card>
        </div>

        {/* ── FUN DETAIL ── */}
        <p className="mt-8 text-center text-sm tracking-wide text-gray-400 dark:text-gray-600">
          ☕ {funDetail}
        </p>

        {/* ── INSTAGRAM CTA ── */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            Want to know more about me personally?
          </p>
          <a
            href={profile.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Connect on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
