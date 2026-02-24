import profile from "../data/profile";

export default function Coursework() {
  return (
    <section id="coursework" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Relevant Coursework
        </h2>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Key courses from my Master&rsquo;s program at Concordia University
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.coursework.map((course, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-slate-700 dark:hover:border-indigo-600"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-900/30 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {course.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {course.code}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
