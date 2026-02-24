import profile from "../data/profile";

export default function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-[1100px] text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          About
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {profile.about}
        </p>
      </div>
    </section>
  );
}
