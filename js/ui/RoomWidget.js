import { getStatusMeta, getModeMeta, getHeatingMeta } from "./mappings.js";
import { RoomStore } from "../state/RoomStore.js";
import { getIcon } from "./icons.js";

/**
 * Create initial room widget
 */
export function createRoomWidget(room, state) {
  const status = getStatusMeta(room.status);
  const mode = getModeMeta(room.mode);
  const heating = getHeatingMeta(room.heating);

  const isExpanded = state.expandedRoomIds.has(room.id);
  const isFocused = state.focusedRoomId === room.id;

  const article = document.createElement("article");
  article.className = `room-widget ${isFocused ? "focused" : ""} ${
    isExpanded ? "expanded" : ""
  }`;
  article.dataset.id = room.id;

  // Prepare detail rows to avoid manual repetition
  const details = [
    { ...status, title: "Statut" },
    { ...heating, title: "Chauffage" },
    { ...mode, title: "Mode" },
  ];

  article.innerHTML = `
    <div class="widget-header" style="border-top: 4px solid var(${
      status.color
    })">
        <h3>${room.name}</h3>
        <div class="header-actions">
            <button class="btn-expand head-btn" title="${
              isExpanded ? "Réduire" : "Détails"
            }">
                ${getIcon(isExpanded ? "chevron-up" : "chevron-down", 16)}
            </button>
            <button class="btn-focus head-btn" title="Focus">
                ${getIcon(isFocused ? "minimize" : "maximize", 16)}
            </button>
        </div>
    </div>
    <div class="widget-body">
        <div class="body-content">
            <div class="body-indicators">
    <span style="color: var(${status.color})">
        ${getIcon(status.icon, 18)}
    </span>
    <span style="color: var(${heating.color})">
        ${getIcon(heating.icon, 18)}
    </span>
    <span style="color: var(${mode.color})">
        ${getIcon(mode.icon, 18)}
    </span>
</div>
            <div class="temp-main">
                ${getIcon("thermometer", 22, "temp-icon")}
                <span>${room.temperature}°C</span>
            </div>
            <div class="setpoint">Consigne <strong>${
              room.setpoint
            }°C</strong></div>
        </div>
        <div class="body-details">
            ${details
              .map(
                (d) => `
                <div class="detail-item">
                    <span style="color: var(${d.color})">${getIcon(
                  d.icon,
                  16
                )}</span>
                    <span>${d.title} <span class="badge">${
                  d.label
                }</span></span>
                </div>
            `
              )
              .join("")}
        </div>
    </div>
  `;

  return article;
}

/**
 * Update UI states (Classes & Icons)
 */
export function updateWidgetUI(widget, room, state) {
  const isExpanded = state.expandedRoomIds.has(room.id);
  const isFocused = state.focusedRoomId === room.id;

  widget.classList.toggle("expanded", isExpanded);
  widget.classList.toggle("focused", isFocused);

  const btnExpand = widget.querySelector(".btn-expand");
  const btnFocus = widget.querySelector(".btn-focus");

  if (btnExpand) {
    btnExpand.innerHTML = getIcon(
      isExpanded ? "chevron-up" : "chevron-down",
      16
    );
    btnExpand.title = isExpanded ? "Réduire" : "Détails";
  }

  if (btnFocus) {
    btnFocus.innerHTML = getIcon(isFocused ? "minimize" : "maximize", 16);
  }
}
