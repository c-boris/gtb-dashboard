import { RoomStore } from "./state/RoomStore.js";
import { loadRooms } from "./data/api.js";
import { createRoomWidget, updateWidgetUI } from "./ui/RoomWidget.js";
import { initFilters } from "./ui/GlobalFilters.js";
import { initTheme } from "./ui/ThemeHandler.js";

const grid = document.querySelector("#dashboard-grid");
const widgetMap = new Map();

/**
 * Main render function subscribed to RoomStore
 */
function render(state) {
  if (!state.rooms.length) return;

  // Initial mount: clear loader and create widgets
  if (widgetMap.size === 0) {
    grid.innerHTML = "";
    state.rooms.forEach((room) => {
      const widget = createRoomWidget(room, state);
      widgetMap.set(room.id, widget);
      grid.appendChild(widget);
    });
  }

  // Update loop: Filtering and UI sync
  let visibleCount = 0;
  widgetMap.forEach((widget, roomId) => {
    const room = state.rooms.find((r) => r.id === roomId);

    const matchesStatus =
      state.filters.status === "all" || room.status === state.filters.status;
    const matchesMode =
      state.filters.mode === "all" || room.mode === state.filters.mode;
    const isVisible = matchesStatus && matchesMode;

    widget.classList.toggle("is-hidden", !isVisible);

    if (isVisible) {
      visibleCount++;
      updateWidgetUI(widget, room, state);
    }
  });

  toggleNoDataMessage(visibleCount === 0);
}

/**
 * Handle "No results" display
 */
function toggleNoDataMessage(show) {
  const existing = grid.querySelector(".no-data");
  if (show && !existing) {
    grid.insertAdjacentHTML(
      "beforeend",
      '<p class="no-data">No rooms found.</p>'
    );
  } else if (!show && existing) {
    existing.remove();
  }
}

/**
 * App initialization
 */
async function init() {
  initFilters();
  initTheme();

  // Widget event delegation (handles all buttons in one place)
  grid.onclick = (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const roomId = btn.closest(".room-widget")?.dataset.id;
    if (!roomId) return;

    if (btn.classList.contains("btn-expand")) RoomStore.toggleExpand(roomId);
    if (btn.classList.contains("btn-focus")) RoomStore.toggleFocus(roomId);
  };

  RoomStore.subscribe(render);

  try {
    const rooms = await loadRooms();
    RoomStore.setRooms(rooms);
  } catch (e) {
    grid.innerHTML = `<div class="error">Error: ${e.message}</div>`;
  }
}

init();
