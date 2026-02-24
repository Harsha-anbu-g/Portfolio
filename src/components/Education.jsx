import profile from "../data/profile";

export default function Education() {
  return (
    <section id="education" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>

        <div className="space-y-6">
          {profile.education.map((edu, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-lg border border-gray-200 p-6 dark:border-slate-700 dark:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {edu.school} &middot; {edu.location}
                </p>
                {edu.detail && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.detail}
                  </p>
                )}
              </div>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
