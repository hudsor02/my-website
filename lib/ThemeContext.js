// lib/ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  const [state, setState] = useState({
    isDark: false,
    mounted: false,
  });

  useEffect(() => {
    // Run once on mount
    if (!state.mounted) {
      const darkMode = localStorage.getItem("darkMode") === "true";
      document.documentElement.classList.toggle("dark", darkMode);
      setState({
        isDark: darkMode,
        mounted: true,
      });
    }
  }, [state.mounted]);

  const toggle = () => {
    setState((prev) => {
      const newDark = !prev.isDark;
      localStorage.setItem("darkMode", String(newDark));
      document.documentElement.classList.toggle("dark", newDark);
      return {
        ...prev,
        isDark: newDark,
      };
    });
  };

  if (!state.mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
        <div className="animate-pulse text-neutral-900 dark:text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark: state.isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
