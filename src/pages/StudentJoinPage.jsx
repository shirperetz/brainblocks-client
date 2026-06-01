import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { joinRaceRoom } from "../services/raceRoomApi";

function StudentJoinPage({ onJoined }) {
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
        <h1>Join race room</h1>
        <p>Enter the room code from your teacher.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Room code</span>
            <input
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
              placeholder="ABC123"
            />
          </label>

          <label className="field">
            <span>Display name</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
            />
          </label>

          <ErrorMessage message={error} />

          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Joining..." : "Join lobby"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default StudentJoinPage;
