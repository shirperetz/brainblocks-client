import RacePlayerBoard from "../components/race/RacePlayerBoard";
import RaceStatusGrid from "../components/race/RaceStatusGrid";
import RaceTrackPanel from "../components/race/RaceTrackPanel";
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
  const statusItems = [
    {
      label: labels.roomCode,
      value: room?.roomCode,
    },
    {
      label: labels.status,
      value: t.statuses?.[roomStatus] || roomStatus,
    },
    {
      label: labels.players,
      value: `${players.length} / ${lobby?.maxPlayers || room?.maxPlayers || 8}`,
    },
  ];

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

        <RaceStatusGrid
          className="race-game-panel race-game-status"
          items={statusItems}
          t={t}
        />

        <RaceTrackPanel
          className="race-game-track race-game-panel"
          heading={labels.track}
          imageSrc={trackPreviewImage}
          t={t}
        />

        <RacePlayerBoard
          className="race-game-panel race-player-board"
          emptyMessage={t.lobby.noStudents}
          heading={labels.livePanel}
          players={players}
          t={t}
        />
      </div>
    </section>
  );
}

export default RaceGamePage;
