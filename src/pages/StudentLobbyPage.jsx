import ErrorMessage from "../components/ErrorMessage";
import LobbyPanel from "../components/LobbyPanel";
import useLobby from "../hooks/useLobby";

function StudentLobbyPage({ roomCode, player }) {
  const { lobby, isLoading, error, refreshLobby } = useLobby(roomCode);

  return (
    <section className="page">
      <div className="panel">
        <h1>You joined the lobby</h1>
        <p>
          Waiting in room <strong>{roomCode}</strong> as{" "}
          <strong>{player.displayName}</strong>.
        </p>

        <button
          className="secondary-button"
          type="button"
          onClick={refreshLobby}
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh lobby"}
        </button>
      </div>

      <ErrorMessage message={error} />
      <LobbyPanel lobby={lobby} />
    </section>
  );
}

export default StudentLobbyPage;
