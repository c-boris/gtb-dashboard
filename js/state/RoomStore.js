/**
 * RoomStore - State management for the dashboard
 */
export const RoomStore = {
  state: {
    rooms: [],
    filters: { status: "all", mode: "all" },
    focusedRoomId: null,
    expandedRoomIds: new Set(),
  },

  listeners: [],

  /**
   * Register a callback for state changes
   */
  subscribe(callback) {
    this.listeners.push(callback);
  },

  /**
   * Notify all subscribers with current state
   */
  notify() {
    this.listeners.forEach((callback) => callback(this.state));
  },

  /**
   * Initialize or update rooms list
   */
  setRooms(rooms) {
    this.state.rooms = rooms;
    this.notify();
  },

  /**
   * Update global filters (status or mode)
   */
  updateFilter(key, value) {
    this.state.filters[key] = value;
    this.notify();
  },

  /**
   * Toggle focus mode for a specific room
   */
  toggleFocus(id) {
    this.state.focusedRoomId = this.state.focusedRoomId === id ? null : id;
    this.notify();
  },

  /**
   * Toggle expanded details panel for a room
   */
  toggleExpand(id) {
    if (this.state.expandedRoomIds.has(id)) {
      this.state.expandedRoomIds.delete(id);
    } else {
      this.state.expandedRoomIds.add(id);
    }
    this.notify();
  },
};
