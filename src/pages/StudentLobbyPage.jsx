import { useEffect, useRef } from "react";
import ErrorMessage from "../components/ErrorMessage";
import LobbyPanel from "../components/LobbyPanel";
import useLobby from "../hooks/useLobby";
import { getLobby } from "../services/raceRoomApi";

function StudentLobbyPage({ t, roomCode, player, onRaceStarted }) {
  const { lobby, isLoading, error, refreshLobby } = useLobby(roomCode);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (!roomCode) {
      return undefined;
    }

    let isActive = true;

    async function checkRaceStatus() {
      try {
        const nextLobby = await getLobby(roomCode);

        if (
          isActive &&
          nextLobby?.status === "IN_PROGRESS" &&
          !hasNavigatedRef.current
        ) {
          hasNavigatedRef.current = true;
          onRaceStarted(roomCode, nextLobby, player);
        }
      } catch (currentError) {
        console.error("[StudentLobbyPage] Error checking race status", currentError);
      }
    }

    checkRaceStatus();
    const intervalId = window.setInterval(checkRaceStatus, 2500);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [roomCode, player, onRaceStarted]);

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
