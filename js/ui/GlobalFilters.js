import { RoomStore } from "../state/RoomStore.js";

/**
 * Initialize global filters with event delegation
 */
export function initFilters() {
  const container = document.querySelector("#global-filters");
  if (!container) return;

  container.innerHTML = `
    <select data-key="status" aria-label="Status filter">
      <option value="all">Statut</option>
      <option value="ok">Situation normale</option>
      <option value="warning">Attention requise</option>
      <option value="error">Problème détecté</option>
    </select>
    <select data-key="mode" aria-label="Mode filter">
      <option value="all">Mode</option>
      <option value="comfort">Confort</option>
      <option value="eco">Eco</option>
      <option value="off">Off</option>
    </select>`;

  // Handle all select changes in one place using data-key
  container.oninput = (e) => {
    const key = e.target.dataset.key;
    if (key) RoomStore.updateFilter(key, e.target.value);
  };
}
