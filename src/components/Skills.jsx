import profile from "../data/profile";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Skills
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-slate-800 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
