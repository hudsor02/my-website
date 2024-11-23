import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Moon, Sun } from "lucide-react";

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Check for user's theme preference
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  };

  const isActive = (path) => router.pathname === path;

  const getNavItemClass = (path) => {
    const baseClass = "px-4 py-2 rounded-lg transition-colors";
    return isActive(path)
      ? `${baseClass} bg-primary-600 text-white` // Active: blue fill with white text
      : `${baseClass} text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400`; // Inactive: uniform neutral color
  };

  return (
    <header className="h-16 bg-white shadow dark:bg-neutral-800">
      <nav className="flex items-center justify-between h-full max-w-6xl px-4 mx-auto">
        <Link
          href="/"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Richard Hudson
        </Link>

        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className={getNavItemClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={getNavItemClass("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link href="/resume" className={getNavItemClass("/resume")}>
              Resume
            </Link>
          </li>
          <li>
            <Link href="/projects" className={getNavItemClass("/projects")}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className={getNavItemClass("/contact")}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 transition-colors rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" aria-hidden="true" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" aria-hidden="true" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
