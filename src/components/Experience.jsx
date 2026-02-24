import profile from "../data/profile";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Experience
        </h2>

        <div className="space-y-8">
          {profile.experience.map((job, i) => (
            <div
              key={i}
              className="relative rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {job.role}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job.company} &middot; {job.location}
                  </p>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-1">
                {job.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
