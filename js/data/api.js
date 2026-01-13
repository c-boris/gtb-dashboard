/**
 * Data API - Fetch rooms from JSON source
 */
export async function loadRooms() {
  try {
    const response = await fetch("./data/rooms.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Log error and rethrow to let the UI (main.js) handle the error display
    console.error("Failed to load rooms:", error);
    throw error;
  }
}
