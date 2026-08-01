import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // User preference: light | dark | system
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  // Detect OS theme
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Actual theme applied to the app
  const currentTheme =
    theme === "system" ? getSystemTheme() : theme;

  const darkMode = currentTheme === "dark";

  useEffect(() => {
    const html = document.documentElement;

    if (currentTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, currentTheme]);

  // Listen for OS theme changes when using System mode
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      if (media.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    media.addEventListener("change", handleChange);

    return () =>
      media.removeEventListener("change", handleChange);
  }, [theme]);

  // Backward compatibility
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}