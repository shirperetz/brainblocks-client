import { apiRequest } from "./apiClient";

export function createRaceRoom() {
  return apiRequest("/api/race-rooms", {
    method: "POST",
  });
}

export function getLobby(roomCode) {
  return apiRequest(`/api/race-rooms/${roomCode}/lobby`);
}

export function startRace(roomCode) {
  return apiRequest(`/api/race-rooms/${roomCode}/start`, {
    method: "POST",
  });
}

export function generateQuestion(roomCode) {
  return apiRequest(`/api/race-rooms/${roomCode}/questions`, {
    method: "POST",
  });
}

export function submitQuestionAnswer(roomCode, questionId, playerId, answer) {
  return apiRequest(`/api/race-rooms/${roomCode}/questions/${questionId}/answer`, {
    method: "POST",
    body: JSON.stringify({
      playerId,
      answer,
    }),
  });
}

export function updateQuestionSettings(roomCode, settings) {
  return apiRequest(`/api/race-rooms/${roomCode}/question-settings`, {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}

export function joinRaceRoom(roomCode, displayName) {
  return apiRequest(`/api/race-rooms/${roomCode}/players`, {
    method: "POST",
    body: JSON.stringify({ displayName }),
  });
}
