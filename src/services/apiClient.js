const API_BASE_URL = "http://localhost:8080";

export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Could not connect to the backend. Make sure the server is running.");
  }

  const data = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(response.status, data));
  }

  return data;
}

async function readResponseBody(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getFriendlyErrorMessage(status, data) {
  const backendMessage = data?.message || data?.error;

  if (status === 400) {
    return backendMessage || "Please check the form and try again.";
  }

  if (status === 404) {
    return "Room not found. Check the room code and try again.";
  }

  if (status === 409) {
    if (backendMessage?.toLowerCase().includes("full")) {
      return "This room is already full.";
    }

    if (backendMessage?.toLowerCase().includes("taken")) {
      return "That display name is already taken in this room.";
    }

    if (backendMessage?.toLowerCase().includes("waiting")) {
      return "This room is not waiting for players right now.";
    }

    return backendMessage || "This action is not available right now.";
  }

  return backendMessage || "Something went wrong. Please try again.";
}
