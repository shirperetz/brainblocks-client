import ErrorMessage from "../components/ErrorMessage";
import LobbyPanel from "../components/LobbyPanel";
import useLobby from "../hooks/useLobby";

function TeacherLobbyPage({ roomCode }) {
  const { lobby, isLoading, error, refreshLobby } = useLobby(roomCode);

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
        </div>
      </div>

      <ErrorMessage message={error} />
      <LobbyPanel lobby={lobby} />
    </section>
  );
}

export default TeacherLobbyPage;
