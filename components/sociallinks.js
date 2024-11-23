// components/SocialLinks.js
import { SiLinkedin, SiGithub } from "react-icons/si"; // Using react-icons for brand icons

const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      <a
        href="https://linkedin.com/in/hudsor01"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
      >
        <span className="sr-only">LinkedIn</span>
        <SiLinkedin className="w-6 h-6" />
      </a>
      <a
        href="https://github.com/hudsor02"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
      >
        <span className="sr-only">GitHub</span>
        <SiGithub className="w-6 h-6" />
      </a>
    </div>
  );
};

export default SocialLinks;
