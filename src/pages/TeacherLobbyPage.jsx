import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import LobbyPanel from "../components/LobbyPanel";
import QuestionSettingsPanel from "../components/QuestionSettingsPanel";
import useLobby from "../hooks/useLobby";
import { startRace } from "../services/raceRoomApi";

function TeacherLobbyPage({ t, roomCode }) {
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
        <h1>{t.teacherLobby.title}</h1>
        <p>{t.teacherLobby.description}</p>
        <p className="room-code">{roomCode}</p>

        <div className="actions">
          <button
            className="secondary-button"
            type="button"
            onClick={refreshLobby}
            disabled={isLoading}
          >
            {isLoading ? t.teacherLobby.refreshingButton : t.teacherLobby.refreshButton}
          </button>

          {canStartRace && (
            <button
              className="primary-button"
              type="button"
              onClick={handleStartRace}
              disabled={isStartingRace}
            >
              {isStartingRace
                ? t.teacherLobby.startingRaceButton
                : t.teacherLobby.startRaceButton}
            </button>
          )}
        </div>
      </div>

      <ErrorMessage message={error} t={t} />
      <ErrorMessage message={startRaceError} t={t} />
      <QuestionSettingsPanel t={t} roomCode={roomCode} />
      <LobbyPanel t={t} lobby={lobby} />
    </section>
  );
}

export default TeacherLobbyPage;
