import React from "react";
import SocialLinks from "./sociallinks";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="p-2 transition-colors rounded-full bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </button>

          <div className="mb-4">
            <SocialLinks />
          </div>

          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {new Date().getFullYear()} Richard Hudson. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
