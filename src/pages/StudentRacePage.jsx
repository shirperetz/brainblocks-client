import raceBackground from "../assets/space-race-lobby-background.png";
import trackPreviewImage from "../assets/images/track-preview-space-race.png";

const STUDENT_RACE_LABELS = {
  he: {
    title: "המרוץ התחיל",
    subtitle: "מסך מרוץ",
    message: "המרוץ התחיל!",
    roomCode: "קוד חדר",
    status: "סטטוס",
    players: "שחקנים",
    yourPosition: "מיקומך",
    track: "מסלול מרוץ",
    livePanel: "לוח מרוץ",
  },
  en: {
    title: "Race Started",
    subtitle: "Race Screen",
    message: "Race started!",
    roomCode: "Room Code",
    status: "Status",
    players: "Players",
    yourPosition: "Your Position",
    track: "Race Track",
    livePanel: "Race Board",
  },
};

function StudentRacePage({ t, roomCode, lobby, player }) {
  const labels = STUDENT_RACE_LABELS[t.direction === "rtl" ? "he" : "en"];
  const players = lobby?.players || [];
  const roomStatus = lobby?.status || "IN_PROGRESS";
  const playerPosition = players.findIndex((p) => p.id === player.id) + 1 || "-";

  return (
    <section
      className="page student-race-page"
      style={{ "--race-bg-image": `url(${raceBackground})` }}
    >
      <div className="student-race-shell" dir="ltr">
        <header className="student-race-header" dir={t.direction}>
          <p>{labels.subtitle}</p>
          <h1>{labels.title}</h1>
          <p className="student-race-message">{labels.message}</p>
        </header>

        <div className="student-race-content">
          <section className="student-race-status" dir={t.direction}>
            <div>
              <span>{labels.roomCode}</span>
              <strong>{roomCode}</strong>
            </div>
            <div>
              <span>{labels.status}</span>
              <strong>{t.statuses?.[roomStatus] || roomStatus}</strong>
            </div>
            <div>
              <span>{labels.players}</span>
              <strong>{players.length}</strong>
            </div>
            <div>
              <span>{labels.yourPosition}</span>
              <strong>{playerPosition}</strong>
            </div>
          </section>

          <main className="student-race-track" dir={t.direction}>
            <div className="race-panel-heading">{labels.track}</div>
            <div className="race-track-visual">
              <img src={trackPreviewImage} alt="" />
              <div className="race-track-overlay" />
            </div>
          </main>

          <aside className="student-race-players" dir={t.direction}>
            <div className="race-panel-heading">{labels.livePanel}</div>
            {players.length > 0 ? (
              <ul className="student-race-players-list">
                {players.map((p, index) => (
                  <li key={p.id} className={p.id === player.id ? "current-player" : ""}>
                    <span className="player-rank">{index + 1}</span>
                    <span className="player-name">{p.displayName}</span>
                    {p.id === player.id && (
                      <span className="player-you">{t.studentRace?.you || "(You)"}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t.lobby.noStudents}</p>
            )}

            <section className="student-player-card">
              <div className="player-card-content">
                <div className="player-card-name">{player.displayName}</div>
                <div className="player-card-status">
                  <span>{labels.status}</span>
                  <strong>{t.statuses?.[roomStatus] || roomStatus}</strong>
                </div>
                <div className="player-card-placeholder">
                  <div className="placeholder-icon">🚗</div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default StudentRacePage;
