import raceBackground from "../assets/space-race-lobby-background.png";
import trackPreviewImage from "../assets/images/track-preview-space-race.png";

const RACE_LABELS = {
  he: {
    title: "המרוץ התחיל",
    subtitle: "מסך מרוץ",
    roomCode: "קוד חדר",
    status: "סטטוס",
    players: "שחקנים",
    track: "מסלול מרוץ",
    livePanel: "לוח מרוץ",
  },
  en: {
    title: "Race Started",
    subtitle: "Race Screen",
    roomCode: "Room Code",
    status: "Status",
    players: "Players",
    track: "Race Track",
    livePanel: "Race Board",
  },
};

function RaceGamePage({ t, room, lobby }) {
  const labels = RACE_LABELS[t.direction === "rtl" ? "he" : "en"];
  const players = lobby?.players || [];
  const roomStatus = room?.status || lobby?.status || "IN_PROGRESS";

  return (
    <section
      className="page race-game-page"
      style={{ "--race-bg-image": `url(${raceBackground})` }}
    >
      <div className="race-game-shell" dir="ltr">
        <header className="race-game-header" dir={t.direction}>
          <p>{labels.subtitle}</p>
          <h1>{labels.title}</h1>
        </header>

        <section className="race-game-panel race-game-status" dir={t.direction}>
          <div>
            <span>{labels.roomCode}</span>
            <strong>{room?.roomCode}</strong>
          </div>
          <div>
            <span>{labels.status}</span>
            <strong>{t.statuses?.[roomStatus] || roomStatus}</strong>
          </div>
          <div>
            <span>{labels.players}</span>
            <strong>{players.length} / {lobby?.maxPlayers || room?.maxPlayers || 8}</strong>
          </div>
        </section>

        <main className="race-game-track race-game-panel" dir={t.direction}>
          <div className="race-panel-heading">{labels.track}</div>
          <div className="race-track-visual">
            <img src={trackPreviewImage} alt="" />
            <div className="race-track-overlay" />
          </div>
        </main>

        <aside className="race-game-panel race-player-board" dir={t.direction}>
          <div className="race-panel-heading">{labels.livePanel}</div>
          {players.length > 0 ? (
            <ul>
              {players.map((player, index) => (
                <li key={player.id}>
                  <span>{index + 1}</span>
                  <strong>{player.displayName}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t.lobby.noStudents}</p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default RaceGamePage;
