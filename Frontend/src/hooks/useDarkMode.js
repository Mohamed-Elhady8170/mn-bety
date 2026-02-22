import { useState, useEffect } from "react";

export default function useDarkMode() {
  // Key used to store theme preference in localStorage
  const THEME_KEY = "mn-bety-theme";

  // State to track dark mode
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem(THEME_KEY) === "dark"
  );

  useEffect(() => {
    // Add or remove the "dark" class on the <html> element
    document.documentElement.classList.toggle("dark", isDark);
    // Persist theme preference in localStorage
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [THEME_KEY, isDark]);

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };
  return [isDark, toggleDarkMode];
}
