import { getIcon } from "./icons.js";

/**
 * Theme Controller - Manages Dark/Light mode and persistence
 */
export function initTheme() {
  const btn = document.querySelector("#theme-toggle");
  const container = document.querySelector("#theme-icon-container");
  if (!btn || !container) return;

  // Helper to sync icon and storage
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("jeedom-theme", theme);
    container.innerHTML = getIcon(theme === "light" ? "moon" : "sun", 20);
  };

  // Initial load
  const saved = localStorage.getItem("jeedom-theme") || "light";
  applyTheme(saved);

  // Toggle on click
  btn.onclick = () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    applyTheme(isLight ? "dark" : "light");
  };
}
