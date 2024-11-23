// components/layout/Layout.js
import { useTheme } from "../../lib/ThemeContext";
import { useRouter } from "next/router";
import Navigation from "../navigation";
import Footer from "../footer";
import SideNavigation from "../sidenavigation";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }) {
  console.log("Layout: Rendering");
  const { isDark, toggle } = useTheme();
  console.log("Layout: Theme state:", { isDark });

  try {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900">
        <Navigation />
        <button
          onClick={toggle}
          className="fixed z-50 p-2 transition-all bg-white rounded-full shadow-md top-4 right-4 dark:bg-neutral-800 hover:shadow-lg"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-primary-400" />
          ) : (
            <Moon className="w-5 h-5 text-primary-600" />
          )}
        </button>
        <div className="flex flex-grow pt-16">{children}</div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Layout Error:", error);
    return <div>Error in layout</div>;
  }
}
