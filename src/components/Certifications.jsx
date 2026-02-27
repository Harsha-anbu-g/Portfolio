import profile from "../data/profile";

export default function Certifications() {
  return (
    <section id="certifications" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Certifications & Accomplishments
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.certifications.map((cert, i) => (
            <div
              key={i}
              className="group flex items-center gap-4 rounded-lg border border-gray-300 p-5 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-slate-700 dark:hover:border-indigo-600"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-900/30 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                {cert.status === "completed" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {cert.name}
                </p>
              </div>
              {cert.status === "in-progress" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
                  In Progress
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
