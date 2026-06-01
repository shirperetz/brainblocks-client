import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { createRaceRoom } from "../services/raceRoomApi";

function TeacherCreateRacePage({ onRoomCreated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateRoom() {
    setIsLoading(true);
    setError("");

    try {
      const room = await createRaceRoom();
      onRoomCreated(room);
    } catch (currentError) {
      setError(currentError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="page">
      <div className="panel">
        <h1>Create race room</h1>
        <p>Create a waiting room and share the generated code with students.</p>

        <ErrorMessage message={error} />

        <button
          className="primary-button"
          type="button"
          onClick={handleCreateRoom}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create room"}
        </button>
      </div>
    </section>
  );
}

export default TeacherCreateRacePage;
