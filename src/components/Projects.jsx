import profile from "../data/profile";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {profile.projects.map((project, i) => (
            <div
              key={i}
              className="flex flex-col rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50"
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="mb-6 flex-1 space-y-1">
                {project.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repo for ${project.title}`}
                    className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-slate-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                    className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
