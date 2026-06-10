import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import LobbyPanel from "../components/LobbyPanel";
import QuestionSettingsPanel from "../components/QuestionSettingsPanel";
import useLobby from "../hooks/useLobby";
import { startRace } from "../services/raceRoomApi";

function TeacherLobbyPage({ roomCode }) {
  const { lobby, isLoading, error, refreshLobby } = useLobby(roomCode);
  const [isStartingRace, setIsStartingRace] = useState(false);
  const [startRaceError, setStartRaceError] = useState("");

  async function handleStartRace() {
    setIsStartingRace(true);
    setStartRaceError("");

    try {
      await startRace(roomCode);
      await refreshLobby();
    } catch (currentError) {
      setStartRaceError(currentError.message);
    } finally {
      setIsStartingRace(false);
    }
  }

  const canStartRace = lobby?.status === "WAITING";

  return (
    <section className="page">
      <div className="panel">
        <h1>Teacher lobby</h1>
        <p>Share this room code with your students.</p>
        <p className="room-code">{roomCode}</p>

        <div className="actions">
          <button
            className="secondary-button"
            type="button"
            onClick={refreshLobby}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Refresh lobby"}
          </button>

          {canStartRace && (
            <button
              className="primary-button"
              type="button"
              onClick={handleStartRace}
              disabled={isStartingRace}
            >
              {isStartingRace ? "Starting..." : "Start race"}
            </button>
          )}
        </div>
      </div>

      <ErrorMessage message={error} />
      <ErrorMessage message={startRaceError} />
      <QuestionSettingsPanel roomCode={roomCode} />
      <LobbyPanel lobby={lobby} />
    </section>
  );
}

export default TeacherLobbyPage;
