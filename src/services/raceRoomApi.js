import { apiRequest } from "./apiClient";

export function createRaceRoom() {
  return apiRequest("/api/race-rooms", {
    method: "POST",
  });
}

export function getLobby(roomCode) {
  return apiRequest(`/api/race-rooms/${roomCode}/lobby`);
}

export function joinRaceRoom(roomCode, displayName) {
  return apiRequest(`/api/race-rooms/${roomCode}/players`, {
    method: "POST",
    body: JSON.stringify({ displayName }),
  });
}
