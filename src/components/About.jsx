import profile from "../data/profile";

export default function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-full px-4 text-center sm:px-8 lg:px-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          About
        </h2>
        <p className="mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {profile.about}
        </p>
      </div>
    </section>
  );
}
