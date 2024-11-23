import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const SideNavigation = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Resume", path: "/resume" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-neutral-100 dark:bg-neutral-800 shadow-lg z-40 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 -right-4 w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full shadow hover:bg-neutral-300 dark:hover:bg-neutral-600`}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        )}
      </button>

      {/* Navigation Links */}
      <div className="flex flex-col h-full p-4 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="block px-4 py-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideNavigation;
