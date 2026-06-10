import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { joinRaceRoom } from "../services/raceRoomApi";

function StudentJoinPage({ t, onJoined }) {
  const [roomCode, setRoomCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanRoomCode = roomCode.trim().toUpperCase();
    const cleanDisplayName = displayName.trim();

    if (!cleanRoomCode) {
      setError("Room code is required.");
      return;
    }

    if (!cleanDisplayName) {
      setError("Display name cannot be blank.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const player = await joinRaceRoom(cleanRoomCode, cleanDisplayName);
      onJoined(cleanRoomCode, player);
    } catch (currentError) {
      setError(currentError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="page">
      <div className="panel">
        <h1>{t.studentJoin.title}</h1>
        <p>{t.studentJoin.description}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>{t.studentJoin.roomCodeLabel}</span>
            <input
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
              placeholder={t.studentJoin.roomCodePlaceholder}
            />
          </label>

          <label className="field">
            <span>{t.studentJoin.displayNameLabel}</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder={t.studentJoin.displayNamePlaceholder}
            />
          </label>

          <ErrorMessage message={error} t={t} />

          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? t.studentJoin.joiningButton : t.studentJoin.joinButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default StudentJoinPage;
