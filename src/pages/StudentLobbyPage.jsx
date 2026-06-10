import ErrorMessage from "../components/ErrorMessage";
import LobbyPanel from "../components/LobbyPanel";
import useLobby from "../hooks/useLobby";

function StudentLobbyPage({ t, roomCode, player }) {
  const { lobby, isLoading, error, refreshLobby } = useLobby(roomCode);

  return (
    <section className="page">
      <div className="panel">
        <h1>{t.studentLobby.title}</h1>
        <p>
          {t.studentLobby.waitingPrefix} <strong>{roomCode}</strong>{" "}
          {t.studentLobby.waitingAs}{" "}
          <strong>{player.displayName}</strong>.
        </p>

        <button
          className="secondary-button"
          type="button"
          onClick={refreshLobby}
          disabled={isLoading}
        >
          {isLoading ? t.studentLobby.refreshingButton : t.studentLobby.refreshButton}
        </button>
      </div>

      <ErrorMessage message={error} t={t} />
      <LobbyPanel t={t} lobby={lobby} />
    </section>
  );
}

export default StudentLobbyPage;
