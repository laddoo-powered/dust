(function () {
  const STORAGE_KEY = "ehdude-theme";
  const VALID_THEMES = new Set(["light", "dark"]);

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return VALID_THEMES.has(stored) ? stored : null;
    } catch (err) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // noop
    }
  }

  function getPreferredTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme, persist) {
    const resolvedTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolvedTheme);

    if (persist) {
      setStoredTheme(resolvedTheme);
    }
  }

  function toggleTheme() {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";

    applyTheme(nextTheme, true);
  }

  applyTheme(getStoredTheme() || getPreferredTheme(), false);

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (toggle) {
      toggle.addEventListener("click", toggleTheme);
    });
  });
})();
