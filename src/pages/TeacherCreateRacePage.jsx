import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { createRaceRoom } from "../services/raceRoomApi";

function TeacherCreateRacePage({ t, onRoomCreated }) {
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
        <h1>{t.teacherCreate.title}</h1>
        <p>{t.teacherCreate.description}</p>

        <ErrorMessage message={error} t={t} />

        <button
          className="primary-button"
          type="button"
          onClick={handleCreateRoom}
          disabled={isLoading}
        >
          {isLoading ? t.teacherCreate.creatingButton : t.teacherCreate.createButton}
        </button>
      </div>
    </section>
  );
}

export default TeacherCreateRacePage;
