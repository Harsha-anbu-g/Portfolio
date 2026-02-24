export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8 dark:border-slate-800">
      <div className="mx-auto max-w-[1100px] text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Harshavardhan Anbuchezhian Gowri. All
        rights reserved.
      </div>
    </footer>
  );
}
