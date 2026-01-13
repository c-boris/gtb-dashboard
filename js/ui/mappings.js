/**
 * UI Mapping Configurations
 */

const STATUS_MAP = {
  ok: { icon: "check-circle", color: "--color-ok", label: "Situation normale" },
  warning: {
    icon: "alert-triangle",
    color: "--color-warning",
    label: "Attention requise",
  },
  error: {
    icon: "alert-octagon",
    color: "--color-error",
    label: "Problème détecté",
  },
};

const MODE_MAP = {
  comfort: {
    icon: "thermometer-sun",
    color: "--jeedom-primary",
    label: "Confort",
  },
  eco: { icon: "leaf", color: "--color-ok", label: "Eco" },
  off: { icon: "power", color: "--color-inactive", label: "Off" },
};

const HEATING_MAP = {
  on: { icon: "flame", color: "--jeedom-primary", label: "On" },
  off: { icon: "flame", color: "--color-inactive", label: "Off" },
};

/**
 * Meta Data Getters
 */

export const getStatusMeta = (status) => STATUS_MAP[status] ?? STATUS_MAP.ok;

export const getModeMeta = (mode) =>
  MODE_MAP[mode] ?? {
    icon: "settings",
    color: "--color-inactive",
    label: mode,
  };

export const getHeatingMeta = (state) => HEATING_MAP[state] ?? HEATING_MAP.off;
